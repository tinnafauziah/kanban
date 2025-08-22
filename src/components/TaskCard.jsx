"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { BADGES_TEAM_MAP } from "@/type/task";
import { useRouter } from "next/navigation";

export default function TaskCard({ task }) {
  const router = useRouter();
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
          {task.teams.map((team) => BADGES_TEAM_MAP[team])}
        </div>
      </CardContent>
    </Card>
  );
}
