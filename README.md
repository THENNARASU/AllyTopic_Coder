# AllyTopic Coder

AllyTopic Coder is a monorepo for an AI-powered VS Code extension and its supporting packages, webview UI, eval tooling, and related apps.

## What This Repository Contains

- VS Code extension source and packaging logic
- Extension webview UI (React + Vite)
- Shared internal packages (types, telemetry, cloud, IPC, build/config)
- E2E and evaluation tooling
- Nightly packaging app

## Monorepo Structure

Top-level folders you will use most often:

- `src/`: Main VS Code extension package
- `webview-ui/`: UI bundle used by the extension webview
- `packages/`: Shared workspace packages (build, cloud, config, evals, ipc, telemetry, types)
- `apps/vscode-nightly/`: Nightly build packaging
- `apps/vscode-e2e/`: E2E test app

## Prerequisites

- Node.js `20.19.2` (required by `engines.node`)
- `pnpm` `10.8.1` (configured in `packageManager`)
- VS Code `^1.84.0` for extension development

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

The repository includes a bootstrap script that enforces PNPM usage during install.

2. Build everything:

```bash
pnpm build
```

3. Run tests:

```bash
pnpm test
```

## Common Root Commands

Run these from the repository root:

- `pnpm lint`: Lint all workspaces through Turbo
- `pnpm check-types`: Type-check all workspaces
- `pnpm test`: Run workspace tests
- `pnpm format`: Format files via workspace format tasks
- `pnpm build`: Build workspace packages
- `pnpm bundle`: Build extension/webview bundles
- `pnpm vsix`: Package extension VSIX artifacts
- `pnpm clean`: Clean caches/build outputs
- `pnpm knip`: Find unused files/exports/deps

## Development Workflow

For iterative extension work, run watchers in parallel:

```bash
pnpm --filter @roo-code/vscode-webview dev
npx turbo watch:bundle
npx turbo watch:tsc
```

In VS Code, this can also be started from the `watch` task (which depends on all three watch tasks).

## Building and Packaging the Extension

Build extension bundle:

```bash
pnpm bundle
```

Create VSIX package:

```bash
pnpm vsix
```

Install packaged VSIX locally (build + install helper script):

```bash
pnpm install:vsix
```

## Nightly Build

Nightly artifacts are handled through the nightly app and root Turbo scripts:

```bash
pnpm bundle:nightly
pnpm vsix:nightly
```

## Testing

- Unit/integration tests are run through workspace-level `vitest` tasks
- Root command to execute all tests:

```bash
pnpm test
```

## Project Notes

- Dependency management is centralized with PNPM workspaces
- Task orchestration is handled by Turbo (`turbo.json`)
- Extension manifest and contribution points are defined in `src/package.json`

## Contributing

1. Create a feature branch
2. Make your changes in the relevant workspace package
3. Run checks before opening a PR:

```bash
pnpm lint
pnpm check-types
pnpm test
```

4. Include changelog/changeset updates when required by your release process

## License

This project is licensed under the terms in `LICENSE`.

