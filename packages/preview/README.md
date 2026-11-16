# @tiketo/pkpass-preview

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

- Node 24 — `nvm use` reads `.nvmrc`
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
bun run test          # vitest run (one-shot)
bun run test:watch    # vitest (watch mode)
bun run test:coverage # vitest run + v8 coverage report (html in coverage/)
```

## Poster generic previews (experimental)

`PKPassPreview` accepts an optional `variant` prop for passes that contain the
iOS 27 `posterGeneric` structure:

```tsx
<PKPassPreview values={passFiles} variant="poster" />
<PKPassPreview values={passFiles} variant="fallback" />
```

- `variant="poster"` renders the experimental iOS 27 full-bleed artwork layout.
  If `posterGeneric` is absent, the renderer falls back to the pass's classic
  structure.
- `variant="fallback"` always renders the classic structure (for example,
  `generic`) even when `posterGeneric` is present.
- Omitting `variant` preserves the existing classic rendering behaviour.

The initial poster renderer covers the full-bleed `artwork` image, logo and
header, centered barcode, all primary fields in one responsive bottom-band row,
and footer fields. It is intended for previewing and is not yet a pixel-perfect
implementation of every iOS 27 poster size or feature.

## Target iOS version & Featured Actions (iOS 27, experimental)

`PKPassPreview` accepts an optional `targetOs` prop that says which iOS release
the preview emulates for capability-gated features. It is independent of
`variant`: `variant` chooses the layout (poster vs classic), `targetOs` chooses
which iOS features are shown.

```tsx
<PKPassPreview values={passFiles} targetOs="ios27" />
<PKPassPreview values={passFiles} targetOs="ios27" variant="poster" />
```

| `targetOs`           | Featured Actions                                       |
| -------------------- | ------------------------------------------------------ |
| omitted (default)    | not rendered: output identical to previous releases    |
| `"ios26"`            | not rendered (Wallet before iOS 27 ignores them)       |
| `"ios27"`            | up to two tiles rendered below the card front           |

With `targetOs="ios27"`, the top-level `featuredActions` array of `pass.json`
(schema per apple/pass-builder `Pass+Action.swift`: `identifier` required and
unique, `type` required, `url` optional) is rendered as a row of up to two
white rounded tiles directly below the card front, in input order. This works
for every pass style, including `generic` and `eventTicket`. Each tile has a
green circle icon (top left), a bold label and a grey "Open Link" subtitle:

| `type`         | Icon (white glyph on iOS green `#34C759`) | Label            | Subtitle    | Status                 |
| -------------- | ----------------------------------------- | ---------------- | ----------- | ---------------------- |
| `addToBalance` | credit card                               | "Add to Balance" | "Open Link" | native reference       |
| `call`         | phone handset                             | "Call"           | "Open Link" | native reference       |
| anything else  | arrow                                     | "Open"           | "Open Link" | proposal (unverified)  |

Invalid input never throws. The rules are exported as `resolveFeaturedActions(featuredActions, targetOs)`:

- A non-array value (missing, `null`, object, …) means no actions.
- Entries that are not plain objects, or have a missing or blank `identifier`
  or `type`, or have a non-string `url`, are skipped.
- A later entry that repeats an `identifier` is skipped.
- Unknown `type` values are kept and rendered as a generic tile with the label
  "Open" and an arrow icon.
- Only the first two valid entries are rendered. Zero valid entries means no
  tile container at all.

> **Native reference vs proposal.** The two-tile row for `addToBalance` +
> `call` (tile proportions, green icons, labels, "Open Link" subtitle) is
> aligned to native Apple Wallet iOS 27.0 (24A434) on an iPhone 17 Pro
> Simulator, for both `generic` and `eventTicket`. It is an approximation,
> not pixel-perfect (web fonts, glyph shapes, shadow). Still a **proposal**
> without native reference: the unknown-type tile ("Open" + arrow) and the
> single-action layout (one tile spanning the card width)
> ([TIK-318](https://jakubknejzlik.atlassian.net/browse/TIK-318)).
> The preview is static: tiles are not links, and `url` is only exposed via
> `title` / `data-url`.

New exports: types `FeaturedAction`, `KnownFeaturedActionType`,
`PreviewTargetOs` and `ResolvedFeaturedAction`, plus `resolveFeaturedActions`,
`supportsFeaturedActions`, `MAX_FEATURED_ACTIONS`, `FEATURED_ACTION_LABELS`,
`FEATURED_ACTION_SUBTITLE` and `UNKNOWN_FEATURED_ACTION_LABEL`.

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
