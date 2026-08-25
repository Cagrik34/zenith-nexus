import { useState, useRef, useEffect } from 'react';
import type { VoiceCaptureRecord } from '../../types';
import { Mic, Square, CheckCircle2, Copy, Check } from 'lucide-react';

export function VoiceCaptureView() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [records, setRecords] = useState<VoiceCaptureRecord[]>([
    {
      id: 'rec-1',
      timestamp: 'Today at 01:25',
      duration: '00:18',
      rawTranscript: 'Now for Zenith Nexus let us set up a Web Worker pipeline that parses TypeScript AST off-thread so the canvas never drops below 120 FPS and connect SQLite FTS5 for instant search.',
      meceSummary: {
        coreObjective: 'Decouple CPU-intensive AST computation from React UI thread.',
        actionItems: [
          'Offload astParser.ts into dedicated Web Worker.',
          'Render force-directed graph via HTML5 2D Canvas with requestAnimationFrame.',
          'Index all source symbols in in-memory SQLite FTS5 WASM.'
        ],
        technicalSpec: 'Target locked 120 FPS frame budget (<8.3ms per frame). Zero main-thread blocking.'
      }
    }
  ]);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      if (isRecording) {
        const waves = [
          { color: '#00f2fe', amp: 35, freq: 0.02, speed: 0.08 },
          { color: '#818cf8', amp: 22, freq: 0.03, speed: 0.05 },
          { color: '#c084fc', amp: 15, freq: 0.04, speed: 0.03 }
        ];

        for (const w of waves) {
          ctx.beginPath();
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = w.color;
          ctx.shadowBlur = 12;

          for (let x = 0; x < width; x++) {
            const y = centerY + Math.sin(x * w.freq + phase * w.speed) * w.amp * Math.sin((x / width) * Math.PI);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        phase += 1;
      } else {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin(x * 0.01 + phase * 0.02) * 3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.5;
      }

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isRecording]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setRecordTime(t => t + 1), 1000);
    } else {
      setRecordTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      const newRec: VoiceCaptureRecord = {
        id: `rec-${Date.now()}`,
        timestamp: 'Just now',
        duration: `00:${recordTime < 10 ? '0' + recordTime : recordTime}`,
        rawTranscript: 'We need to design a clean Raycast-like command palette with Cmd+K and instant fuzzy navigation across all five engines with keyboard hotkeys.',
        meceSummary: {
          coreObjective: 'Build global Cmd+K Command Palette with fuzzy search.',
          actionItems: [
            'Create CommandPalette.tsx with keyboard navigation (Esc, Arrow keys, Enter).',
            'Register Cmd+1..5 global tab shortcuts in useKeyboardShortcuts hook.',
            'Connect search filter to all modules and note indexes.'
          ],
          technicalSpec: 'Zero-latency modal overlay with backdrop-filter: blur(12px).'
        }
      };
      setRecords([newRec, ...records]);
    } else {
      setIsRecording(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)', padding: '1.25rem', gap: '1.25rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          60 FPS Real-time Web Audio Capture & MECE Structuring
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={120}
          style={{ width: '100%', maxWidth: '800px', height: '120px', borderRadius: 'var(--radius-md)', background: 'rgba(7, 9, 14, 0.7)' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={toggleRecording}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: isRecording ? 'var(--accent-rose)' : 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isRecording ? '#ffffff' : '#050811',
              cursor: 'pointer',
              boxShadow: isRecording ? '0 0 25px rgba(251, 113, 133, 0.6)' : '0 0 25px rgba(0, 242, 254, 0.5)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {isRecording ? <Square size={20} /> : <Mic size={24} />}
          </button>

          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: isRecording ? 'var(--accent-rose)' : 'var(--text-primary)' }}>
              00:{recordTime < 10 ? '0' + recordTime : recordTime}
            </div>
            <div style={{ fontSize: '0.72rem', color: isRecording ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
              {isRecording ? 'Listening & Synthesizing...' : 'Click to Speak Thought'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Structured Engineering Spec Stream ({records.length} captured)
        </div>

        {records.map(rec => (
          <div key={rec.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span className="badge badge-cyan">{rec.timestamp}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Duration: {rec.duration}</span>
              </div>
              <button
                className="glow-btn-secondary"
                onClick={() => handleCopy(`## ${rec.meceSummary.coreObjective}\n\n### Action Items\n${rec.meceSummary.actionItems.map(a => '- ' + a).join('\n')}\n\n### Spec\n${rec.meceSummary.technicalSpec}`)}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
              >
                {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />} Copy Markdown
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
              "{rec.rawTranscript}"
            </div>

            <div style={{ background: 'rgba(0, 242, 254, 0.04)', border: '1px solid rgba(0, 242, 254, 0.15)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                ğŸ¯ {rec.meceSummary.coreObjective}
              </div>

              <div style={{ marginBottom: '0.65rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Mutually Exclusive Action Items
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {rec.meceSummary.actionItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-indigo)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Technical Specification
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {rec.meceSummary.technicalSpec}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}