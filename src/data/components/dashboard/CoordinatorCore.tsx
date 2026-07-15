import {
  Target,
  Flag,
  ListChecks,
  GitBranch,
  Cpu,
  Clock,
  Users,
  Zap,
  Activity,
  ArrowRight,
  CheckCircle2,
  Circle,
  Loader2,
  Ban,
  type LucideIcon,
} from 'lucide-react';
import { CoordinatorState, DecisionItem, WorkflowStep } from '../../types';

const priorityStyles: Record<string, { text: string; bg: string; border: string }> = {
  critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  high: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  low: { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
};

const decisionStatusIcon: Record<DecisionItem['status'], LucideIcon> = {
  pending: Circle,
  evaluating: Loader2,
  approved: CheckCircle2,
  rejected: Ban,
};

const decisionStatusColor: Record<DecisionItem['status'], string> = {
  pending: 'text-slate-500',
  evaluating: 'text-cyan-400',
  approved: 'text-emerald-400',
  rejected: 'text-red-400',
};

const workflowStatusIcon: Record<WorkflowStep['status'], LucideIcon> = {
  completed: CheckCircle2,
  running: Loader2,
  pending: Circle,
  blocked: Ban,
};

const workflowStatusColor: Record<WorkflowStep['status'], string> = {
  completed: 'text-emerald-400',
  running: 'text-cyan-400',
  pending: 'text-slate-500',
  blocked: 'text-red-400',
};

interface CoordinatorCoreProps {
  state: CoordinatorState;
}

export function CoordinatorCore({ state }: CoordinatorCoreProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Cpu className="w-8 h-8 text-cyan-400" />
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Coordinator Core</h2>
          <p className="text-sm text-slate-400">
            Central brain orchestrating all AI agents
          </p>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={Clock} label="Uptime" value={state.uptime} color="text-cyan-400" />
        <MetricCard icon={Users} label="Agents Managed" value={String(state.agentsManaged)} color="text-blue-400" />
        <MetricCard icon={Zap} label="Decisions / min" value={String(state.decisionsPerMinute)} color="text-amber-400" />
        <MetricCard icon={Activity} label="System Load" value={`${state.systemLoad}%`} color="text-emerald-400" />
      </div>

      {/* Mission / Goal / Task */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <InfoCard
          icon={Target}
          title="Current Mission"
          content={state.mission}
          accent="cyan"
        />
        <InfoCard
          icon={Flag}
          title="Current Goal"
          content={state.goal}
          accent="blue"
        />
        <InfoCard
          icon={ListChecks}
          title="Current Task"
          content={state.currentTask}
          accent="emerald"
        />
      </div>

      {/* Decision Queue + Active Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision Queue */}
        <div className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Decision Queue</h3>
            <span className="ml-auto text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded-full">
              {state.decisionQueue.length} pending
            </span>
          </div>
          <div className="space-y-2 max-h-[360px] overflow-y-auto scrollbar-thin pr-1">
            {state.decisionQueue.map((decision) => {
              const SIcon = decisionStatusIcon[decision.status];
              const sColor = decisionStatusColor[decision.status];
              const pStyle = priorityStyles[decision.priority];
              return (
                <div
                  key={decision.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60 transition-colors"
                >
                  <SIcon
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${sColor} ${
                      decision.status === 'evaluating' ? 'animate-spin' : ''
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 leading-snug">
                      {decision.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${pStyle.bg} ${pStyle.text} ${pStyle.border} border`}>
                        {decision.priority}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        from {decision.source}
                      </span>
                      <span className="text-[11px] text-slate-600 font-mono ml-auto">
                        {decision.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Workflow */}
        <div className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Active Workflow</h3>
            <span className="ml-auto text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded-full">
              {state.activeWorkflow.filter((w) => w.status === 'completed').length}/
              {state.activeWorkflow.length} steps
            </span>
          </div>
          <div className="space-y-1 max-h-[360px] overflow-y-auto scrollbar-thin pr-1">
            {state.activeWorkflow.map((step, idx) => {
              const SIcon = workflowStatusIcon[step.status];
              const sColor = workflowStatusColor[step.status];
              const isLast = idx === state.activeWorkflow.length - 1;
              return (
                <div key={step.id} className="flex items-start gap-3 relative">
                  {/* connector line */}
                  {!isLast && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-700/50" />
                  )}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                    <SIcon
                      className={`w-4 h-4 ${sColor} ${
                        step.status === 'running' ? 'animate-spin' : ''
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-600">
                        {String(step.order).padStart(2, '0')}
                      </span>
                      <p className="text-sm font-medium text-slate-200">{step.step}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-cyan-400">{step.agent}</span>
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                      <span className={`text-xs capitalize ${sColor}`}>{step.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="glass-panel p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-slate-800/60 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

const accentMap: Record<string, { icon: string; border: string; glow: string }> = {
  cyan: { icon: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10' },
  blue: { icon: 'text-blue-400', border: 'border-blue-500/20', glow: 'shadow-blue-500/10' },
  emerald: { icon: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
};

function InfoCard({
  icon: Icon,
  title,
  content,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  content: string;
  accent: string;
}) {
  const a = accentMap[accent];
  return (
    <div className={`glass-panel p-5 border ${a.border} hover:shadow-lg ${a.glow} transition-all`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${a.icon}`} />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{content}</p>
    </div>
  );
}
