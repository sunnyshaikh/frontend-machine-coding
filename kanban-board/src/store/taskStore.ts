import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Column, ColumnId, BoardState, User } from "@/types";

const users: User[] = [
  { id: "u1", name: "Sara Ali", avatar: "https://i.pravatar.cc/150?img=1", role: "Designer" },
  { id: "u2", name: "Altaf Alam", avatar: "https://i.pravatar.cc/150?img=3", role: "Developer" },
  { id: "u3", name: "Imran Khan", avatar: "https://i.pravatar.cc/150?img=5", role: "Developer" },
  { id: "u4", name: "Zeeshan", avatar: "https://i.pravatar.cc/150?img=7", role: "Developer" },
];

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Design landing page",
    description: "Create a modern and responsive landing page for the marketing website.",
    priority: "high",
    category: "Design",
    assignee: users[0],
    columnId: "todo",
    order: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    title: "Setup authentication",
    description: "Implement login/signup flow using Firebase authentication.",
    priority: "medium",
    category: "Backend",
    assignee: users[3],
    columnId: "todo",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t3",
    title: "Write unit tests",
    description: "Add unit tests for utils and components.",
    priority: "low",
    category: "DevOps",
    assignee: users[2],
    columnId: "todo",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t4",
    title: "Build dashboard UI",
    description: "Develop the dashboard UI with charts and analytics.",
    priority: "medium",
    category: "Frontend",
    assignee: users[1],
    columnId: "in-progress",
    order: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t5",
    title: "Fix API integration",
    description: "Resolve the issues with ticket API and data synchronization.",
    priority: "high",
    category: "Backend",
    assignee: users[0],
    columnId: "in-progress",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t6",
    title: "Create project setup",
    description: "Initialize the project structure with TypeScript and ESLint.",
    priority: "low",
    category: "Setup",
    assignee: users[2],
    columnId: "done",
    order: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t7",
    title: "Create reusable components",
    description: "Create button, input and modal components.",
    priority: "medium",
    category: "Frontend",
    assignee: users[3],
    columnId: "done",
    order: 1,
    createdAt: new Date().toISOString(),
  },
];

const columns: Column[] = [
  { id: "todo", title: "To Do", color: "#6366f1" },
  { id: "in-progress", title: "In Progress", color: "#f59e0b" },
  { id: "done", title: "Done", color: "#22c55e" },
];

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      columns,
      searchQuery: "",
      priorityFilter: "all",
      sortOrder: "latest",
      selectedUser: null,

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setPriorityFilter: (filter: Priority | "all") => set({ priorityFilter: filter }),
      setSortOrder: (order: "latest" | "oldest") => set({ sortOrder: order }),
      setSelectedUser: (userId: string | null) => set({ selectedUser: userId }),

      addTask: (task: Omit<Task, "id" | "createdAt" | "order">) => {
        const state = get();
        const columnTasks = state.tasks.filter((t: Task) => t.columnId === task.columnId);
        const newTask: Task = {
          ...task,
          id: `t${Date.now()}`,
          order: columnTasks.length,
          createdAt: new Date().toISOString(),
        };
        set({ tasks: [...state.tasks, newTask] });
      },

      deleteTask: (taskId: string) => {
        const state = get();
        set({ tasks: state.tasks.filter((t: Task) => t.id !== taskId) });
      },

      moveTask: (taskId: string, targetColumnId: ColumnId) => {
        const state = get();
        const taskIndex = state.tasks.findIndex((t: Task) => t.id === taskId);
        if (taskIndex === -1) return;

        const targetTasks = state.tasks.filter((t: Task) => t.columnId === targetColumnId);
        const updatedTasks = [...state.tasks];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          columnId: targetColumnId,
          order: targetTasks.length,
        };
        set({ tasks: updatedTasks });
      },

      moveTaskLeft: (taskId: string) => {
        const state = get();
        const task = state.tasks.find((t: Task) => t.id === taskId);
        if (!task) return;

        const columnOrder: ColumnId[] = ["todo", "in-progress", "done"];
        const currentIndex = columnOrder.indexOf(task.columnId as ColumnId);
        if (currentIndex > 0) {
          get().moveTask(taskId, columnOrder[currentIndex - 1]);
        }
      },

      moveTaskRight: (taskId: string) => {
        const state = get();
        const task = state.tasks.find((t: Task) => t.id === taskId);
        if (!task) return;

        const columnOrder: ColumnId[] = ["todo", "in-progress", "done"];
        const currentIndex = columnOrder.indexOf(task.columnId as ColumnId);
        if (currentIndex < columnOrder.length - 1) {
          get().moveTask(taskId, columnOrder[currentIndex + 1]);
        }
      },

      reorderTasks: (taskId: string, targetIndex: number) => {
        const state = get();
        const task = state.tasks.find((t: Task) => t.id === taskId);
        if (!task) return;

        const columnTasks = state.tasks
          .filter((t: Task) => t.columnId === task.columnId && t.id !== taskId)
          .sort((a: Task, b: Task) => a.order - b.order);

        columnTasks.splice(targetIndex, 0, task);
        const updatedTasks = state.tasks.map((t: Task) => {
          if (t.id === taskId) return t;
          const newOrder = columnTasks.findIndex((ct: Task) => ct.id === t.id);
          return newOrder !== -1 ? { ...t, order: newOrder } : t;
        });

        set({ tasks: updatedTasks });
      },

      getTasksByColumn: (columnId: ColumnId) => {
        return get().tasks.filter((t: Task) => t.columnId === columnId);
      },

      getFilteredTasks: (columnId: ColumnId) => {
        const state = get();
        let tasks = state.tasks.filter((t: Task) => t.columnId === columnId);

        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          tasks = tasks.filter(
            (t: Task) =>
              t.title.toLowerCase().includes(query) ||
              t.description.toLowerCase().includes(query) ||
              t.category.toLowerCase().includes(query)
          );
        }

        if (state.priorityFilter !== "all") {
          tasks = tasks.filter((t: Task) => t.priority === state.priorityFilter);
        }

        if (state.selectedUser) {
          tasks = tasks.filter((t: Task) => t.assignee.id === state.selectedUser);
        }

        return tasks.sort((a: Task, b: Task) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return state.sortOrder === "latest" ? dateB - dateA : dateA - dateB;
        });
      },
    }),
    {
      name: "kanban-board-storage",
    }
  )
);

type Priority = "low" | "medium" | "high";
