import { useState } from 'react';
import type { VaultNote } from '../../types';
import { InMemoryFTSEngine } from '../../core/ftsEngine';
import { Plus, Search, BookOpen } from 'lucide-react';

const INITIAL_NOTES: VaultNote[] = [
  {
    id: 'note-1',
    title: 'ADR-004: In-Memory SQLite FTS5 WASM for Zero-Cloud RAG',
    category: 'ADR',
    tags: ['sqlite', 'fts5', 'rag', 'architecture'],
    content: `## Context
For enterprise and privacy-first local engineering tools, cloud vector database latency and data leakage are unacceptable.

## Decision
We utilize embedded SQLite FTS5 (BM25 token search) + local dense cosine embeddings inside WASM. FTS5 rowid is deterministically aligned with document_chunks.id.

## Consequences
- Zero cloud infrastructure costs ($0 API bills).
- Sub-5ms search latency across 50,000+ chunks.
- Total data privacy.`,
    linkedSymbols: ['ftsEngine.ts', 'SQLiteHybridRAGStore'],
    updatedAt: '2026-08-25',
    pinned: true
  },
  {
    id: 'note-2',
    title: 'McKinsey MECE Issue Tree for Performance Bottlenecks',
    category: 'MECE',
    tags: ['performance', 'mece', 'systems'],
    content: `## Root Problem: UI Jank on 10,000+ Node Graphs

### 1. Main Thread CPU Contention (Mutually Exclusive)
- 1.1 AST parsing regex running synchronously during file ingest.
- 1.2 Force-directed layout physics running in React render phase.

### 2. GPU / DOM Overhead (Collectively Exhaustive)
- 2.1 Rendering thousands of DOM SVG elements instead of HTML5 2D/WebGL Canvas.
- 2.2 Unnecessary React re-renders on every animation frame.

### Corrective Action
Offload AST parsing and physics steps into dedicated Web Workers. Render solely to Canvas.`,
    linkedSymbols: ['astParser.ts', 'RepoSenseView.tsx'],
    updatedAt: '2026-08-24',
    pinned: true
  },
  {
    id: 'note-3',
    title: 'CheatSheet: Google GenAI SDK v2.9 Interactions API',
    category: 'CheatSheet',
    tags: ['gemini', 'api', 'cheatsheet'],
    content: `All new quickstart code must use the modern Interactions API:

\`\`\`python
interaction = client.interactions.create(
    model="gemini-2.5-flash",
    input=query,
    config=genai.types.GenerateContentConfig(
        system_instruction=system_instruction,
        temperature=0.1
    )
)
print(interaction.steps[-1].content[0].text)
\`\`\``,
    linkedSymbols: ['Zero_Cloud_Hybrid_RAG_SQLite_FTS5_Gemini.ipynb'],
    updatedAt: '2026-08-25'
  }
];

export function MindVaultView() {
  const [notes, setNotes] = useState<VaultNote[]>(INITIAL_NOTES);
  const [selectedNote, setSelectedNote] = useState<VaultNote>(INITIAL_NOTES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);

  const fts = new InMemoryFTSEngine(notes);
  const searchResults = fts.search(searchQuery, categoryFilter === 'all' ? undefined : categoryFilter);

  const handleCreateNote = (category: VaultNote['category']) => {
    const newNote: VaultNote = {
      id: `note-${Date.now()}`,
      title: category === 'ADR' ? 'ADR-XXX: New Architectural Decision' : 'New Engineering Note',
      category,
      tags: ['new'],
      content: category === 'ADR'
        ? `## Context\nDescribe the context...\n\n## Decision\nDescribe the decision...\n\n## Consequences\nPros and cons...`
        : `Write your thoughts here...`,
      linkedSymbols: [],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const handleSaveNote = (updated: VaultNote) => {
    setNotes(notes.map(n => n.id === updated.id ? updated : n));
    setSelectedNote(updated);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)', padding: '1.25rem', gap: '1.25rem' }}>
      <div className="glass-panel" style={{ width: '360px', display: 'flex', flexDirection: 'column', padding: '1rem', gap: '0.85rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: 11 }} />
            <input
              type="text"
              placeholder="Search FTS5 Index..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '2rem', height: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {['all', 'ADR', 'MECE', 'CheatSheet', 'DevLog'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  border: categoryFilter === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  background: categoryFilter === cat ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  color: categoryFilter === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="glow-btn" onClick={() => handleCreateNote('ADR')} style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
            <Plus size={13} /> + ADR
          </button>
          <button className="glow-btn-secondary" onClick={() => handleCreateNote('MECE')} style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
            <Plus size={13} /> + MECE
          </button>
          <button className="glow-btn-secondary" onClick={() => handleCreateNote('CheatSheet')} style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
            <Plus size={13} /> + Note
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {searchResults.map(({ note, snippet }) => {
            const isSelected = selectedNote?.id === note.id;
            return (
              <div
                key={note.id}
                onClick={() => { setSelectedNote(note); setIsEditing(false); }}
                className="glass-card"
                style={{
                  padding: '0.85rem',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(0, 242, 254, 0.07)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span className={`badge ${note.category === 'ADR' ? 'badge-cyan' : note.category === 'MECE' ? 'badge-purple' : 'badge-emerald'}`}>
                    {note.category}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{note.updatedAt}</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {note.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, maxHeight: '2.8rem', overflow: 'hidden' }}>
                  {snippet}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
        {selectedNote ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>{selectedNote.category}</span>
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={e => handleSaveNote({ ...selectedNote, title: e.target.value })}
                  className="glass-input"
                  style={{ fontSize: '1.25rem', fontWeight: 700, padding: '0.25rem 0.5rem', border: 'none', background: 'transparent' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="glow-btn-secondary"
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {isEditing ? 'Preview Mode' : 'Edit Mode'}
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={selectedNote.content}
                onChange={e => handleSaveNote({ ...selectedNote, content: e.target.value })}
                className="glass-textarea"
                style={{ flex: 1, minHeight: '400px', fontSize: '0.9rem' }}
              />
            ) : (
              <div style={{ flex: 1, whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {selectedNote.content}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '6rem' }}>
            <BookOpen size={36} color="var(--text-dim)" />
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Select a note to view or edit</div>
          </div>
        )}
      </div>
    </div>
  );
}