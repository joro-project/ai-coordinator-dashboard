import { ListTodo, Link2, Timer, Bot, Filter } from 'lucide-react';
import { TaskItem, TaskPriority, TaskStatus } from '../../types';

const priorityConfig: Record<TaskPriority, { text: string; bg: string; border: string }> = {
  critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  high: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  low: { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
};

const statusConfig: Record<TaskStatus, { text: string; dot: string }> = {
  pending: { text: 'text-slate-400', dot: 'bg-slate-500' },
  queued: { text: 'text-slate-400', dot: 'bg-slate-500' },
  'in-progress': { text: 'text-cyan-400', dot: 'bg-cyan-500 animate-pulse' },
  blocked: { text: 'text-red-400', dot: 'bg-red-500' },
  completed: { text: 'text-emerald-400', dot: 'bg-emerald-500' },
};

interface TaskQueueProps {
  tasks: TaskItem[];
}

export function TaskQueue({ tasks }: TaskQueueProps) {
  const sorted = [...tasks].sort((a, b) => {
    const order: Record<TaskPriority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  const summary = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    blocked: tasks.filter((t) => t.status === 'blocked').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    pending: tasks.filter((t) => t.status === 'pending' || t.status === 'queued').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <ListTodo className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Task Queue</h2>
          <p className="text-sm text-slate-400">
            Prioritized task orchestration with dependency tracking
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <SummaryCard label="Total Tasks" value={summary.total} color="text-white" />
        <SummaryCard label="In Progress" value={summary.inProgress} color="text-cyan-400" />
        <SummaryCard label="Blocked" value={summary.blocked} color="text-red-400" />
        <SummaryCard label="Pending" value={summary.pending} color="text-amber-400" />
        <SummaryCard label="Completed" value={summary.completed} color="text-emerald-400" />
      </div>

      {/* Task table */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Active Tasks</h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Sorted by priority</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-900/30">
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Task</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Priority</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Agent</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Dependencies</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">ETA</th>
                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3 min-w-[120px]">Progress</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((task) => {
                const pCfg = priorityConfig[task.priority];
                const sCfg = statusConfig[task.status];
                return (
                  <tr
                    key={task.id}
                    className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <p className="text-sm text-slate-200 font-medium">{task.title}</p>
                      <p className="text-[11px] text-slate-600 font-mono">{task.id}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${pCfg.bg} ${pCfg.text} ${pCfg.border} border`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400">
                        <Bot className="w-3.5 h-3.5" />
                        {task.agentAssigned}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {task.dependencies.length > 0 ? (
                        <div className="flex items-center gap-1 flex-wrap">
                          <Link2 className="w-3.5 h-3.5 text-slate-600" />
                          {task.dependencies.map((dep) => (
                            <span
                              key={dep}
                              className="text-[11px] font-mono text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded"
                            >
                              {dep}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs capitalize ${sCfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sCfg.dot}`} />
                        {task.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Timer className="w-3.5 h-3.5" />
                        {task.estimatedTime}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden min-w-[60px]">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              task.status === 'completed'
                                ? 'bg-emerald-500'
                                : task.status === 'blocked'
                                  ? 'bg-red-500'
                                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{task.progress}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="glass-panel p-4">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}
