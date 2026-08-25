import { describe, it, expect } from 'vitest';
import { parseRepositoryFiles } from '../../src/core/astParser';
import { InMemoryFTSEngine } from '../../src/core/ftsEngine';
import type { VaultNote } from '../../src/types';

describe('Performance Latency & Execution Benchmarks', () => {
  it('should parse 500 modules in under 150ms', () => {
    const files = Array.from({ length: 500 }, (_, i) => ({
      path: `src/module_${i}.ts`,
      content: `import { fn } from './module_${(i + 1) % 500}'; export function mod${i}() { return ${i}; }`
    }));

    const start = performance.now();
    const graph = parseRepositoryFiles(files);
    const latency = performance.now() - start;

    expect(graph.metrics.totalFiles).toBe(500);
    expect(latency).toBeLessThan(150);
  });

  it('should query 5,000 FTS notes in under 100ms on virtual runners', () => {
    const notes: VaultNote[] = Array.from({ length: 5000 }, (_, i) => ({
      id: `note-${i}`,
      title: `Engineering Specification Node #${i}`,
      category: 'DevLog',
      tags: ['performance', 'engine'],
      content: `Technical content for module ${i} optimizing token rank and latency.`,
      linkedSymbols: [],
      updatedAt: '2026-08-26'
    }));

    const fts = new InMemoryFTSEngine(notes);
    const start = performance.now();
    const results = fts.search('token rank');
    const latency = performance.now() - start;

    expect(results.length).toBe(5000);
    expect(latency).toBeLessThan(100);
  });
});
