import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as u}from"./index-DDqTwqBQ.js";import{C as r}from"./Comparison-DDT60Vq9.js";import{b as d}from"./scenarioCatalog-CMmlZQ6l.js";import{f as i,p as x}from"./vltavaClubArgs-CGqTJHgz.js";import"./index-7HgYpVP8.js";import"./index-SvsTIwFY.js";const b=()=>{const[e,o]=u.useState("ios27");return a.jsxs("div",{className:"vltava-both-detail",children:[a.jsxs("div",{className:"vltava-version-switch","aria-label":"Apple Wallet version",children:[a.jsx("button",{type:"button","aria-pressed":e==="ios27",onClick:()=>o("ios27"),children:"iOS 27.0"}),a.jsx("button",{type:"button","aria-pressed":e==="ios26",onClick:()=>o("ios26"),children:"iOS 26.5"})]}),a.jsxs("div",{className:"vltava-variants",children:[a.jsx("div",{className:`vltava-variant ${e==="ios27"?"is-active":""}`,children:a.jsx(r,{...x})}),a.jsx("div",{className:`vltava-variant ${e==="ios26"?"is-active":""}`,children:a.jsx(r,{...i})})]})]})},O={title:"Examples/Vltava Club",id:"examples-vltava-club",render:e=>a.jsx(r,{...e}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs)."}}}},s={name:d("examples-vltava-club--both-variants"),args:i,tags:["vrt:skip"],parameters:{__id:"examples-vltava-club--both-variants"},render:()=>a.jsx(b,{})},t={name:d("examples-vltava-club--ios-265-generic"),tags:["vrt"],args:i,parameters:{__id:"examples-vltava-club--ios-265-generic"}};var n,l,c;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--both-variants"),
  args: fallbackArgs,
  tags: ["vrt:skip"],
  parameters: {
    __id: "examples-vltava-club--both-variants"
  },
  render: () => <BothVariantsDetail />
}`,...(c=(l=s.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var p,v,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: scenarioTitle("examples-vltava-club--ios-265-generic"),
  tags: ["vrt"],
  args: fallbackArgs,
  parameters: {
    __id: "examples-vltava-club--ios-265-generic"
  }
}`,...(m=(v=t.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};const C=["BothVariants","Ios265Generic"];export{s as BothVariants,t as Ios265Generic,C as __namedExportsOrder,O as default};
