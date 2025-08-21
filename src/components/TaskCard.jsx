"use client";

import Badge from "./Badge";

export default function TaskCard() {
  return (
    <div className="border p-4 rounded-xl bg-white border-gray-200">
      <h5 className="font-bold text-lg text-gray-800">Design User Interface</h5>
      <p className="text-gray-500 font-medium my-2 line-clamp-2 mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="flex">
        <Badge title="Backend" />
      </div>
    </div>
  );
}
