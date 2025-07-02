import * as React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectDTO } from "@/lib/api/project";
import { CalendarIcon, UserIcon } from "lucide-react";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: ProjectDTO;
}

const STATUS_COLOR_MAP: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  ACTIVE: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
  PAUSED: "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300",
  COMPLETED: "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300",
  CANCELED: "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300",
};

export default function ProjectCard({ project, className, ...props }: ProjectCardProps) {
  const {
    id,
    name,
    description,
    ownerId,
    status,
    startDate,
    endDate,
  } = project;

  const statusStyle = STATUS_COLOR_MAP[status] ?? STATUS_COLOR_MAP["DRAFT"];

  return (
    <Card
      key={id}
      data-slot="card"
      className={cn("flex flex-col justify-between @container/card", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold leading-tight line-clamp-1">
          {name}
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10 overflow-hidden">
          {description || "Chưa có mô tả."}
        </CardDescription>
        <CardAction>
          <Badge className={cn("gap-1 px-2 py-0.5 text-xs font-medium", statusStyle)}>
            {status}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <UserIcon className="size-4" />
          <span>Chủ sở hữu #{ownerId}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <span>
            {new Date(startDate).toLocaleDateString('vi-VN')} — {new Date(endDate).toLocaleDateString('vi-VN')}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}