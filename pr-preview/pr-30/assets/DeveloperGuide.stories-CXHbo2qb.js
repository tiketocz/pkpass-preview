import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{P as g}from"./index-7HgYpVP8.js";import{S as r}from"./StoryLink-DOSmApBe.js";import{e as j}from"./example-store-card-F53Bf2fU.js";import"./index-DDqTwqBQ.js";const h=({children:a})=>e.jsx("main",{className:"guide-page",children:a}),v=()=>e.jsxs(h,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"API"}),e.jsxs("p",{children:["The public React entry point is ",e.jsx("code",{children:"PKPassPreview"}),". Its required ",e.jsx("code",{children:"values"}),"prop accepts the pass payload plus image files; layout and OS capability overrides are optional."]}),e.jsx("pre",{children:e.jsx("code",{children:`<PKPassPreview
  values={pass}
  variant="fallback"
  targetOs="ios27"
  removeVariablePlaceholders
/>`})}),e.jsxs("p",{children:["The full prop reference and source-snippet corrections are scheduled for the documentation phase. For a working first render, open the"," ",e.jsx(r,{storyId:"start-here-welcome--quick-start",children:"quick start"}),"."]})]}),P=()=>e.jsxs(h,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"QA matrix"}),e.jsx("p",{children:"Use these permanent entries for targeted visual and compatibility review."}),e.jsxs("ul",{className:"guide-links",children:[e.jsxs("li",{children:[e.jsx(r,{storyId:"gallery--all-cards-story",children:"Gallery stress test"})," — 43 simultaneous preview instances."]}),e.jsxs("li",{children:[e.jsx(r,{storyId:"examples-vltava-club--both-variants",children:"Vltava Club comparison"})," ","— iOS 26.5 fallback and iOS 27 poster."]}),e.jsxs("li",{children:[e.jsx(r,{storyId:"examples-featured-actions-ios-27--generic-two-actions",children:"Featured Actions"})," ","— card plus iOS 27 action tiles."]}),e.jsxs("li",{children:[e.jsx(r,{storyId:"back-fields--back-fields-1",children:"Back fields"})," — current back-fields fixture (true back-side VRT comes later)."]})]}),e.jsx("p",{children:"The permalink guard protects 78 baseline entries and the 62-story VRT selection."})]}),w={title:"Developer guide",id:"developer-guide",argTypes:{variant:{control:"inline-radio",options:["fallback","poster"]},targetOs:{control:"inline-radio",options:["ios26","ios27"]}},parameters:{layout:"centered"}},s={name:"API",render:()=>e.jsx(v,{})},i={name:"Playground",args:{variant:"fallback",targetOs:"ios27"},render:a=>e.jsx(g,{values:j,variant:a.variant,targetOs:a.targetOs})},t={name:"QA matrix",render:()=>e.jsx(P,{})};var n,o,l;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "API",
  render: () => <ApiPage />
}`,...(l=(o=s.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var c,d,p;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Playground",
  args: {
    variant: "fallback",
    targetOs: "ios27"
  },
  render: args => <PKPassPreview values={exampleStoreCard} variant={args.variant} targetOs={args.targetOs} />
}`,...(p=(d=i.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,u,x;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "QA matrix",
  render: () => <QaMatrix />
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const A=["Api","Playground","Qa"];export{s as Api,i as Playground,t as Qa,A as __namedExportsOrder,w as default};
