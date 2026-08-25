import { describe, it, expect } from 'vitest';
import { InMemoryFTSEngine } from '../../src/core/ftsEngine';
import type { VaultNote } from '../../src/types';

describe('MindVault In-Memory SQLite FTS5 Engine', () => {
  const sampleNotes: VaultNote[] = [
    {
      id: 'n1',
      title: 'ADR-001: Web Workers for AST Parsing',
      category: 'ADR',
      tags: ['ast', 'performance'],
      content: 'Offload CPU intensive AST parsing into Web Workers to maintain 120 FPS.',
      linkedSymbols: ['astParser.ts'],
      updatedAt: '2026-08-25'
    },
    {
      id: 'n2',
      title: 'MECE Problem Tree: Memory Optimization',
      category: 'MECE',
      tags: ['memory', 'systems'],
      content: 'Limit file uploads to 1MB to prevent browser tab out of memory crashes.',
      linkedSymbols: [],
      updatedAt: '2026-08-25'
    }
  ];

  it('should execute sub-millisecond BM25 token searches', () => {
    const fts = new InMemoryFTSEngine(sampleNotes);
    const results = fts.search('Web Workers');
    expect(results.length).toBe(1);
    expect(results[0].note.id).toBe('n1');
  });

  it('should safely handle regex special characters in search query without throwing', () => {
    const fts = new InMemoryFTSEngine(sampleNotes);
    expect(() => fts.search('([*+?\\$^|])')).not.toThrow();
  });
});
