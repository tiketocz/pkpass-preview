# TIK-145 — Boarding-pass primary font-size & shrink-to-fit

Branch: `TIK-145` (off `main @ ed7aa5b`).
Status: **proposals only — not implemented, awaiting approval.**

## Recap problému (z TIK-145 + měření v repu)

| Fixture | Náš render | iOS Wallet | Pozorování |
|---|---|---|---|
| BP-1 ("Prague12345" / "Paris") | primary 18px | ~22-23px | undersized ~28 % |
| BP-2 ("LONG TEXT LONG TEXT" / "BB") | obě 18px, levá ořezává `LONG TEXT LON…` | levá ~12px shrunk-to-fit, pravá ~22-23px hero | overflow vs **per-field** shrink-to-fit |
| BP-3 ("`<a>here</a>`" / "Paris") | primary 18px | ~22-23px | stejné jako BP-1 |
| header "fdhs" (všechny) | 14px (`useFitText`) | ~16-18px | mírný undersized (nice-to-have) |

**Klíčový architektonický nález (z BP-2 iOS screenshotu):**
iOS používá **per-field** shrink-to-fit — když "LONG TEXT LONG TEXT" potřebuje zmenšit, zmenší se jen ono, "BB" zůstane na hero size. Náš `calculateGlobalFontSizeForRow` počítá **per-row** font size sdílený všemi poli — to je pro boarding-pass principálně špatně, ne jen špatně naladěné.

## Kořenové příčiny

1. **`boarding-pass` profile = `BASELINE_PROFILE`** (`maxPrimary: 18`) — cap pod iOS hero tier (~22-23). Bumping cap je nutná, ale ne dostačující podmínka.
2. **Per-row global font size** — i kdybych zvýšil cap na 24, BP-2 by stále overflowal (20 znaků × 24px / 200px column = nesedí), a "BB" na druhé straně by se zmenšilo na úroveň "LONG TEXT…".
3. **CSS `text-overflow: ellipsis`** na `.boardingPass .passField span` — ořezává místo shrink-to-fit. Bez per-field velikosti písma nutné odstranit/podmínit.
4. **Header value:** `useFitText` cílí na 100 % box height (5em strip × 14px header), což pro krátké hodnoty ("fdhs") vychází ~14px. iOS rendruje větší.

---

## Návrh A — bump `maxPrimary` + **`useFitText` per primary field** (per-field shrink-to-fit)

Mechanika: pro `boarding-pass` variantu (a JEN pro tu) renderovat každé primary pole přes `useFitText` (stejný pattern jako dnes hlavička v `PassFieldItemHeaderFit`). Profile knobs:

```ts
"boarding-pass": {
  ...BASELINE_PROFILE,
  maxPrimary: 24,       // hero tier match (cap-height ~16 CSS px)
  // headerDensity + maxHeader pro fdhs nice-to-have, optional this round
}
```

V `PKPassPreview` boarding-pass větvi nahradit `PassFieldItem` za novou variantu (např. `PassFieldItemFit`), která:
- má `maxFontSize` prop (z `profile.maxPrimary`),
- volá `useFitText({ maxFontSize, minFontSize: 10 })`,
- v boarding-pass větvi se mapuje na container width = 200px (left) / 90px (right) z CSS,
- v CSS odstranit `.boardingPass .passField span { text-overflow: ellipsis }` (nebo zúžit na `:not(.fit-text)`) — místo ořezu necháme `useFitText` zmenšit.

Výhody:
- **Sémanticky 1:1 s iOS** — per-field shrink-to-fit, nezávislé sizing levé a pravé strany.
- Reuse zaběhnutého patternu (`useFitText` už lib používá pro header + back-fields).
- Nezahrabe `font-profiles.ts` o další tunable; logika je v komponentě, profile zůstává jednoduchý.
- BP-1 i BP-3 ("Prague12345" / "`<a>here</a>`") dostanou hero cap, BP-2 levá strana se sama zmenší, BP-2 pravá ("BB") zůstane na cap.

