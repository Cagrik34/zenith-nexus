import { useState } from 'react';
import type { EngineTab } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

import { RepoSenseView } from './engines/RepoSense/RepoSenseView';
import { DevForgeView } from './engines/DevForge/DevForgeView';
import { MindVaultView } from './engines/MindVault/MindVaultView';
import { CopilotView } from './engines/Copilot/CopilotView';
import { VoiceCaptureView } from './engines/VoiceCapture/VoiceCaptureView';

export function App() {
  const [activeTab, setActiveTab] = useState<EngineTab>('reposense');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useKeyboardShortcuts({
    onOpenPalette: () => setIsPaletteOpen(true),
    onSelectTab: (tab: EngineTab) => setActiveTab(tab)
  });

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header activeTab={activeTab} onOpenPalette={() => setIsPaletteOpen(true)} />

        <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {activeTab === 'reposense' && <RepoSenseView />}
          {activeTab === 'devforge' && <DevForgeView />}
          {activeTab === 'mindvault' && <MindVaultView />}
          {activeTab === 'copilot' && <CopilotView />}
          {activeTab === 'voice' && <VoiceCaptureView />}
        </main>
      </div>

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}

export default App;