import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{P as p}from"./index-BJ7Zqdx-.js";import{useMDXComponents as d}from"./index-D4iU9FdF.js";import{S as t}from"./StoryLink-DOSmApBe.js";import{e as c}from"./example-store-card-F53Bf2fU.js";import"./index-3NMXXukK.js";function o(s){const r={h1:"h1",h2:"h2",p:"p",...d(),...s.components};return e.jsxs("div",{style:{padding:"48px 8px 8px",fontFamily:"Inter, ui-sans-serif, system-ui, sans-serif",color:"#0B0B45",maxWidth:880,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:32},children:[e.jsx("img",{src:"brand/tiketo-wordmark.png",alt:"tiketo",style:{height:32,width:"auto"}}),e.jsx("span",{style:{background:"#0066FF",color:"#fff",padding:"4px 10px",borderRadius:999,fontSize:11,fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"},children:"open source · MIT"})]}),e.jsx(r.h1,{id:"tiketopkpass-preview",children:"@tiketo/pkpass-preview"}),e.jsx("p",{style:{fontSize:22,lineHeight:1.4,color:"#0B0B45",marginTop:0},children:e.jsx("strong",{children:"See your Apple Wallet pass before you ship it."})}),e.jsx("p",{style:{fontSize:16,lineHeight:1.6,color:"#475569",marginTop:0},children:e.jsx(r.p,{children:`An iOS-faithful React renderer for Apple Wallet passes. Side-by-side with the
real iOS render — so what you design is what users see.`})}),e.jsx("p",{style:{fontSize:15,lineHeight:1.6,color:"#475569",fontStyle:"italic"},children:e.jsxs(r.p,{children:["Pass generators are everywhere. Pass ",e.jsx("em",{children:"previews"}),` aren't. We built this
because we needed it.`]})}),e.jsx("div",{style:{background:"#0B0B45",color:"#e2e8f0",borderRadius:12,padding:"20px 24px",fontFamily:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",fontSize:14,lineHeight:1.6,margin:"24px 0",whiteSpace:"pre",overflowX:"auto"},children:`import { PKPassPreview } from "@tiketo/pkpass-preview";

const pass = {
  "pass.json": {
    formatVersion: 1,
    passTypeIdentifier: "pass.com.example.membership",
    serialNumber: "MEMBER-001",
    teamIdentifier: "TEAMID",
    organizationName: "Brewbeat Coffee",
    description: "Brewbeat membership card",
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(11, 11, 69)",
    storeCard: {
      primaryFields: [{ key: "member", label: "MEMBER", value: "Ada Lovelace" }],
    },
  },
};

<PKPassPreview values={pass} />`}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",margin:"24px 0 40px"},children:[e.jsx(t,{storyId:"examples--store-card",style:{background:"#0066FF",color:"#fff",padding:"10px 18px",borderRadius:8,textDecoration:"none",fontWeight:600,fontSize:14},children:"Open live demo →"}),e.jsx("a",{href:"https://github.com/tiketocz/pkpass-preview",target:"_blank",rel:"noreferrer",style:{background:"#fff",color:"#0B0B45",padding:"10px 18px",borderRadius:8,textDecoration:"none",fontWeight:600,fontSize:14,border:"1px solid #e2e8f0"},children:"GitHub"}),e.jsx("a",{href:"https://npmjs.com/package/@tiketo/pkpass-preview",target:"_blank",rel:"noreferrer",style:{background:"#fff",color:"#0B0B45",padding:"10px 18px",borderRadius:8,textDecoration:"none",fontWeight:600,fontSize:14,border:"1px solid #e2e8f0"},children:"npm"})]}),e.jsx(r.h2,{id:"whats-inside",children:"What's inside"}),e.jsxs("ul",{style:{fontSize:15,lineHeight:1.9,color:"#0B0B45",paddingLeft:20},children:[e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Close-to-iOS rendering"})," — every fixture visually verified against the real iOS Wallet"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Drop-in"})," — one component, one prop, no setup"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"All pass types"})," — boarding · store · event · coupon · generic"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Auto-variant & density detection"})]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Interactive in-card back-field render"})]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"TypeScript native · ESM-only · tree-shakeable"})]})]}),e.jsx(r.h2,{id:"where-to-start",children:"Where to start"}),e.jsxs("table",{style:{width:"100%",marginTop:16,fontSize:14,borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{borderBottom:"1px solid #e2e8f0"},children:[e.jsx("th",{style:{textAlign:"left",padding:"8px 0",color:"#64748b",fontWeight:600},children:"If you want to…"}),e.jsx("th",{style:{textAlign:"left",padding:"8px 0",color:"#64748b",fontWeight:600},children:"Open"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:"10px 0"},children:"see the README quick start in action"}),e.jsx("td",{style:{padding:"10px 0"},children:e.jsx(t,{storyId:"start-here-welcome--quick-start",children:"Quick start"})})]}),e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:"10px 0"},children:"see real-world .pkpass samples"}),e.jsx("td",{style:{padding:"10px 0"},children:e.jsx(t,{storyId:"samples--membership-id-card",children:"Other use cases"})})]}),e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:"10px 0"},children:"scan every variant at once"}),e.jsx("td",{style:{padding:"10px 0"},children:e.jsx(t,{storyId:"gallery--all-cards-story",children:"Gallery"})})]}),e.jsxs("tr",{style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("td",{style:{padding:"10px 0"},children:"find the closest layout to your design"}),e.jsx("td",{style:{padding:"10px 0"},children:"any of the per-type sections"})]})]})]}),e.jsx("p",{style:{marginTop:56,fontSize:13,color:"#94a3b8",borderTop:"1px solid #e2e8f0",paddingTop:16},children:e.jsxs(r.p,{children:["Built by ",e.jsx("a",{href:"https://tiketo.eu",target:"_blank",rel:"noreferrer",style:{color:"#0066FF"},children:"tiketo"}),`
`," ","— we use this in production. Apple Wallet® and all Apple branding are property of Apple Inc.; this project is not affiliated with Apple."]})})]})}function h(s={}){const{wrapper:r}={...d(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(o,{...s})}):o(s)}const x=()=>e.jsxs("main",{className:"guide-page quick-start-page",children:[e.jsxs("div",{children:[e.jsx("p",{className:"guide-eyebrow",children:"Quick start"}),e.jsx("h1",{children:"Render pass data directly in React"}),e.jsxs("p",{children:["Install the package, import ",e.jsx("code",{children:"PKPassPreview"}),", and pass the same image map and",e.jsx("code",{children:"pass.json"})," payload your signing pipeline uses."]}),e.jsx("pre",{children:e.jsx("code",{children:`import { PKPassPreview } from "@tiketo/pkpass-preview";

const pass = {
  "pass.json": {
    formatVersion: 1,
    organizationName: "Example Coffee",
    description: "Loyalty card",
    storeCard: {
      primaryFields: [{ key: "points", label: "POINTS", value: "420" }],
    },
  },
};

<PKPassPreview values={pass} />`})})]}),e.jsx("div",{className:"quick-start-preview",children:e.jsx(p,{values:c})})]}),b={title:"Start here/Welcome",id:"welcome",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{page:h},controls:{disable:!0},options:{showPanel:!1}}},i={name:"Quick start",render:()=>e.jsx(x,{}),parameters:{__id:"start-here-welcome--quick-start"}};var n,a,l;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Quick start",
  render: () => <QuickStartPage />,
  parameters: {
    __id: "start-here-welcome--quick-start"
  }
}`,...(l=(a=i.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const k=["QuickStart"];export{i as QuickStart,k as __namedExportsOrder,b as default};
