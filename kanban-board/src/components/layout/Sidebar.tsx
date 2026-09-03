import { LayoutGrid, User, Calendar, BarChart3, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "board", label: "Board", icon: LayoutGrid },
  { id: "my-tasks", label: "My Tasks", icon: User },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[72px] lg:w-[220px] border-r border-border bg-card flex flex-col">
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <span className="hidden lg:block font-semibold text-lg">Kanban</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Altaf Alam"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Altaf Alam</p>
            <p className="text-xs text-muted-foreground">Developer</p>
          </div>
          <ChevronDown className="hidden lg:block w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
