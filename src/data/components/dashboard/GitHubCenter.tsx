import {
  Github,
  GitBranch,
  GitCommit,
  FileEdit,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
} from 'lucide-react';
import { GitHubRepo } from '../../types';

const statusConfig: Record<
  GitHubRepo['status'],
  { text: string; bg: string; border: string; icon: typeof CheckCircle2 }
> = {
  clean: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 },
  ahead: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: ArrowUp },
  behind: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: ArrowDown },
  conflict: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertTriangle },
};

interface GitHubCenterProps {
  repos: GitHubRepo[];
}

export function GitHubCenter({ repos }: GitHubCenterProps) {
  const totalPush = repos.reduce((sum, r) => sum + r.pushQueue, 0);
  const totalPull = repos.reduce((sum, r) => sum + r.pullQueue, 0);
  const totalPending = repos.reduce((sum, r) => sum + r.pendingChanges, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Github className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">GitHub Center</h2>
          <p className="text-sm text-slate-400">
            Repository status, branch tracking, and sync queues
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard icon={Github} label="Repositories" value={repos.length} color="text-cyan-400" />
        <SummaryCard icon={Upload} label="Push Queue" value={totalPush} color="text-blue-400" />
        <SummaryCard icon={Download} label="Pull Queue" value={totalPull} color="text-amber-400" />
        <SummaryCard icon={FileEdit} label="Pending Changes" value={totalPending} color="text-orange-400" />
      </div>

      {/* Repo cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {repos.map((repo) => {
          const sCfg = statusConfig[repo.status];
          const SIcon = sCfg.icon;
          return (
            <div
              key={repo.id}
              className="glass-panel p-5 hover:border-slate-600/60 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/60 flex items-center justify-center">
                    <Github className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{repo.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <GitBranch className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs font-mono text-slate-400">{repo.branch}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sCfg.bg} ${sCfg.text} ${sCfg.border} border capitalize`}>
                  <SIcon className="w-3.5 h-3.5" />
                  {repo.status}
                </span>
              </div>

              {/* Latest commit */}
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/30 mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <GitCommit className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-slate-500">Latest Commit</span>
                </div>
                <p className="text-sm text-slate-200 mb-1">{repo.latestCommit}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>by {repo.commitAuthor}</span>
                  <span>at {repo.commitTime}</span>
                </div>
              </div>

              {/* Queue metrics */}
              <div className="grid grid-cols-4 gap-2">
                <QueueMetric icon={FileEdit} label="Changes" value={repo.pendingChanges} color="text-orange-400" />
                <QueueMetric icon={Upload} label="Push" value={repo.pushQueue} color="text-blue-400" />
                <QueueMetric icon={Download} label="Pull" value={repo.pullQueue} color="text-amber-400" />
                <QueueMetric icon={AlertCircle} label="Untracked" value={repo.untrackedFiles} color="text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Github;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="glass-panel p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-slate-800/60 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function QueueMetric({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Github;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/30 border border-slate-700/20">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-[10px] text-slate-500">{label}</span>
    </div>
  );
}
