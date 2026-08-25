import React from 'react';
import { Compass, Wrench, Brain, Bot, Mic, Sparkles } from 'lucide-react';
import type { EngineTab } from '../../types';

interface SidebarProps {
  activeTab: EngineTab;
  onSelectTab: (tab: EngineTab) => void;
}

export function Sidebar({ activeTab, onSelectTab }: SidebarProps) {
  const items: { id: EngineTab; label: string; icon: React.ComponentType<{ size?: number; color?: string }>; shortcut: string; badge?: string }[] = [
    { id: 'reposense', label: 'RepoSense', icon: Compass, shortcut: '⌘1', badge: 'Topology' },
    { id: 'devforge', label: 'DevForge', icon: Wrench, shortcut: '⌘2', badge: '5 Tools' },
    { id: 'mindvault', label: 'MindVault', icon: Brain, shortcut: '⌘3', badge: 'FTS5' },
    { id: 'copilot', label: 'Copilot', icon: Bot, shortcut: '⌘4', badge: 'RAG' },
    { id: 'voice', label: 'Voice Scratchpad', icon: Mic, shortcut: '⌘5', badge: 'Audio' }
  ];

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      height: '100vh',
      background: 'rgba(7, 9, 14, 0.95)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 0.85rem',
      userSelect: 'none',
      zIndex: 30
    }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-indigo) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
          }}>
            <Sparkles size={18} color="#050811" />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Zenith Nexus
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Developer Cockpit v1.0
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.75rem 0.35rem' }}>
            Engines & Tools
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid rgba(0, 242, 254, 0.35)' : '1px solid transparent',
                  background: isActive ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Icon size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
                </div>
                <kbd style={{
                  fontSize: '0.65rem',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                  fontFamily: 'var(--font-mono)'
                }}>{item.shortcut}</kbd>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{
        background: 'rgba(13, 17, 26, 0.8)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem',
        fontSize: '0.72rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Memory State</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Optimal (WASM)</span>
        </div>
        <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '24%', height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))' }}></div>
        </div>
      </div>
    </aside>
  );
}