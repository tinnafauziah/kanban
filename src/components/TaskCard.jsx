"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { DESIGN, BACKEND, FRONTEND } from "@/type/task";
import { useRouter } from "next/navigation";

export default function TaskCard({ task }) {
  const router = useRouter();
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
  const handleCardClick = (taskId) => {
    router.push(`/${taskId}`);
  };

  return (
    <Card onClick={() => handleCardClick(task.id)}>
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
