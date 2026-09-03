import { useCallback } from "react";
import { useBoardStore } from "@/store/taskStore";
import { Column } from "./Column";
import type { ColumnId } from "@/types";

interface BoardProps {
  onAddTask: (columnId?: ColumnId) => void;
}

export function Board({ onAddTask }: BoardProps) {
  const { columns, getFilteredTasks, moveTask } = useBoardStore();

  const handleDragStart = useCallback((e: React.DragEvent, taskId: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", taskId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, columnId: ColumnId) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("text/plain");
      if (taskId) {
        moveTask(taskId, columnId);
      }
    },
    [moveTask]
  );

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {columns.map((column) => {
        const tasks = getFilteredTasks(column.id);
        return (
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
            onAddTask={onAddTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        );
      })}
    </div>
  );
}
