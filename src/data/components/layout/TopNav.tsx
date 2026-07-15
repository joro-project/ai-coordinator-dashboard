import { Cpu, Settings, Bell, Zap, Activity, GitBranch, Wifi } from 'lucide-react';

export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl border border-cyan-400/30 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                AI Command Center
              </h1>
              <p className="text-xs text-slate-400 -mt-0.5">
                Multi-Agent Development Platform
              </p>
            </div>
          </div>
        </div>

        {/* Live system metrics */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Load</span>
            <span className="text-xs font-semibold text-white">47%</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <GitBranch className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Branch</span>
            <span className="text-xs font-semibold text-white font-mono">feature/command-center</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">9 agents</span>
            <span className="text-xs font-semibold text-emerald-400">online</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">System Online</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center border border-slate-600">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
