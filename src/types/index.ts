@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-synthesis: none;
    font-feature-settings: 'kern' 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: theme('colors.slate.600') theme('colors.slate.800');
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: theme('colors.slate.800');
    border-radius: 3px;
  }

  *::-webkit-scrollbar-thumb {
    background: theme('colors.slate.600');
    border-radius: 3px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: theme('colors.slate.500');
  }
}

@layer utilities {
  .scrollbar-thin {
    scrollbar-width: thin;
  }

  .scrollbar-hide {
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@layer components {
  .glass-panel {
    @apply bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl;
  }

  .glass-panel-glow {
    @apply bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl;
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.05);
  }

  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      theme('colors.cyan.500'),
      theme('colors.blue.500')
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-slate-950 text-slate-100;
}

#root {
  min-height: 100vh;
}

button {
  @apply outline-none;
}

button:focus-visible {
  @apply ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-900;
}

a {
  @apply outline-none;
}

a:focus-visible {
  @apply ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-900;
}

input {
  @apply outline-none;
}

input:focus {
  @apply ring-2 ring-cyan-500/50;
}

::selection {
  @apply bg-cyan-500/30 text-white;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 8px rgba(6, 182, 212, 0.1); }
  50% { box-shadow: 0 0 16px rgba(6, 182, 212, 0.2); }
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-glow {
  animation: glow 3s ease-in-out infinite;
}

.scan-line {
  position: relative;
  overflow: hidden;
}

.scan-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
  animation: scan 3s linear infinite;
}
