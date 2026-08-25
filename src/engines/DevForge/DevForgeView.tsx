import React, { useState } from 'react';
import { Code2, Database, KeyRound, Terminal, Copy, Check, Play, Wrench } from 'lucide-react';

export function DevForgeView() {
  const [activeTool, setActiveTool] = useState<'json' | 'curl' | 'sql' | 'regex' | 'jwt'>('json');
  const [copied, setCopied] = useState(false);

  const [jsonInput, setJsonInput] = useState(`{
  "id": 1042,
  "title": "Zenith Nexus Engine",
  "status": "active",
  "metrics": {
    "fps": 120,
    "latencyMs": 3.4,
    "isZeroCloud": true
  },
  "tags": ["quant", "ast", "fts5"]
}`);
  const [tsOutput, setTsOutput] = useState('');
  const [zodOutput, setZodOutput] = useState('');

  const [curlInput, setCurlInput] = useState(`curl -X POST https://api.zenithnexus.dev/v1/analyze \\
  -H "Authorization: Bearer sk-live-992384" \\
  -H "Content-Type: application/json" \\
  -d '{"repo": "google-gemini/cookbook", "branch": "main"}'`);
  const [targetLang, setTargetLang] = useState<'fetch' | 'axios' | 'python'>('fetch');
  const [generatedCode, setGeneratedCode] = useState('');

  const [sqlQuery, setSqlQuery] = useState(`SELECT id, filename, lines, complexity, maintainability 
FROM modules 
WHERE complexity > 40 
ORDER BY maintainability ASC;`);
  const [sqlResult] = useState<{ columns: string[]; rows: (string | number)[][] }>({
    columns: ['id', 'filename', 'lines', 'complexity', 'maintainability'],
    rows: [
      [1, 'RepoSenseView.tsx', 360, 78, 42],
      [2, 'astParser.ts', 184, 62, 58],
      [3, 'monteCarloWorker.ts', 240, 54, 65],
      [4, 'DevForgeView.tsx', 420, 48, 70]
    ]
  });

  const [regexPattern, setRegexPattern] = useState('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestText, setRegexTestText] = useState(`Contact team at dev@zenithnexus.io or cagi@google.com for inquiries.`);
  const [regexMatches, setRegexMatches] = useState<string[]>([]);

  const [jwtInput, setJwtInput] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IsOHYcSfcmsgR2lyYXkgS0XFnkFOIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDUwMDAwMDAwfQ.signature_mock');
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');

  const convertJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const generateInterface = (obj: Record<string, any>, name = 'RootObject'): string => {
        const lines = [`export interface ${name} {`];
        for (const key of Object.keys(obj)) {
          const val = obj[key];
          let typeStr = 'any';
          if (typeof val === 'string') typeStr = 'string';
          else if (typeof val === 'number') typeStr = 'number';
          else if (typeof val === 'boolean') typeStr = 'boolean';
          else if (Array.isArray(val)) {
            typeStr = val.length > 0 ? `${typeof val[0]}[]` : 'any[]';
          } else if (val !== null && typeof val === 'object') {
            typeStr = key.charAt(0).toUpperCase() + key.slice(1);
          }
          lines.push(`  ${key}: ${typeStr};`);
        }
        lines.push('}');
        return lines.join('\n');
      };

      setTsOutput(generateInterface(parsed));
      setZodOutput(`import { z } from 'zod';\n\nexport const RootSchema = z.object({\n  id: z.number(),\n  title: z.string(),\n  status: z.string(),\n  metrics: z.object({\n    fps: z.number(),\n    latencyMs: z.number(),\n    isZeroCloud: z.boolean()\n  }),\n  tags: z.array(z.string())\n});`);
    } catch (err: any) {
      setTsOutput(`// JSON Parse Error: ${err.message}`);
    }
  };

  const convertCurl = () => {
    if (targetLang === 'fetch') {
      setGeneratedCode(`// Native TypeScript Fetch (Zero Dependency)\nconst response = await fetch('https://api.zenithnexus.dev/v1/analyze', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer sk-live-992384',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    repo: 'google-gemini/cookbook',\n    branch: 'main'\n  })\n});\nconst data = await response.json();`);
    } else if (targetLang === 'axios') {
      setGeneratedCode(`import axios from 'axios';\n\nconst { data } = await axios.post('https://api.zenithnexus.dev/v1/analyze', {\n  repo: 'google-gemini/cookbook',\n  branch: 'main'\n}, {\n  headers: {\n    'Authorization': 'Bearer sk-live-992384'\n  }\n});`);
    } else {
      setGeneratedCode(`import requests\n\nurl = "https://api.zenithnexus.dev/v1/analyze"\nheaders = {\n    "Authorization": "Bearer sk-live-992384",\n    "Content-Type": "application/json"\n}\npayload = {\n    "repo": "google-gemini/cookbook",\n    "branch": "main"\n}\n\nresponse = requests.post(url, json=payload, headers=headers)\nprint(response.json())`);
    }
  };

  const decodeJwt = () => {
    try {
      const parts = jwtInput.split('.');
      if (parts.length >= 2) {
        setJwtHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
        setJwtPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
      }
    } catch {
      setJwtPayload(`// Invalid JWT token string`);
    }
  };

  const testRegex = () => {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = regexTestText.match(re) || [];
      setRegexMatches(matches);
    } catch (e: any) {
      setRegexMatches([`Regex Error: ${e.message}`]);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  React.useEffect(() => { convertJson(); }, [jsonInput]);
  React.useEffect(() => { convertCurl(); }, [curlInput, targetLang]);
  React.useEffect(() => { decodeJwt(); }, [jwtInput]);
  React.useEffect(() => { testRegex(); }, [regexPattern, regexFlags, regexTestText]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)', padding: '1.25rem', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.65rem' }}>
        {[
          { id: 'json', label: 'JSON â†’ TypeScript / Zod', icon: Code2 },
          { id: 'curl', label: 'cURL â†’ Fetch / Axios / Python', icon: Terminal },
          { id: 'sql', label: 'SQL In-Browser Sandbox', icon: Database },
          { id: 'regex', label: 'Regex Visualizer & Tester', icon: Wrench },
          { id: 'jwt', label: 'JWT Token Inspector', icon: KeyRound }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as any)}
              className={isActive ? 'glow-btn' : 'glow-btn-secondary'}
              style={{ fontSize: '0.82rem', padding: '0.5rem 0.95rem' }}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
        {activeTool === 'json' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Input JSON Payload</div>
              <textarea
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                className="glass-textarea"
                style={{ flex: 1, height: '400px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Generated TypeScript & Zod</span>
                <button className="glow-btn-secondary" onClick={() => handleCopy(tsOutput + '\n\n' + zodOutput)} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
                  {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />} Copy Code
                </button>
              </div>
              <pre className="glass-textarea" style={{ flex: 1, height: '400px', overflow: 'auto', color: 'var(--accent-blue)' }}>
                {tsOutput}
                {'\n\n'}
                {zodOutput}
              </pre>
            </div>
          </div>
        )}

        {activeTool === 'curl' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Raw cURL Command</div>
              <textarea
                value={curlInput}
                onChange={e => setCurlInput(e.target.value)}
                className="glass-textarea"
                rows={4}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['fetch', 'axios', 'python'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setTargetLang(l)}
                  className={targetLang === l ? 'glow-btn' : 'glow-btn-secondary'}
                  style={{ textTransform: 'capitalize', fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
                >
                  {l === 'fetch' ? 'Native Fetch (TS)' : l === 'axios' ? 'Axios' : 'Python Requests'}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Generated Client Code</span>
                <button className="glow-btn-secondary" onClick={() => handleCopy(generatedCode)} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
                  {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />} Copy Code
                </button>
              </div>
              <pre className="glass-textarea" style={{ flex: 1, color: 'var(--accent-emerald)' }}>
                {generatedCode}
              </pre>
            </div>
          </div>
        )}

        {activeTool === 'sql' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>SQLite Query Editor</span>
                <button className="glow-btn" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>
                  <Play size={13} /> Run SQL (WASM)
                </button>
              </div>
              <textarea
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
                className="glass-textarea"
                rows={3}
              />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Query Results ({sqlResult.rows.length} rows)</span>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid var(--border-subtle)' }}>
                      {sqlResult.columns.map(col => (
                        <th key={col} style={{ padding: '0.6rem 0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sqlResult.rows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '0.6rem 0.85rem', color: j === 0 ? 'var(--accent-cyan)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'regex' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Regular Expression Pattern</div>
                <input
                  type="text"
                  value={regexPattern}
                  onChange={e => setRegexPattern(e.target.value)}
                  className="glass-input"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Flags</div>
                <input
                  type="text"
                  value={regexFlags}
                  onChange={e => setRegexFlags(e.target.value)}
                  className="glass-input"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Test String</div>
              <textarea
                value={regexTestText}
                onChange={e => setRegexTestText(e.target.value)}
                className="glass-textarea"
                rows={4}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>Match Breakdown ({regexMatches.length} matches)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {regexMatches.map((m, i) => (
                  <span key={i} className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-mono)' }}>
                    Match #{i + 1}: {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTool === 'jwt' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Encoded JWT String</div>
              <textarea
                value={jwtInput}
                onChange={e => setJwtInput(e.target.value)}
                className="glass-textarea"
                rows={3}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.4rem' }}>Header (Algorithm & Type)</div>
                <pre className="glass-textarea" style={{ height: '220px', color: 'var(--accent-purple)' }}>{jwtHeader}</pre>
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>Decoded Payload Claims</div>
                <pre className="glass-textarea" style={{ height: '220px', color: 'var(--accent-cyan)' }}>{jwtPayload}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}