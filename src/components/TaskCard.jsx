"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardContent>
        <CardTitle className="text-lg font-bold mb-2 hover:underline hover:cursor-default">
          {task.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {task.description}
        </CardDescription>
        <div className="flex gap-2 mt-4">
          {task.teams.map((team) => badgeTeamMap[team])}
        </div>
      </CardContent>
    </Card>
  );
}
