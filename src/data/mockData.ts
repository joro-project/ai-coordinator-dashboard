import {
  AIAgent,
  DashboardWidget,
  LogEntry,
  NavItem,
  CoordinatorState,
  AgentMessage,
  TaskItem,
  GitHubRepo,
  WorkspaceProject,
  WorkspaceDatabase,
  WorkspaceBackup,
  MemoryStorageItem,
  IntegrationModule,
} from '../types';

// ===== Navigation =====

export const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: 'Command',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
      { id: 'coordinator', label: 'Coordinator Core', icon: 'Cpu', path: '/coordinator' },
      { id: 'agents', label: 'AI Team', icon: 'Bot', path: '/agents' },
      { id: 'comms', label: 'Communication', icon: 'Radio', path: '/comms' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'tasks', label: 'Task Queue', icon: 'ListTodo', path: '/tasks' },
      { id: 'github', label: 'GitHub Center', icon: 'Github', path: '/github' },
      { id: 'storage', label: 'Local Storage', icon: 'HardDrive', path: '/storage' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { id: 'integrations', label: 'Integrations', icon: 'Boxes', path: '/integrations' },
      { id: 'logs', label: 'System Logs', icon: 'ScrollText', path: '/logs' },
      { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    ],
  },
];

export const navItems: NavItem[] = navSections.flatMap((s) => s.items);

// ===== AI Agents (Team) =====

export const aiAgents: AIAgent[] = [
  {
    id: 'frontend-ai',
    name: 'Frontend AI',
    role: 'UI Engineering',
    description: 'React, Vue, and Angular development. Handles UI components, styling, and user interface implementation.',
    status: 'running',
    progress: 67,
    icon: 'Monitor',
    currentTask: 'Building dashboard widget components',
    cpuUsage: 34,
    memoryUsage: 412,
    estimatedCompletion: '4m 12s',
  },
  {
    id: 'backend-ai',
    name: 'Backend AI',
    role: 'Server & API',
    description: 'Server-side development with Node.js, Python, and Go. Manages APIs, business logic, and server architecture.',
    status: 'running',
    progress: 42,
    icon: 'Server',
    currentTask: 'Implementing REST API endpoints',
    cpuUsage: 51,
    memoryUsage: 638,
    estimatedCompletion: '12m 08s',
  },
  {
    id: 'database-ai',
    name: 'Database AI',
    role: 'Data Layer',
    description: 'Database design, migrations, query optimization, and data modeling for SQL and NoSQL databases.',
    status: 'active',
    progress: 15,
    icon: 'Database',
    currentTask: 'Optimizing indexes on user table',
    cpuUsage: 18,
    memoryUsage: 256,
    estimatedCompletion: '8m 45s',
  },
  {
    id: 'testing-ai',
    name: 'Testing AI',
    role: 'QA & Testing',
    description: 'Automated testing specialist. Writes unit tests, integration tests, and performs end-to-end testing automation.',
    status: 'running',
    progress: 89,
    icon: 'TestTube',
    currentTask: 'Running integration test suite',
    cpuUsage: 47,
    memoryUsage: 384,
    estimatedCompletion: '1m 32s',
  },
  {
    id: 'devops-ai',
    name: 'DevOps AI',
    role: 'Infrastructure',
    description: 'CI/CD pipeline management, deployment automation, infrastructure as code, and cloud resource management.',
    status: 'active',
    progress: 0,
    icon: 'Cloud',
    currentTask: 'Awaiting build completion',
    cpuUsage: 8,
    memoryUsage: 128,
    estimatedCompletion: 'Pending',
  },
  {
    id: 'security-ai',
    name: 'Security AI',
    role: 'Security Audit',
    description: 'Security auditing and vulnerability detection. Performs code analysis and implements security best practices.',
    status: 'running',
    progress: 53,
    icon: 'Shield',
    currentTask: 'Scanning dependencies for CVEs',
    cpuUsage: 29,
    memoryUsage: 320,
    estimatedCompletion: '6m 20s',
  },
  {
    id: 'documentation-ai',
    name: 'Documentation AI',
    role: 'Docs & API',
    description: 'Generates and maintains technical documentation, API references, and code comments. Keeps docs in sync with code.',
    status: 'active',
    progress: 22,
    icon: 'FileText',
    currentTask: 'Generating API reference docs',
    cpuUsage: 12,
    memoryUsage: 192,
    estimatedCompletion: '15m 04s',
  },
  {
    id: 'github-ai',
    name: 'GitHub AI',
    role: 'Version Control',
    description: 'Manages repository operations, branch strategies, pull requests, and commit workflows across projects.',
    status: 'running',
    progress: 78,
    icon: 'Github',
    currentTask: 'Merging PR #142 — feature/auth',
    cpuUsage: 22,
    memoryUsage: 210,
    estimatedCompletion: '2m 15s',
  },
  {
    id: 'memory-ai',
    name: 'Memory AI',
    role: 'Context & Memory',
    description: 'Manages shared context, embeddings, and knowledge base across all agents. Provides long-term memory retrieval.',
    status: 'running',
    progress: 95,
    icon: 'Brain',
    currentTask: 'Indexing conversation embeddings',
    cpuUsage: 38,
    memoryUsage: 724,
    estimatedCompletion: '0m 48s',
  },
];

