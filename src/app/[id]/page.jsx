"use client";
import Breadcrumb from "@/components/Breadcrumb";

export default function Detail() {
  const breadcrumbLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Task Detail" },
  ];
  return (
    <div className="font-sans min-h-screen bg-slate-100 w-full">
      <main className="flex flex-col w-3/4 mx-auto ">
        <div className="flex my-8 justify-between items-center">
          <h1 className="text-2xl font-bold">Task Detail</h1>
        </div>
        <Breadcrumb links={breadcrumbLinks} />
      </main>
    </div>
  );
}
