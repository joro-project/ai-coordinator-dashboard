import { useRef, useEffect } from 'react';
import {
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Bot,
} from 'lucide-react';
import { LogEntry } from '../../types';

const levelStyles = {
  info: {
    icon: Info,
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
};

interface LogsPanelProps {
  logs: LogEntry[];
  title?: string;
  maxHeight?: string;
}

export function LogsPanel({
  logs,
  title = 'System Logs',
  maxHeight = '320px',
}: LogsPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-slate-400">{logs.length} entries</span>
      </div>

      <div
        ref={scrollRef}
        className="overflow-y-auto scrollbar-thin"
        style={{ maxHeight }}
      >
        <div className="p-2 space-y-1">
          {logs.map((log) => {
            const styles = levelStyles[log.level];
            const Icon = styles.icon;

            return (
              <div
                key={log.id}
                className={`flex items-start gap-3 px-3 py-2 rounded-lg ${styles.bg} border ${styles.border}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${styles.text}`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                      {log.timestamp}
                    </span>
                    {log.agent && (
                      <span className="inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                        <Bot className="w-3 h-3" />
                        {log.agent}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-200 mt-0.5">{log.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
