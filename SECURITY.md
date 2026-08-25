# Security Policy & Vulnerability Disclosure

## 1. Zero-Cloud Architecture & Threat Model

Zenith Nexus is built upon a strict **Client-Side Air-Gapped Architecture**. 
- No telemetry, keystrokes, source code, or personal notes are transmitted to external servers.
- All computations (AST parsing, SQLite FTS5 search, force-directed graph layouts) execute in isolated in-memory Web Workers / WASM.

## 2. Reporting a Vulnerability

If you discover a security vulnerability within Zenith Nexus, please follow responsible disclosure guidelines:

- Open a private security advisory report directly on the repository at: [GitHub Security Advisories](https://github.com/Cagrik34/zenith-nexus/security/advisories/new)
- Alternatively, open an issue labeled with `[security]` detailing steps to reproduce, impact assessment, and potential proof of concept.
- All validated vulnerabilities are patched promptly in subsequent releases.

## 3. Supported Versions

| Version | Supported |
| :--- | :--- |
| 1.0.x | Yes |
| < 1.0.0 | No |
