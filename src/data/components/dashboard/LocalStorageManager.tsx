import { useState } from 'react';
import {
  HardDrive,
  FolderKanban,
  Folder,
  FileCode,
  Database,
  Archive,
  Brain,
  HardDriveDownload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import {
  WorkspaceProject,
  WorkspaceDatabase,
  WorkspaceBackup,
  MemoryStorageItem,
} from '../../types';

type Tab = 'projects' | 'databases' | 'backups' | 'memory';

const dbStatusConfig: Record<WorkspaceDatabase['status'], { text: string; dot: string; icon: LucideIcon }> = {
  connected: { text: 'text-emerald-400', dot: 'bg-emerald-500', icon: CheckCircle2 },
  disconnected: { text: 'text-slate-400', dot: 'bg-slate-500', icon: XCircle },
  error: { text: 'text-red-400', dot: 'bg-red-500', icon: AlertCircle },
};

const backupStatusConfig: Record<WorkspaceBackup['status'], { text: string; dot: string }> = {
  healthy: { text: 'text-emerald-400', dot: 'bg-emerald-500' },
  corrupted: { text: 'text-red-400', dot: 'bg-red-500' },
  restoring: { text: 'text-cyan-400', dot: 'bg-cyan-500 animate-pulse' },
};

const memoryTypeConfig: Record<MemoryStorageItem['type'], { text: string; bg: string }> = {
  context: { text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  embedding: { text: 'text-blue-400', bg: 'bg-blue-500/10' },
  cache: { text: 'text-amber-400', bg: 'bg-amber-500/10' },
  knowledge: { text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

interface LocalStorageManagerProps {
  projects: WorkspaceProject[];
  databases: WorkspaceDatabase[];
  backups: WorkspaceBackup[];
  memory: MemoryStorageItem[];
}

export function LocalStorageManager({
  projects,
  databases,
  backups,
  memory,
}: LocalStorageManagerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const tabs: { id: Tab; label: string; icon: LucideIcon; count: number }[] = [
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'databases', label: 'Databases', icon: Database, count: databases.length },
    { id: 'backups', label: 'Backups', icon: Archive, count: backups.length },
    { id: 'memory', label: 'Memory Storage', icon: Brain, count: memory.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <HardDrive className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Local Workspace Manager</h2>
          <p className="text-sm text-slate-400">
            Projects, files, databases, backups, and memory storage
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="glass-panel p-5 hover:border-slate-600/60 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white">{p.name}</h3>
                  <p className="text-xs font-mono text-slate-500 truncate">{p.path}</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-1 rounded">{p.size}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <Stat icon={FileCode} label="Files" value={p.files} />
                <Stat icon={Folder} label="Folders" value={p.folders} />
                <Stat icon={HardDriveDownload} label="Size" value={p.size} />
              </div>
              <p className="text-xs text-slate-500">Modified {p.lastModified}</p>
            </div>
          ))}
        </div>
      )}

      {/* Databases */}
      {activeTab === 'databases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {databases.map((db) => {
            const sCfg = dbStatusConfig[db.status];
            const SIcon = sCfg.icon;
            return (
              <div key={db.id} className="glass-panel p-5 hover:border-slate-600/60 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{db.name}</h3>
                      <p className="text-xs text-slate-500">{db.engine}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${sCfg.text}`}>
                    <SIcon className="w-3.5 h-3.5" />
                    {db.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Stat icon={HardDrive} label="Tables" value={db.tables} />
                  <Stat icon={HardDriveDownload} label="Size" value={db.size} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Backups */}
      {activeTab === 'backups' && (
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/30">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Backup Name</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Size</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Created</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((b) => {
                  const sCfg = backupStatusConfig[b.status];
                  return (
                    <tr key={b.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Archive className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-200 font-medium">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-xs text-slate-400 capitalize px-2 py-1 rounded bg-slate-800/50">{b.type}</span>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-300">{b.size}</td>
                      <td className="px-3 py-3 text-sm text-slate-400">{b.created}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs capitalize ${sCfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sCfg.dot}`} />
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Memory Storage */}
      {activeTab === 'memory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memory.map((m) => {
            const cfg = memoryTypeConfig[m.type];
            return (
              <div key={m.id} className="glass-panel p-5 hover:border-slate-600/60 transition-all">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                    <Brain className={`w-5 h-5 ${cfg.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">{m.label}</h3>
                    <span className={`text-xs font-medium uppercase ${cfg.text} ${cfg.bg} px-2 py-0.5 rounded`}>
                      {m.type}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Stat icon={HardDriveDownload} label="Size" value={m.size} />
                  <Stat icon={FileCode} label="Entries" value={m.entries} />
                  <Stat icon={HardDrive} label="Access" value={m.lastAccess} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/30 border border-slate-700/20">
      <Icon className="w-3.5 h-3.5 text-slate-500" />
      <span className="text-sm font-semibold text-slate-200">{value}</span>
      <span className="text-[10px] text-slate-500">{label}</span>
    </div>
  );
}
