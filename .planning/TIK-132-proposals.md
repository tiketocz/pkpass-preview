# TIK-132 — scope transit-icon id by PKPassPreview identifier

**Base:** `main` @ `ed7aa5b`
**Reporter:** TiketoBot (filed jako TIK-100 follow-up po DevGuru review 2026-05-18)
**Scope:** fix duplicate `id="pass-transport-type"` problému, když je více `PKPassPreview` instancí na jedné stránce.

## Současný stav

- `packages/preview/src/transit-icon.tsx`: 5× hard-coded `id="pass-transport-type"` na root SVG (řádky 92, 94, 96, 98, 100).
- `packages/preview/src/index.tsx:205`: CSS rule
  `#${identifier} #pass-transport-type { fill: ${data.labelColor}; }` —
  selector už je správně **scoped** přes wrapper id (každá `PKPassPreview`
  má `<div id={identifier}>` s unikátním `useMemo`-generovaným identifierem).
- `packages/preview/src/styles.ts:219`: druhý compound selector pro boarding pass —
  `#${identifier}.boardingPass svg#pass-transport-type`.
- `docs/FONT_SPEC.md:104`: dokumentace odkazuje na `img#pass-transport-type`
  (mírně zavádějící — je to `<svg>`, ne `<img>`, ale to je jiný drobnost).

**Důležité:** vizuální chování s 2+ instancemi je *náhodou* správné, protože
všechny CSS rules jsou prefixované `#${identifier}` a CSS specificity vybere
toho správného předka. Bug je tedy **čistě HTML validity** + JS API:

- 2+ elementů se stejným `id` na page = invalid HTML.
- `document.getElementById("pass-transport-type")` vrátí jenom první.
- DevTools "find by id" matchne jenom první výskyt.

## Návrhy

### A — Scope id přes identifier prop (varianta z Jira description)

**Změna:**

```tsx
// transit-icon.tsx
export const TransitIcon = (props: { transitType?: PassTransitType; identifier?: string }) => {
  const svgId = props.identifier ? `${props.identifier}-pass-transport-type` : "pass-transport-type";
  switch (props.transitType) {
    case PassTransitType.PKTransitTypeAir:
      return <AirIcon id={svgId} />;
    // ...stejně pro Boat/Bus/Train/Generic
  }
};

// index.tsx — call site
<TransitIcon transitType={...} identifier={identifier} />

// index.tsx — CSS rule (zjednodušený selector)
#${identifier}-pass-transport-type {
  fill: ${data.labelColor};
}

// styles.ts — druhý selector
svg#${identifier}-pass-transport-type {
  // ... boarding pass rules
}
```

**Pro:**
- Přesně to, co popisuje Jira description.
- ID zůstává jako stabilní hook (důležité pokud někdo v budoucnu chce
  `getElementById` použít — i když dnes nikdo nemá; viz grep dál).
- Backward-compatible default: bez `identifier` propu padne na původní `"pass-transport-type"` (nikdo to nepoužívá samostatně, ale konzistentní).

**Con:**
- Prop-drill: každý call site musí pamatovat předat `identifier`.
- Lehko zapomenutelný (TypeScript ho má jako optional → silent fallback).
- Dva CSS selectory (index.tsx + styles.ts) musíš najít a přepsat oba.

### B — Přepnout id → className (doporučení)

**Změna:**

```tsx
// transit-icon.tsx — všech 5 ikon
return <AirIcon className="pass-transport-type" />;
// ...

// index.tsx:205
#${identifier} .pass-transport-type {
  fill: ${data.labelColor};
}

// styles.ts:219
#${identifier}.boardingPass svg.pass-transport-type {
  // ...
}
```

**Pro:**
- Sémanticky správně: ID má být unique-per-document, className je
  navržený přesně pro "instance kategorie".
- Žádný prop-drill — refactor je čistě uvnitř `transit-icon.tsx` + 2 CSS
  selectory.
- Nejmenší diff (~10 řádků).
- Selectorový "weight" (`#id .class`) zůstává podobný — žádný riziko
  přebití jinde.

**Con:**
- Pokud někdo externí dělá `document.getElementById("pass-transport-type")`,
  rozbije se. **Grep ukázal že nikdo (interně) ne-dělá** — viz "Ověření" níže.
- Cizí integrace (CMS, pass-share) můžou teoreticky používat ten id selector
  v custom CSS overrides; málo pravděpodobné, ale zaslouží si poznámku
  v `CHANGELOG.md`.

### C — Drop id úplně, použít data atribut + scoped selector

**Změna:**

