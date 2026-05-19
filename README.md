<div align="center">

# `@tiketo/pkpass-preview`

### See your Apple Wallet pass before you ship it.

Pixel-perfect Apple Wallet pass previews for React.

[**Live Storybook →**](https://tiketocz.github.io/pkpass-preview/) &nbsp;·&nbsp;
[**npm**](https://www.npmjs.com/package/@tiketo/pkpass-preview) &nbsp;·&nbsp;
[**GitHub**](https://github.com/tiketocz/pkpass-preview)

[![npm version](https://img.shields.io/npm/v/@tiketo/pkpass-preview?style=flat-square&color=cb3837&label=npm)](https://www.npmjs.com/package/@tiketo/pkpass-preview)
[![types](https://img.shields.io/npm/types/@tiketo/pkpass-preview?style=flat-square&color=3178c6)](https://www.npmjs.com/package/@tiketo/pkpass-preview)
[![license](https://img.shields.io/github/license/tiketocz/pkpass-preview?style=flat-square&color=4c1)](./LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-live-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://tiketocz.github.io/pkpass-preview/)
[![Used in production by tiketo](https://img.shields.io/badge/Used%20in%20production%20by-tiketo-0a84ff?style=flat-square)](https://tiketo.eu)

<!-- TODO: replace with real side-by-side composite hero (ours :left_right_arrow: iOS). For now a placeholder grid of fixtures from the live Storybook. -->
<a href="https://tiketocz.github.io/pkpass-preview/">
  <img src="./packages/storybook/public/screenshots/boarding-pass-1.jpg" alt="Apple Wallet boarding pass rendered by @tiketo/pkpass-preview side-by-side with iOS Wallet" width="640" />
</a>

</div>

---

## Why `pkpass-preview`?

> GitHub search for `apple wallet pass preview` returns **zero** real components _(checked 2026-05-16)_. We checked.

Designing an Apple Wallet pass is a slow loop: edit `pass.json` → sign it → AirDrop to a phone → screenshot → adjust. By the time you spot the kerning issue, you've already burned a developer certificate quota.

`pkpass-preview` renders the same JSON your signer pipeline consumes, **in the browser**, the way iOS Wallet does — so you can iterate on copy, fonts, colors, fields, and barcodes without ever leaving your editor.

Live in production: every pass shared from **[get.tiketo.eu](https://get.tiketo.eu)** is rendered with this exact component.

- **Pixel-parity with iOS Wallet** — fonts, spacing, header/secondary/auxiliary layout, barcode placement, dark back side, transit icons (boarding passes).
- **Drop-in `<PKPassPreview values={...} />`** — pass the same `pass.json` + assets you'd zip up; nothing else to wire.
- **Auto-variant detection** — `id-card`, `store-card`, `boarding-pass-short`, `boarding-pass-long`, `event-ticket`, `coupon`, and more, picked automatically from the field shape. Manual override available.
- **Side-by-side iOS reference screenshots** — every storybook story renders our output next to a real iOS Wallet screenshot of the same pass.
- **TypeScript-first**, **ESM-only**, **tree-shakeable**, **CSP-safe** (no inline styles), **SSR-friendly** (wrap in `dynamic` import).

## Install

```sh
npm  install @tiketo/pkpass-preview
# or
pnpm add     @tiketo/pkpass-preview
# or
bun  add     @tiketo/pkpass-preview
```

Requires **React 18 or 19**.

## Quick start

```tsx
import { PKPassPreview } from "@tiketo/pkpass-preview";

const values = {
  "pass.json": {
    formatVersion: 1,
    passTypeIdentifier: "pass.com.example.coffee",
    teamIdentifier: "ABCDE12345",
    organizationName: "Brewbeat Coffee",
    description: "Loyalty card",
    backgroundColor: "rgb(28, 28, 30)",
    foregroundColor: "rgb(255, 255, 255)",
    storeCard: {
      primaryFields:   [{ key: "balance", label: "POINTS",  value: "420" }],
      secondaryFields: [{ key: "tier",    label: "TIER",    value: "Gold" }],
    },
  },
  "icon.png":  { base64: "..." },
  "logo.png":  { base64: "..." },
  "strip.png": { base64: "..." },
};

export default function PassPreview() {
  return <PKPassPreview values={values} />;
}
```

That's it. No theme provider, no portal, no global CSS — the component scopes its own styles via a unique container id.

[Open the live Storybook →](https://tiketocz.github.io/pkpass-preview/) for 40+ side-by-side examples covering every Apple-supported pass style.

## Features

|   |   |
|---|---|
| **Side-by-side iOS comparison** | Every fixture pairs our render with a real Wallet screenshot. |
| **All five pass styles** | `boardingPass`, `coupon`, `eventTicket`, `generic`, `storeCard`. |
| **Auto-variant detection** | id-card / store-card-3col / boarding-pass-long / coupon / event-ticket-strip and 10+ others, derived from field shape. |
| **Barcodes** | PDF417, QR, Code 128, Aztec — placement matches iOS (header, footer, strip-overlay). |
| **Transit icons** | Airplane / train / bus / boat / generic, inline JSX SVG, `fill: currentColor` follows `labelColor`. |
| **Back fields & dark mode** | iOS-accurate dark back side with link/separator treatment. |
| **Storybook-ready** | First-class story integration with a `<Comparison>` helper. |
| **VRT-ready** | Headless Playwright + pixelmatch + SSIM script ships in the repo. |

## Compatibility

| Layer | Versions |
|---|---|
| React | `^18.0.0` (incl. 18.3) — `^19.0.0` |
| Browsers | Modern evergreen (Chrome, Safari, Firefox, Edge) — ES2022 |
| Pass spec | [Apple Wallet Developer Guide](https://developer.apple.com/documentation/walletpasses) — `formatVersion: 1` |
| iOS reference | Wallet on iOS 17 / iOS 18 (screenshots regenerated quarterly) |

Server-side rendering (Next.js App Router, Remix, Astro): the component is client-only. Wrap in `next/dynamic` with `ssr: false`, or render inside a client component.

## Comparison

| Project | What it does | What it isn't |
|---|---|---|
| **`@tiketo/pkpass-preview`** | **Renders** a `.pkpass` payload in the browser for visual review. | Doesn't sign, doesn't bundle, doesn't push to Apple. |
| [`passkit-generator`](https://github.com/alexandercerutti/passkit-generator) | Node-side **builder + signer** producing a real `.pkpass`. | No browser preview, no React. |
| [Apple PassKit Web Service](https://developer.apple.com/documentation/walletpasses) | Apple's **push/update protocol** for installed passes. | Not a preview tool. |
| [Pass Designer (commercial SaaS)](https://www.passdesigner.io/) | Drag-and-drop **GUI designer**. | Closed source, not embeddable in your app. |

If you're building a **dashboard, designer UI, CMS, or test harness** that needs a faithful Wallet preview without round-tripping through an iPhone, this is the missing piece.

> **Pair `pkpass-preview` (design-time) with [`passkit-generator`](https://github.com/alexandercerutti/passkit-generator) (build-time)** for a full pipeline — preview while you design, sign when you ship.

## FAQ

<details><summary><b>Does it work with Next.js / Remix / Astro?</b></summary>

Yes — ESM-only, no CJS pitfalls. The component itself is client-only (it measures DOM); wrap in `next/dynamic({ ssr: false })` (App Router) or render inside a client component.
</details>

<details><summary><b>Does it sign the pass or push updates?</b></summary>

No. It's a **renderer**, not a generator. Pair it with [`passkit-generator`](https://github.com/alexandercerutti/passkit-generator) (Node) or any signing service you run; we ship a sibling private service at `tiketocz/pkpass-signer` for our own pipeline.
</details>

<details><summary><b>Is it CSP-safe?</b></summary>

Yes. All styles are emitted via a scoped CSS module (no `style=""` attributes, no inline `<style>`). Works under strict CSP without `unsafe-inline`.
</details>

<details><summary><b>What pass version / format does it support?</b></summary>

Apple's `formatVersion: 1` schema, all five pass styles, and every documented field (`primary` / `secondary` / `auxiliary` / `header` / `back`). Personalization passes (`nfc` field) render visually but the NFC interaction itself is iOS-only.
</details>

<details><summary><b>How are the iOS reference screenshots produced?</b></summary>

A real `.pkpass` is generated (via `tiketocz/pkpass-signer`), installed on an iPhone, screenshotted manually, and committed to `packages/storybook/public/screenshots/`. We re-shoot when iOS Wallet visibly changes a layout (roughly every major iOS release).
</details>

<details><summary><b>Why React only? What about Vue / Svelte / Solid?</b></summary>

The component ships as ESM React 18+. Framework-agnostic primitives (a headless rendering core that any UI library can wrap) are on the roadmap if there's demand — [open an issue](https://github.com/tiketocz/pkpass-preview/issues/new) and tell us your stack.
</details>

<details><summary><b>Is this affiliated with Apple?</b></summary>

No. "Apple Wallet" and "PassKit" are trademarks of Apple Inc. This project is an independent open-source renderer that consumes the public `.pkpass` schema. We are not affiliated with, endorsed by, or sponsored by Apple.
</details>

## Roadmap

- [x] All five Apple pass styles, side-by-side with iOS
- [x] Auto-variant detection (`deriveVariant(values)`)
- [x] Inline transit icons (boarding passes)
- [x] `npm` publish via OIDC trusted publisher
- [x] Per-PR Storybook previews on GitHub Pages
- [ ] Visual regression CI gate (Playwright + pixelmatch, info-only → blocking)
- [ ] Public-facing typedoc / docs site
- [ ] Google Wallet pass previews (sibling component)
- [ ] iOS 27 Create-a-Pass support, when it lands

## Contributing

Contributions welcome — especially **new fixture brands**. Each invented brand you add becomes another visual proof point in the gallery; it's the highest-impact, lowest-friction way to help.

To add a fixture:

1. Drop a `values` object into `packages/storybook/src/fixtures/<your-brand>.ts`.
2. Add a story in the matching `*.stories.tsx`.
3. (Optional) Install the pass on an iPhone and add an iOS screenshot to `packages/storybook/public/screenshots/<your-brand>.jpg` for side-by-side.
4. Open a PR — the per-PR Storybook preview will render your fixture automatically.

For component changes, see the dev setup below.

### Local dev

```sh
bun install
bun run lint
bun run typecheck
bun run test
bun --filter @tiketo/pkpass-preview-storybook dev   # Storybook on http://localhost:6006
```

### Releasing

Tag-driven, OIDC-published. Bump the version in `packages/preview/package.json`, push a matching `v*` tag, the `release.yml` workflow does the rest. No static `NPM_TOKEN`.

## Resources

- [Apple Wallet Developer Guide](https://developer.apple.com/documentation/walletpasses) — the `.pkpass` spec
- [iOS Human Interface Guidelines · Wallet](https://developer.apple.com/design/human-interface-guidelines/wallet) — Apple's design intent
- [`.pkpass` file format reference](https://developer.apple.com/library/archive/documentation/UserExperience/Reference/PassKit_Bundle/Chapters/Introduction.html)
- [Live Storybook gallery](https://tiketocz.github.io/pkpass-preview/)
- [`tiketocz/pkpass-builder-ui`](https://github.com/tiketocz/pkpass-builder-ui) — the archived private predecessor

## License

[MIT](./LICENSE) — do whatever you want, just don't sue us.

---

<div align="center">

Built by **[tiketo](https://tiketo.eu)** — an Apple &amp; Google Wallet pass platform.<br/>
We use this component in production.

</div>