// ===== Dashboard Widgets =====

export const dashboardWidgets: DashboardWidget[] = [
  { id: 'active-agents', title: 'Active Agents', value: 7, icon: 'Activity', color: 'blue', trend: 'up' },
  { id: 'running-tasks', title: 'Running Tasks', value: 12, icon: 'PlayCircle', color: 'green', trend: 'up' },
  { id: 'pending-tasks', title: 'Pending Tasks', value: 5, icon: 'Clock', color: 'yellow', trend: 'stable' },
  { id: 'completed-tasks', title: 'Completed Tasks', value: 128, icon: 'CheckCircle', color: 'purple', trend: 'up' },
  { id: 'system-status', title: 'System Status', value: 'Operational', icon: 'HeartPulse', color: 'cyan' },
  { id: 'project-progress', title: 'Project Progress', value: 64, icon: 'TrendingUp', color: 'blue', trend: 'up' },
];

// ===== Coordinator Core =====

export const coordinatorState: CoordinatorState = {
  mission: 'Build and deploy a production-grade multi-agent AI development platform',
  goal: 'Complete Sprint 12 — AI Command Center MVP with full agent orchestration',
  currentTask: 'Coordinating Frontend AI and Backend AI on dashboard API integration',
  uptime: '14d 7h 32m',
  agentsManaged: 9,
  tasksOrchestrated: 1284,
  decisionsPerMinute: 23,
  systemLoad: 47,
  decisionQueue: [
    { id: 'd1', title: 'Allocate GPU resources to Memory AI for embedding batch', priority: 'high', source: 'Memory AI', status: 'evaluating', timestamp: '14:32:05' },
    { id: 'd2', title: 'Pause Testing AI — waiting on Backend API stubs', priority: 'medium', source: 'Testing AI', status: 'pending', timestamp: '14:32:18' },
    { id: 'd3', title: 'Approve Security AI dependency upgrade request', priority: 'critical', source: 'Security AI', status: 'evaluating', timestamp: '14:32:31' },
    { id: 'd4', title: 'Route GitHub merge conflict to Debug AI', priority: 'high', source: 'GitHub AI', status: 'approved', timestamp: '14:32:44' },
    { id: 'd5', title: 'Schedule Documentation AI for post-deploy docs refresh', priority: 'low', source: 'Coordinator', status: 'pending', timestamp: '14:32:57' },
    { id: 'd6', title: 'Reject DevOps AI request — insufficient cloud quota', priority: 'medium', source: 'DevOps AI', status: 'rejected', timestamp: '14:33:10' },
  ],
  activeWorkflow: [
    { id: 'w1', step: 'Gather requirements', agent: 'Coordinator', status: 'completed', order: 1 },
    { id: 'w2', step: 'Design API schema', agent: 'Backend AI', status: 'completed', order: 2 },
    { id: 'w3', step: 'Build UI components', agent: 'Frontend AI', status: 'running', order: 3 },
    { id: 'w4', step: 'Write integration tests', agent: 'Testing AI', status: 'pending', order: 4 },
    { id: 'w5', step: 'Security audit', agent: 'Security AI', status: 'pending', order: 5 },
    { id: 'w6', step: 'Deploy to staging', agent: 'DevOps AI', status: 'blocked', order: 6 },
    { id: 'w7', step: 'Generate documentation', agent: 'Documentation AI', status: 'pending', order: 7 },
  ],
};

// ===== Communication Panel =====