Nevýhody:
- **DOM measurement (ResizeObserver) pro každé primary pole** boarding-passu — pro 2 pole zanedbatelné, ale dosud byl boarding-pass primary čistě analyticky sizing (rychlé, deterministické). Test coverage `font-profiles.test.ts` boarding-pass primary větev přestane mít smysl (přesune se z analytického do DOM measurement → vitest+happy-dom test, pomalejší).
- **Vitest test pattern změna**: testy pro boarding-pass primary už nepůjdou jako pure `calculateFontSize(profile, charCount)` — bude třeba render-based test (Playwright nebo `@testing-library` v happy-dom + `useFitText` mock).
- VRT pravděpodobně padne na boarding-pass storyies — bude potřeba schválit nové baseline (a regenerovat `vrt-baseline.png` pro BP-1/2/3 + 5 transit variant).

Risk surface: malé — jediná dotčená komponenta + 1 CSS pravidlo + 1 profile řádek. 5 transit-icon variant používá stejnou BP-1 fixture, takže se opraví "zdarma".

---

## Návrh B — **Per-field analytické sizing podle column width** (žádný `useFitText`)

Mechanika: namísto `calculateGlobalFontSizeForRow` (per-row sumace charCount) zavést `calculateFieldFontSize(profile, charCount, columnWidthPx)` který používá **per-field column width** místo globálního `ROW_WIDTH = 320`. Pro boarding-pass:

```ts
// V PKPassPreview boarding-pass větvi:
const leftSize  = calculateFieldFontSize(profile, primaryFields[0].value.length, /* columnWidth */ 200);
const rightSize = calculateFieldFontSize(profile, primaryFields[1].value.length, /* columnWidth */ 90);

// Algoritmus:
size = clamp((columnWidth / charCount) * density, min, maxPrimary)
```

Profil:
```ts
"boarding-pass": {
  ...BASELINE_PROFILE,
  maxPrimary: 24,
  primaryDensity: 1.0,  // 200 / 11ch * 1.0 = 18.2 → cap 24 → 24px (cap-height ~16 ✓)
                        // 200 / 20ch * 1.0 = 10  → minimum 10px (BP-2 left)
                        // 90  / 5ch  * 1.0 = 18  → cap 24 → 18px (Paris) – TBD: chceme i pravou stranu zvětšit?
}
```

V `PKPassPreview` boarding-pass větvi nahradit `globalFontSizePrimary` (jeden per row) za dvojici `leftFontSize` / `rightFontSize` (per field). Odstranit `text-overflow: ellipsis` u boarding-pass primary span (nebo nechat jako poslední safety net).

Výhody:
- **Deterministické a testovatelné** stejným patternem jako dnes (`font-profiles.test.ts` přidá per-field test cases) — bez DOM env.
- **Nulový runtime overhead** (žádný ResizeObserver).
- Jednotný styl s ostatními variantami (analytický sizing, jen rozšířený o column width).

Nevýhody:
- **Char-density je aproximace** — záleží na font glyph metrics. "LONG TEXT LONG TEXT" má 6 mezer + 14 velkých písmen, char-density odhadne podle průměrné šíře. Pokud iOS font (`-apple-system`) má širší capital glyphy než průměr, dostaneme jiné číslo než pixelová pravda. Pro krátké stringy ("Paris", "Prague12345") to vychází dobře, pro dlouhé hraniční ("LONG TEXT LONG TEXT") to může mít drift ±2-3 CSS px vs iOS.
- **Column width 200/90 px je hardcoded v CSS** — pokud někdo v budoucnu upraví `.boardingPass .passField:first-child { width: 200px }`, JS sizing zůstane na 200. Buď je třeba magic number držet v sync (CSS const + import do JS), nebo měřit container width za běhu (a tím v podstatě sklouznout zpět k Návrhu A).
- Pravá strana ("Paris", "BB") sizing — v iOS hero match. Při 90px column / 5 chars × 1.0 = 18 → cap 24 → 18, což je **stále menší než iOS**. Buď zvednout `primaryDensity` (zvětší i levou stranu a BP-2 se zhorší), nebo dát pravé straně vlastní knob (`maxPrimaryRight`/`maxPrimarySecondary` — divný API).
- Header value `fdhs` se touto cestou neřeší (zůstává `useFitText`).

Risk surface: středný — refaktor `calculateRowFontSize` cesty (per-row → per-field) i pro ostatní varianty (i kdyby jen no-op cesta), nebo větvení v `PKPassPreview` (přidání `if data.boardingPass` cesty). Stávající testy na boarding-pass se musí přepsat.

---

## Návrh C — **Hybrid: analytický happy-path + `useFitText` overflow guard**

