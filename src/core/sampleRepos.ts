export const SAMPLE_ZENITH_CODEBASE = [
  {
    path: 'src/App.tsx',
    content: `
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RepoSenseView } from './engines/RepoSense/RepoSenseView';
import { DevForgeView } from './engines/DevForge/DevForgeView';
import { MindVaultView } from './engines/MindVault/MindVaultView';
import { CopilotView } from './engines/Copilot/CopilotView';
import { CommandPalette } from './components/CommandPalette';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export function App() {
  const [activeTab, setActiveTab] = useState('reposense');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  useKeyboardShortcuts({ onOpenPalette: () => setIsPaletteOpen(true) });

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      <main className="main-content">
        <Header activeTab={activeTab} onOpenPalette={() => setIsPaletteOpen(true)} />
        {activeTab === 'reposense' && <RepoSenseView />}
        {activeTab === 'devforge' && <DevForgeView />}
        {activeTab === 'mindvault' && <MindVaultView />}
        {activeTab === 'copilot' && <CopilotView />}
      </main>
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} onSelectTab={setActiveTab} />
    </div>
  );
}
`
  },
  {
    path: 'src/components/Sidebar.tsx',
    content: `
import React from 'react';
import { Compass, Wrench, Brain, Bot, Mic } from 'lucide-react';
import { EngineTab } from '../types';

export function Sidebar({ activeTab, onSelectTab }: { activeTab: EngineTab; onSelectTab: (tab: EngineTab) => void }) {
  const navItems = [
    { id: 'reposense', label: 'RepoSense', icon: Compass, badge: 'Topology' },
    { id: 'devforge', label: 'DevForge', icon: Wrench, badge: '5 Tools' },
    { id: 'mindvault', label: 'MindVault', icon: Brain, badge: 'FTS5' },
    { id: 'copilot', label: 'Copilot', icon: Bot, badge: 'Local RAG' },
    { id: 'voice', label: 'Voice Capture', icon: Mic, badge: '60 FPS' }
  ];
  return <aside className="sidebar">{navItems.map(item => <button key={item.id} onClick={() => onSelectTab(item.id as EngineTab)}>{item.label}</button>)}</aside>;
}
`
  },
  {
    path: 'src/components/Header.tsx',
    content: `
import React from 'react';
import { Search, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { EngineTab } from '../types';

export function Header({ activeTab, onOpenPalette }: { activeTab: EngineTab; onOpenPalette: () => void }) {
  return (
    <header className="header-glass">
      <div className="header-brand">
        <Sparkles className="brand-icon" />
        <span className="brand-title">Zenith Nexus</span>
      </div>
      <button className="search-pill" onClick={onOpenPalette}>
        <Search size={14} /> Search (Cmd+K)
      </button>
    </header>
  );
}
`
  },
  {
    path: 'src/components/CommandPalette.tsx',
    content: `
import React, { useState, useEffect } from 'react';
import { Search, Compass, Wrench, Brain, Bot, Mic, Code, FileText, ArrowRight } from 'lucide-react';
import { EngineTab } from '../types';

export function CommandPalette({ isOpen, onClose, onSelectTab }: { isOpen: boolean; onClose: () => void; onSelectTab: (tab: EngineTab) => void }) {
  if (!isOpen) return null;
  return <div className="palette-modal"><input placeholder="Type a command or search symbols..." autoFocus /></div>;
}
`
  },
  {
    path: 'src/hooks/useKeyboardShortcuts.ts',
    content: `
import { useEffect } from 'react';
export function useKeyboardShortcuts({ onOpenPalette }: { onOpenPalette: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenPalette]);
}
`
  },
  {
    path: 'src/engines/RepoSense/RepoSenseView.tsx',
    content: `
import React, { useState } from 'react';
import { parseRepositoryFiles } from '../../core/astParser';
import { SAMPLE_ZENITH_CODEBASE } from '../../core/sampleRepos';

export function RepoSenseView() {
  const [graph, setGraph] = useState(() => parseRepositoryFiles(SAMPLE_ZENITH_CODEBASE));
  return <div className="reposense-container">Topology Graph ({graph.metrics.totalFiles} files)</div>;
}
`
  },
  {
    path: 'src/engines/DevForge/DevForgeView.tsx',
    content: `
import React, { useState } from 'react';
export function DevForgeView() {
  const [activeTool, setActiveTool] = useState<'json' | 'curl' | 'sql' | 'regex' | 'jwt'>('json');
  return <div className="devforge-container">DevForge Active: {activeTool}</div>;
}
`
  },
  {
    path: 'src/engines/MindVault/MindVaultView.tsx',
    content: `
import React, { useState } from 'react';
import { VaultNote } from '../../types';
export function MindVaultView() {
  return <div className="vault-container">MindVault Memory Hub</div>;
}
`
  },
  {
    path: 'src/engines/Copilot/CopilotView.tsx',
    content: `
import React, { useState } from 'react';
import { CopilotMessage } from '../../types';
export function CopilotView() {
  return <div className="copilot-container">Local RAG Grounded Copilot</div>;
}
`
  },
  {
    path: 'src/engines/VoiceCapture/VoiceCaptureView.tsx',
    content: `
import React, { useState, useRef, useEffect } from 'react';
export function VoiceCaptureView() {
  return <div className="voice-container">Voice Scratchpad</div>;
}
`
  }
];