export const agentMessages: AgentMessage[] = [
  { id: 'm1', direction: 'incoming', from: 'Frontend AI', to: 'Coordinator', content: 'Component build at 67%. Requesting API schema validation.', timestamp: '14:32:05', category: 'incoming', priority: 'high' },
  { id: 'm2', direction: 'outgoing', from: 'Coordinator', to: 'Backend AI', content: 'Provide OpenAPI spec to Frontend AI within 2 min.', timestamp: '14:32:08', category: 'outgoing', priority: 'high' },
  { id: 'm3', direction: 'incoming', from: 'Testing AI', to: 'Coordinator', content: 'Integration suite 89% complete. 2 flaky tests detected.', timestamp: '14:32:15', category: 'completed', priority: 'medium' },
  { id: 'm4', direction: 'incoming', from: 'Security AI', to: 'Coordinator', content: 'CVE scan found 1 high-severity vulnerability in lodash.', timestamp: '14:32:20', category: 'error', priority: 'critical' },
  { id: 'm5', direction: 'outgoing', from: 'Coordinator', to: 'GitHub AI', content: 'Hold all merges until security patch is applied.', timestamp: '14:32:25', category: 'outgoing', priority: 'critical' },
  { id: 'm6', direction: 'incoming', from: 'Memory AI', to: 'Coordinator', content: 'Embedding index at 95%. Batch completes in <1 min.', timestamp: '14:32:30', category: 'waiting', priority: 'low' },
  { id: 'm7', direction: 'outgoing', from: 'Coordinator', to: 'DevOps AI', content: 'Prepare staging environment for deploy at 16:00.', timestamp: '14:32:35', category: 'waiting', priority: 'medium' },
  { id: 'm8', direction: 'incoming', from: 'Database AI', to: 'Coordinator', content: 'Index optimization complete. Query latency reduced 34%.', timestamp: '14:32:40', category: 'completed', priority: 'medium' },
  { id: 'm9', direction: 'incoming', from: 'Backend AI', to: 'Frontend AI', content: 'OpenAPI spec pushed to shared context. Schema validated.', timestamp: '14:32:45', category: 'completed', priority: 'high' },
  { id: 'm10', direction: 'outgoing', from: 'Coordinator', to: 'Documentation AI', content: 'Queue API reference generation after deploy.', timestamp: '14:32:50', category: 'waiting', priority: 'low' },
  { id: 'm11', direction: 'incoming', from: 'GitHub AI', to: 'Coordinator', content: 'Merge conflict on feature/auth — routing to Debug AI.', timestamp: '14:32:55', category: 'error', priority: 'high' },
  { id: 'm12', direction: 'outgoing', from: 'Coordinator', to: 'Security AI', content: 'Patch lodash immediately. Block further builds until clean.', timestamp: '14:33:00', category: 'outgoing', priority: 'critical' },
];

// ===== Task Queue =====

export const taskItems: TaskItem[] = [
  { id: 't1', title: 'Patch lodash CVE-2024-XXXX', priority: 'critical', agentAssigned: 'Security AI', dependencies: [], status: 'in-progress', estimatedTime: '3m', progress: 45 },
  { id: 't2', title: 'Complete dashboard widget components', priority: 'high', agentAssigned: 'Frontend AI', dependencies: ['t9'], status: 'in-progress', estimatedTime: '4m', progress: 67 },
  { id: 't3', title: 'Implement REST API endpoints', priority: 'high', agentAssigned: 'Backend AI', dependencies: [], status: 'in-progress', estimatedTime: '12m', progress: 42 },
  { id: 't4', title: 'Run integration test suite', priority: 'high', agentAssigned: 'Testing AI', dependencies: ['t3'], status: 'in-progress', estimatedTime: '1m', progress: 89 },
  { id: 't5', title: 'Optimize database indexes', priority: 'medium', agentAssigned: 'Database AI', dependencies: [], status: 'in-progress', estimatedTime: '8m', progress: 15 },
  { id: 't6', title: 'Merge PR #142 — feature/auth', priority: 'high', agentAssigned: 'GitHub AI', dependencies: ['t1'], status: 'blocked', estimatedTime: '2m', progress: 78 },
  { id: 't7', title: 'Index conversation embeddings', priority: 'medium', agentAssigned: 'Memory AI', dependencies: [], status: 'in-progress', estimatedTime: '0m', progress: 95 },
  { id: 't8', title: 'Generate API reference docs', priority: 'low', agentAssigned: 'Documentation AI', dependencies: ['t3'], status: 'queued', estimatedTime: '15m', progress: 0 },
  { id: 't9', title: 'Design OpenAPI schema', priority: 'high', agentAssigned: 'Backend AI', dependencies: [], status: 'completed', estimatedTime: '0m', progress: 100 },
  { id: 't10', title: 'Prepare staging environment', priority: 'medium', agentAssigned: 'DevOps AI', dependencies: ['t2', 't4'], status: 'pending', estimatedTime: '20m', progress: 0 },
  { id: 't11', title: 'Resolve merge conflict feature/auth', priority: 'high', agentAssigned: 'Debug AI', dependencies: ['t6'], status: 'pending', estimatedTime: '5m', progress: 0 },
  { id: 't12', title: 'Post-deploy documentation refresh', priority: 'low', agentAssigned: 'Documentation AI', dependencies: ['t10'], status: 'pending', estimatedTime: '10m', progress: 0 },
];

