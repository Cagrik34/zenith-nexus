import React, { useState, useEffect, useRef } from 'react';
import { parseRepositoryFiles } from '../../core/astParser';
import { SAMPLE_ZENITH_CODEBASE } from '../../core/sampleRepos';
import type { ModuleNode, DependencyGraph } from '../../types';
import { AlertTriangle, FileCode, Search, RefreshCw, ZoomIn, ZoomOut, Eye } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.py', '.css', '.html', '.md', '.sql', '.rs', '.go'];
const IGNORED_PATHS = ['node_modules', '.git', 'dist', 'build', '.next', '.vscode'];
const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB limit per file to prevent memory exhaustion

export function RepoSenseView() {
  const [graph, setGraph] = useState<DependencyGraph>(() => parseRepositoryFiles(SAMPLE_ZENITH_CODEBASE));
  const [selectedNode, setSelectedNode] = useState<ModuleNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const simNodesRef = useRef<{ id: string; x: number; y: number; vx: number; vy: number; radius: number; color: string }[]>([]);

  useEffect(() => {
    const colors: Record<string, string> = {
      component: '#00f2fe',
      hook: '#818cf8',
      utility: '#34d399',
      service: '#fbbf24',
      type: '#c084fc',
      worker: '#fb7185',
      config: '#94a3b8'
    };

    const width = 800;
    const height = 500;

    simNodesRef.current = graph.nodes.map((node, i) => {
      const angle = (i / graph.nodes.length) * Math.PI * 2;
      const radius = 180 + Math.sin(i) * 50;
      return {
        id: node.id,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: Math.max(12, Math.min(26, Math.sqrt(node.lines) * 2.5)),
        color: colors[node.type] || '#38bdf8'
      };
    });
  }, [graph]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      const simNodes = simNodesRef.current;
      const nodeMap = new Map(simNodes.map(n => [n.id, n]));

      for (let i = 0; i < simNodes.length; i++) {
        const n1 = simNodes[i];
        n1.vx += (canvas.width / 2 - n1.x) * 0.0005;
        n1.vy += (canvas.height / 2 - n1.y) * 0.0005;

        for (let j = i + 1; j < simNodes.length; j++) {
          const n2 = simNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 200) {
            const force = (200 - dist) / dist * 0.08;
            n1.vx -= dx * force;
            n1.vy -= dy * force;
            n2.vx += dx * force;
            n2.vy += dy * force;
          }
        }
      }

      for (const link of graph.links) {
        const s = nodeMap.get(link.source);
        const t = nodeMap.get(link.target);
        if (s && t) {
          const dx = t.x - s.x;
          const dy = t.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = link.isCircular ? 80 : 130;
          const force = (dist - targetDist) * 0.003;
          s.vx += dx * force;
          s.vy += dy * force;
          t.vx -= dx * force;
          t.vy -= dy * force;
        }
      }

      for (const n of simNodes) {
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;
      }

      for (const link of graph.links) {
        const s = nodeMap.get(link.source);
        const t = nodeMap.get(link.target);
        if (s && t) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          if (link.isCircular) {
            ctx.strokeStyle = 'rgba(251, 113, 133, 0.7)';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([4, 4]);
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      for (const simNode of simNodes) {
        const rawNode = graph.nodes.find(n => n.id === simNode.id);
        const isSelected = selectedNode?.id === simNode.id;
        const isCircular = (rawNode?.circularWith?.length || 0) > 0;
        const isMatch = !searchQuery || rawNode?.name.toLowerCase().includes(searchQuery.toLowerCase());

        ctx.beginPath();
        ctx.arc(simNode.x, simNode.y, simNode.radius, 0, Math.PI * 2);

        ctx.fillStyle = isMatch ? simNode.color : 'rgba(255,255,255,0.05)';
        ctx.shadowColor = isSelected ? '#00f2fe' : (isCircular ? '#fb7185' : simNode.color);
        ctx.shadowBlur = isSelected ? 24 : (isCircular ? 16 : 8);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.strokeStyle = isSelected ? '#ffffff' : (isCircular ? '#fb7185' : 'rgba(255,255,255,0.4)');
        ctx.stroke();

        if (isMatch) {
          ctx.font = '11px Inter, sans-serif';
          ctx.fillStyle = isSelected ? '#00f2fe' : '#e2e8f0';
          ctx.textAlign = 'center';
          ctx.fillText(rawNode?.name || '', simNode.x, simNode.y + simNode.radius + 14);
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [graph, selectedNode, searchQuery, zoom]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - canvas.width / 2) / zoom + canvas.width / 2;
    const clickY = (e.clientY - rect.top - canvas.height / 2) / zoom + canvas.height / 2;

    for (const simNode of simNodesRef.current) {
      const dx = clickX - simNode.x;
      const dy = clickY - simNode.y;
      if (Math.sqrt(dx * dx + dy * dy) <= simNode.radius + 6) {
        const raw = graph.nodes.find(n => n.id === simNode.id) || null;
        setSelectedNode(raw);
        return;
      }
    }
    setSelectedNode(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Filter valid text code files within size limits
    const validFiles = Array.from(files).filter(file => {
      const path = (file.webkitRelativePath || file.name).toLowerCase();
      if (IGNORED_PATHS.some(p => path.includes(`/${p}/`) || path.startsWith(`${p}/`))) return false;
      if (file.size > MAX_FILE_SIZE_BYTES) return false;
      return ALLOWED_EXTENSIONS.some(ext => path.endsWith(ext));
    });

    if (validFiles.length === 0) return;

    const parsedList: { path: string; content: string }[] = [];
    let readCount = 0;

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        parsedList.push({ path: file.webkitRelativePath || file.name, content: text });
        readCount++;
        if (readCount === validFiles.length) {
          const newGraph = parseRepositoryFiles(parsedList);
          setGraph(newGraph);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)', padding: '1.25rem', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.85rem' }}>
        <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Modules</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{graph.metrics.totalFiles}</div>
        </div>
        <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Code Lines</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{graph.metrics.totalLines.toLocaleString()}</div>
        </div>
        <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Dependency Links</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-indigo)' }}>{graph.metrics.totalImports}</div>
        </div>
        <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Circular Rings</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: graph.metrics.circularCount > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
            {graph.metrics.circularCount}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Health Index</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
            {graph.metrics.maintainabilityScore}/100
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '1rem', minHeight: 0 }}>
        <div className="glass-panel" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(7, 9, 14, 0.6)',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: 10 }} />
                <input
                  type="text"
                  placeholder="Filter nodes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.8rem' }}
                />
              </div>

              <label className="glow-btn-secondary" style={{ height: '34px', padding: '0 0.85rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                <FileCode size={14} /> Ingest Folder / Files
                <input
                  type="file"
                  multiple
                  // @ts-ignore
                  webkitdirectory=""
                  directory=""
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button className="glow-btn-secondary" onClick={() => setZoom(z => Math.max(0.4, z - 0.15))} style={{ padding: '0.4rem 0.6rem' }}>
                <ZoomOut size={14} />
              </button>
              <button className="glow-btn-secondary" onClick={() => setZoom(z => Math.min(2.5, z + 0.15))} style={{ padding: '0.4rem 0.6rem' }}>
                <ZoomIn size={14} />
              </button>
              <button className="glow-btn-secondary" onClick={() => { setZoom(1); setGraph(parseRepositoryFiles(SAMPLE_ZENITH_CODEBASE)); }} style={{ padding: '0.4rem 0.6rem' }}>
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={900}
            height={550}
            onClick={handleCanvasClick}
            style={{ width: '100%', height: '100%', cursor: 'crosshair', display: 'block' }}
          />

          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            display: 'flex',
            gap: '0.6rem',
            background: 'rgba(7, 9, 14, 0.85)',
            border: '1px solid var(--border-glass)',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.72rem'
          }}>
            <span style={{ color: '#00f2fe' }}>●  Component</span>
            <span style={{ color: '#818cf8' }}>●  Hook</span>
            <span style={{ color: '#34d399' }}>●  Utility</span>
            <span style={{ color: '#fbbf24' }}>●  Service</span>
            <span style={{ color: '#fb7185' }}>●  Worker</span>
          </div>
        </div>

        <div className="glass-panel" style={{ width: '320px', padding: '1.25rem', overflowY: 'auto' }}>
          {selectedNode ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className={`badge badge-cyan`}>{selectedNode.type}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedNode.lines} lines</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {selectedNode.name}
              </h3>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', wordBreak: 'break-all', marginBottom: '1rem' }}>
                {selectedNode.path}
              </div>

              {selectedNode.circularWith && selectedNode.circularWith.length > 0 && (
                <div style={{
                  background: 'rgba(251, 113, 133, 0.1)',
                  border: '1px solid rgba(251, 113, 133, 0.3)',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '0.78rem',
                  color: 'var(--accent-rose)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                    <AlertTriangle size={14} /> Circular Dependency Warning
                  </div>
                  <div style={{ marginTop: '0.25rem', fontSize: '0.72rem' }}>
                    Coupled with: {selectedNode.circularWith.join(', ')}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Imports ({selectedNode.imports.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {selectedNode.imports.length === 0 ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None (Root Module)</span>
                  ) : (
                    selectedNode.imports.map(imp => (
                      <span key={imp} style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {imp}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Exports ({selectedNode.exports.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {selectedNode.exports.length === 0 ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None</span>
                  ) : (
                    selectedNode.exports.map(exp => (
                      <span key={exp} style={{ background: 'rgba(0, 242, 254, 0.08)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                        {exp}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '4rem' }}>
              <Eye size={32} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Select a Module</div>
              <div style={{ fontSize: '0.78rem', marginTop: '0.35rem' }}>
                Click any node in the topology graph to inspect imports, exports, and circular couplings.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}