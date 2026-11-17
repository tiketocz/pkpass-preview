import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{C as r}from"./Comparison-iPhrxzet.js";import{f as t,p as d}from"./vltavaClubArgs-DBcfPx3z.js";import"./index-D6s9G_Oc.js";import"./index-3NMXXukK.js";import"./index-SvsTIwFY.js";const b={title:"Examples/Vltava Club",render:m=>e.jsx(r,{...m}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs)."}}}},a={name:"Both variants",args:t,tags:["vrt:skip"],render:()=>e.jsxs("div",{className:"vltava-variants",style:{display:"flex",gap:48,alignItems:"flex-start"},children:[e.jsx(r,{...t}),e.jsx(r,{...d})]})},s={name:"iOS 26.5 (generic)",tags:["vrt"],args:t};var n,o,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Both variants",
  args: fallbackArgs,
  tags: ["vrt:skip"],
  render: () => <div className="vltava-variants" style={{
    display: "flex",
    gap: 48,
    alignItems: "flex-start"
  }}>
      <Comparison {...fallbackArgs} />
      <Comparison {...posterArgs} />
    </div>
}`,...(i=(o=a.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var c,l,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs
}`,...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const k=["BothVariants","Ios265Generic"];export{a as BothVariants,s as Ios265Generic,k as __namedExportsOrder,b as default};
