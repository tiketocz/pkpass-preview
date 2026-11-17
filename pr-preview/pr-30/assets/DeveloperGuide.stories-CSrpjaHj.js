import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{W as j}from"./Comparison-Dnk0YOKW.js";import{S as r}from"./StoryLink-DOSmApBe.js";import{v as b}from"./index-SvsTIwFY.js";import{a as y}from"./index-BiooYcY6.js";import"./index-7HgYpVP8.js";import"./index-DDqTwqBQ.js";import"./scenarioCatalog-DJqqynbM.js";const x=({children:a})=>e.jsx("main",{className:"guide-page",children:a}),P=()=>e.jsxs(x,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"API"}),e.jsxs("p",{children:["The public React entry point is ",e.jsx("code",{children:"PKPassPreview"}),". Its required ",e.jsx("code",{children:"values"}),"prop accepts the pass payload plus image files; layout and OS capability overrides are optional."]}),e.jsx("pre",{children:e.jsx("code",{children:`<PKPassPreview
  values={pass}
  variant="fallback"
  targetOs="ios27"
  removeVariablePlaceholders
/>`})}),e.jsxs("p",{children:["The full prop reference and source-snippet corrections are scheduled for the documentation phase. For a working first render, open the"," ",e.jsx(r,{storyId:"start-here-welcome--quick-start",children:"quick start"}),"."]})]}),k=()=>e.jsxs(x,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"QA matrix"}),e.jsx("p",{children:"Use these permanent entries for targeted visual and compatibility review."}),e.jsxs("ul",{className:"guide-links",children:[e.jsxs("li",{children:[e.jsx(r,{storyId:"gallery--all-cards-story",children:"Gallery stress test"})," — 43 simultaneous preview instances."]}),e.jsxs("li",{children:[e.jsx(r,{storyId:"examples-vltava-club--both-variants",children:"Vltava Club comparison"})," ","— iOS 26.5 fallback and iOS 27 poster."]}),e.jsxs("li",{children:[e.jsx(r,{storyId:"examples-featured-actions-ios-27--generic-two-actions",children:"Featured Actions"})," ","— card plus iOS 27 action tiles."]}),e.jsxs("li",{children:[e.jsx(r,{storyId:"back-fields--back-fields-1",children:"Back fields"})," — current back-fields fixture (true back-side VRT comes later)."]})]}),e.jsx("p",{children:"The permalink guard protects 78 baseline entries and the 62-story VRT selection."})]}),V={title:"Developer guide",id:"developer-guide",argTypes:{fixture:{control:"select",options:["vltava-club","vltava-featured-generic"],labels:{"vltava-club":"Vltava Club (Generic + Poster Generic)","vltava-featured-generic":"Vltava Featured Actions (2 actions)"}},variant:{control:"inline-radio",options:["fallback","poster"]},targetOs:{control:"inline-radio",options:["ios26","ios27"]}},parameters:{layout:"centered"}},s={name:"API",render:()=>e.jsx(P,{})},t={name:"Playground",args:{fixture:"vltava-club",variant:"poster",targetOs:"ios27"},render:({fixture:a,variant:h,targetOs:g})=>{const f=a==="vltava-club"?b:y(2);return e.jsx(j,{values:f,fixtureKey:a,variant:h,targetOs:g})}},i={name:"QA matrix",render:()=>e.jsx(k,{})};var n,l,o;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "API",
  render: () => <ApiPage />
}`,...(o=(l=s.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};var c,d,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Playground",
  args: {
    fixture: "vltava-club",
    variant: "poster",
    targetOs: "ios27"
  },
  render: ({
    fixture,
    variant,
    targetOs
  }) => {
    const values = fixture === "vltava-club" ? vltavaClub : vltavaFeaturedGeneric(2);
    return <WebWalletDetail values={values} fixtureKey={fixture} variant={variant} targetOs={targetOs} />;
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var p,m,v;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "QA matrix",
  render: () => <QaMatrix />
}`,...(v=(m=i.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};const D=["Api","Playground","Qa"];export{s as Api,t as Playground,i as Qa,D as __namedExportsOrder,V as default};
