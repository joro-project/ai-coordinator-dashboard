import { Cpu, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">
            AI Coordinator
          </span>
          <span className="text-xs text-slate-500">v1.0.0</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500">
            Future AI Development Platform
          </span>
          <Heart className="w-3 h-3 text-red-400 fill-red-400 mx-1" />
          <span className="text-xs text-slate-500">Built for the future</span>
        </div>

        <div className="text-xs text-slate-500">
          {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}
