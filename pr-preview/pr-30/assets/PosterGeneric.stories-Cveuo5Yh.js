import{j as x}from"./jsx-runtime-BjG_zV1W.js";import{C as P}from"./Comparison-Ca3SRPM8.js";import{p as V,w as s}from"./vltavaClubArgs-DBcfPx3z.js";import"./index-7HgYpVP8.js";import"./index-DDqTwqBQ.js";import"./index-SvsTIwFY.js";const E={title:"Pass styles/Poster Generic (iOS 27)",id:"poster-generic-ios-27",render:k=>x.jsx(P,{...k}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'posterGeneric — the iOS 27 pass style: full-bleed artwork, logo and constrained logoText top-left, one header value top-right, a bottom band with a large unlabeled title plus up to three label/value columns, a centered barcode and a value-only footer. `<PKPassPreview variant="poster" />` uses this style when the pass has a `posterGeneric` block, otherwise the classic pass style. In Vltava Club the concrete fallback is `generic`, which Wallet before iOS 27 shows — see [Examples / Vltava Club](?path=/docs/examples-vltava-club--docs) for both side by side. Examples use Vltava Club fixtures with iPhone 17 Pro / iOS 27.0 references.'}}}},e={name:"iOS 27.0 (posterGeneric)",tags:["vrt"],args:V,parameters:{__id:"examples-vltava-club--ios-270-poster-generic",docs:{description:{story:"The web poster follows the iOS 27 structure: constrained logoText, a single-line header value, a large title plus right-aligned member column, and a value-only footer. Remaining differences are browser font metrics and the QR/artwork raster scaling."}}}},t={name:"Poster front text — short",tags:["vrt"],args:{values:s({primaryFields:[{key:"title",value:"Vltava Club"}]}),screenshot:"vltava-club-poster-short-text-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{__id:"examples-vltava-club--poster-short-text",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: the bottom band contains only the Vltava Club title; the top-right header slot and footer are empty, while the logo and truncated logoText ("Vltava…") remain top-left. The web render now matches that field structure and logoText truncation; only browser font metrics and raster scaling remain different.'}}}},a={name:"Poster front text — long Czech",tags:["vrt"],args:{values:s({headerFields:[{key:"membership",label:"ČLENSTVÍ",value:"Zlaté celoroční s výhodami"}],primaryFields:[{key:"title",value:"Vltavský klub přátel Pražského hradu a Karlova mostu"},{key:"member",label:"ČLENKA",value:"Žofie Přemyslovna Dvořáčková-Šťastná"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-2026-ŽLUŤOUČKÝ-0024-PRAHA"}]}),screenshot:"vltava-club-poster-long-czech-text-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{__id:"examples-vltava-club--poster-long-czech-text",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: the header value is a single truncated line ("Zlaté celoroční s výh…"); the smaller title uses two lines and cuts off after "Vltavský klub přátel / Pražského hradu a Karlova"; the member name truncates to "Žofie Přemyslovna Dvořáčk…"; logoText truncates to "Vltava…"; and the full footer value "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA" appears without its label. The web render now follows the same one-line/two-line clamps, single-row field structure, logoText constraint, and value-only footer. Exact ellipsis points can still vary slightly with browser font metrics.'}}}},r={name:"Poster front text — three primary fields",tags:["vrt"],args:{values:s({headerFields:[{key:"status",label:"STAV",value:"Aktivní"}],primaryFields:[{key:"title",value:"Vltava Club"},{key:"member",label:"ČLENKA",value:"Anna"},{key:"level",label:"ÚROVEŇ",value:"Gold"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-0024"}]}),screenshot:"vltava-club-poster-three-primary-fields-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{__id:"examples-vltava-club--poster-three-primary-fields",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all three primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna and Úroveň/Gold label/value columns on the right. The header shows STAV/Aktivní, logoText is truncated to "Vltava…", and the footer shows value "VC-0024" without its label. The web renderer keeps the same field order and row. Remaining differences are limited to typography (browser font metrics), artwork crop/raster scaling, and the shade of the bottom band.'}}}},l={name:"Poster front text — more primary fields",tags:["vrt"],args:{values:s({headerFields:[{key:"status",label:"STAV",value:"Aktivní"}],primaryFields:[{key:"title",value:"Vltava Club"},{key:"member",label:"ČLENKA",value:"Anna"},{key:"level",label:"ÚROVEŇ",value:"Gold"},{key:"points",label:"BODY",value:"1 250"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-0024"}]}),screenshot:"vltava-club-poster-more-primary-fields-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{__id:"examples-vltava-club--poster-more-primary-fields",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all four primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna, Úroveň/Gold, and Body/1 250 label/value columns—shrinking the title and values to fit. The web renderer now preserves all four fields in that order and row, shows footer value "VC-0024" without its label, and constrains logoText to "Vltava…". Remaining differences are limited to browser font metrics and raster scaling.'}}}};var o,i,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "iOS 27.0 (posterGeneric)",
  tags: ["vrt"],
  args: posterArgs,
  parameters: {
    // Keeps the original Examples/Vltava Club story id so existing links and
    // VRT baselines still resolve after the move.
    __id: "examples-vltava-club--ios-270-poster-generic",
    docs: {
      description: {
        story: "The web poster follows the iOS 27 structure: constrained logoText, a single-line header value, a large title plus right-aligned member column, and a value-only footer. Remaining differences are browser font metrics and the QR/artwork raster scaling."
      }
    }
  }
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var d,c,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Poster front text — short",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      primaryFields: [{
        key: "title",
        value: "Vltava Club"
      }]
    }),
    screenshot: "vltava-club-poster-short-text-ios-27",
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster"
  },
  parameters: {
    // Keeps the original Examples/Vltava Club story id so existing links and
    // VRT baselines still resolve after the move.
    __id: "examples-vltava-club--poster-short-text",
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: the bottom band contains only the Vltava Club title; the top-right header slot and footer are empty, while the logo and truncated logoText ("Vltava…") remain top-left. The web render now matches that field structure and logoText truncation; only browser font metrics and raster scaling remain different.'
      }
    }
  }
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var v,h,u;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Poster front text — long Czech",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      headerFields: [{
        key: "membership",
        label: "ČLENSTVÍ",
        value: "Zlaté celoroční s výhodami"
      }],
      primaryFields: [{
        key: "title",
        value: "Vltavský klub přátel Pražského hradu a Karlova mostu"
      }, {
        key: "member",
        label: "ČLENKA",
        value: "Žofie Přemyslovna Dvořáčková-Šťastná"
      }],
      footerFields: [{
        key: "member-id",
        label: "ČLENSKÉ ČÍSLO",
        value: "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA"
      }]
    }),
    screenshot: "vltava-club-poster-long-czech-text-ios-27",
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster"
  },
  parameters: {
    // Keeps the original Examples/Vltava Club story id so existing links and
    // VRT baselines still resolve after the move.
    __id: "examples-vltava-club--poster-long-czech-text",
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: the header value is a single truncated line ("Zlaté celoroční s výh…"); the smaller title uses two lines and cuts off after "Vltavský klub přátel / Pražského hradu a Karlova"; the member name truncates to "Žofie Přemyslovna Dvořáčk…"; logoText truncates to "Vltava…"; and the full footer value "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA" appears without its label. The web render now follows the same one-line/two-line clamps, single-row field structure, logoText constraint, and value-only footer. Exact ellipsis points can still vary slightly with browser font metrics.'
      }
    }
  }
}`,...(u=(h=a.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var p,b,f;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Poster front text — three primary fields",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      headerFields: [{
        key: "status",
        label: "STAV",
        value: "Aktivní"
      }],
      primaryFields: [{
        key: "title",
        value: "Vltava Club"
      }, {
        key: "member",
        label: "ČLENKA",
        value: "Anna"
      }, {
        key: "level",
        label: "ÚROVEŇ",
        value: "Gold"
      }],
      footerFields: [{
        key: "member-id",
        label: "ČLENSKÉ ČÍSLO",
        value: "VC-0024"
      }]
    }),
    screenshot: "vltava-club-poster-three-primary-fields-ios-27",
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster"
  },
  parameters: {
    // Keeps the original Examples/Vltava Club story id so existing links and
    // VRT baselines still resolve after the move.
    __id: "examples-vltava-club--poster-three-primary-fields",
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all three primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna and Úroveň/Gold label/value columns on the right. The header shows STAV/Aktivní, logoText is truncated to "Vltava…", and the footer shows value "VC-0024" without its label. The web renderer keeps the same field order and row. Remaining differences are limited to typography (browser font metrics), artwork crop/raster scaling, and the shade of the bottom band.'
      }
    }
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var g,y,w;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Poster front text — more primary fields",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      headerFields: [{
        key: "status",
        label: "STAV",
        value: "Aktivní"
      }],
      primaryFields: [{
        key: "title",
        value: "Vltava Club"
      }, {
        key: "member",
        label: "ČLENKA",
        value: "Anna"
      }, {
        key: "level",
        label: "ÚROVEŇ",
        value: "Gold"
      }, {
        key: "points",
        label: "BODY",
        value: "1 250"
      }],
      footerFields: [{
        key: "member-id",
        label: "ČLENSKÉ ČÍSLO",
        value: "VC-0024"
      }]
    }),
    screenshot: "vltava-club-poster-more-primary-fields-ios-27",
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster"
  },
  parameters: {
    // Keeps the original Examples/Vltava Club story id so existing links and
    // VRT baselines still resolve after the move.
    __id: "examples-vltava-club--poster-more-primary-fields",
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all four primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna, Úroveň/Gold, and Body/1 250 label/value columns—shrinking the title and values to fit. The web renderer now preserves all four fields in that order and row, shows footer value "VC-0024" without its label, and constrains logoText to "Vltava…". Remaining differences are limited to browser font metrics and raster scaling.'
      }
    }
  }
}`,...(w=(y=l.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};const K=["Ios270PosterGeneric","PosterShortText","PosterLongCzechText","PosterThreePrimaryFields","PosterMorePrimaryFields"];export{e as Ios270PosterGeneric,a as PosterLongCzechText,l as PosterMorePrimaryFields,t as PosterShortText,r as PosterThreePrimaryFields,K as __namedExportsOrder,E as default};