// ===== GitHub Center =====

export const githubRepos: GitHubRepo[] = [
  {
    id: 'r1',
    name: 'ai-command-center',
    branch: 'feature/command-center',
    latestCommit: 'feat: add coordinator core and agent grid',
    commitAuthor: 'GitHub AI',
    commitTime: '14:28',
    status: 'ahead',
    pendingChanges: 7,
    pushQueue: 3,
    pullQueue: 1,
    untrackedFiles: 2,
  },
  {
    id: 'r2',
    name: 'ai-agent-sdk',
    branch: 'develop',
    latestCommit: 'fix: resolve memory leak in agent lifecycle',
    commitAuthor: 'Backend AI',
    commitTime: '13:45',
    status: 'clean',
    pendingChanges: 0,
    pushQueue: 0,
    pullQueue: 2,
    untrackedFiles: 0,
  },
  {
    id: 'r3',
    name: 'ai-frontend-ui',
    branch: 'feature/widgets',
    latestCommit: 'refactor: extract dashboard widget components',
    commitAuthor: 'Frontend AI',
    commitTime: '14:15',
    status: 'ahead',
    pendingChanges: 4,
    pushQueue: 1,
    pullQueue: 0,
    untrackedFiles: 1,
  },
  {
    id: 'r4',
    name: 'ai-security-scans',
    branch: 'main',
    latestCommit: 'chore: update vulnerable dependencies',
    commitAuthor: 'Security AI',
    commitTime: '14:30',
    status: 'conflict',
    pendingChanges: 3,
    pushQueue: 2,
    pullQueue: 3,
    untrackedFiles: 0,
  },
];

// ===== Local Storage / Workspace =====

export const workspaceProjects: WorkspaceProject[] = [
  { id: 'p1', name: 'ai-command-center', path: '/workspace/ai-command-center', files: 248, folders: 32, size: '4.2 MB', lastModified: '2 min ago' },
  { id: 'p2', name: 'ai-agent-sdk', path: '/workspace/ai-agent-sdk', files: 124, folders: 18, size: '2.8 MB', lastModified: '15 min ago' },
  { id: 'p3', name: 'ai-frontend-ui', path: '/workspace/ai-frontend-ui', files: 86, folders: 12, size: '1.4 MB', lastModified: '1 hour ago' },
  { id: 'p4', name: 'ai-security-scans', path: '/workspace/ai-security-scans', files: 42, folders: 6, size: '0.8 MB', lastModified: '3 hours ago' },
];

export const workspaceDatabases: WorkspaceDatabase[] = [
  { id: 'db1', name: 'primary_postgres', engine: 'PostgreSQL 16', tables: 24, size: '128 MB', status: 'connected' },
  { id: 'db2', name: 'cache_redis', engine: 'Redis 7', tables: 8, size: '32 MB', status: 'connected' },
  { id: 'db3', name: 'vector_embeddings', engine: 'pgvector', tables: 3, size: '256 MB', status: 'connected' },
  { id: 'db4', name: 'analytics_warehouse', engine: 'ClickHouse', tables: 12, size: '1.2 GB', status: 'disconnected' },
];

export const workspaceBackups: WorkspaceBackup[] = [
  { id: 'b1', name: 'full-backup-2026-07-11', type: 'full', size: '512 MB', created: '14:00', status: 'healthy' },
  { id: 'b2', name: 'incremental-2026-07-11-12', type: 'incremental', size: '48 MB', created: '12:00', status: 'healthy' },
  { id: 'b3', name: 'snapshot-pre-deploy', type: 'snapshot', size: '256 MB', created: '10:30', status: 'healthy' },
  { id: 'b4', name: 'full-backup-2026-07-10', type: 'full', size: '498 MB', created: 'Yesterday', status: 'healthy' },
];

export const memoryStorage: MemoryStorageItem[] = [
  { id: 'ms1', label: 'Agent Context Window', type: 'context', size: '64 MB', entries: 1248, lastAccess: 'Just now' },
  { id: 'ms2', label: 'Semantic Embeddings', type: 'embedding', size: '256 MB', entries: 48210, lastAccess: '1 min ago' },
  { id: 'ms3', label: 'Response Cache', type: 'cache', size: '32 MB', entries: 842, lastAccess: '2 min ago' },
  { id: 'ms4', label: 'Knowledge Base', type: 'knowledge', size: '128 MB', entries: 3204, lastAccess: '5 min ago' },
];

