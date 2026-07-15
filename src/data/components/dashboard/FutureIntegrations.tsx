import {
  Boxes,
  Code2,
  Cloud,
  Container,
  BrainCircuit,
  Sparkles,
  MessageSquareCode,
  Gem,
  Globe,
  MonitorSmartphone,
  Mic,
  ScanEye,
  Webhook,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { IntegrationModule } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  Container,
  BrainCircuit,
  Sparkles,
  MessageSquareCode,
  Gem,
  Globe,
  MonitorSmartphone,
  Mic,
  ScanEye,
  Webhook,
};

const categoryConfig: Record<
  IntegrationModule['category'],
  { label: string; color: string; bg: string; border: string }
> = {
  editor: { label: 'Code Editors', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  cloud: { label: 'Cloud Services', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  container: { label: 'Containers', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  llm: { label: 'LLM Providers', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  automation: { label: 'Automation', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  interface: { label: 'Interface', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
};

interface FutureIntegrationsProps {
  modules: IntegrationModule[];
}

export function FutureIntegrations({ modules }: FutureIntegrationsProps) {
  const categories = Object.keys(categoryConfig) as IntegrationModule['category'][];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
          <Boxes className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Future Integrations</h2>
          <p className="text-sm text-slate-400">
            Planned modules for the next-generation AI development platform
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-panel p-4 flex items-center gap-3">
        <Clock className="w-5 h-5 text-amber-400" />
        <p className="text-sm text-slate-400">
          <span className="text-white font-semibold">{modules.length}</span> modules planned across{' '}
          <span className="text-white font-semibold">{categories.length}</span> categories. Architecture ready — functionality not yet implemented.
        </p>
      </div>

      {/* Grouped by category */}
      {categories.map((cat) => {
        const catModules = modules.filter((m) => m.category === cat);
        if (catModules.length === 0) return null;
        const cfg = categoryConfig[cat];

        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1.5 h-5 rounded-full ${cfg.bg.replace('/10', '/40')} ${cfg.color}`} />
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${cfg.color}`}>
                {cfg.label}
              </h3>
              <span className="text-xs text-slate-500">({catModules.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catModules.map((mod) => {
                const Icon = iconMap[mod.icon] || Boxes;
                return (
                  <div
                    key={mod.id}
                    className={`glass-panel p-5 border ${cfg.border} hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
                  >
                    {/* Dashed overlay to indicate "planned" */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700/50">
                        Planned
                      </span>
                    </div>

                    <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${cfg.color}`} />
                    </div>

                    <h4 className="text-base font-semibold text-white mb-1">{mod.name}</h4>
                    <p className="text-sm text-slate-400 leading-snug mb-3">{mod.description}</p>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-700/30">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <span className="text-xs text-slate-500 capitalize">{mod.status}</span>
                      </div>
                      <span className="text-xs text-slate-600 ml-auto">Module ready</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
