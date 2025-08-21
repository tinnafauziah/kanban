"use client";
import TaskCard from "./TaskCard";
export default function KanbanBoard({ title }) {
  return (
    <div>
      <h5 className="font-bold text-gray-500 py-4">{title}</h5>
      <div className="flex flex-col gap-4">
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
}
