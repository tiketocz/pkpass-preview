# `@tiketo/pkpass-preview` — Font sizing spec

This document captures the per-variant font sizing algorithm shipped by
`@tiketo/pkpass-preview`. It is the canonical reference for both consumers
(tuning expectations) and contributors (extending profiles or variants).

## 1. `FONT_PROFILES` (`packages/preview/src/index.tsx`)

Per-row font size:

```
fontSize = clamp((ROW_WIDTH / charCount) * density, min, max)
```

`charCount` per row sums `max(value.length, label.length)` across fields in
the row; for `headerFields` the sum uses `value.length` only. `headerDensity`
replaces `density` when computing header values, but only if defined —
otherwise headers fall back to `useFitText` against the static CSS size.

| Variant                  | density | min | max | maxAdd | maxAux | maxHeader | headerDens |
|--------------------------|--------:|----:|----:|-------:|-------:|----------:|-----------:|
| `default`                | 1.4     | 10  | 18  | 18     | 14     | —         | —          |
| `generic-baseline`       | 1.4     | 10  | 18  | 18     | 14     | —         | —          |
| `store-card-baseline`    | 1.4     | 10  | 18  | 18     | 14     | —         | —          |
| `generic`                | 2.0     | 10  | 27  | 20     | 16     | 19        | 0.5        |
| `generic-header`         | 2.0     | 10  | 27  | 20     | 16     | 18        | 0.8        |
| `id-card`                | 1.8     | 10  | 26  | 20     | 16     | 18        | 0.5        |
| `store-card`             | 1.7     | 10  | 26  | 24     | 20     | 17        | 0.56       |
| `store-card-numeric`     | 1.5     | 10  | 20  | 20     | 16     | —         | —          |
| `store-card-2col`        | 1.85    | 10  | 26  | 17     | 16     | 14        | 0.56       |
| `store-card-3col`        | 2.06    | 10  | 26  | 24     | 20     | 19        | 0.56       |
| `store-card-4col`        | 1.42    | 10  | 26  | 24     | 20     | 19        | 0.56       |
| `coupon`                 | 2.5     | 10  | 26  | 24     | 24     | 20        | 0.56       |
| `boarding-pass`          | 1.5     | 10  | 28  | 20     | 16     | 20        | 0.6        |
| `boarding-pass-short`    | 1.5     | 10  | 22  | 20     | 16     | 20        | 0.6        |
| `boarding-pass-long`     | 0.95    | 10  | 11  | 20     | 16     | 20        | 0.6        |
| `event-ticket`           | 2.1     | 10  | 20  | 15     | 14     | 17        | 1.0        |
| `event-ticket-5col`      | 1.5     | 10  | 20  | 15     | 13     | —         | —          |
| `event-ticket-strip`     | 1.5     | 10  | 20  | 18     | 15     | —         | —          |
| `event-ticket-generic`   | 1.5     | 10  | 26  | 19     | 15     | —         | —          |

`default`, `generic-baseline` and `store-card-baseline` share identical
parameters; they are kept distinct so future per-pkpass-type baseline
tuning (e.g. store-card-only padding adjustment) can split them without
renaming consumers.

`store-card-2col` is the compromise profile covering several
historically distinct shop-card layouts (primary + 2 secondary; 2 headers
+ secondary + auxiliary; 2 secondary with no header/primary).

## 2. Auto-detection (`deriveVariant`)

Public API is `<PKPassPreview values={pass.values} />` — no `variant`
prop required. The variant is derived deterministically from `values`
(pkpass class + field counts + boarding-pass primary value length) by
`deriveVariant(values)` in `packages/preview/src/index.tsx`. First-match-wins:

| pkpass class    | additional signal                                              | → variant              |
|-----------------|----------------------------------------------------------------|------------------------|
| `coupon`        | —                                                              | `coupon`               |
| `boardingPass`  | primary value length > 12                                       | `boarding-pass-long`   |
| `boardingPass`  | else                                                            | `boarding-pass-short`  |
| `eventTicket`   | secondary = 5 AND primary = 0                                   | `event-ticket-5col`    |
| `eventTicket`   | headerFields = 0                                                | `event-ticket-strip`   |
| `eventTicket`   | else                                                            | `event-ticket`         |
| `generic`       | headerFields = 0 AND has primary AND has logoText               | `event-ticket-generic` |
| `generic`       | headerFields = 0 AND no primary                                 | `generic-baseline`     |
| `generic`       | headerFields ≥ 2                                                | `generic`              |
| `generic`       | headerFields = 1 AND secondary ≥ 3                              | `generic-header`       |
| `generic`       | headerFields = 1 AND secondary ≤ 2                              | `id-card`              |
| `generic`       | else                                                            | `generic-baseline`     |
| `storeCard`     | aux ≥ 5                                                         | `store-card-numeric`   |
| `storeCard`     | aux ≥ 4                                                         | `store-card-4col`      |
| `storeCard`     | aux = 1 AND has primary                                         | `store-card-3col`      |
| `storeCard`     | has primary AND secondary = 2                                   | `store-card-2col`      |
| `storeCard`     | headerFields ≥ 2 AND no primary AND secondary ≥ 1 AND aux ≥ 1   | `store-card-2col`      |
| `storeCard`     | headerFields = 0 AND no primary AND secondary = 2               | `store-card-2col`      |
| `storeCard`     | headerFields = 1 AND secondary = 1 AND aux = 1 AND no primary   | `store-card-baseline`  |
| `storeCard`     | else                                                            | `store-card`           |
| none of above   | —                                                               | `default`              |