// ===== Future Integrations =====

export const integrationModules: IntegrationModule[] = [
  { id: 'i1', name: 'VS Code', icon: 'Code2', category: 'editor', description: 'Deep editor integration with live agent suggestions', status: 'planned' },
  { id: 'i2', name: 'Supabase', icon: 'Cloud', category: 'cloud', description: 'Direct Supabase project and database management', status: 'planned' },
  { id: 'i3', name: 'Docker', icon: 'Container', category: 'container', description: 'Container orchestration and image lifecycle', status: 'planned' },
  { id: 'i4', name: 'Local LLM', icon: 'BrainCircuit', category: 'llm', description: 'On-premise LLM inference and fine-tuning', status: 'planned' },
  { id: 'i5', name: 'OpenAI', icon: 'Sparkles', category: 'llm', description: 'GPT model integration for reasoning and generation', status: 'planned' },
  { id: 'i6', name: 'Claude', icon: 'MessageSquareCode', category: 'llm', description: 'Anthropic Claude integration for analysis and code', status: 'planned' },
  { id: 'i7', name: 'Gemini', icon: 'Gem', category: 'llm', description: 'Google Gemini multimodal model integration', status: 'planned' },
  { id: 'i8', name: 'Web Browser Automation', icon: 'Globe', category: 'automation', description: 'Headless browser control for testing and scraping', status: 'planned' },
  { id: 'i9', name: 'Remote Desktop', icon: 'MonitorSmartphone', category: 'interface', description: 'Remote desktop protocol for visual agent control', status: 'planned' },
  { id: 'i10', name: 'Voice Assistant', icon: 'Mic', category: 'interface', description: 'Voice-driven agent commands and responses', status: 'planned' },
  { id: 'i11', name: 'Screen Recognition', icon: 'ScanEye', category: 'interface', description: 'Visual screen parsing for UI understanding', status: 'planned' },
  { id: 'i12', name: 'Webhook Gateway', icon: 'Webhook', category: 'automation', description: 'Inbound webhook routing to coordinator queue', status: 'planned' },
];

// ===== Log Entries =====

export const logEntries: LogEntry[] = [
  { id: '1', timestamp: '2026-07-11 14:32:05', level: 'info', message: 'System initialized successfully. All modules loaded.' },
  { id: '2', timestamp: '2026-07-11 14:32:08', level: 'success', message: 'Dashboard connected to data source.' },
  { id: '3', timestamp: '2026-07-11 14:32:12', level: 'info', message: 'AI Coordinator agent registered and ready.', agent: 'AI Coordinator' },
  { id: '4', timestamp: '2026-07-11 14:32:15', level: 'info', message: 'Frontend AI agent registered and ready.', agent: 'Frontend AI' },
  { id: '5', timestamp: '2026-07-11 14:32:18', level: 'info', message: 'Backend AI agent registered and ready.', agent: 'Backend AI' },
  { id: '6', timestamp: '2026-07-11 14:32:21', level: 'warning', message: 'Database AI pending configuration. Using default settings.', agent: 'Database AI' },
  { id: '7', timestamp: '2026-07-11 14:32:25', level: 'info', message: 'All AI agents initialized. System ready for operations.' },
  { id: '8', timestamp: '2026-07-11 14:32:30', level: 'success', message: 'WebSocket connection established for real-time updates.' },
  { id: '9', timestamp: '2026-07-11 14:33:00', level: 'info', message: 'Health check passed. All services operational.' },
  { id: '10', timestamp: '2026-07-11 14:33:15', level: 'error', message: 'Security AI: lodash CVE detected. Patching initiated.', agent: 'Security AI' },
  { id: '11', timestamp: '2026-07-11 14:33:22', level: 'warning', message: 'GitHub AI: merge conflict on feature/auth branch.', agent: 'GitHub AI' },
  { id: '12', timestamp: '2026-07-11 14:33:30', level: 'success', message: 'Database AI: index optimization complete. Latency reduced 34%.', agent: 'Database AI' },
  { id: '13', timestamp: '2026-07-11 14:33:45', level: 'info', message: 'Memory AI: embedding batch 95% complete.', agent: 'Memory AI' },
  { id: '14', timestamp: '2026-07-11 14:34:00', level: 'success', message: 'Dashboard rendering complete. User interface ready.' },
];
