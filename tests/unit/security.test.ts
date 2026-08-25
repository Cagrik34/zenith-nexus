import { describe, it, expect } from 'vitest';
import { parseRepositoryFiles } from '../../src/core/astParser';

describe('Security & Air-Gap Defense Layer', () => {
  it('should compute complexity without throwing on high branching density', () => {
    const deepCode = 'if (a) { while(b) { switch(c) { case 1: break; } } }'.repeat(50);
    const graph = parseRepositoryFiles([{ path: 'test.ts', content: deepCode }]);
    expect(graph.metrics.maintainabilityScore).toBeGreaterThanOrEqual(10);
    expect(graph.metrics.maintainabilityScore).toBeLessThanOrEqual(100);
  });
});
