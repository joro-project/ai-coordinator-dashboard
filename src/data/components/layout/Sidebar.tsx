import {
  LayoutDashboard,
  FolderKanban,
  Bot,
  ListTodo,
  Brain,
  Github,
  Wrench,
  ScrollText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Radio,
  HardDrive,
  Boxes,
  type LucideIcon,
} from 'lucide-react';
import { NavItem } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderKanban,
  Bot,
  ListTodo,
  Brain,
  Github,
  Wrench,
  ScrollText,
  Settings,
  Cpu,
  Radio,
  HardDrive,
  Boxes,
};

interface SidebarProps {
  navSections: { label: string; items: NavItem[] }[];
  activeItem: string;
  onItemClick: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  navSections,
  activeItem,
  onItemClick,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50 transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.label} className="mb-4">
              {!collapsed && (
                <p className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  {section.label}
                </p>
              )}
              <ul className="space-y-1 px-2">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const isActive = activeItem === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        {Icon && (
                          <Icon
                            className={`w-5 h-5 flex-shrink-0 ${
                              isActive ? 'text-cyan-400' : ''
                            }`}
                          />
                        )}
                        {!collapsed && (
                          <span className="font-medium truncate text-sm">
                            {item.label}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-700/50 p-2">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