Mechanika: kombinace A + B.
- Primary font size **per field, analyticky** podle column width (Návrh B): rychlé, deterministické, hero cap.
- **`useFitText` se aktivuje jen když analyticky vypočtená velikost přesto overflow** (např. po vyrenderování `ref.current.scrollWidth > ref.current.clientWidth` → snížit fontSize krokem).
- Implementačně: vlastní mini-hook `useShrinkIfOverflow(initialSize, minSize)` — měří jen 1× po mount + při změně textu, ne kontinuálně. Méně práce než plný `useFitText`.

Pro boarding-pass:
- BP-1/BP-3: 200/11 × 1.4 = 25.4 → cap 24 → 24 → nepřeteče → render hotov, žádné DOM měření.
- BP-2: 200/20 × 1.4 = 22.4 → cap 24 → 22 → overflow check → shrink na ~12px (single iteration).
- BP-2 right ("BB"): 90/2 × 1.4 = 63 → cap 24 → 24 → ✓ (sedí s iOS).

Výhody:
- **Best of both** — deterministický a rychlý happy-path, robustní fallback pro edge case (BP-2 overflow).
- "BB" zůstane na hero cap (per-field).
- Overhead jen pro pole co skutečně overflow (typicky 0 v produkci, BP-2 je edge case).

Nevýhody:
- **Více kódu** než A nebo B — nový hook, dvě cesty.
- **Testing pattern hybridní** — analytický pro happy-path (lze unit-testovat), overflow path vyžaduje DOM env.
- Single-iteration shrink není 100 % přesná (může underflow / 1 píxel drift). `useFitText` má vícefázovou bisekci, vlastní hook by ji buď duplikoval, nebo měl trade-off.
- Riziko, že "happy path" v praxi pokryje 95 % a hook se aktivuje řídce → kód se nedostane do paměti testerů, debugování okrajových případů bude bolet.

Risk surface: vyšší než A nebo B — nový kód path + nový hook + dvě CSS varianty (overflow=true/false).

---

## Doporučení (já bych šel cestou A)

| Kritérium | A — useFitText per field | B — analytický per column | C — hybrid |
|---|---|---|---|
| Sémantika vs iOS | **1:1** | aproximace | 1:1 |
| Runtime overhead | nízký (2 ResizeObserver) | **nulový** | nízký (jen overflow) |
| Determinizmus + testing | nižší (DOM env) | **vysoký (pure)** | smíšený |
| Velikost změny | malá (1 komp + CSS) | středná (refaktor sizing API) | velká (nový hook + 2 cesty) |
| Future-proof (např. nový column width) | **odolný** (měří container) | křehký (magic numbers) | smíšený |
| BP-2 right "BB" hero ✓ | **ano** | jen s extra knob | ano |
| Header "fdhs" fix (nice-to-have) | součást stejného PR | samostatné | samostatné |

**Můj návrh: A.** Iso-iOS chování, malá změna, robustní vůči budoucím CSS úpravám, jediná reálná nevýhoda (DOM measurement) je u boardingPass acceptable. Profile knob `maxPrimary: 24` + nový `PassFieldItemFit` (analog k `PassFieldItemHeaderFit`) + zúžení `text-overflow: ellipsis` pravidla na non-boarding-pass.

Header value `fdhs` (nice-to-have): ve stejném PR přidat `headerDensity: 1.0, maxHeader: 18` do boarding-pass profilu — vyřeší se char-density cestou (stejný pattern jako `generic` / `event-ticket`), žádný extra kód.

VRT baseline regenerace nutná (BP-1/2/3 + 5 transit variant + header value re-size).

## Mimo scope (potvrzeno v ticketu, kdyby cesta A vyžadovala)

- Font-weight (náš 300 vs iOS heavier) — follow-up ticket.
- Layout / icon pozice — OK.
- Auxiliary/secondary fields — BP fixtures nemají.

## Testing plán (jakýkoliv návrh)

- `tests/font-profiles.test.ts` — přepsat boarding-pass primary cases na per-field nebo render-based (podle zvolené cesty).
- VRT (`scripts/visual-regression.mjs`) — regenerace baseline pro `boarding-pass-*` + `boarding-pass-transit-*` stories po merge.
- Smoke: Playwright `getBoundingClientRect` měření v live storybook iframu pro BP-1/2/3 dle measuring metody v ticketu — pinnit cap-height ±2 CSS px vs iOS reference.
