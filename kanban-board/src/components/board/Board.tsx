import { DragDropProvider } from "@dnd-kit/react";
import { useBoardStore } from "@/store/taskStore";
import { Column } from "./Column";
import type { ColumnId } from "@/types";

interface BoardProps {
  onAddTask: (columnId?: ColumnId) => void;
}

export function Board({ onAddTask }: BoardProps) {
  const { columns, getFilteredTasks, moveTask } = useBoardStore();

  const handleDragEnd = (event: { operation: { source: { id: string | number } | null; target: { id: string | number } | null } }) => {
    const { source, target } = event.operation;
    if (source && target) {
      const taskId = String(source.id);
      const columnId = String(target.id) as ColumnId;
      moveTask(taskId, columnId);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => {
          const tasks = getFilteredTasks(column.id);
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onAddTask={onAddTask}
            />
          );
        })}
      </div>
    </DragDropProvider>
  );
}
