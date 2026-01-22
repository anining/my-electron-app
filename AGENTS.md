## AGENTS.md Update Rule

When the user asks to “update AGENTS.md”, follow these rules:

### Scope

- Only add information that should remain true across future sessions (weeks+).
- Capture finalized decisions, hard constraints, and stable conventions.
- Do not record transient states, debugging steps, or speculative ideas.

### What to include

- Confirmed architectural decisions and their implications.
- Non-negotiable constraints (platform limits, required architectures, supported runtimes).
- Tooling requirements and fixed workflows (package manager, build/distribution approach).
- Known pitfalls that repeatedly cause failures.

### What NOT to include

- Conversation history, rationale, or step-by-step troubleshooting.
- Personal preferences unless explicitly mandated as project policy.
- Version numbers unless they are required constraints; prefer ranges or “must match Expo SDK”.
- Temporary workarounds, TODOs, or unresolved options.

### Editing rules

- Prefer the smallest change that makes the document accurate.
- Avoid duplication; integrate into existing sections instead of adding new ones.
- Remove or revise outdated statements if the session invalidates them.
- Keep language concise and imperative.

### Output requirements

- Output a unified diff against `AGENTS.md` when changes are small.
- Output the full revised `AGENTS.md` only when restructuring is necessary.
- Do not include any explanation or commentary—only the diff or the revised file.

## Project Decisions

- Use local npm dependencies (no CDN/ESM remote imports) for React and UI libraries.
- Renderer uses Vite + React with Tailwind CSS; build output is `dist/renderer`.
- Electron uses `main.js` + `preload.js` with contextIsolation and IPC via `contextBridge`.
- Electron Forge is the packaging workflow; renderer build runs before package/make.
