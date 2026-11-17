import{j as T}from"./jsx-runtime-BjG_zV1W.js";import{c as o,C as O}from"./Comparison-J6RwNeIG.js";import{b as e}from"./scenarioCatalog-DgF1eLhD.js";import{p as A,w as i}from"./vltavaClubArgs-ebJ42zAl.js";import"./index-7HgYpVP8.js";import"./index-DDqTwqBQ.js";import"./index-SvsTIwFY.js";const _={title:"Pass styles/Poster Generic (iOS 27)",id:"poster-generic-ios-27",render:(V,P)=>T.jsx(O,{...V,scenarioId:P.id}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'posterGeneric — the iOS 27 pass style: full-bleed artwork, logo and constrained logoText top-left, one header value top-right, a bottom band with a large unlabeled title plus up to three label/value columns, a centered barcode and a value-only footer. `<PKPassPreview variant="poster" />` uses this style when the pass has a `posterGeneric` block, otherwise the classic pass style. In Vltava Club the concrete fallback is `generic`, which Wallet before iOS 27 shows — see [Examples / Vltava Club](?path=/docs/examples-vltava-club--docs) for both side by side. Examples use Vltava Club fixtures with iPhone 17 Pro / iOS 27.0 references.'}}}},t={name:e("examples-vltava-club--ios-270-poster-generic"),tags:["vrt"],args:A,parameters:{__id:"examples-vltava-club--ios-270-poster-generic",docs:{description:{story:"The web poster follows the iOS 27 structure: constrained logoText, a single-line header value, a large title plus right-aligned member column, and a value-only footer. Remaining differences are browser font metrics and the QR/artwork raster scaling."}}}},a={name:e("examples-vltava-club--poster-short-text"),tags:["vrt"],args:o("examples-vltava-club--poster-short-text",i({primaryFields:[{key:"title",value:"Vltava Club"}]}),{variant:"poster",targetOs:"ios27"}),parameters:{__id:"examples-vltava-club--poster-short-text",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: the bottom band contains only the Vltava Club title; the top-right header slot and footer are empty, while the logo and truncated logoText ("Vltava…") remain top-left. The web render now matches that field structure and logoText truncation; only browser font metrics and raster scaling remain different.'}}}},r={name:e("examples-vltava-club--poster-long-czech-text"),tags:["vrt"],args:o("examples-vltava-club--poster-long-czech-text",i({headerFields:[{key:"membership",label:"ČLENSTVÍ",value:"Zlaté celoroční s výhodami"}],primaryFields:[{key:"title",value:"Vltavský klub přátel Pražského hradu a Karlova mostu"},{key:"member",label:"ČLENKA",value:"Žofie Přemyslovna Dvořáčková-Šťastná"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-2026-ŽLUŤOUČKÝ-0024-PRAHA"}]}),{variant:"poster",targetOs:"ios27"}),parameters:{__id:"examples-vltava-club--poster-long-czech-text",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: the header value is a single truncated line ("Zlaté celoroční s výh…"); the smaller title uses two lines and cuts off after "Vltavský klub přátel / Pražského hradu a Karlova"; the member name truncates to "Žofie Přemyslovna Dvořáčk…"; logoText truncates to "Vltava…"; and the full footer value "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA" appears without its label. The web render now follows the same one-line/two-line clamps, single-row field structure, logoText constraint, and value-only footer. Exact ellipsis points can still vary slightly with browser font metrics.'}}}},s={name:e("examples-vltava-club--poster-three-primary-fields"),tags:["vrt"],args:o("examples-vltava-club--poster-three-primary-fields",i({headerFields:[{key:"status",label:"STAV",value:"Aktivní"}],primaryFields:[{key:"title",value:"Vltava Club"},{key:"member",label:"ČLENKA",value:"Anna"},{key:"level",label:"ÚROVEŇ",value:"Gold"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-0024"}]}),{variant:"poster",targetOs:"ios27"}),parameters:{__id:"examples-vltava-club--poster-three-primary-fields",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all three primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna and Úroveň/Gold label/value columns on the right. The header shows STAV/Aktivní, logoText is truncated to "Vltava…", and the footer shows value "VC-0024" without its label. The web renderer keeps the same field order and row. Remaining differences are limited to typography (browser font metrics), artwork crop/raster scaling, and the shade of the bottom band.'}}}},l={name:e("examples-vltava-club--poster-more-primary-fields"),tags:["vrt"],args:o("examples-vltava-club--poster-more-primary-fields",i({headerFields:[{key:"status",label:"STAV",value:"Aktivní"}],primaryFields:[{key:"title",value:"Vltava Club"},{key:"member",label:"ČLENKA",value:"Anna"},{key:"level",label:"ÚROVEŇ",value:"Gold"},{key:"points",label:"BODY",value:"1 250"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-0024"}]}),{variant:"poster",targetOs:"ios27"}),parameters:{__id:"examples-vltava-club--poster-more-primary-fields",docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all four primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna, Úroveň/Gold, and Body/1 250 label/value columns—shrinking the title and values to fit. The web renderer now preserves all four fields in that order and row, shows footer value "VC-0024" without its label, and constrains logoText to "Vltava…". Remaining differences are limited to browser font metrics and raster scaling.'}}}};var n,d,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--ios-270-poster-generic"),
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
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var c,v,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--poster-short-text"),
  tags: ["vrt"],
  args: comparisonArgs("examples-vltava-club--poster-short-text", withPosterGeneric({
    primaryFields: [{
      key: "title",
      value: "Vltava Club"
    }]
  }), {
    variant: "poster",
    targetOs: "ios27"
  }),
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
}`,...(p=(v=a.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var h,u,b;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--poster-long-czech-text"),
  tags: ["vrt"],
  args: comparisonArgs("examples-vltava-club--poster-long-czech-text", withPosterGeneric({
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
  }), {
    variant: "poster",
    targetOs: "ios27"
  }),
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
}`,...(b=(u=r.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var g,f,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--poster-three-primary-fields"),
  tags: ["vrt"],
  args: comparisonArgs("examples-vltava-club--poster-three-primary-fields", withPosterGeneric({
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
  }), {
    variant: "poster",
    targetOs: "ios27"
  }),
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
}`,...(y=(f=s.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var w,x,k;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--poster-more-primary-fields"),
  tags: ["vrt"],
  args: comparisonArgs("examples-vltava-club--poster-more-primary-fields", withPosterGeneric({
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
  }), {
    variant: "poster",
    targetOs: "ios27"
  }),
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
}`,...(k=(x=l.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};const G=["Ios270PosterGeneric","PosterShortText","PosterLongCzechText","PosterThreePrimaryFields","PosterMorePrimaryFields"];export{t as Ios270PosterGeneric,r as PosterLongCzechText,l as PosterMorePrimaryFields,a as PosterShortText,s as PosterThreePrimaryFields,G as __namedExportsOrder,_ as default};
