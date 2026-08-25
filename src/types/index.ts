export type EngineTab = 'reposense' | 'devforge' | 'mindvault' | 'copilot' | 'voice';

export interface ModuleNode {
  id: string;
  name: string;
  path: string;
  type: 'component' | 'hook' | 'utility' | 'service' | 'type' | 'worker' | 'config';
  lines: number;
  complexity: number;
  imports: string[];
  exports: string[];
  circularWith?: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface ModuleLink {
  source: string;
  target: string;
  isCircular?: boolean;
}

export interface DependencyGraph {
  nodes: ModuleNode[];
  links: ModuleLink[];
  metrics: {
    totalFiles: number;
    totalLines: number;
    totalImports: number;
    circularCount: number;
    maintainabilityScore: number;
  };
}

export interface VaultNote {
  id: string;
  title: string;
  category: 'ADR' | 'DevLog' | 'Snippet' | 'MECE' | 'CheatSheet';
  tags: string[];
  content: string;
  linkedSymbols: string[];
  updatedAt: string;
  pinned?: boolean;
}

export interface CopilotCitation {
  file: string;
  lines: string;
  snippet: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: CopilotCitation[];
  timestamp: string;
}

export interface VoiceCaptureRecord {
  id: string;
  timestamp: string;
  duration: string;
  rawTranscript: string;
  meceSummary: {
    coreObjective: string;
    actionItems: string[];
    technicalSpec: string;
  };
}