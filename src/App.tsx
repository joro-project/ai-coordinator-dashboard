import { useState } from 'react';
import { Sidebar, TopNav, Footer, Layout } from './components/layout';
import {
  AIAgentGrid,
  WidgetsGrid,
  LogsPanel,
  CoordinatorCore,
  CommunicationPanel,
  TaskQueue,
  GitHubCenter,
  LocalStorageManager,
  FutureIntegrations,
} from './components/dashboard';
import {
  navSections,
  aiAgents,
  dashboardWidgets,
  logEntries,
  coordinatorState,
  agentMessages,
  taskItems,
  githubRepos,
  workspaceProjects,
  workspaceDatabases,
  workspaceBackups,
  memoryStorage,
  integrationModules,
} from './data/mockData';

function App() {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activeAgents = aiAgents.filter(
    (a) => a.status === 'active' || a.status === 'running',
  ).length;

  return (
    <Layout
      sidebarCollapsed={sidebarCollapsed}
      sidebar={
        <Sidebar
          navSections={navSections}
          activeItem={activeNavItem}
          onItemClick={(id) => {
            setActiveNavItem(id);
            setSidebarCollapsed(false);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
      }
      topNav={<TopNav />}
      footer={<Footer />}
    >
      {/* ===== Dashboard ===== */}
      {activeNavItem === 'dashboard' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
            <p className="text-slate-400 text-sm">
              Monitor and manage your AI development agents
            </p>
          </div>

          <WidgetsGrid widgets={dashboardWidgets} />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">AI Agents</h3>
                <p className="text-sm text-slate-400">
                  9 specialized agents ready for deployment
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                  {activeAgents} active / 9 total
                </div>
              </div>
            </div>
            <AIAgentGrid agents={aiAgents} />
          </div>

          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">System Logs</h3>
              <p className="text-sm text-slate-400">
                Real-time activity and error tracking
              </p>
            </div>
            <LogsPanel logs={logEntries} maxHeight="240px" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Quick Actions
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                  Start All Agents
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 transition-colors">
                  Stop All Agents
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 transition-colors">
                  Run Diagnostics
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 transition-colors">
                  Export Logs
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">System Info</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                  <span className="text-sm text-slate-400">Version</span>
                  <span className="text-sm text-white font-medium">1.0.0</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                  <span className="text-sm text-slate-400">Status</span>
                  <span className="text-sm text-cyan-400 font-medium">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                  <span className="text-sm text-slate-400">Agents</span>
                  <span className="text-sm text-white font-medium">
                    9 registered
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-400">Last Updated</span>
                  <span className="text-sm text-white font-medium">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Coordinator Core ===== */}
      {activeNavItem === 'coordinator' && (
        <div className="animate-fade-in">
          <CoordinatorCore state={coordinatorState} />
        </div>
      )}

      {/* ===== AI Team ===== */}
      {activeNavItem === 'agents' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">AI Team Overview</h2>
            <p className="text-slate-400 text-sm">
              All AI agents connected to the Coordinator — status, progress, and resource usage
            </p>
          </div>
          <AIAgentGrid agents={aiAgents} />
        </div>
      )}

      {/* ===== Communication ===== */}
      {activeNavItem === 'comms' && (
        <div className="animate-fade-in">
          <CommunicationPanel messages={agentMessages} />
        </div>
      )}

      {/* ===== Task Queue ===== */}
      {activeNavItem === 'tasks' && (
        <div className="animate-fade-in">
          <TaskQueue tasks={taskItems} />
        </div>
      )}

      {/* ===== GitHub Center ===== */}
      {activeNavItem === 'github' && (
        <div className="animate-fade-in">
          <GitHubCenter repos={githubRepos} />
        </div>
      )}

      {/* ===== Local Storage ===== */}
      {activeNavItem === 'storage' && (
        <div className="animate-fade-in">
          <LocalStorageManager
            projects={workspaceProjects}
            databases={workspaceDatabases}
            backups={workspaceBackups}
            memory={memoryStorage}
          />
        </div>
      )}

      {/* ===== Integrations ===== */}
      {activeNavItem === 'integrations' && (
        <div className="animate-fade-in">
          <FutureIntegrations modules={integrationModules} />
        </div>
      )}

      {/* ===== Logs ===== */}
      {activeNavItem === 'logs' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">System Logs</h2>
            <p className="text-slate-400 text-sm">
              Full real-time activity and error tracking across all agents
            </p>
          </div>
          <LogsPanel logs={logEntries} maxHeight="600px" />
        </div>
      )}

      {/* ===== Settings ===== */}
      {activeNavItem === 'settings' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
            <p className="text-slate-400 text-sm">
              Configure the AI Command Center platform
            </p>
          </div>
          <div className="glass-panel p-6">
            <p className="text-sm text-slate-400">
              Settings configuration will be available in a future release.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
