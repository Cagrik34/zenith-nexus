import { useState } from 'react';
import type { CopilotMessage } from '../../types';
import { Bot, User, Send, Sparkles, FileCode } from 'lucide-react';

const INITIAL_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: `Hello Çağrı! I am your **Zenith Nexus Grounded Copilot**. 

I have indexed your active repositories and MindVault notes using local in-memory SQLite FTS5. You can ask me about architectural flows, circular dependencies, algorithm design, or TypeScript interfaces. Every answer I provide will reference exact file paths and line citations.`,
    timestamp: '01:30'
  },
  {
    id: 'msg-2',
    role: 'user',
    content: 'How does RepoSense detect circular dependencies without blocking the main UI thread?',
    timestamp: '01:31'
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: `In Zenith Nexus, **RepoSense** achieves zero-jank 120 FPS performance by executing AST dependency graphing and Tarjan's strongly connected cycle analysis inside a dedicated **Web Worker**.

Here is the exact implementation flow:
1. **Off-Thread Ingest**: Files are parsed into AST tokens inside \`astParser.ts\`.
2. **Adjacency Ring Check**: The bipartite link map detects direct mutual import cycles (\`A -> B\` and \`B -> A\`).
3. **Canvas Physics Dispatch**: Circular links are tagged with \`isCircular: true\` and rendered with dashed glowing rose styling (\`#fb7185\`).`,
    citations: [
      { file: 'src/core/astParser.ts', lines: 'L75-L95', snippet: 'links.push({ source: node.id, target: target.id, isCircular: true });' },
      { file: 'src/engines/RepoSense/RepoSenseView.tsx', lines: 'L120-L140', snippet: 'ctx.strokeStyle = "rgba(251, 113, 133, 0.7)";' }
    ],
    timestamp: '01:32'
  }
];

export function CopilotView() {
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleSend = () => {
    if (!inputQuery.trim()) return;

    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsSynthesizing(true);

    setTimeout(() => {
      const assistantMsg: CopilotMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Based on your indexed repository and ADR-004 in MindVault:

We guarantee zero cloud leakage and sub-5ms search latency by pairing SQLite FTS5 BM25 token ranks with local dense vectors. All computations stay strictly inside in-memory WebAssembly.`,
        citations: [
          { file: 'src/core/ftsEngine.ts', lines: 'L15-L45', snippet: 'search(query: string, categoryFilter?: string): FTSResult[]' },
          { file: 'ADR-004: In-Memory SQLite FTS5 WASM', lines: 'Decision', snippet: 'FTS5 rowid is deterministically aligned with document_chunks.id.' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsSynthesizing(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)', padding: '1.25rem', gap: '1rem' }}>
      <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.map(msg => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '1rem',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: isUser ? '75%' : '85%'
              }}
            >
              {!isUser && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 242, 254, 0.12)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={18} color="var(--accent-cyan)" />
                </div>
              )}

              <div style={{
                background: isUser ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)' : 'rgba(13, 17, 26, 0.85)',
                border: isUser ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                color: 'var(--text-primary)',
                lineHeight: 1.6
              }}>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.88rem' }}>
                  {msg.content}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      Grounded Citations
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {msg.citations.map((cite, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'rgba(0, 242, 254, 0.08)',
                            border: '1px solid rgba(0, 242, 254, 0.25)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.72rem',
                            color: 'var(--accent-cyan)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          <FileCode size={12} />
                          <span>[{i + 1}] {cite.file} ({cite.lines})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(129, 140, 248, 0.12)',
                  border: '1px solid rgba(129, 140, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={18} color="var(--accent-indigo)" />
                </div>
              )}
            </div>
          );
        })}

        {isSynthesizing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>
            <Sparkles size={16} className="pulse-glow" />
            <span>Searching local FTS5 index and synthesizing grounded answer...</span>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '0.65rem', display: 'flex', gap: '0.65rem' }}>
        <input
          type="text"
          placeholder="Ask a technical question about your codebase or notes..."
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          className="glass-input"
          style={{ height: '44px', fontSize: '0.9rem' }}
        />
        <button className="glow-btn" onClick={handleSend} style={{ height: '44px', padding: '0 1.25rem' }}>
          <Send size={15} /> Send
        </button>
      </div>
    </div>
  );
}