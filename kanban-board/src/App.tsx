import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Board } from "@/components/board/Board";
import { AddTaskModal } from "@/components/board/AddTaskModal";
import type { ColumnId } from "@/types";

function App() {
  const [activeTab, setActiveTab] = useState("board");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultColumnId, setDefaultColumnId] = useState<ColumnId | undefined>();

  const handleAddTask = (columnId?: ColumnId) => {
    setDefaultColumnId(columnId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="lg:ml-[220px] ml-[72px] p-6">
        <Header onAddTask={() => handleAddTask()} />

        <div className="mt-6">
          <Board onAddTask={handleAddTask} />
        </div>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDefaultColumnId(undefined);
        }}
        defaultColumnId={defaultColumnId}
      />
    </div>
  );
}

export default App;