The `default` profile is a 1:1 match with the pre-auto-detection baseline
(`density: 1.4`, `max: 18`, `maxAdditional: 18`, `maxAuxiliary: 14`). External
consumers whose `values` don't match any rule get `default` and therefore
render exactly as before opt-in.

## 3. Variant-scoped CSS (`packages/preview/src/styles.ts`)

What `FONT_PROFILES` doesn't cover (static CSS, not charCount-based):

| Variant                                    | Selector                                            | Property             | Value                |
|--------------------------------------------|-----------------------------------------------------|----------------------|----------------------|
| `generic` + `generic-header`               | `.generic #headerFields`                            | height               | 50px                 |
| `generic` + `generic-header`               | `.generic #headerFields img`                        | max-height           | 50px                 |
| `generic` + `generic-header`               | `#headerFields h1`                                  | font-size            | 1.67em (~16.7px)     |
| `generic` + `generic-header`               | `#secondaryFields .passField > span > span`         | font-weight          | 300                  |
| `generic` + `generic-header`               | `#auxiliaryFields .passField > span > span`         | font-weight          | 300                  |
| `id-card`                                  | `.generic #secondaryFields > span > span`           | font-weight          | 100                  |
| `id-card`                                  | `.generic #headerFields .passField > span > span`   | vertical-align       | top                  |
| `id-card`                                  | `.generic #headerFields`                            | height               | 45px                 |
| `id-card`                                  | `.generic #headerFields img`                        | max-height 45 / max-width 177 | px           |
| `store-card`                               | `.storeCard #headerFields h1`                       | font-size            | 1.43em (~14.3px)     |
| `store-card` + `-2col`/`-3col`/`-4col`     | `.storeCard #headerFields .passField > span > span` | vertical-align       | top                  |
| `store-card` + `-2col`/`-3col`/`-4col`/`-numeric` | `.storeCard #secondaryFields > span > span`  | font-weight + white-space | 300 + nowrap    |
| `coupon`                                   | `.coupon #headerFields h1`                          | font-size            | 1.67em (~16.7px)     |
| `boarding-pass` family                     | `.boardingPass #primaryFields .passField:first-child` | width              | 200px (from 125)     |
| `boarding-pass` family                     | `.boardingPass #primaryFields .passField:last-child`  | width              | 90px (from 125)      |
| `boarding-pass-short` + `-long`            | `.boardingPass #primaryFields > span > span`        | font-weight          | 300                  |
| `boarding-pass` family                     | `img#pass-transport-type`                           | width/max-width      | 32px (+max-height:none) |
| `event-ticket-generic`                     | `.generic #headerFields h1`                         | font-size            | 1.75em (~17.5px)     |
| `event-ticket-generic`                     | `.generic #headerFields img`                        | max-height           | 41px                 |

## 4. Terminology

`pass.json` data-structure vs visual names. Some fixtures show e.g. a row
of numbers visually as "5-col primary" but in JSON it's `secondaryFields`.
Reference:

- `headerFields` → always at top, value + label, usually short
- `primaryFields` → biggest row, hero text
- `secondaryFields` → smaller row beneath primary (often shorter)
- `auxiliaryFields` → smallest row at the bottom
- `data.logoText` → `<h1>` inside `#headerFields`, separate from `headerFields[]`

`charCount` per row = `sum( max(value.length, label.length) )` across all
fields in the row. For `headerFields` it's just `value.length` (label/value
have their own column, do not shrink the value).

## 5. Width budget

The card has a usable row width of approximately 290px (header / secondary /
auxiliary rows; primary is wider). In 2-col secondary layouts the sum of
both value widths plus the margin must stay under ~290px. The cap-bound
sizes in the tables above were chosen to respect this budget with ~2px
safety margin.
