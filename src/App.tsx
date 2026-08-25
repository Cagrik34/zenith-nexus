import { useState } from 'react';
import type { EngineTab } from './types';
import { ErrorBoundary, Header, Sidebar, CommandPalette } from './components';
import { useKeyboardShortcuts } from './hooks';
import { RepoSenseView, DevForgeView, MindVaultView, CopilotView, VoiceCaptureView } from './engines';

export function App() {
  const [activeTab, setActiveTab] = useState<EngineTab>('reposense');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useKeyboardShortcuts({
    onOpenPalette: () => setIsPaletteOpen(true),
    onSelectTab: (tab: EngineTab) => setActiveTab(tab)
  });

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
