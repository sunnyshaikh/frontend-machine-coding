import { Search, Sun, Bell, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/taskStore";
import type { Priority } from "@/types";

interface HeaderProps {
  onAddTask: () => void;
}

const priorityFilters: { value: Priority | "all"; label: string; color?: string }[] = [
  { value: "all", label: "All" },
  { value: "low", label: "Low", color: "bg-emerald-500" },
  { value: "medium", label: "Medium", color: "bg-amber-500" },
  { value: "high", label: "High", color: "bg-rose-500" },
];

export function Header({ onAddTask }: HeaderProps) {
  const { searchQuery, setSearchQuery, priorityFilter, setPriorityFilter, sortOrder, setSortOrder } =
    useBoardStore();

  return (
    <header className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kanban Board</h1>
          <p className="text-sm text-muted-foreground">Stay organized. Get things done.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[280px] h-10 pl-10 pr-4 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>

          <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
            <Sun className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
              3
            </span>
          </button>

          <button
            onClick={onAddTask}
            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {priorityFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setPriorityFilter(filter.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                priorityFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {filter.color && (
                <span className={cn("w-2 h-2 rounded-full", filter.color)} />
              )}
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
            className="appearance-none h-10 pl-4 pr-10 rounded-lg border border-border bg-card text-sm text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="latest">Sort by: Latest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </header>
  );
}
