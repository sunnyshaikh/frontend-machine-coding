import { MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/taskStore";
import type { Task, ColumnId } from "@/types";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const priorityConfig = {
  low: { color: "bg-emerald-500", label: "Low" },
  medium: { color: "bg-amber-500", label: "Medium" },
  high: { color: "bg-rose-500", label: "High" },
};

const categoryConfig: Record<string, { bg: string; text: string }> = {
  Design: { bg: "bg-indigo-100", text: "text-indigo-700" },
  Frontend: { bg: "bg-sky-100", text: "text-sky-700" },
  Backend: { bg: "bg-emerald-100", text: "text-emerald-700" },
  DevOps: { bg: "bg-rose-100", text: "text-rose-700" },
  Setup: { bg: "bg-violet-100", text: "text-violet-700" },
};

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const { moveTaskLeft, moveTaskRight } = useBoardStore();
  const priority = priorityConfig[task.priority];
  const category = categoryConfig[task.category] || { bg: "bg-gray-100", text: "text-gray-700" };

  const columnOrder: ColumnId[] = ["todo", "in-progress", "done"];
  const currentIndex = columnOrder.indexOf(task.columnId as ColumnId);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < columnOrder.length - 1;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group bg-card rounded-xl border border-border p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-foreground leading-snug">{task.title}</h3>
        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
            category.bg,
            category.text
          )}
        >
          {task.category}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full", priority.color)} />
          <span className="text-sm text-muted-foreground">{priority.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={task.assignee.avatar}
            alt={task.assignee.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{task.assignee.name}</span>
        </div>
      </div>

      {task.columnId === "in-progress" && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (canMoveLeft) moveTaskLeft(task.id);
            }}
            disabled={!canMoveLeft}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              canMoveLeft
                ? "text-primary hover:text-primary/80"
                : "text-muted-foreground cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Move Left
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (canMoveRight) moveTaskRight(task.id);
            }}
            disabled={!canMoveRight}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              canMoveRight
                ? "text-primary hover:text-primary/80"
                : "text-muted-foreground cursor-not-allowed"
            )}
          >
            Move Right
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
