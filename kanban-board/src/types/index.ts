export type Priority = "low" | "medium" | "high";

export type Category = "Design" | "Frontend" | "Backend" | "DevOps" | "Setup";

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  assignee: User;
  columnId: string;
  order: number;
  createdAt: string;
}

export type ColumnId = "todo" | "in-progress" | "done";

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
}

export interface BoardState {
  tasks: Task[];
  columns: Column[];
  searchQuery: string;
  priorityFilter: Priority | "all";
  sortOrder: "latest" | "oldest";
  selectedUser: string | null;
  
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (filter: Priority | "all") => void;
  setSortOrder: (order: "latest" | "oldest") => void;
  setSelectedUser: (userId: string | null) => void;
  
  addTask: (task: Omit<Task, "id" | "createdAt" | "order">) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, targetColumnId: ColumnId) => void;
  moveTaskLeft: (taskId: string) => void;
  moveTaskRight: (taskId: string) => void;
  reorderTasks: (taskId: string, targetIndex: number) => void;
  
  getTasksByColumn: (columnId: ColumnId) => Task[];
  getFilteredTasks: (columnId: ColumnId) => Task[];
}
