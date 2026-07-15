import { AIAgent } from '../../types';
import { AIAgentCard } from './AIAgentCard';

interface AIAgentGridProps {
  agents: AIAgent[];
}

export function AIAgentGrid({ agents }: AIAgentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <AIAgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
