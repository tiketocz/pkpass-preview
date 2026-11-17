import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{r as m}from"./index-3NMXXukK.js";import{C as i}from"./Comparison-uk3WbgbM.js";import{f as n,p as u}from"./vltavaClubArgs-B6DzcUdN.js";import"./index-BJ7Zqdx-.js";import"./scenarioCatalog-h1R6I7ry.js";import"./index-SvsTIwFY.js";const b=()=>{const[e,s]=m.useState("ios27");return a.jsxs("div",{className:"vltava-both-detail",children:[a.jsxs("div",{className:"vltava-version-switch","aria-label":"Apple Wallet version",children:[a.jsx("button",{type:"button","aria-pressed":e==="ios27",onClick:()=>s("ios27"),children:"iOS 27.0"}),a.jsx("button",{type:"button","aria-pressed":e==="ios26",onClick:()=>s("ios26"),children:"iOS 26.5"})]}),a.jsxs("div",{className:"vltava-variants",children:[a.jsx("div",{className:`vltava-variant ${e==="ios27"?"is-active":""}`,children:a.jsx(i,{...u,scenarioId:"examples-vltava-club--both-variants"})}),a.jsx("div",{className:`vltava-variant ${e==="ios26"?"is-active":""}`,children:a.jsx(i,{...n,scenarioId:"examples-vltava-club--both-variants"})})]})]})},k={title:"Examples/Vltava Club",id:"examples-vltava-club",render:(e,s)=>a.jsx(i,{...e,scenarioId:s.id}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs)."}}}},t={name:"Vltava Club — iOS 26.5 and iOS 27.0",args:n,tags:["vrt:skip"],parameters:{__id:"examples-vltava-club--both-variants",controls:{disable:!0},options:{showPanel:!1}},render:()=>a.jsx(b,{})},r={name:"Vltava Club — iOS 26.5 generic fallback",tags:["vrt"],args:n,parameters:{__id:"examples-vltava-club--ios-265-generic"}};var o,l,c;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Vltava Club — iOS 26.5 and iOS 27.0",
  args: fallbackArgs,
  tags: ["vrt:skip"],
  parameters: {
    __id: "examples-vltava-club--both-variants",
    controls: {
      disable: true
    },
    options: {
      showPanel: false
    }
  },
  render: () => <BothVariantsDetail />
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,p,v;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Vltava Club — iOS 26.5 generic fallback",
  tags: ["vrt"],
  args: fallbackArgs,
  parameters: {
    __id: "examples-vltava-club--ios-265-generic"
  }
}`,...(v=(p=r.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};const C=["BothVariants","Ios265Generic"];export{t as BothVariants,r as Ios265Generic,C as __namedExportsOrder,k as default};
