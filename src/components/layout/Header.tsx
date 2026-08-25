import { Search, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import type { EngineTab } from '../../types';

interface HeaderProps {
  activeTab: EngineTab;
  onOpenPalette: () => void;
  metrics?: {
    files: number;
    maintainability: number;
  };
}

export function Header({ activeTab, onOpenPalette, metrics }: HeaderProps) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'reposense': return 'RepoSense — Codebase Topology & AST Inspector';
      case 'devforge': return 'DevForge — Instant Multi-Tool Swiss Army Knife';
      case 'mindvault': return 'MindVault — Local Second Brain & FTS5 Index';
      case 'copilot': return 'Grounded Copilot — Offline Context AI';
      case 'voice': return 'Voice Capture — 60 FPS MECE Audio Scratchpad';
    }
  };

  return (
    <header className="header-glass" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.85rem 1.5rem',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10, 13, 20, 0.8)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(0, 242, 254, 0.08)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          padding: '0.35rem 0.8rem',
          borderRadius: 'var(--radius-md)'
        }}>
          <Sparkles size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {getTabTitle()}
          </span>
        </div>

        {metrics && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Cpu size={13} color="var(--accent-blue)" /> {metrics.files} Modules
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={13} color="var(--accent-emerald)" /> Health: {metrics.maintainability}/100
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onOpenPalette}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            padding: '0.45rem 0.95rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
        >
          <Search size={14} color="var(--accent-cyan)" />
          <span>Quick Actions / Search</span>
          <kbd style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>Cmd+K</kbd>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          background: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--accent-emerald)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          padding: '0.35rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }}></span>
          <span>Zero-Cloud Local</span>
        </div>
      </div>
    </header>
  );
}