import { useEffect } from 'react';
import type { EngineTab } from '../types';

interface ShortcutOptions {
  onOpenPalette: () => void;
  onSelectTab: (tab: EngineTab) => void;
}

export function useKeyboardShortcuts({ onOpenPalette, onSelectTab }: ShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenPalette();
      }

      if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
        if (e.key === '1') { e.preventDefault(); onSelectTab('reposense'); }
        if (e.key === '2') { e.preventDefault(); onSelectTab('devforge'); }
        if (e.key === '3') { e.preventDefault(); onSelectTab('mindvault'); }
        if (e.key === '4') { e.preventDefault(); onSelectTab('copilot'); }
        if (e.key === '5') { e.preventDefault(); onSelectTab('voice'); }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenPalette, onSelectTab]);
}