import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-slate-100 w-full">
      <main className="flex flex-col w-3/4 mx-auto ">
        <div className="flex my-8 justify-between items-center">
          <h1 className="text-2xl font-bold">Hello Abdul, Here's your tasks</h1>
          <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
            Add Task
          </button>
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
