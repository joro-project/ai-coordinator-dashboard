import { useState } from 'react';
import {
  Radio,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { AgentMessage, MessageCategory } from '../../types';

const categoryConfig: Record<
  MessageCategory,
  { icon: LucideIcon; label: string; color: string; bg: string; border: string }
> = {
  incoming: { icon: ArrowDownLeft, label: 'Incoming', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  outgoing: { icon: ArrowUpRight, label: 'Outgoing', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  completed: { icon: CheckCircle2, label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  waiting: { icon: Clock, label: 'Waiting', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  error: { icon: AlertTriangle, label: 'Errors', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

const priorityDot: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-500',
  low: 'bg-slate-500',
};

interface CommunicationPanelProps {
  messages: AgentMessage[];
}

export function CommunicationPanel({ messages }: CommunicationPanelProps) {
  const [activeTab, setActiveTab] = useState<MessageCategory | 'all'>('all');

  const tabs: (MessageCategory | 'all')[] = ['all', 'incoming', 'outgoing', 'completed', 'waiting', 'error'];
  const filtered = activeTab === 'all' ? messages : messages.filter((m) => m.category === activeTab);

  const counts = (Object.keys(categoryConfig) as MessageCategory[]).reduce(
    (acc, cat) => ({ ...acc, [cat]: messages.filter((m) => m.category === cat).length }),
    {} as Record<MessageCategory, number>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Radio className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Communication Panel</h2>
          <p className="text-sm text-slate-400">
            Live inter-agent messaging and request routing
          </p>
        </div>
      </div>

      {/* Category summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(Object.keys(categoryConfig) as MessageCategory[]).map((cat) => {
          const cfg = categoryConfig[cat];
          const Icon = cfg.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`p-4 rounded-xl border transition-all text-left ${
                activeTab === cat
                  ? `${cfg.bg} ${cfg.border}`
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${cfg.color}`} />
              <p className="text-2xl font-bold text-white">{counts[cat]}</p>
              <p className="text-xs text-slate-400">{cfg.label}</p>
            </button>
          );
        })}
      </div>

      {/* Message feed */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Message Feed</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                activeTab === 'all'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
              }`}
            >
              All
            </button>
            {tabs.slice(1).map((tab) => {
              const cfg = categoryConfig[tab as MessageCategory];
              return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize ${
                  activeTab === tab
                    ? `${cfg.bg} ${cfg.color} ${cfg.border} border`
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                }`}
              >
                {cfg.label}
              </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
          {filtered.map((msg) => {
            const cfg = categoryConfig[msg.category];
            const Icon = cfg.icon;
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${cfg.bg} border ${cfg.border} hover:bg-slate-800/60 transition-colors`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-semibold text-slate-200">
                      {msg.from}
                    </span>
                    <span className="text-xs text-slate-600">→</span>
                    <span className="text-xs font-semibold text-slate-200">
                      {msg.to}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${priorityDot[msg.priority]} ml-auto`} />
                    <span className="text-[11px] text-slate-500 font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">{msg.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
