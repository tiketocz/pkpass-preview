import{j as s}from"./jsx-runtime-BjG_zV1W.js";import{C as r}from"./Comparison-Ca3SRPM8.js";import{f as t,p as d}from"./vltavaClubArgs-DBcfPx3z.js";import"./index-7HgYpVP8.js";import"./index-DDqTwqBQ.js";import"./index-SvsTIwFY.js";const h={title:"Examples/Vltava Club",id:"examples-vltava-club",render:m=>s.jsx(r,{...m}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs)."}}}},a={name:"Both variants",args:t,tags:["vrt:skip"],parameters:{__id:"examples-vltava-club--both-variants"},render:()=>s.jsxs("div",{className:"vltava-variants",style:{display:"flex",gap:48,alignItems:"flex-start"},children:[s.jsx(r,{...t}),s.jsx(r,{...d})]})},e={name:"iOS 26.5 (generic)",tags:["vrt"],args:t,parameters:{__id:"examples-vltava-club--ios-265-generic"}};var n,o,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Both variants",
  args: fallbackArgs,
  tags: ["vrt:skip"],
  parameters: {
    __id: "examples-vltava-club--both-variants"
  },
  render: () => <div className="vltava-variants" style={{
    display: "flex",
    gap: 48,
    alignItems: "flex-start"
  }}>
      <Comparison {...fallbackArgs} />
      <Comparison {...posterArgs} />
    </div>
}`,...(i=(o=a.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var l,p,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs,
  parameters: {
    __id: "examples-vltava-club--ios-265-generic"
  }
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const _=["BothVariants","Ios265Generic"];export{a as BothVariants,e as Ios265Generic,_ as __namedExportsOrder,h as default};
