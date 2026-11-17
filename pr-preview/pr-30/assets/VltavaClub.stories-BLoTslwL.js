import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as b}from"./index-DDqTwqBQ.js";import{C as i}from"./Comparison-niCPtXBm.js";import{b as d}from"./scenarioCatalog-CkKchWjF.js";import{f as o,p as u}from"./vltavaClubArgs-DJxA5xX5.js";import"./index-7HgYpVP8.js";import"./index-SvsTIwFY.js";const x=()=>{const[e,s]=b.useState("ios27");return a.jsxs("div",{className:"vltava-both-detail",children:[a.jsxs("div",{className:"vltava-version-switch","aria-label":"Apple Wallet version",children:[a.jsx("button",{type:"button","aria-pressed":e==="ios27",onClick:()=>s("ios27"),children:"iOS 27.0"}),a.jsx("button",{type:"button","aria-pressed":e==="ios26",onClick:()=>s("ios26"),children:"iOS 26.5"})]}),a.jsxs("div",{className:"vltava-variants",children:[a.jsx("div",{className:`vltava-variant ${e==="ios27"?"is-active":""}`,children:a.jsx(i,{...u,scenarioId:"examples-vltava-club--both-variants"})}),a.jsx("div",{className:`vltava-variant ${e==="ios26"?"is-active":""}`,children:a.jsx(i,{...o,scenarioId:"examples-vltava-club--both-variants"})})]})]})},O={title:"Examples/Vltava Club",id:"examples-vltava-club",render:(e,s)=>a.jsx(i,{...e,scenarioId:s.id}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs)."}}}},t={name:d("examples-vltava-club--both-variants"),args:o,tags:["vrt:skip"],parameters:{__id:"examples-vltava-club--both-variants"},render:()=>a.jsx(x,{})},r={name:d("examples-vltava-club--ios-265-generic"),tags:["vrt"],args:o,parameters:{__id:"examples-vltava-club--ios-265-generic"}};var n,l,c;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--both-variants"),
  args: fallbackArgs,
  tags: ["vrt:skip"],
  parameters: {
    __id: "examples-vltava-club--both-variants"
  },
  render: () => <BothVariantsDetail />
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var v,p,m;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--ios-265-generic"),
  tags: ["vrt"],
  args: fallbackArgs,
  parameters: {
    __id: "examples-vltava-club--ios-265-generic"
  }
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const C=["BothVariants","Ios265Generic"];export{t as BothVariants,r as Ios265Generic,C as __namedExportsOrder,O as default};
