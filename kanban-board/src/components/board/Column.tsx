import { MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/taskStore";
import { TaskCard } from "./TaskCard";
import type { Column as ColumnType, ColumnId, Task } from "@/types";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: ColumnId) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: ColumnId) => void;
}

export function Column({ column, tasks, onAddTask, onDragStart, onDragOver, onDrop }: ColumnProps) {
  const taskCount = useBoardStore((state) => state.getFilteredTasks(column.id).length);

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className="flex flex-col min-w-[320px] w-[320px] bg-muted/50 rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-8 rounded-full", column.color)} />
          <h2 className="font-semibold text-foreground">{column.title}</h2>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-card text-xs font-medium text-muted-foreground border border-border">
            {taskCount}
          </span>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>

      <button
        onClick={() => onAddTask(column.id)}
        className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 rounded-lg border border-dashed border-border text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground hover:border-primary/50 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    </div>
  );
}
