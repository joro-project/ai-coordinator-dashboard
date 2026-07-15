import {
  Activity,
  PlayCircle,
  Clock,
  CheckCircle,
  HeartPulse,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from 'lucide-react';
import { DashboardWidget as DashboardWidgetType } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Activity,
  PlayCircle,
  Clock,
  CheckCircle,
  HeartPulse,
  TrendingUp,
};

const colorStyles = {
  blue: {
    bg: 'bg-blue-500/10',
    icon: 'text-blue-400',
    border: 'border-blue-500/20',
    accent: 'from-blue-500/20 to-blue-600/20',
  },
  green: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-400',
    border: 'border-emerald-500/20',
    accent: 'from-emerald-500/20 to-emerald-600/20',
  },
  yellow: {
    bg: 'bg-amber-500/10',
    icon: 'text-amber-400',
    border: 'border-amber-500/20',
    accent: 'from-amber-500/20 to-amber-600/20',
  },
  red: {
    bg: 'bg-red-500/10',
    icon: 'text-red-400',
    border: 'border-red-500/20',
    accent: 'from-red-500/20 to-red-600/20',
  },
  purple: {
    bg: 'bg-violet-500/10',
    icon: 'text-violet-400',
    border: 'border-violet-500/20',
    accent: 'from-violet-500/20 to-violet-600/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    icon: 'text-cyan-400',
    border: 'border-cyan-500/20',
    accent: 'from-cyan-500/20 to-cyan-600/20',
  },
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

interface DashboardWidgetProps {
  widget: DashboardWidgetType;
}

export function DashboardWidget({ widget }: DashboardWidgetProps) {
  const Icon = iconMap[widget.icon] || Activity;
  const TrendIcon = widget.trend ? trendIcons[widget.trend] : null;
  const styles = colorStyles[widget.color];

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border ${styles.border} p-4 hover:bg-slate-800/70 transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-lg ${styles.bg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${styles.icon}`} />
        </div>
        {TrendIcon && (
          <TrendIcon
            className={`w-4 h-4 ${
              widget.trend === 'up'
                ? 'text-emerald-400'
                : widget.trend === 'down'
                  ? 'text-red-400'
                  : 'text-slate-500'
            }`}
          />
        )}
      </div>

      <div className="mt-3">
        <p className="text-xs text-slate-400 font-medium">{widget.title}</p>
        <p className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
          {widget.value}
          {typeof widget.value === 'number' && widget.id === 'project-progress' && (
            <span className="text-lg text-slate-400">%</span>
          )}
        </p>
      </div>
    </div>
  );
}
