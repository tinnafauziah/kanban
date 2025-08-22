"use client";
import Breadcrumb from "@/components/Breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchTaskById, useTaskStore, deleteTask } from "@/store/task";
import { useToastStore } from "@/store/toast";
import { useLoginStore } from "@/store/login";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BADGES_TEAM_MAP } from "@/type/task";
import { formatDate } from "@/lib/date";
import TaskForm from "@/components/TaskForm";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function Detail() {
  const { id } = useParams();

  const router = useRouter();

  const { selectedTask } = useTaskStore();
  const { loggedUser } = useLoginStore();

  const [loading, setLoading] = useState(true);

  const { openToast } = useToastStore();

  const handleDelete = async (id) => {
    await deleteTask(id, loggedUser.id);
    router.replace("/");
    openToast("Task already deleted");
  };

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
        <div className="flex justify-end  items-center gap-2">
          <TaskForm
            task={selectedTask}
            Trigger={<Button className="my-8">Edit Task</Button>}
          />
          <div>or</div>
          <ConfirmationModal
            onConfirm={handleDelete}
            Trigger={
              <Button className="my-8 px-0" variant="ghost" size="sm">
                <p className="text-destructive font-normal">Delete</p>
              </Button>
            }
            id={selectedTask?.id}
          />
        </div>
      </main>
    </div>
  );
}
