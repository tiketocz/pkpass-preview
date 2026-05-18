# @tiketo/pkpass-preview

[![Storybook](https://img.shields.io/badge/Storybook-live-FF4785?logo=storybook&logoColor=white)](https://tiketocz.github.io/pkpass-preview/)

React component for previewing Apple Wallet passes (`.pkpass`) in the browser. Renders pass JSON + assets the way iOS does, side-by-side with a real device screenshot when needed.

**Status:** scaffold. The component source is still being ported from the private predecessor `tiketocz/pkpass-builder-ui`. Track progress in [TIK-119](https://jakubknejzlik.atlassian.net/browse/TIK-119).

## Milestones

| Ticket | Milestone | Status |
|---|---|---|
| [TIK-120](https://jakubknejzlik.atlassian.net/browse/TIK-120) | M1.0 — repo skeleton (no source yet) | this PR |
| [TIK-121](https://jakubknejzlik.atlassian.net/browse/TIK-121) | M1.1 — source port + Storybook 8 base | pending |
| [TIK-122](https://jakubknejzlik.atlassian.net/browse/TIK-122) | M1.2 — tools (`sign-fixture`, `api-snapshot`) | pending |
| [TIK-123](https://jakubknejzlik.atlassian.net/browse/TIK-123) | M1.3 — publish workflows + Changesets + VRT info-only | pending |
| [TIK-124](https://jakubknejzlik.atlassian.net/browse/TIK-124) | M1.4 — fixtures + `v1.0.0` release | pending |

## Stack

- **Runtime (consumers):** React `^18 || ^19`
- **Package manager / dev runtime:** Bun (`packageManager` pinned in root `package.json`)
- **Bundler:** `Bun.build()` — ESM-only, ES2022 target, `.d.ts` + `.d.ts.map`
- **Linter / formatter:** [Biome](https://biomejs.dev)
- **Tests:** [Vitest](https://vitest.dev)
- **TypeScript:** strict, `moduleResolution: bundler`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`

## Repository layout

```
pkpass-preview/
├── packages/
│   └── preview/       # @tiketo/pkpass-preview — the published library
├── tests/             # workspace-level tests (smoke + integration)
├── biome.json
├── tsconfig.base.json # shared TS options
├── tsconfig.json      # root project, includes all sources
└── vitest.config.ts
```

In later milestones: `packages/storybook/` (M1.1, side-by-side Storybook 8 + GitHub Pages), `tools/` (M1.2, fixture signing + API snapshot), `.changeset/` (M1.3), `static/` (M1.4, iOS reference screenshots).

## Local dev

### Prerequisites

- Node 22 — `nvm use` reads `.nvmrc`
- [Bun](https://bun.sh) (latest)

### First-time setup

```sh
bun install
```

### Common scripts

```sh
bun run lint        # biome check .
bun run lint:fix    # biome check --write .
bun run format      # biome format --write .
bun run typecheck   # tsc --noEmit
bun run test        # vitest run (one-shot)
bun run test:watch  # vitest (watch mode)
```

## Frozen API contract

The published package `@tiketo/pkpass-preview` is the public successor to the private `pkpass-builder-ui`. Consumers must be able to swap their import path with **zero code changes**.

- Exports from `packages/preview/src/index.ts` are *bit-identical* with the private predecessor at HEAD
- `package.json` `exports` map paths are stable across versions within the same major
- Breaking changes require a major version bump (Changesets)
- Once `v1.0.0` is tagged, [TIK-122](https://jakubknejzlik.atlassian.net/browse/TIK-122)'s `tools/api-snapshot.ts` enforces this as a *blocking* PR check (info-only until then)

## Release

(Configured in [TIK-123](https://jakubknejzlik.atlassian.net/browse/TIK-123).) Tag-driven via Changesets:

```sh
bunx changeset                       # describe the change
bunx changeset version               # bump versions + write CHANGELOG.md
git push                             # PR + merge
git tag v1.0.0 && git push --tags    # fires npm-publish workflow
```

`npm-publish` uses **OIDC trusted publisher** (no static `NPM_TOKEN`); the package must be registered on npmjs.com with this repo as the trusted publisher before the first publish.