```tsx
// transit-icon.tsx
return <AirIcon data-transit-icon="" />;
// ...

// index.tsx + styles.ts
#${identifier} [data-transit-icon] { fill: ${data.labelColor}; }
```

**Pro:**
- Nejvíc sémantický: `data-*` atribut explicitně označuje "tohle je
  transit-icon component", ne CSS hook.
- Žádný konflikt s případným externím `getElementById`.

**Con:**
- Vágněji selectable z DevTools.
- Diverguje od konvence použité jinde v repo (jiné elementy jako
  `#passFront`, `#passBack`, `#primaryFields` zůstávají na id selektoru
  i přes potenciálně stejný duplikační problém — viz "Out of scope" níže).

## Doporučení: **Varianta B** (className)

Důvody:
1. Nejmenší surface area (1 soubor + 2 CSS selectory).
2. Eliminuje root cause: id nemělo být na opakovatelné komponentě nikdy.
3. Žádný prop-drill, takže žádná regrese "zapomněl jsem identifier".
4. Konzistentní se Web standardy (id = unique).
5. Vrt by měla zůstat identická — `fill` cascade je zachovaná, jenom přes
   class selector místo id.

Varianta A je přijatelná pokud Marosh/Jakub trvají na zachování id (např.
budoucí Cypress/Playwright selector hook), ale dnes pro tu prefenci důvod
nevidím.

## Ověření (před implementací)

`grep -rn "pass-transport-type"` v repo vrátil **jenom interní použití**:
- `transit-icon.tsx` (5×) — definice
- `index.tsx:205` — CSS rule
- `styles.ts:219` + 216 (comment) — boarding-pass override
- `docs/FONT_SPEC.md:104` — dokumentace
- žádné `getElementById`, žádný `querySelector("#pass-transport-type")`,
  žádná Storybook story na to selectuje.

Externí konzumace (CMS, tiketo-pass-share, jiná aplikace) **nemám jak ověřit
z tohoto repa**. Pokud Jakub potvrdí, že žádný consumer ten id selector
nepoužívá v custom CSS, je varianta B safe.

## Postup řešení (po schválení varianty)

1. **Implementace** (jeden commit):
   - `transit-icon.tsx`: změnit 5× `id="pass-transport-type"` →
     `className="pass-transport-type"` (varianta B) nebo
     `id={\`${identifier}-pass-transport-type\`}` (varianta A).
   - `index.tsx:205`: aktualizovat CSS rule.
   - `styles.ts:219`: aktualizovat CSS rule + comment na řádce 216.
   - `transit-icon.tsx:6-8`: aktualizovat comment o `#pass-transport-type`.
2. **Test:**
   - `bun run test` — typecheck + unit (35+ existujících).
   - `bun run lint` (biome).
   - `bun run vrt:build` — visual regression. **Očekávané:** zero diff
     (fill cascade přes `#${identifier}` zůstává).
3. **Doc:**
   - `docs/FONT_SPEC.md:104`: opravit `img#pass-transport-type` na
     `svg.pass-transport-type` (varianta B) — tabulka boarding-pass family.
   - `CHANGELOG.md`: poznámka pro varianty B/C (breaking pro custom CSS
     overrides na id selectoru — nepravděpodobné, ale uvést).
4. **Storybook story pro duplicate-instance test (Hotovo když #1):**
   - Nová story `PKPassPreview/Two Instances Side-by-Side` — renderuje
     dva passes vedle sebe (1× boardingPass, 1× generic).
   - HTML validátor (vestavěný v Storybook controls / `bun run vrt`)
     by neměl flagnout duplicate id.
5. **PR:** 1 commit + DevGuru review per [MEM-51] pattern → merge po
   Marosh visual sign-off + Jakub LGTM.

## Out of scope (TIK-132 nebude řešit)

- Stejný duplicate-id problém existuje pro `#passFront`, `#passBack`,
  `#primaryFields`, `#secondaryFields`, `#headerFields`, `#auxiliaryFields`,
  `#backFields`, `#passCard`, `#images` — všechny jsou v `passes/*.tsx`
  komponentách. CSS je scoped přes `#${identifier}`, tak vizuálně funguje,
  ale invalid HTML stejně tak. **Pokud chceme být důslední, mělo by se to
  refactorovat všechno najednou** (samostatný ticket TIK-???). TIK-132
  v původním znění řeší jenom transit-icon.

## Otevřené otázky pro Marosh/Jakub

1. Preferovaná varianta (A / B / C)?
2. Mám rozšířit scope na všechny duplicitní id v passes/* (out-of-scope
   sekce nahoře), nebo držet ticket úzký?
3. Storybook "two instances" story — chce Jakub mít jako trvalý regression
   test nebo jenom pro ověření a smazat?
