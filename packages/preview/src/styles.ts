// Shared font stack for the rendered CSS rule on the pass root. Exported as
// a DRY constant so any future consumer that needs to measure glyphs in the
// same font family the browser renders (canvas measureText, layout probes)
// can import the same string and stay in lockstep with the CSS.
export const PASS_FONT_STACK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export const getPassStyles = (identifier: string) => `
  #${identifier} {
    width: 100%;
    height: 440px;
    font-size: 10px;
    line-height: 15px;
  }
  #${identifier} .passField label {
    margin: 0;
    font-weight: 400;
  }
  #${identifier} .passField span {
    font-size: 1.4em;
    display: block;
    font-weight: 400;
    line-height: 1.2;
  }
  #${identifier} .passField a {
    text-decoration: none;
    color: #145bff;
  }
  #${identifier} #passFront .passField {
    display: inline-block;
    vertical-align: top;
  }
  #${identifier}.generic #auxiliaryFields {
    margin-top: 0.5em;
  }
  #${identifier}.generic #auxiliaryFields .passField:last-child {
    text-align: right;
  }
  #${identifier} #passFront .passField label {
    text-transform: uppercase;
    color: #000;
    font-size: 10px;
    line-height: 1.2;
    margin-bottom: 2px;
  }
  #${identifier} #backFields .passField {
    border-bottom: 1px solid #ccc;
    padding: 5px 1.5em 15px;
  }
  #${identifier} #backFields label {
    margin: 5px 0 0;
  }
  #${identifier} #backFields .passField:last-child {
    border: none;
  }
  #${identifier} #backFields span {
    display: block;
    white-space: pre-wrap;
  }
  #${identifier} #passCard {
    position: relative;
    width: 320px;
    height: 420px;
  }
  #${identifier} #passCard > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  #${identifier}.background #passCard > div:before {
    content: '';
    position: absolute;
    left: -15px;
    right: -15px;
    top: -15px;
    bottom: -15px;
    z-index: -1;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }
  #${identifier} #passFront {
    padding: 10px 15px;
    height: 450px;
  }
  #${identifier} #passFront.shadow {
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 20%), 0 2px 5px 0 rgb(0 0 0 / 19%);
  }
  #${identifier} #primaryFields {
    clear: both;
    position: relative;
    margin: 0 -1.2em 1em;
    padding: 0 1.2em;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  #${identifier} #primaryFields .with-thumbnail {
    max-width: 215px;
  }
  #${identifier} #primaryFields img {
    max-height: 90px;
    max-width: 70px;
    float: right;
    margin-left: 1.2em;
  }
  #${identifier} #primaryFields span {
    font-size: 20px;
  }
  #${identifier}.generic #primaryFields {
    height: 90px;
    margin-bottom: 0.8em;
    padding-top: 5px;
  }
  #${identifier}.generic #primaryFields .passField span {
    font-size: 18px;
    font-weight: 500;
  }
  /* TIK-99: per-template "variant" profiles. Value-text font size for
     primary/secondary/auxiliary rows is computed dynamically in index.tsx
     (FONT_PROFILES → calculateGlobalFontSizeForRow) — NOT here; CSS below only
     carries the things the dynamic algo doesn't touch: header logo max-height,
     #headerFields container height, header-value cap (useFitText-driven, not the
     char-density algo) and value font-weight per profile.
     The variant is auto-detected from values in index.tsx (deriveVariant);
     the mapping is one-to-one with pkpass type + field shape — e.g. id-card
     == generic-class with primary + auxiliary fields and no logoText. */

  /* generic variant — keeps base header height (3.8em) and base logo
     max-height (38px). The previous 50px override was needed when h1 had
     line-height: 3em (so its line-box was ~50px tall and the strip needed to
     match). With base h1 now at line-height: 1 + flex centering, both image
     and h1 fit comfortably in the base strip and match iOS reference closer. */
  /* event-ticket-generic (ET5): logoText (h1) ~12.5 -> ~19.5px (+7px) and
     header logo image trimmed -2px from default 38 max-height. */
  #${identifier}.generic.pkpass-variant-event-ticket-generic #headerFields h1 {
    font-size: 1.75em;
  }
  #${identifier}.generic.pkpass-variant-event-ticket-generic #headerFields img {
    max-height: 41px;
  }

  /* logoText (h1) scaled +1/3 for generic variant (1.25em -> 1.67em);
     cards without a logoText render no h1 so this is a no-op for them. */
  #${identifier}.generic.pkpass-variant-generic #headerFields h1 {
    font-size: 1.67em;
  }

  /* id-card profile — for generic-class pkpass cards rendered as member /
     ID cards (1 header + 2 secondary, no auxiliary).
     Header value is sized by the char-density algorithm (globalFontSizeHeader,
     see index.tsx FONT_PROFILES.id-card). vertical-align: top keeps a short
     value pinned to the top of the header line box (otherwise a small value sits
     baseline-aligned inside the taller line box and looks pushed down).
     The logo max-width keeps a very wide wordmark logo from filling the row so
     the right-floated header field cluster still fits on the same line instead
     of wrapping below the logo. */

  #${identifier}.eventTicket #primaryFields.strip {
    height: 84px;
    margin-bottom: 5px;
  }
  #${identifier}.storeCard #primaryFields,
  #${identifier}.coupon #primaryFields {
    height: 123px;
    margin-bottom: 5px;
  }
  #${identifier} #primaryFields.strip .passField * {
    color: #fff !important;
  }
  #${identifier}.boardingPass #primaryFields {
    text-align: center;
    height: 50px;
  }
  #${identifier}.boardingPass #headerFields {
    height: 5em;
  }
  #${identifier}.boardingPass #primaryFields .passField {
    position: absolute;
    top: 0;
    width: 125px;
    height: 60px
  }
  #${identifier}.boardingPass #primaryFields .passField:first-child {
    text-align: left !important;
    left: 12px;
  }
  #${identifier}.boardingPass #primaryFields .passField:last-child {
    text-align: right !important;
    right: 12px;
  }
  #${identifier}.boardingPass #primaryFields span {
    /* font-size set dynamically per FONT_PROFILE — per-row uniform via
       calculateGlobalFontSizeForRow (TIK-145 revised: same pattern as
       every other variant; FROM and TO share one size). Boarding-pass
       additionally applies a width-based row-fit pass (canvas measureText
       on FROM at the density-bound size; scales row uniformly via
       scaledRowFontSize when FROM would reach the centred transit icon)
       — see boardingPassRowFontSize useMemo in index.tsx. Other variants
       use the char-density helper alone. Only line-height stays static
       so the value vertically aligns inside the primary box regardless
       of font size. */
    line-height: 1em;
  }
  /* boarding-pass — widen FROM column so long values (e.g. BP2 "LONG TEXT
     LONG TEXT") truncate later, matching iOS more closely. TO column
     trimmed so the two don't overlap. The middle gap is where the transit
     icon sits. Selectors use only .boardingPass (1:1 with the pkpass
     class) since the pre-TIK-112 -short/-long variant suffixes were
     dropped along with the routing split. */
  #${identifier}.boardingPass #primaryFields .passField:first-child {
    width: 200px;
  }
  #${identifier}.boardingPass #primaryFields .passField:last-child {
    width: 90px;
  }
  /* boarding-pass primary value: light weight (matches iOS Wallet). */
  #${identifier}.boardingPass #primaryFields .passField > span > span {
    font-weight: 300;
  }
  /* Transit icon (airplane/etc.) on boarding-pass — rendered inline as
     <svg>. Size to 32×32 so it visually matches iOS Wallet, and fill is
     driven by the dynamic '.pass-transport-type { fill: labelColor }' rule
     above (paths inherit fill via SVG cascade). All 5 transit SVGs use
     square viewBoxes, so width===height is safe. */
  #${identifier}.boardingPass svg.pass-transport-type {
    width: 32px !important;
    height: 32px !important;
    display: inline-block;
  }
  #${identifier}.eventTicket #primaryFields.strip {
    height: 84px;
  }
  #${identifier}.eventTicket #primaryFields.strip label {
    display: none;
  }
  #${identifier}.eventTicket #primaryFields.strip span {
    font-size: 60px;
    line-height: 80px;
    color: #fff !important;
  }
  #${identifier}.storeCard .strip #primaryFields .passField *,
  #${identifier}.coupon .strip #primaryFields .passField * {
    color: #fff;
  }
  
  #${identifier}.storeCard #primaryFields span {
    overflow: hidden;
    white-space: nowrap;
  }
  
  #${identifier}.storeCard #primaryFields span,
  #${identifier}.coupon #primaryFields span {
    font-size: 65px;
  }
  #${identifier}.storeCard #primaryFields label,
  #${identifier}.coupon #primaryFields label {
    text-transform: none;
    position: absolute;
    bottom: 35px;
    font-size: 15px;
  }
  #${identifier} #auxiliaryFields > div,
  #${identifier} #secondaryFields > div {
    text-align: justify;
  }
  #${identifier} #auxiliaryFields > div:after,
  #${identifier} #secondaryFields > div:after {
    content: '';
    display: inline-block;
    width: 100%;
  }
  #${identifier} #headerFields {
    height: 3.8em;
    position: relative;
    margin-bottom: 0.8em;
    display: flex;
    align-items: center;
  }
  #${identifier} #headerFields > div{
    text-align: right;
    margin-left: auto;
  }
  #${identifier} #headerFields img {
    max-height: 38px;
    max-width: 250px;
    margin-right: 0.7em;
  }
  #${identifier} #headerFields h1 {
    margin: 0;
    font-size: 1.25em;
    line-height: 1;
    font-weight: 600;
  }
  #${identifier} #headerFields .passField {
    margin-left: 10px;
  }
  #${identifier} #passFront hr {
    clear: left;
  }
  #${identifier} #barcode {
    text-align: center;
    position: absolute;
    bottom: 2em;
    left: 0;
    right: 0;
    min-height: 70px;
  }
  #${identifier} #barcode.PKBarcodeFormatQR {
    bottom: 1em;
  }
  #${identifier}.coupon #barcode.PKBarcodeFormatQR {
    bottom: 0.8em;
  }
  #${identifier} #barcode.PKBarcodeFormatAztec {
    bottom: 1em;
  }
  #${identifier} #barcode.PKBarcodeFormatCode128 {
    bottom: 2em;
  }
  #${identifier} #barcode.PKBarcodeFormatPDF417 {
    bottom: 2em;
  }
  #${identifier} #barcode.PKBarcodeFormatQR #barcode-wrapper {
    padding: 10px 10px 5px 10px;
  }
  #${identifier}.coupon #barcode.PKBarcodeFormatQR #barcode-wrapper {
    padding: 6px 6px 4px 6px;
  }
  #${identifier} #barcode.PKBarcodeFormatAztec #barcode-wrapper {
    padding: 12px 12px 5px 12px;
  }
  #${identifier} #barcode.PKBarcodeFormatCode128 #barcode-wrapper {
    padding: 16px 14px 5px 14px;
  }
  #${identifier} #barcode.PKBarcodeFormatPDF417 #barcode-wrapper {
    padding: 10px 10px 0px 10px;
  }
  #${identifier} #barcode.PKBarcodeFormatQR #barcode-canvas {
    width: 120px;
    height: 120px;
  }
  #${identifier}.generic #barcode.PKBarcodeFormatQR #barcode-canvas {
    width: 90px;
    height: 90px;
  }
  #${identifier} #barcode.PKBarcodeFormatAztec #barcode-canvas {
    width: 100px;
    height: 100px;
  }
  #${identifier} #barcode.PKBarcodeFormatCode128 #barcode-canvas {
    width: 220px;
    height: 40px;
  }
  #${identifier} #barcode.PKBarcodeFormatPDF417 #barcode-canvas {
    width: 220px;
    height: 50px;
  }
  #${identifier} #barcode:before {
    content: '';
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    height: 15px;
    margin-bottom: 2px;
    display: block;
  }
  #${identifier} #barcode > div {
    padding: 7px;
    background: #fff;
    color: #000;
    margin: auto;
    display: inline-block;
    border-radius: 5px;
  }
  #${identifier} #barcode img {
    max-height: 120px;
    max-width: 100%;
    display: block;
    margin: auto;
  }
  #${identifier} #barcode h1 {
    width: 120px;
    height: 120px;
    line-height: 120px;
    font-size: 80px;
    margin: 0 auto;
  }
  #${identifier} #barcode div div {
    font-size: 14px;
    color: #000;
  }
  #${identifier} .voided #barcode div img,
  #${identifier} .voided #barcode div h1 {
    opacity: 0.2;
  }
  #${identifier} .voided #barcode .altText {
    display: none;
  }
  #${identifier} .voided #barcode div div {
    color: red;
  }
  #${identifier} #passBack {
    padding: 6px;
    height: 450px;
  }
  #${identifier} #passBack.shadow {
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 20%), 0 2px 5px 0 rgb(0 0 0 / 19%);
  }
  #${identifier} #passBack .doneButton {
    float: right;
    margin-right: 0.5em;
    color: inherit;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.5em;
    line-height: 1.5em;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
  #${identifier} #backFields {
    margin-top: 33px;
    border-radius: 10px;
    background: #fff;
    color: gray;
    padding-bottom: 30px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 388px;
    width: 100%;
  }
  #${identifier} .infoButton {
    color: inherit;
    border-radius: 50%;
    border: 1px solid #fff;
    cursor: pointer;
    width: 18px;
    height: 18px;
    font-size: 16px;
    display: block;
    text-align: center;
    line-height: 18px;
    float: right;
    font-family: serif;
    font-weight: 700;
  }
  #${identifier} #passFront .infoButton {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
  #${identifier} .editorFields {
  }
  #${identifier} .controlElement {
    margin-bottom: 0.5em;
    clear: right;
    position: relative;
  }
  #${identifier} .controlElement h3 {
    position: absolute;
    margin: 1em;
    top: 0;
    left: 0;
    font-size: inherit;
  }
  #${identifier} .controlElement .infoButton {
    color: #000;
    font-weight: 400;
    border-color: #000;
    background: #ccc;
    margin: 5px;
  }
  #${identifier} .controlElement .advanced {
    display: none;
    background: #ccc;
    padding: 5px;
    border-radius: 5px;
  }
  #${identifier} .controlElement .advanced.expanded,
  #${identifier} .editable .editableOptions {
    display: block;
  }
  #${identifier} .editableOptions,
  #${identifier} .advanced .infoButton {
    display: none;
  }
  #${identifier} .advanced.expanded + label {
    margin-top: 0;
  }
  #${identifier} .advanced.expanded label:first-child {
    margin-top: 0;
  }
  #${identifier} .optionsEditor {
    text-align: center;
  }
  #${identifier} .optionsEditor div * {
    width: 45% !important;
    display: inline !important;
  }
  #${identifier} .editorFields .optionsEditor div span.button {
    padding: 5px 15px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  #${identifier} .controlElement textarea {
    font-size: 1em;
    padding: 0.5em;
  }
  #${identifier} .PSAdditional .controlElement label {
    margin: 0;
  }
  #${identifier} .collapsible {
    height: 0;
    overflow: hidden;
    padding-bottom: 2.2em;
  }
  #${identifier} .collapsible h2 {
    cursor: pointer;
  }
  #${identifier} .collapsible h2:before {
    content: '▸ ';
  }
  #${identifier} .collapsible.expanded {
    height: auto;
  }
  #${identifier} .collapsible.expanded h2:before {
    content: '▾ ';
  }

  

  @font-face {
    font-family: "MyriadProLightBold";
    /* src: url("../fonts/myriadpro-semibold-webfont.eot");
    src: url("../fonts/myriadpro-semibold-webfont.eot?#iefix")
        format("embedded-opentype"),
      url("../fonts/myriadpro-semibold-webfont.woff") format("woff"),
      url("../fonts/myriadpro-semibold-webfont.ttf") format("truetype"),
      url("../fonts/myriadpro-semibold-webfont.svg#MyriadProLightBold")
        format("svg"); */
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "MyriadProRegular";
    /* src: url("../fonts/myriad-webfont.eot");
    src: url("../fonts/myriad-webfont.eot?#iefix") format("embedded-opentype"),
      url("../fonts/myriad-webfont.woff") format("woff"),
      url("../fonts/myriad-webfont.ttf") format("truetype"),
      url("../fonts/myriad-webfont.svg#MyriadProRegular") format("svg"); */
    font-weight: normal;
    font-style: normal;
  }

  #${identifier} h1 {
    font-size: 1.4em;
  }
  #${identifier} h2 {
    font-size: 1.3em;
    font-weight: normal;
    border-bottom: 1px solid rgba(255, 165, 0, 1);
    margin: 0.5em 0;
    overflow: auto;
  }
  #${identifier} h2:first-child {
    margin-top: 0;
  }
  #${identifier} p + h2,
  #${identifier} div + h2 {
    margin-top: 2em;
  }
  #${identifier} h2 a {
    text-decoration: none;
  }
  #${identifier} h2 a:hover {
    text-decoration: underline;
  }
  #${identifier} h2 sub {
    display: block;
    opacity: 0.8;
  }
  #${identifier} h3 {
    font-size: 1.1em;
    font-weight: normal;
    margin: 1.5em 0 0;
  }
  #${identifier} h4 {
    font-size: 1.1em;
  }
  #${identifier} .debugReason {
    display: block;
    font-size: 0.5em;
    color: white;
    margin: 0;
    line-height: 0.1em;
    text-align: center;
  }

  #${identifier} img {
    border: none;
  }

  #${identifier} hr {
    border-color: rgba(255, 165, 0, 1);
    border-style: solid;
  }

  #${identifier} p,
  #${identifier} .faq ul,
  #${identifier} .faq ol {
    overflow: auto;
    margin: 0.5em 0;
    color: #555;
    font-size: smaller;
  }
  #${identifier} code {
    color: gray;
    font-size: smaller;
    white-space: pre-wrap;
  }
  #${identifier} span > code {
    display: block;
    color: #333;
    background: #ccc;
    padding: 1em;
    overflow: auto;
    white-space: pre;
  }
  #${identifier} .faq > table.api {
    display: block;
    overflow: auto;
  }

  #${identifier} a {
    color: rgba(255, 165, 0, 1);
  }
  #${identifier} a:hover {
    cursor: pointer;
    color: rgba(153, 153, 153, 1);
  }

  #${identifier} .brandColor {
    background: rgba(255, 165, 0, 1);
    color: rgba(255, 255, 255, 1);
  }
  #${identifier} .brandColor label {
    color: rgba(255, 225, 170, 1);
  }
  #${identifier} .brandColor a {
    color: inherit;
  }

  #${identifier} .wrapper {
    padding: 1em;
    position: relative;
  }
  #${identifier} .adheader {
    overflow: auto;
    margin: 0 auto 1em;
    text-align: center;
  }

  #${identifier} .wrapper img {
    max-width: 100%;
  }

  #${identifier} .banner {
    text-align: center;
    line-height: 3em;
    border-bottom: 1px solid rgba(255, 165, 0, 1);
  }
  #${identifier} .banner h1 {
    margin: 0;
    font-size: 2em;
  }
  #${identifier} .banner h1 a {
    text-decoration: none;
  }
  #${identifier} .banner img {
    height: 1.5em;
  }

  #${identifier} .navigation {
    list-style: none;
    margin: 0 0 -0.5em;
    padding: 0;
  }
  #${identifier} .navigation li {
    display: inline;
    border-bottom: 1px solid transparent;
  }
  #${identifier} .navigation li a {
    display: inline-block;
    text-decoration: none;
    padding: 0 1em;
    margin: 0.5em 0;
    line-height: 2em;
  }
  #${identifier} .navigation li:hover a {
    background: rgba(255, 255, 255, 1);
    color: rgba(255, 165, 0, 1);
  }

  #${identifier} .menu {
    list-style: none;
    margin: 1em 0;
    padding: 0;
    max-width: 600px;
  }
  #${identifier} .menu li a {
    background: rgba(255, 165, 0, 1);
    text-decoration: none;
    color: rgba(255, 255, 255, 1);
    display: block;
    padding: 0.5em 1em;
    margin-bottom: 0.4em;
    border: 1px solid rgba(255, 165, 0, 1);
  }
  #${identifier} .menu li a:hover {
    background: rgba(255, 255, 255, 1);
    color: rgba(255, 165, 0, 1);
  }

  #${identifier} .downloadButton {
    text-align: center;
  }

  #${identifier} footer {
    margin-top: 6em;
    font-size: x-small;
  }
  #${identifier} footer a {
    margin: 0 10px;
  }

  #${identifier} label {
    display: block;
    margin: 1em 0 0.3em;
    color: gray;
  }
  #${identifier} label sub {
    display: block;
    line-height: 1em;
  }

  #${identifier} input[type="text"],
  #${identifier} input[type="password"],
  #${identifier} input[type="number"] {
    width: 100%;
    padding: 0.5em;
    font-size: 1em;
    box-sizing: border-box;
  }

  #${identifier} select {
    padding: 0.5em;
    font-size: 1em;
    display: block;
    width: 100%;
  }

  #${identifier} textarea {
    width: 95%; /* since has padding */
    height: 6em;
  }

  #${identifier} input[type="submit"],
  #${identifier} .button {
    -webkit-appearance: none;
    text-decoration: none;
    border: none;
    border-radius: 2em;
    font-size: 1.2em;
    margin: 1em auto;
    padding: 0.5em 2em;
    font-weight: bold;
    cursor: pointer;
    background: rgba(255, 165, 0, 1);
    color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 165, 0, 1);
  }
  #${identifier} input[type="submit"]:hover,
  #${identifier} .button:hover {
    color: rgba(255, 165, 0, 1);
    background: rgba(255, 255, 255, 1);
  }
  #${identifier} input[type="submit"]:active,
  #${identifier} .button:active {
    background: rgba(255, 225, 170, 1);
    color: rgba(255, 255, 255, 1);
  }
  #${identifier} h2 .button {
    display: block;
    font-size: 0.5em;
    line-height: 0.75em;
    padding: 0.75em 1em;
    float: right;
    border-radius: 0;
    margin: 0;
    margin-left: 1em;
  }
  #${identifier} h2 .button:hover {
    text-decoration: none;
  }

  #${identifier} input[type="checkbox"] {
    position: relative;
    -webkit-appearance: none;
    display: inline-block;
    vertical-align: middle;
    font-size: 1.5em;
    line-height: 1em;
    margin: 0;
    margin-right: 0.25em;
    width: 1em;
    height: 1em;
    text-align: center;
    cursor: pointer;
    border: 1px solid gray;
  }
  #${identifier} input[type="checkbox"]:checked:after {
    content: "✓";
    display: block;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: 100%;
    border: 1px solid gray;
    background: rgba(255, 165, 0, 1);
    color: rgba(255, 255, 255, 1);
  }

  #${identifier} input[type="hidden"] + .button {
    margin-top: 1em;
    display: inline-block;
  }

  #${identifier} .admin,
  #${identifier} .menu li a.admin {
    border-style: dashed;
    opacity: 0.8;
  }
  #${identifier} .menu li a.admin {
    border-color: white;
  }
  #${identifier} .menu li a.admin:hover {
    border-color: rgba(255, 165, 0, 1);
  }
  #${identifier} .history li {
    margin: 0.2em 0;
    border: 1px dashed;
    border-left: none;
    border-right: none;
  }
  #${identifier} .admin li sub,
  #${identifier} .history li sub {
    display: block;
  }
  #${identifier} .history .admin {
    padding: 0.5em;
    margin: 0.5em 0;
    border-color: maroon;
    border-width: 3px;
  }
  #${identifier} form.admin {
    padding: 0 1em;
    margin-bottom: 0.5em;
  }
  #${identifier} li form.admin input[type="text"] {
    width: 6em; /* for client lookup */
    margin-right: 1em;
  }

  #${identifier} .error {
    color: red;
    display: block;
  }

  #${identifier} .announcement {
    display: block;
    text-align: center;
    background: #5db1cf;
    color: white;
    font-weight: bold;
    font-size: 0.7em;
  }

  #${identifier} .message {
    display: block;
    background: rgba(255, 165, 0, 1);
    padding: 1em;
    margin-bottom: 1em;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    /*
      -webkit-animation: fadeOut 2s forwards;
      animation: fadeOut 2s;
      -webkit-animation-delay: 4s;
      animation-delay: 4s;
  */
  }
  #${identifier} .message a {
    color: rgba(255, 255, 255, 1);
  }
  @-webkit-keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  #${identifier} .privateFields {
    background: #ddd;
    padding: 0.5em;
    margin-top: 2em;
  }

  #${identifier} .passList {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 3em;
  }
  #${identifier} .passList a {
    display: block;
    text-decoration: none;
    height: 2em;
    font-size: 1.5em;
    background-repeat: no-repeat;
    background-position: 0.5em center;
    padding: 0.5em;
    background-size: auto 75%;
  }
  #${identifier} .passList a sub {
    display: block;
    font-size: 0.5em;
  }
  #${identifier} .passList a:hover {
    background-color: rgba(255, 165, 0, 1);
    color: rgba(255, 255, 255, 1);
  }
  #${identifier} .passList a:hover .decoration {
    background: rgba(255, 165, 0, 1);
  }
  #${identifier} .passList a:hover .pass {
    border-color: rgba(255, 165, 0, 1);
    color: rgba(255, 165, 0, 1) !important;
    background: rgba(255, 255, 255, 1) !important;
  }

  /* pass type styling */
  #${identifier} .pass {
    border: none;
    border-radius: 0.83333333em;
    position: relative;
    overflow: hidden;
    color: white;
  }
  #${identifier}.boardingPass .pass {
    background: #4ca3d5;
  }
  #${identifier}.coupon .pass {
    border-radius: 0;
    border-top: 0.25em dotted white;
    border-bottom: 0.25em dotted white;
    background: #ffa100;
  }
  #${identifier}.eventTicket .pass {
    border-radius: 0;
    border: none;
    background: #3fca00;
  }
  #${identifier}.generic .pass {
    background: #f882ee;
  }
  #${identifier}.storeCard .pass {
    background: #ff5342;
  }
  /* old colors
  #${identifier}.boardingPass .pass {
      background: #ffd500;
      color: rgba(0,0,0,0.3);
    }
    #${identifier}.coupon .pass {
      background: #c800ff;
    }
    #${identifier}.eventTicket .pass {
      background: #d70000;
    }
    #${identifier}.generic .pass {
      background: #3794ff;
    }
    #${identifier}.storeCard .pass {
      background: #00af0d;
    }
  */
    #${identifier}.eventTicket .decoration {
    display: block;
    background: white;
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    top: -55px;
    left: 125px;
  }
  #${identifier}.boardingPass .decoration {
    display: block;
    background: white;
    position: absolute;
    width: 0.8em;
    height: 0.8em;
    border-radius: 0.4em;
    left: -0.3em;
    top: 10.5em;
  }
  #${identifier}.boardingPass .decoration + .decoration {
    right: -0.3em;
    left: auto;
  }
  #${identifier} .pass.mini {
    width: 5em;
    height: 8em;
    font-size: 0.25em;
    margin-right: 2em;
    display: inline-block;
    float: left;
  }
  #${identifier} .pass.mini:after {
    font-size: 3em;
    text-align: center;
    display: block;
    margin: auto;
    margin-top: 0.6em;
  }
  #${identifier}.boardingPass .mini:after {
    content: "✈︎"; /* doesn't look right with train or bus or boat tickets.  Ideally would style to correct transit type but characters don't all exist. */
    content: "➔";
  }
  #${identifier}.coupon .mini:after {
    content: "%";
  }
  #${identifier}.storeCard .mini:after {
    content: "$︎";
  }
  #${identifier}.eventTicket .mini:after {
    content: "7:00";
    font-size: 2em;
  }
  #${identifier}.generic .mini:after {
    content: "hi";
    font-size: 2em;
  }
  #${identifier}.boardingPass .mini .decoration {
    top: 1.6em;
  }
  #${identifier}.eventTicket .mini .decoration {
    width: 2.6em;
    height: 2.6em;
    border-radius: 1.3em;
    top: -1.5em;
    left: 1.2em;
  }

  /* Portal pages */
  #${identifier} .templateInfo {
    border-collapse: collapse;
    float: right;
    font-size: inherit;
  }
  #${identifier} .templateInfo th,
  #${identifier} .templateInfo td {
    padding: 0.6em;
    border: 3px solid white;
  }
  #${identifier} .templateInfo th {
    background: white;
    color: rgba(255, 165, 0, 1);
    padding-left: 0;
  }
  #${identifier} .templateInfo tbody th {
    text-align: right;
    font-weight: normal;
  }
  #${identifier} .templateInfo thead th {
    padding: 0.3em 0;
    border-bottom: 3px solid rgba(255, 165, 0, 1);
  }
  #${identifier} .templateInfo td {
    font-weight: bold;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 165, 0, 1);
  }

  /* PassSource Visual Pass representations */
  #${identifier} .flipper {
    -webkit-transform-style: preserve-3d;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transform-style: preserve-3d;
    -moz-transition: all 0.5s ease-in-out;
  }
  #${identifier} .flipped .flipper,
  #${identifier} .flipped.flipper {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
  }
  #${identifier} .flipper > * {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
  }
  #${identifier} .flipper > *:first-child {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
  }

  #${identifier} #passJson {
    display: none;
  }
  #${identifier} {
    margin: 0 auto 1em;
    max-width: 320px;
    max-height: 480px;
    font-family: ${PASS_FONT_STACK};
    position: relative;
  }

  #${identifier} .barcode,
  #${identifier} .passbookField,
  #${identifier} .beacons > .controlElement,
  #${identifier} .locations > .controlElement {
    border: 2px solid rgba(255, 165, 0, 1);
    padding: 1em;
  }

  #${identifier} .editorFields .button {
    text-align: center;
    display: block;
    border-radius: 0;
    font-size: 1em;
    margin: 0;
    padding: 0;
    clear: both;
  }

  #${identifier} .controlElement.editable > label {
    color: rgba(255, 165, 0, 1);
  }

  /* Registration and Editor pages */
  #${identifier} .stepper .button {
    display: inline;
    border-radius: 50px;
    font-size: 1.2em;
    padding: 0.4em 1.2em;
    /*line-height: 36px;*/
  }
  #${identifier} .stepper .button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 1em;
  }
  #${identifier} .stepper input {
    width: 4em;
    text-align: center;
  }
  #${identifier} .stepper .button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 1em;
  }

  #${identifier} .home img {
    max-width: 100%;
  }
  #${identifier} .home aside {
    text-align: center;
  }
  #${identifier} .home aside h3 {
    margin: 1em 0 2em;
  }
  #${identifier} .home aside p {
    margin-bottom: 2em;
    color: gray;
    margin-top: 1em;
  }

  #${identifier} .companies {
    list-style: none;
    padding: 0;
  }
  #${identifier} .companies li {
    padding-bottom: 1em;
  }
  #${identifier} .companies h4 {
    margin: 0;
  }
  #${identifier} .companies p {
    color: gray;
    margin: 0;
  }

  #${identifier} table.api {
    border-collapse: collapse;
    margin-bottom: 1em;
  }
  #${identifier} table.api th,
  #${identifier} table.api td {
    padding: 0.5em;
    border: 1px solid rgba(255, 165, 0, 1);
  }
  #${identifier} table.api th {
    background: rgba(255, 165, 0, 1);
    text-align: left;
    color: white;
    font-weight: normal;
  }
  #${identifier} table.api th:first-child {
    border-right: 1px solid white;
    text-align: right;
  }
  #${identifier} table.api td:first-child {
    background: rgba(255, 165, 0, 1);
    opacity: 0.6;
    text-align: right;
    color: white;
    white-space: nowrap;
    vertical-align: top;
  }
  #${identifier} table.api td table.api {
    width: 100%;
  }
  #${identifier} table.api td table.api td:first-child {
    width: 30%;
  }
  #${identifier} table.api td table.api + table.api {
    margin-bottom: 0;
    margin-top: 1em;
  }

  #${identifier} div.rui-colorpicker {
    font-size: 14px;
  }

  #${identifier} div.rui-colorpicker div.field,
  #${identifier} div.rui-colorpicker div.field div.pointer,
  #${identifier} div.rui-colorpicker div.colors,
  #${identifier} div.rui-colorpicker div.colors div.pointer {
    /* background-image: url(../images/colorpicker.png) !important; */
  }

  #${identifier} div.rui-colorpicker input.display,
  #${identifier} div.rui-colorpicker div.rgb-display {
    display: none !important;
  }

  #${identifier}  div.rui-colorpicker.rui-panel {
    width: 20em;
  }

  #${identifier} #images img {
    background: rgba(255, 165, 0, 1);
  }

  #${identifier} .checklist li {
    list-style-type: circle;
  }
  #${identifier} .checklist li.complete {
    list-style-type: disc;
  }
  #${identifier} .checklist em {
    color: rgba(255, 165, 0, 1);
  }

  #${identifier} .pagination {
    text-align: right;
  }
  #${identifier} .pagination:before {
    content: "Page: ";
  }
  #${identifier} .pagination a {
    text-decoration: none;
  }
  #${identifier} .pagination_current {
    font-weight: bold;
  }
`;
