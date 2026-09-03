import { MoreHorizontal, Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/react";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/taskStore";
import { TaskCard } from "./TaskCard";
import type { Column as ColumnType, ColumnId, Task } from "@/types";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: ColumnId) => void;
}

export function Column({ column, tasks, onAddTask }: ColumnProps) {
  const taskCount = useBoardStore((state) => state.getFilteredTasks(column.id).length);
  const { ref, isDropTarget } = useDroppable({ id: column.id });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col min-w-[320px] w-[320px] rounded-xl p-4 transition-colors",
        isDropTarget ? "bg-primary/10 ring-2 ring-primary/30" : "bg-muted/50"
      )}
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
          <TaskCard key={task.id} task={task} />
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
