import {
  Cpu,
  Monitor,
  Server,
  Database,
  TestTube,
  Shield,
  FileText,
  Cloud,
  Github,
  Brain,
  Play,
  MemoryStick,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { AIAgent } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Monitor,
  Server,
  Database,
  TestTube,
  Shield,
  FileText,
  Cloud,
  Github,
  Brain,
};

const statusStyles = {
  inactive: {
    bg: 'bg-slate-700/30',
    text: 'text-slate-400',
    dot: 'bg-slate-500',
    border: 'border-slate-600/30',
  },
  active: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    dot: 'bg-cyan-500',
    border: 'border-cyan-500/30',
  },
  running: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    dot: 'bg-green-500',
    border: 'border-green-500/30',
  },
  error: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-500',
    border: 'border-red-500/30',
  },
};

interface AIAgentCardProps {
  agent: AIAgent;
}

export function AIAgentCard({ agent }: AIAgentCardProps) {
  const Icon = iconMap[agent.icon] || Cpu;
  const styles = statusStyles[agent.status];

  return (
    <div
      className={`group bg-slate-800/50 backdrop-blur-sm rounded-xl border ${styles.border} p-5 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${styles.bg} flex items-center justify-center shadow-lg`}
        >
          <Icon className={`w-6 h-6 ${styles.text}`} />
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${styles.dot} ${
              agent.status === 'running' ? 'animate-pulse' : ''
            }`}
          />
          <span
            className={`text-xs font-medium capitalize ${styles.text} px-2 py-0.5 rounded-full ${styles.bg}`}
          >
            {agent.status}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white mb-0.5 group-hover:text-cyan-400 transition-colors">
          {agent.name}
        </h3>
        {agent.role && (
          <p className="text-xs text-slate-500 font-medium">{agent.role}</p>
        )}
      </div>

      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
        {agent.description}
      </p>

      {/* Current Task */}
      {agent.currentTask && (
        <div className="mb-4 p-2.5 rounded-lg bg-slate-900/40 border border-slate-700/30">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
            Current Task
          </p>
          <p className="text-xs text-slate-300 leading-snug">{agent.currentTask}</p>
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">Progress</span>
          <span className="text-xs font-medium text-slate-300">
            {agent.progress}%
          </span>
        </div>
        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${agent.progress}%` }}
          />
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Metric
          icon={Cpu}
          label="CPU"
          value={`${agent.cpuUsage ?? 0}%`}
        />
        <Metric
          icon={MemoryStick}
          label="Mem"
          value={`${agent.memoryUsage ?? 0}MB`}
        />
        <Metric
          icon={Timer}
          label="ETA"
          value={agent.estimatedCompletion ?? '—'}
        />
      </div>

      <button
        disabled
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700/30 text-slate-400 cursor-not-allowed border border-slate-600/30 transition-colors"
      >
        <Play className="w-4 h-4" />
        <span className="text-sm font-medium">Start Agent</span>
      </button>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/30 border border-slate-700/20">
      <Icon className="w-3.5 h-3.5 text-slate-500" />
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-xs font-semibold text-slate-200">{value}</span>
    </div>
  );
}
