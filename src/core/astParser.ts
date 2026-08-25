import type { ModuleNode, DependencyGraph, ModuleLink } from '../types';

export function parseRepositoryFiles(files: { path: string; content: string }[]): DependencyGraph {
  const nodes: ModuleNode[] = [];
  const links: ModuleLink[] = [];
  const fileMap = new Map<string, ModuleNode>();

  for (const file of files) {
    const filename = file.path.split('/').pop() || file.path;
    const lines = file.content.split('\n').length;
    
    let type: ModuleNode['type'] = 'utility';
    if (filename.includes('View') || filename.includes('Component') || filename.endsWith('.tsx') || filename.endsWith('.jsx')) {
      type = 'component';
    } else if (filename.startsWith('use') || filename.includes('hook')) {
      type = 'hook';
    } else if (filename.includes('worker') || filename.includes('Worker')) {
      type = 'worker';
    } else if (filename.includes('service') || filename.includes('api') || filename.includes('client')) {
      type = 'service';
    } else if (filename.includes('type') || filename.endsWith('.d.ts')) {
      type = 'type';
    } else if (filename.includes('config') || filename.includes('.json')) {
      type = 'config';
    }

    const complexityMatches = file.content.match(/(if|else|for|while|switch|case|\?\?|\?\.|\&\&|\|\|)/g);
    const complexity = Math.min(100, Math.max(5, (complexityMatches ? complexityMatches.length : 1) * 2 + Math.floor(lines / 20)));

    const importRegex = /(?:import\s+(?:[\w*\s{},]+)\s+from\s+['"]([^'"]+)['"])|(?:require\(['"]([^'"]+)['"]\))/g;
    const imports: string[] = [];
    let match;
    while ((match = importRegex.exec(file.content)) !== null) {
      const imp = match[1] || match[2];
      if (imp && (imp.startsWith('.') || imp.startsWith('/'))) {
        const cleanImp = imp.split('/').pop()?.replace(/\.[^/.]+$/, '') || imp;
        imports.push(cleanImp);
      }
    }

    const exportRegex = /export\s+(?:default\s+)?(?:class|function|const|let|var|type|interface|enum)\s+([a-zA-Z0-9_$]+)/g;
    const exports: string[] = [];
    while ((match = exportRegex.exec(file.content)) !== null) {
      if (match[1]) exports.push(match[1]);
    }

    const node: ModuleNode = {
      id: file.path,
      name: filename,
      path: file.path,
      type,
      lines,
      complexity,
      imports,
      exports
    };

    nodes.push(node);
    fileMap.set(filename.replace(/\.[^/.]+$/, ''), node);
    fileMap.set(file.path, node);
  }

  for (const node of nodes) {
    for (const imp of node.imports) {
      const target = fileMap.get(imp);
      if (target && target.id !== node.id) {
        links.push({
          source: node.id,
          target: target.id
        });
      }
    }
  }

  const adj = new Map<string, string[]>();
  for (const link of links) {
    if (!adj.has(link.source)) adj.set(link.source, []);
    adj.get(link.source)!.push(link.target);
  }

  let circularCount = 0;
  for (const link of links) {
    const targetTargets = adj.get(link.target) || [];
    if (targetTargets.includes(link.source)) {
      link.isCircular = true;
      circularCount++;
      const sourceNode = nodes.find(n => n.id === link.source);
      const targetNode = nodes.find(n => n.id === link.target);
      if (sourceNode) sourceNode.circularWith = [...(sourceNode.circularWith || []), link.target];
      if (targetNode) targetNode.circularWith = [...(targetNode.circularWith || []), link.source];
    }
  }

  const totalLines = nodes.reduce((sum, n) => sum + n.lines, 0);
  const avgComplexity = nodes.length > 0 ? nodes.reduce((sum, n) => sum + n.complexity, 0) / nodes.length : 0;
  const maintainabilityScore = Math.max(10, Math.min(100, Math.round(100 - avgComplexity * 0.7 - circularCount * 5)));

  return {
    nodes,
    links,
    metrics: {
      totalFiles: nodes.length,
      totalLines,
      totalImports: links.length,
      circularCount: Math.floor(circularCount / 2),
      maintainabilityScore
    }
  };
}