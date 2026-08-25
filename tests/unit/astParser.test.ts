import { describe, it, expect } from 'vitest';
import { parseRepositoryFiles } from '../../src/core/astParser';

describe('RepoSense AST Module Engine', () => {
  it('should accurately parse imports, exports, and module types', () => {
    const files = [
      {
        path: 'src/components/Button.tsx',
        content: `
          import React from 'react';
          import { useTheme } from '../hooks/useTheme';
          export function Button() { return <button />; }
        `
      },
      {
        path: 'src/hooks/useTheme.ts',
        content: `
          export function useTheme() { return 'dark'; }
        `
      }
    ];

    const graph = parseRepositoryFiles(files);
    expect(graph.metrics.totalFiles).toBe(2);
    expect(graph.nodes[0].type).toBe('component');
    expect(graph.nodes[1].type).toBe('hook');
    expect(graph.links.length).toBe(1);
    expect(graph.metrics.circularCount).toBe(0);
  });

  it('should detect circular dependency rings between coupled modules', () => {
    const files = [
      {
        path: 'src/moduleA.ts',
        content: `import { b } from './moduleB'; export const a = 1;`
      },
      {
        path: 'src/moduleB.ts',
        content: `import { a } from './moduleA'; export const b = 2;`
      }
    ];

    const graph = parseRepositoryFiles(files);
    expect(graph.metrics.circularCount).toBe(1);
    expect(graph.links[0].isCircular).toBe(true);
  });
});
