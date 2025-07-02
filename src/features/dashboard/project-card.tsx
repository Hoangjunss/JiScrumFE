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
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/* ---------- Định nghĩa kiểu dữ liệu ---------- */
export interface ProjectCardData {
  /** Tiêu đề nhỏ trên cùng (ví dụ Total Revenue) */
  label: string;
  /** Giá trị chính hiển thị đậm */
  amount: string | number;
  /** Phần trăm thay đổi so với kỳ trước */
  percent: number;
  /** Xu hướng “up” hoặc “down” */
  trend: "up" | "down";
  /** Dòng mô tả phụ 1 */
  subTitle: string;
  /** Dòng mô tả phụ 2 */
  note: string;
}

export interface ProjectCardProps
  extends React.ComponentProps<typeof Card> {
  data: ProjectCardData;
}

/* ---------- Component ---------- */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  className,
  ...props
}) => {
  const { label, amount, percent, trend, subTitle, note } = data;
  const TrendIcon = trend === "up" ? IconTrendingUp : IconTrendingDown;
  const percentPrefix = trend === "up" ? "+" : "-";

  return (
    <Card data-slot="card" className={cn("@container/card", className)} {...props}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>

        {/* amount */}
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {amount}
        </CardTitle>

        {/* badge */}
        <CardAction>
          <Badge variant="outline">
            <TrendIcon className="size-4" />
            {percentPrefix}
            {Math.abs(percent)}%
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {subTitle} <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">{note}</div>
      </CardFooter>
    </Card>
  );
};

ProjectCard.displayName = "ProjectCard";
