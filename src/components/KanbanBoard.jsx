"use client";
import TaskCard from "./TaskCard";

export default function KanbanBoard({ title, tasks = [] }) {
  return (
    <div>
      <h5 className="font-bold text-gray-500 py-4">{title}</h5>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
