"use client";
import Breadcrumb from "@/components/Breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { fetchTaskById, useTaskStore } from "@/store/task";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BADGES_TEAM_MAP } from "@/type/task";
import { formatDate } from "@/lib/date";
import { Skeleton } from "@/components/ui/skeleton";

export default function Detail() {
  const { id } = useParams();

  const { selectedTask } = useTaskStore();

  const [loading, setLoading] = useState(true);

  const fetchTaskDetail = (id) => {
    setLoading(true);
    fetchTaskById(id).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTaskDetail(id);
  }, [id]);

  const breadcrumbLinks = [
    { label: "Dashboard", href: "/" },
    { label: selectedTask.name },
  ];

  return (
    <div className="font-sans min-h-screen bg-slate-100 w-full">
      <main className="flex flex-col w-3/4 mx-auto ">
        <div className="flex my-8 justify-between items-center">
          <h1 className="text-2xl font-semibold">Task Detail</h1>
        </div>
        <Breadcrumb links={breadcrumbLinks} />
        <Card className="mt-4">
          <CardContent>
            {loading ? (
              <Skeleton className="h-[20px] w-[300px] rounded-full" />
            ) : (
              <CardTitle className="text-lg font-bold mb-2">
                {selectedTask.name}
              </CardTitle>
            )}
            <div className="flex text-muted-foreground text-sm font-medium justify-between gap-2">
              <div>
                {loading ? (
                  <Skeleton className="mt-2 h-[50px] w-[700px] rounded-full" />
                ) : (
                  <CardDescription>{selectedTask.description}</CardDescription>
                )}
                {loading ? (
                  <Skeleton className="mt-2 h-[20px] w-[200px] rounded-full" />
                ) : (
                  selectedTask?.teams?.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {selectedTask?.teams.map((team) => BADGES_TEAM_MAP[team])}
                    </div>
                  )
                )}
                {loading ? (
                  <Skeleton className="mt-2 h-[20px] w-[100px] rounded-full" />
                ) : (
                  <p className="mt-4">Status: {selectedTask.status}</p>
                )}
              </div>
              <div className="w-1/2">
                {loading ? (
                  <Skeleton className="mt-2 h-[50px] w-[300px] rounded-full" />
                ) : (
                  <>
                    <p className="font-bold">Info</p>
                    <p className="font-normal">
                      Created at: {formatDate(new Date(selectedTask.createdAt))}
                    </p>
                    <p className="font-normal">
                      Updated at: {formatDate(new Date(selectedTask.updatedAt))}
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
