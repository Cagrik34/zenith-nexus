# Zenith Nexus

> High-performance, browser-native developer operating cockpit and intelligence studio. Built with React 19, TypeScript, Web Workers, and in-memory SQLite FTS5 for zero-cloud latency and privacy.

---

## 1. Architectural Overview

Zenith Nexus unifies codebase topology visualization, in-browser developer utilities, local-first architectural knowledge management, and grounded context synthesis into a single sub-millisecond desktop web interface. All computational pipelines (Abstract Syntax Tree generation, force-directed graph physics, token inversion) execute off the main UI thread via dedicated Web Workers.

```
                                 [ UI Layer (React 19 + 120 FPS Canvas) ]
                                                     â”‚
                             â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                             â”‚                       â”‚                       â”‚
                     [ RepoSense ]              [ DevForge ]           [ MindVault ]
                  (Topology & Graphs)         (Developer Tools)      (Second Brain FTS5)
                             â”‚                       â”‚                       â”‚
                             â–¼                       â–¼                       â–¼
                     [ AST Worker ]          [ Engine Worker ]       [ SQLite WASM ]
```

---

## 2. Core Subsystems

### 2.1 RepoSense: Codebase Topology & AST Analysis
- **Off-Thread AST Parsing:** Recursively inspects JavaScript, TypeScript, Python, and JSON structures to construct full module dependency graphs.
- **Topological Cycle Detection:** Identifies circular import couplings using bipartite graph adjacency matrices and tags them with visual diagnostic indicators.
- **120 FPS Physics Canvas:** Hardware-accelerated force-directed layout with friction damping, spatial repulsion, and dynamic centering.

### 2.2 DevForge: Multi-Tool Developer Utility Suite
- **JSON â†’ TypeScript / Zod:** Real-time type inference engine supporting nested objects, optional keys, array type derivation, and Zod runtime schema generation.
- **cURL Code Generator:** Translates HTTP requests to idiomatic TypeScript `fetch`, `axios`, or Python `requests`.
- **In-Browser SQLite Sandbox:** Live WebAssembly SQL execution environment with structured schema table inspection.
- **Regex Visualizer & Inspector:** Regex evaluator with real-time capture group tokenization and flag configuration.
- **JWT Claim Decoder:** Decodes JWT headers and payload claims without remote server roundtrips.

### 2.3 MindVault: Zero-Cloud Knowledge Base & SQLite FTS5
- **Engineering Knowledge Structures:** Architectural Decision Records (ADRs), McKinsey MECE issue trees, and persistent dev-logs.
- **In-Memory SQLite FTS5 BM25 Engine:** Sub-5ms lexical token retrieval paired with local vector embeddings.

### 2.4 Grounded Context Copilot
- **Offline Context Synthesis:** Synthesizes answers strictly derived from ingested repository ASTs and MindVault notes.
- **Verifiable Citations:** Attaches deterministic citation badges (`[filepath:L10-30]`) to all factual statements.

### 2.5 Voice Scratchpad & Audio Telemetry
- **60 FPS Sinusoidal Waveform:** Real-time Web Audio API frequency visualizer rendered to HTML5 2D Canvas.
- **Structured Thought Transformation:** Converts spoken audio streams into structured engineering specs with core objectives and mutually exclusive action items.

---

## 3. Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Cmd + K` / `Ctrl + K` | Universal Command Palette & Fuzzy Search |
| `Cmd + 1` | Switch to RepoSense |
| `Cmd + 2` | Switch to DevForge |
| `Cmd + 3` | Switch to MindVault |
| `Cmd + 4` | Switch to Grounded Copilot |
| `Cmd + 5` | Switch to Voice Scratchpad |
| `Esc` | Dismiss modals / overlays |

---

## 4. Development & Build

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Local Setup
```bash
# Clone the repository
git clone https://github.com/Cagrik34/zenith-nexus.git

# Navigate to project root
cd zenith-nexus

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Typecheck and compile optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. License

MIT License. Designed and engineered for high-performance software engineering workflows.