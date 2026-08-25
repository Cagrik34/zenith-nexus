import React, { useState, useEffect } from 'react';
import { Search, Compass, Wrench, Brain, Bot, Mic, Code, FileText, CornerDownLeft } from 'lucide-react';
import type { EngineTab } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: EngineTab) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectTab }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: { id: string; label: string; group: string; tab: EngineTab; icon: React.ComponentType<{ size?: number; color?: string }> }[] = [
    { id: '1', label: 'Open RepoSense (Codebase AST Topology & Call Graph)', group: 'Engines', tab: 'reposense', icon: Compass },
    { id: '2', label: 'Open DevForge (JSON to TypeScript & Zod Converter)', group: 'DevForge', tab: 'devforge', icon: Wrench },
    { id: '3', label: 'Open DevForge (cURL to Fetch / Axios / Python)', group: 'DevForge', tab: 'devforge', icon: Code },
    { id: '4', label: 'Open DevForge (In-Browser SQL Query Sandbox)', group: 'DevForge', tab: 'devforge', icon: FileText },
    { id: '5', label: 'Open DevForge (JWT Token Inspector & Decoder)', group: 'DevForge', tab: 'devforge', icon: Wrench },
    { id: '6', label: 'Open MindVault (Create New Architectural Decision Record - ADR)', group: 'MindVault', tab: 'mindvault', icon: Brain },
    { id: '7', label: 'Open MindVault (Search SQLite FTS5 Notes & Snippets)', group: 'MindVault', tab: 'mindvault', icon: Search },
    { id: '8', label: 'Open Copilot (Ask Question across Loaded Repositories)', group: 'Copilot', tab: 'copilot', icon: Bot },
    { id: '9', label: 'Open Voice Scratchpad (Record Spoken Thoughts into MECE Spec)', group: 'Voice', tab: 'voice', icon: Mic }
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        onSelectTab(filtered[selectedIndex].tab);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, selectedIndex, onClose, onSelectTab]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '12vh',
      zIndex: 100
    }} onClick={onClose}>
      <div style={{
        width: '640px',
        background: 'rgba(13, 17, 26, 0.95)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dropdown)',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <Search size={18} color="var(--accent-cyan)" />
          <input
            type="text"
            placeholder="Type a command or navigate engines..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              width: '100%',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <kbd style={{
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            background: 'rgba(255, 255, 255, 0.06)',
            padding: '0.2rem 0.45rem',
            borderRadius: '4px'
          }}>ESC</kbd>
        </div>

        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '0.5rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No commands found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.tab);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                    border: isSelected ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={16} color={isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 600 : 400 }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{item.group}</span>
                    {isSelected && <CornerDownLeft size={13} color="var(--accent-cyan)" />}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}