import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{C as c}from"./Comparison-DdPFIAR4.js";import{v}from"./index-SvsTIwFY.js";import"./index-D6s9G_Oc.js";import"./index-3NMXXukK.js";const i=d=>{const h=structuredClone(v),N=h["pass.json"];return N.posterGeneric=d,h},m={values:v,screenshot:"vltava-club-ios-26.5",referenceLabel:"iOS Wallet — iOS 26.5",variant:"fallback"},R={values:v,screenshot:"vltava-club-ios-27.0",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},D={title:"Examples/Vltava Club",render:d=>n.jsx(c,{...d}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout."}}}},e={name:"Both variants",args:m,tags:["vrt:skip"],render:()=>n.jsxs("div",{style:{display:"flex",gap:48,alignItems:"flex-start"},children:[n.jsx(c,{...m}),n.jsx(c,{...R})]})},r={name:"iOS 26.5 (generic)",tags:["vrt"],args:m},t={name:"iOS 27.0 (posterGeneric)",tags:["vrt"],args:R,parameters:{docs:{description:{story:"The web poster follows the iOS 27 structure: constrained logoText, a single-line header value, a large title plus right-aligned member column, and a value-only footer. Remaining differences are browser font metrics and the QR/artwork raster scaling."}}}},a={name:"Poster front text — short",tags:["vrt"],args:{values:i({primaryFields:[{key:"title",value:"Vltava Club"}]}),screenshot:"vltava-club-poster-short-text-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: the bottom band contains only the Vltava Club title; the top-right header slot and footer are empty, while the logo and truncated logoText ("Vltava…") remain top-left. The web render now matches that field structure and logoText truncation; only browser font metrics and raster scaling remain different.'}}}},s={name:"Poster front text — long Czech",tags:["vrt"],args:{values:i({headerFields:[{key:"membership",label:"ČLENSTVÍ",value:"Zlaté celoroční s výhodami"}],primaryFields:[{key:"title",value:"Vltavský klub přátel Pražského hradu a Karlova mostu"},{key:"member",label:"ČLENKA",value:"Žofie Přemyslovna Dvořáčková-Šťastná"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-2026-ŽLUŤOUČKÝ-0024-PRAHA"}]}),screenshot:"vltava-club-poster-long-czech-text-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: the header value is a single truncated line ("Zlaté celoroční s výh…"); the smaller title uses two lines and cuts off after "Vltavský klub přátel / Pražského hradu a Karlova"; the member name truncates to "Žofie Přemyslovna Dvořáčk…"; logoText truncates to "Vltava…"; and the full footer value "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA" appears without its label. The web render now follows the same one-line/two-line clamps, single-row field structure, logoText constraint, and value-only footer. Exact ellipsis points can still vary slightly with browser font metrics.'}}}},o={name:"Poster front text — more primary fields",tags:["vrt"],args:{values:i({headerFields:[{key:"status",label:"STAV",value:"Aktivní"}],primaryFields:[{key:"title",value:"Vltava Club"},{key:"member",label:"ČLENKA",value:"Anna"},{key:"level",label:"ÚROVEŇ",value:"Gold"},{key:"points",label:"BODY",value:"1 250"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-0024"}]}),screenshot:"vltava-club-poster-more-primary-fields-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all four primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna, Úroveň/Gold, and Body/1 250 label/value columns—shrinking the title and values to fit. The web renderer now preserves all four fields in that order and row, shows footer value "VC-0024" without its label, and constrains logoText to "Vltava…". Remaining differences are limited to browser font metrics and raster scaling.'}}}},l={name:"Poster front text — three primary fields",tags:["vrt"],args:{values:i({headerFields:[{key:"status",label:"STAV",value:"Aktivní"}],primaryFields:[{key:"title",value:"Vltava Club"},{key:"member",label:"ČLENKA",value:"Anna"},{key:"level",label:"ÚROVEŇ",value:"Gold"}],footerFields:[{key:"member-id",label:"ČLENSKÉ ČÍSLO",value:"VC-0024"}]}),screenshot:"vltava-club-poster-three-primary-fields-ios-27",referenceLabel:"iOS Wallet — iOS 27.0",variant:"poster"},parameters:{docs:{description:{story:'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all three primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna and Úroveň/Gold label/value columns on the right. The header shows STAV/Aktivní, logoText is truncated to "Vltava…", and the footer shows value "VC-0024" without its label. The web renderer keeps the same field order and row. Remaining differences are limited to typography (browser font metrics), artwork crop/raster scaling, and the shade of the bottom band.'}}}};var u,p,b;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Both variants",
  args: fallbackArgs,
  tags: ["vrt:skip"],
  render: () => <div style={{
    display: "flex",
    gap: 48,
    alignItems: "flex-start"
  }}>
      <Comparison {...fallbackArgs} />
      <Comparison {...posterArgs} />
    </div>
}`,...(b=(p=e.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var f,g,y;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs
}`,...(y=(g=r.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var w,k,S;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "iOS 27.0 (posterGeneric)",
  tags: ["vrt"],
  args: posterArgs,
  parameters: {
    docs: {
      description: {
        story: "The web poster follows the iOS 27 structure: constrained logoText, a single-line header value, a large title plus right-aligned member column, and a value-only footer. Remaining differences are browser font metrics and the QR/artwork raster scaling."
      }
    }
  }
}`,...(S=(k=t.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var O,P,V;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: the bottom band contains only the Vltava Club title; the top-right header slot and footer are empty, while the logo and truncated logoText ("Vltava…") remain top-left. The web render now matches that field structure and logoText truncation; only browser font metrics and raster scaling remain different.'
      }
    }
  }
}`,...(V=(P=a.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var x,A,T;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: the header value is a single truncated line ("Zlaté celoroční s výh…"); the smaller title uses two lines and cuts off after "Vltavský klub přátel / Pražského hradu a Karlova"; the member name truncates to "Žofie Přemyslovna Dvořáčk…"; logoText truncates to "Vltava…"; and the full footer value "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA" appears without its label. The web render now follows the same one-line/two-line clamps, single-row field structure, logoText constraint, and value-only footer. Exact ellipsis points can still vary slightly with browser font metrics.'
      }
    }
  }
}`,...(T=(A=s.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var C,L,F;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all four primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna, Úroveň/Gold, and Body/1 250 label/value columns—shrinking the title and values to fit. The web renderer now preserves all four fields in that order and row, shows footer value "VC-0024" without its label, and constrains logoText to "Vltava…". Remaining differences are limited to browser font metrics and raster scaling.'
      }
    }
  }
}`,...(F=(L=o.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var E,G,K;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
    docs: {
      description: {
        story: 'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all three primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna and Úroveň/Gold label/value columns on the right. The header shows STAV/Aktivní, logoText is truncated to "Vltava…", and the footer shows value "VC-0024" without its label. The web renderer keeps the same field order and row. Remaining differences are limited to typography (browser font metrics), artwork crop/raster scaling, and the shade of the bottom band.'
      }
    }
  }
}`,...(K=(G=l.parameters)==null?void 0:G.docs)==null?void 0:K.source}}};const I=["BothVariants","Ios265Generic","Ios270PosterGeneric","PosterShortText","PosterLongCzechText","PosterMorePrimaryFields","PosterThreePrimaryFields"];export{e as BothVariants,r as Ios265Generic,t as Ios270PosterGeneric,s as PosterLongCzechText,o as PosterMorePrimaryFields,a as PosterShortText,l as PosterThreePrimaryFields,I as __namedExportsOrder,D as default};
