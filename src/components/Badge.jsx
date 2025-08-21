"use client";
export default function Badge({ title }) {
  return (
    <div className="rounded-md bg-green-100">
      <h5 className="text-sm font-bold text-green-500 px-2 py-1">{title}</h5>
    </div>
  );
}
