"use client";

import { Badge } from "@/components/ui/badge";
import { DESIGN, BACKEND, FRONTEND } from "@/type/task";

export default function TaskCard({ task }) {
  const badgeTeamMap = {
    [DESIGN]: (
      <Badge key={DESIGN} variant="secondary">
        {DESIGN}
      </Badge>
    ),
    [BACKEND]: (
      <Badge key={BACKEND} variant="success">
        {BACKEND}
      </Badge>
    ),
    [FRONTEND]: (
      <Badge key={FRONTEND} variant="purple">
        {FRONTEND}
      </Badge>
    ),
  };

  return (
    <div className="border p-4 rounded-xl bg-white border-gray-200">
      <h5 className="font-bold text-lg text-gray-800">{task.name}</h5>
      <p className="text-gray-500 font-medium my-2 line-clamp-2 mb-4">
        {task.description}
      </p>
      <div className="flex gap-2">
        {task.teams.map((team) => badgeTeamMap[team])}
      </div>
    </div>
  );
}
