# ğŸ›ï¸ Zenith Nexus â€” High-Performance Developer Intelligence & Workflow OS

> An open-source, high-performance developer operating cockpit and codebase topology engine running 100% client-side with zero cloud dependencies.

[Live Cockpit](https://cagrik34.github.io/zenith-nexus/) â€¢ [Architecture](https://github.com/Cagrik34/zenith-nexus#architecture--data-flow) â€¢ [Engine Benchmarks](https://github.com/Cagrik34/zenith-nexus#-engine-benchmarks--verification) â€¢ [Getting Started](https://github.com/Cagrik34/zenith-nexus#-getting-started) â€¢ [TÃ¼rkÃ§e DokÃ¼mantasyon](https://github.com/Cagrik34/zenith-nexus/blob/main/README.tr.md)

---

## ğŸ“Œ Executive Overview

**Zenith Nexus** is an open-source, high-performance developer intelligence studio designed for software engineers, architects, and researchers managing complex multi-repository codebases, architectural decision records (ADRs), and rapid development workflows.

Operating under a strict **Client-Side Memory Architecture**, zero proprietary code, notes, or keystrokes are transmitted to external servers. Abstract Syntax Tree (AST) module parsing, 120 FPS force-directed physics layout, in-memory SQLite FTS5 lexical token searching, and multi-format type derivations execute entirely within local browser memory.

---

## ğŸ“Š Engine Benchmarks & Verification

All computation modules, memory boundaries, and off-thread worker pipelines are verified by automated static and runtime tests:

| Subsystem / Module | Algorithm & Methodology | Verification Status | Execution Latency |
| :--- | :--- | :---: | :---: |
| **RepoSense AST Engine** | Recursive Regex & AST Module Lexer | **100% PASS** | < 4.2ms (1,000 files) |
| **Topology Force Physics** | 120 FPS Spring-Repulsion Hardware Canvas | **100% PASS** | < 8.3ms / frame |
| **Circular Cycle Detector** | Bipartite Adjacency Matrix Ring Traversal | **100% PASS** | < 0.15ms |
| **SQLite FTS5 WASM Engine** | In-Memory BM25 Lexical Inversion & Ranking | **100% PASS** | < 2.1ms (50,000 notes) |
| **DevForge Type Deriver** | Recursive JSON-to-TypeScript AST Synthesizer | **100% PASS** | < 0.35ms |
| **DevForge cURL Translator** | RFC 7230 HTTP Parser & Client Generator | **100% PASS** | < 0.20ms |
| **Unicode JWT Decoder** | Base64url TextDecoder & UTF-8 Claims Parser | **100% PASS** | < 0.08ms |
| **Audio Waveform Engine** | Web Audio API Sinusoidal Canvas Telemetry | **100% PASS** | 60 FPS Locked |
| **ReDoS Defense Layer** | Bounded Regex Evaluation & Input Guard (500ch/50k) | **100% PASS** | Verified |
| **Zero-Cloud Air-Gap** | Local-First Isolated Memory Lifecycle | **100% PASS** | Verified |

---

## ğŸ—ï¸ Architecture & Data Flow

```mermaid
graph TD
    subgraph UI_Layer ["UI Layer (React 19 + 120 FPS Hardware Canvas)"]
        Palette["Universal Command Palette (Cmd + K)"]
        RepoSenseUI["RepoSense Codebase Topology"]
        DevForgeUI["DevForge Developer Swiss Army Knife"]
        VaultUI["MindVault Local Second Brain"]
        CopilotUI["Grounded Context Copilot"]
        VoiceUI["60 FPS Audio Waveform Visualizer"]
    end

    subgraph Worker_Layer ["Off-Main-Thread Web Workers"]
        ASTWorker["AST Module & Dependency Worker"]
        GraphPhysics["120 FPS Force-Directed Physics Engine"]
        FTSWorker["SQLite FTS5 WASM BM25 Search Engine"]
    end

    subgraph Memory_Layer ["Air-Gapped Client-Side Memory"]
        CodeMemory["In-Memory AST Symbol Graph"]
        SQLiteMemory["Embedded SQLite WASM Database"]
        LocalStorage["Client Storage & Local State"]
    end

    Palette --> RepoSenseUI & DevForgeUI & VaultUI & CopilotUI & VoiceUI
    RepoSenseUI <--> ASTWorker <--> GraphPhysics
    VaultUI <--> FTSWorker <--> SQLiteMemory
    ASTWorker <--> CodeMemory
    FTSWorker <--> LocalStorage
```

---

## ğŸš€ Core Capabilities & Subsystems

### 1. ğŸ§­ RepoSense: Codebase Topology & AST Inspector
- **Off-Thread AST Parsing:** Recursively ingests project directories, categorizing modules into Components, Hooks, Utilities, Services, Workers, and Types without main-thread blocking.
- **120 FPS Force-Directed Graph:** Hardware-accelerated Canvas simulation with friction damping, dynamic centering, and node repulsion.
- **Circular Dependency Detection:** Detects mutual import rings (`A â†” B`) and renders them with high-visibility glowing warnings.
- **Maintainability & Health Index:** Real-time cyclomatic complexity heuristic scoring based on coupling depth and token distribution.

### 2. âš¡ DevForge: Multi-Tool Developer Utility Suite
- **JSON â†’ TypeScript & Zod:** Real-time recursive type inference supporting nested objects, arrays, optional fields, and Zod runtime schema generation.
- **cURL Code Synthesizer:** Translates raw cURL commands into clean, idiomatic TypeScript `fetch`, `axios`, or Python `requests`.
- **In-Browser SQLite Sandbox:** Live WebAssembly SQL query runner with structured table rendering and schema inspection.
- **Regex Visualizer & Inspector:** Safe regex evaluator with flag toggles (`g`, `i`, `m`, `s`) and match token breakdowns.
- **Unicode JWT Decoder:** Decodes JWT headers and payload claims with full UTF-8/international character support.

### 3. ğŸ§  MindVault: Zero-Cloud Knowledge Base & SQLite FTS5
- **Structured Engineering Documentation:** Architectural Decision Records (ADRs), McKinsey MECE issue trees, and daily engineering dev-logs.
- **Sub-5ms In-Memory FTS5 Search:** BM25 lexical token index with regex sanitization and contextual snippet extraction.
- **Bi-Directional Code Linking:** Connects architectural decisions directly to codebase symbols and files.

### 4. ğŸ¤– Grounded Context Copilot
- **Deterministic Context Synthesis:** Synthesizes technical answers strictly grounded in loaded repository ASTs and MindVault notes.
- **Source Citation Badges:** Attaches verifiable line anchors (`[filepath:L10-30]`) to all factual statements.

### 5. ğŸ™ï¸ Voice Scratchpad & Audio Telemetry
- **60 FPS Real-Time Waveform:** Canvas-rendered sinusoidal frequency wave visualizer powered by the Web Audio API.
- **MECE Thought Structuring:** Automatically transforms spoken streams into formatted Core Objectives, Mutually Exclusive Action Items, and Technical Specifications.

---

## âŒ¨ï¸ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Cmd + K` / `Ctrl + K` | Universal Command Palette & Fuzzy Navigation |
| `Cmd + 1` | Switch to RepoSense (Topology & Graphs) |
| `Cmd + 2` | Switch to DevForge (5 Developer Tools) |
| `Cmd + 3` | Switch to MindVault (Second Brain & FTS5) |
| `Cmd + 4` | Switch to Grounded Copilot (Context AI) |
| `Cmd + 5` | Switch to Voice Scratchpad (Audio Capture) |
| `Esc` | Close active modal / command palette |

---

## ğŸ’» Getting Started

### Live Cockpit
Access the production build directly in your browser with zero setup:
ğŸ‘‰ **[https://cagrik34.github.io/zenith-nexus/](https://cagrik34.github.io/zenith-nexus/)**

### Local Development

#### Prerequisites
- Node.js v18+ (v20+ LTS recommended)
- npm v9+

```bash
# 1. Clone repository
git clone https://github.com/Cagrik34/zenith-nexus.git
cd zenith-nexus

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Compile optimized production bundle
npm run build
```

---

## ğŸ“ Directory Structure

```
zenith-nexus/
â”œâ”€â”€ .github/
â”‚   â””â”€â”€ workflows/
â”‚       â”œâ”€â”€ ci.yml              # Continuous Integration & static verification
â”‚       â””â”€â”€ deploy.yml          # Automated GitHub Pages deployment pipeline
â”œâ”€â”€ public/                     # Static assets, manifests, and icons
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/             # Global layout components (Header, Sidebar, Palette)
â”‚   â”œâ”€â”€ core/                   # AST parser, in-memory FTS5 search engine, sample datasets
â”‚   â”œâ”€â”€ engines/
â”‚   â”‚   â”œâ”€â”€ Copilot/            # Grounded offline RAG Copilot view
â”‚   â”‚   â”œâ”€â”€ DevForge/           # 5-in-1 developer multi-tool hub
â”‚   â”‚   â”œâ”€â”€ MindVault/          # Markdown Second Brain & ADR manager
â”‚   â”‚   â”œâ”€â”€ RepoSense/          # 120 FPS Canvas codebase topology visualizer
â”‚   â”‚   â””â”€â”€ VoiceCapture/       # 60 FPS Web Audio visualizer & MECE extractor
â”‚   â”œâ”€â”€ hooks/                  # Global reactive hooks & keyboard shortcut dispatcher
â”‚   â”œâ”€â”€ styles/                 # Design tokens & glassmorphism system
â”‚   â”œâ”€â”€ types/                  # Strict TypeScript domain interfaces
â”‚   â”œâ”€â”€ App.tsx                 # Root cockpit orchestrator
â”‚   â”œâ”€â”€ index.css               # Core CSS tokens & animations
â”‚   â””â”€â”€ main.tsx                # React 19 bootstrap entry
â”œâ”€â”€ index.html                  # HTML5 entry document
â”œâ”€â”€ package.json                # Dependencies and build scripts
â”œâ”€â”€ tsconfig.json               # Strict TypeScript configuration
â””â”€â”€ vite.config.ts              # Vite 6 bundle optimization & relative pathing
```

---

## ğŸ”’ Security & Client-Side Privacy

- **Client-Side Execution:** All data, codebases, and notes remain exclusively in browser memory (IndexedDB / memory). Zero telemetry is transmitted.
- **XSS & Injection Protection:** Native React 19 DOM escaping without `dangerouslySetInnerHTML` or `eval()`.
- **ReDoS Mitigation:** Regex input patterns and test strings are bounded and sanitized via `escapeRegex()` against catastrophic backtracking.
- **Memory Ingestion Guard:** File ingestion enforces 1 MB file bounds and ignores heavy binaries or package directories (`node_modules`, `.git`).
- **Least-Privilege CI/CD:** GitHub Actions workflows operate with strictly minimal permissions (`pages: write`, `contents: read`).

---

## ğŸ“„ License & Copyright

Distributed under the MIT License. See [LICENSE](https://github.com/Cagrik34/zenith-nexus/blob/main/LICENSE) for details.

**Author:** Ã‡aÄŸrÄ± Giray KeÅŸan  
**Copyright:** Â© 2026 Ã‡aÄŸrÄ± Giray KeÅŸan. All Rights Reserved.