import{j as s}from"./jsx-runtime-BjG_zV1W.js";import{C as a}from"./Comparison-DdPFIAR4.js";import{f as t,p as d}from"./vltavaClubArgs-DBcfPx3z.js";import"./index-D6s9G_Oc.js";import"./index-3NMXXukK.js";import"./index-SvsTIwFY.js";const b={title:"Examples/Vltava Club",render:m=>s.jsx(a,{...m}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs)."}}}},e={name:"Both variants",args:t,tags:["vrt:skip"],render:()=>s.jsxs("div",{style:{display:"flex",gap:48,alignItems:"flex-start"},children:[s.jsx(a,{...t}),s.jsx(a,{...d})]})},r={name:"iOS 26.5 (generic)",tags:["vrt"],args:t};var n,o,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var p,c,l;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const k=["BothVariants","Ios265Generic"];export{e as BothVariants,r as Ios265Generic,k as __namedExportsOrder,b as default};
