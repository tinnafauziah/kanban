"use client";
import KanbanBoard from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/store/login";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const { loggedUser } = useLoginStore();
  return (
    <div className="font-sans min-h-screen bg-slate-100 w-full">
      <main className="flex flex-col w-3/4 mx-auto ">
        <div className="flex my-8 justify-between items-center">
          <h1 className="text-2xl font-bold">
            Hello {loggedUser?.name}, Here's your tasks
          </h1>
          <>
            <TaskForm Trigger={<Button className="ml-4">Add Task</Button>} />
          </>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <KanbanBoard title="TO DO" />
          <KanbanBoard title="DOING" />
          <KanbanBoard title="DONE" />
        </div>
      </main>
    </div>
  );
}
