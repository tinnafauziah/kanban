"use client";
import KanbanBoard from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/store/login";
import TaskForm from "@/components/TaskForm";
import { TODO, DOING, DONE, TODO_LABEL } from "@/type/task";
import { fetchTasks, useTaskStore } from "@/store/task";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { loggedUser } = useLoginStore();
  const todoTasks = useTaskStore((state) => state[TODO]);
  const doingTasks = useTaskStore((state) => state[DOING]);
  const doneTasks = useTaskStore((state) => state[DONE]);

  useEffect(() => {
    if (loggedUser) {
      fetchTasks(loggedUser.id, TODO);
      fetchTasks(loggedUser.id, DOING);
      fetchTasks(loggedUser.id, DONE);
    }
  }, [loggedUser]);
  return (
    <div className="font-sans min-h-screen bg-slate-100 w-full">
      <main className="flex flex-col w-3/4 mx-auto ">
        <div
          className={cn(
            "flex my-8 items-center",
            loggedUser?.name ? "justify-between" : "justify-end"
          )}
        >
          {loggedUser?.name && (
            <h1 className="text-2xl font-semibold">
              Hello {loggedUser?.name}, Here's your tasks
            </h1>
          )}
          <>
            <TaskForm Trigger={<Button className="ml-4">Add Task</Button>} />
          </>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-12">
          <KanbanBoard title={TODO_LABEL} tasks={todoTasks} />
          <KanbanBoard title={DOING} tasks={doingTasks} />
          <KanbanBoard title={DONE} tasks={doneTasks} />
        </div>
      </main>
    </div>
  );
}
