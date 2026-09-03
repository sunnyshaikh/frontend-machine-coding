import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/taskStore";
import type { Priority, Category, ColumnId } from "@/types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultColumnId?: ColumnId;
}

const users = [
  { id: "u1", name: "Sara Ali", avatar: "https://i.pravatar.cc/150?img=1", role: "Designer" },
  { id: "u2", name: "Altaf Alam", avatar: "https://i.pravatar.cc/150?img=3", role: "Developer" },
  { id: "u3", name: "Imran Khan", avatar: "https://i.pravatar.cc/150?img=5", role: "Developer" },
  { id: "u4", name: "Zeeshan", avatar: "https://i.pravatar.cc/150?img=7", role: "Developer" },
];

const categories: Category[] = ["Design", "Frontend", "Backend", "DevOps", "Setup"];
const priorities: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-emerald-500" },
  { value: "medium", label: "Medium", color: "bg-amber-500" },
  { value: "high", label: "High", color: "bg-rose-500" },
];

const columns: { id: ColumnId; label: string }[] = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export function AddTaskModal({ isOpen, onClose, defaultColumnId = "todo" }: AddTaskModalProps) {
  const { addTask } = useBoardStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("Frontend");
  const [columnId, setColumnId] = useState<ColumnId>(defaultColumnId);
  const [assigneeId, setAssigneeId] = useState(users[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignee = users.find((u) => u.id === assigneeId) || users[0];
    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      assignee,
      columnId,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("Frontend");
    setColumnId("todo");
    setAssigneeId(users[0].id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Add New Task</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full h-10 px-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Column</label>
              <div className="relative">
                <select
                  value={columnId}
                  onChange={(e) => setColumnId(e.target.value as ColumnId)}
                  className="appearance-none w-full h-10 px-4 pr-10 rounded-lg border border-border bg-background text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {columns.map((col) => (
                    <option key={col.id} value={col.id}>{col.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 h-10 rounded-lg text-sm font-medium border transition-colors",
                      priority === p.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <span className={cn("w-2 h-2 rounded-full", p.color)} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="appearance-none w-full h-10 px-4 pr-10 rounded-lg border border-border bg-background text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Assignee</label>
              <div className="relative">
                <select
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="appearance-none w-full h-10 px-4 pr-10 rounded-lg border border-border bg-background text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
