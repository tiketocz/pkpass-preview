import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{W as w}from"./Comparison-C1yXtaYo.js";import{S as s}from"./StoryLink-DOSmApBe.js";import{v as O}from"./index-SvsTIwFY.js";import{b as S,O as k}from"./knownDeviations-CX8NYZxX.js";import"./index-7HgYpVP8.js";import"./index-DDqTwqBQ.js";import"./scenarioCatalog-9H8HOlHn.js";const o=({children:r})=>e.jsx("main",{className:"guide-page",children:r}),A=()=>e.jsxs(o,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"API"}),e.jsxs("p",{children:["The public React entry point is ",e.jsx("code",{children:"PKPassPreview"}),". Its required ",e.jsx("code",{children:"values"}),"prop accepts the pass payload plus image files; layout and OS capability overrides are optional."]}),e.jsx("pre",{children:e.jsx("code",{children:`<PKPassPreview
  values={pass}
  variant="fallback"
  targetOs="ios27"
  removeVariablePlaceholders
/>`})}),e.jsxs("table",{className:"api-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Prop"}),e.jsx("th",{children:"Type / default"}),e.jsx("th",{children:"Purpose"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"values"})}),e.jsxs("td",{children:[e.jsx("code",{children:"Record<string, unknown>"})," · required"]}),e.jsxs("td",{children:["A ",e.jsx("code",{children:"pass.json"})," value plus optional image entries. Image values are base64, data/blob URLs, absolute paths, or HTTP(S) URLs."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"removeVariablePlaceholders"})}),e.jsxs("td",{children:[e.jsx("code",{children:"boolean"})," · ",e.jsx("code",{children:"false"})]}),e.jsxs("td",{children:["Removes ",e.jsx("code",{children:"${…}"})," placeholders from a cloned ",e.jsx("code",{children:"pass.json"})," before rendering. The supplied values object is not mutated."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"variant"})}),e.jsxs("td",{children:[e.jsx("code",{children:'"poster" | "fallback"'})," · omitted"]}),e.jsxs("td",{children:["Chooses the experimental ",e.jsx("code",{children:"posterGeneric"})," layout or the pass's classic structure. Omission preserves classic rendering."]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"targetOs"})}),e.jsxs("td",{children:[e.jsx("code",{children:'"ios26" | "ios27"'})," · omitted"]}),e.jsxs("td",{children:["Enables OS-gated behavior. Only ",e.jsx("code",{children:'"ios27"'})," renders valid top-level Featured Actions; omission and ",e.jsx("code",{children:'"ios26"'})," do not."]})]})]})]}),e.jsxs("p",{children:["Start with the runnable"," ",e.jsx(s,{storyId:"start-here-welcome--quick-start",children:"quick start"}),", then use"," ",e.jsx(s,{storyId:"developer-guide--playground",children:"Playground"})," to inspect variant and target-OS combinations."]})]}),D=()=>e.jsxs(o,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"Known deviations from Apple Wallet"}),e.jsx("p",{children:"The web renderer is a design-time approximation. These are the documented gaps and compatibility boundaries behind the native references in this Storybook."}),e.jsxs("div",{className:"deviation-list",children:[e.jsxs("section",{children:[e.jsx("h2",{children:"One Featured Action"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Difference:"})," ",k," The unknown-action “Open” tile is also an unverified proposal."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Reference:"})," iOS 27.0 build 24A434, iPhone 17 Pro Simulator, Generic and Event Ticket passes. ",e.jsx("strong",{children:"Status:"})," open visual gap; width and content are based on native captures."]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Back fields / Pass Details"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Difference:"})," the public component flips to an in-card back-field view. Native Wallet uses a full Pass Details screen with a card thumbnail, description, Remove Pass control, and grouped light fields. Storybook does not fake those controls."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Reference:"})," fixture ",e.jsx("code",{children:"backFields1"}),", iOS 27.0 build 24A434, iPhone 17 Pro Simulator. ",e.jsx("strong",{children:"Status:"})," documented product boundary; compare the"," ",e.jsx(s,{storyId:"back-fields--ios-27-pass-details",children:"Pass Details story"}),"."]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Poster Generic"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Difference:"})," browser font metrics, exact ellipsis points, artwork/QR raster scaling, and in dense cases the bottom-band shade can differ from Wallet."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Reference:"})," Vltava Club iOS 27.0, iPhone 17 Pro Simulator."," ",e.jsx("strong",{children:"Status:"})," known approximation; field order, row structure, and clamps are covered by focused stories."]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Older iOS and reference provenance"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Boundary:"})," Wallet iOS 26.5 ignores Featured Actions and shows Vltava's classic Generic fallback rather than Poster Generic. The web preview requires the matching"," ",e.jsx("code",{children:'targetOs="ios26"'})," / ",e.jsx("code",{children:'variant="fallback"'})," configuration."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Reference:"})," iOS 26.5, iPhone 17 Pro Simulator, original add-pass preview.",e.jsx("strong",{children:" Status:"})," behavior aligned in the recorded cases. Other unversioned legacy references remain labelled “origin not recorded”; no OS/device is inferred."]})]})]})]}),I=()=>e.jsxs(o,{children:[e.jsx("p",{className:"guide-eyebrow",children:"Developer guide"}),e.jsx("h1",{children:"QA matrix"}),e.jsx("p",{children:"Use these permanent entries for targeted visual and compatibility review."}),e.jsxs("ul",{className:"guide-links",children:[e.jsxs("li",{children:[e.jsx(s,{storyId:"gallery--all-cards-story",children:"Gallery stress test"})," — 43 simultaneous preview instances."]}),e.jsxs("li",{children:[e.jsx(s,{storyId:"examples-vltava-club--both-variants",children:"Vltava Club comparison"})," ","— iOS 26.5 fallback and iOS 27 poster."]}),e.jsxs("li",{children:[e.jsx(s,{storyId:"examples-featured-actions-ios-27--generic-two-actions",children:"Featured Actions"})," ","— card plus iOS 27 action tiles."]}),e.jsxs("li",{children:[e.jsx(s,{storyId:"back-fields--back-fields-1",children:"Back fields front"})," and"," ",e.jsx(s,{storyId:"back-fields--ios-27-pass-details",children:"Pass Details"})," — the same fixture's two native views."]})]}),e.jsx("p",{children:"The permalink guard protects 78 baseline entries and the 62-story VRT selection."})]}),E={title:"Developer guide",id:"developer-guide",argTypes:{fixture:{control:"select",options:["vltava-club","vltava-featured-generic"],labels:{"vltava-club":"Vltava Club (Generic + Poster Generic)","vltava-featured-generic":"Vltava Featured Actions (2 actions)"}},variant:{control:"inline-radio",options:["fallback","poster"]},targetOs:{control:"inline-radio",options:["ios26","ios27"]}},parameters:{layout:"centered"}},n={name:"API",render:()=>e.jsx(A,{}),parameters:{controls:{disable:!0},options:{showPanel:!1}}},a={name:"Known deviations",render:()=>e.jsx(D,{}),parameters:{controls:{disable:!0},options:{showPanel:!1}}},i={name:"Playground",args:{fixture:"vltava-club",variant:"poster",targetOs:"ios27"},render:({fixture:r,variant:f,targetOs:P})=>{const y=r==="vltava-club"?O:S(2);return e.jsx(w,{values:y,fixtureKey:r,variant:f,targetOs:P})}},t={name:"QA matrix",render:()=>e.jsx(I,{}),parameters:{controls:{disable:!0},options:{showPanel:!1}}};var l,d,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "API",
  render: () => <ApiPage />,
  parameters: {
    controls: {
      disable: true
    },
    options: {
      showPanel: false
    }
  }
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var h,p,u;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Known deviations",
  render: () => <KnownDeviationsPage />,
  parameters: {
    controls: {
      disable: true
    },
    options: {
      showPanel: false
    }
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,j,m;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(m=(j=i.parameters)==null?void 0:j.docs)==null?void 0:m.source}}};var v,g,b;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "QA matrix",
  render: () => <QaMatrix />,
  parameters: {
    controls: {
      disable: true
    },
    options: {
      showPanel: false
    }
  }
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};const Q=["Api","KnownDeviations","Playground","Qa"];export{n as Api,a as KnownDeviations,i as Playground,t as Qa,Q as __namedExportsOrder,E as default};
