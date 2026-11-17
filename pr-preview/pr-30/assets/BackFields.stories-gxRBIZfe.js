import{j as b}from"./jsx-runtime-BjG_zV1W.js";import{c as l,C as k}from"./Comparison-J6RwNeIG.js";import{b as p}from"./back-fields-CzUse35s.js";import{b as m}from"./scenarioCatalog-DgF1eLhD.js";import"./index-7HgYpVP8.js";import"./index-DDqTwqBQ.js";import"./_placeholder-Di2y90HQ.js";const _={title:"Features/Back fields",id:"back-fields",render:(a,e)=>b.jsx(k,{...a,scenarioId:e.id}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"Back-side render — long-form key/value pairs in the iOS Wallet dark layout. No header strip, no logo; primary text is hidden."}}}},s={name:m("back-fields--back-fields-1"),args:l("back-fields--back-fields-1",p),parameters:{__id:"back-fields--back-fields-1"}},i={name:m("back-fields--ios-27-pass-details"),args:l("back-fields--ios-27-pass-details",p,{targetOs:"ios27"}),parameters:{__id:"back-fields--ios-27-pass-details",docs:{description:{story:"The web preview is flipped through its existing public interaction and shows the component's in-card back. The native iOS 27 reference is Wallet's full Pass Details screen, with a front-card thumbnail, pass description, Remove Pass control, and light grouped fields. The web component does not implement that screen, so this comparison documents the difference instead of imitating it in Storybook."}}},play:async({canvasElement:a})=>{const e=a.querySelector(".infoButton");e==null||e.click(),await new Promise(f=>window.setTimeout(f,0))}};var t,o,r;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: scenarioTitle("back-fields--back-fields-1"),
  args: comparisonArgs("back-fields--back-fields-1", backFields1),
  parameters: {
    __id: "back-fields--back-fields-1"
  }
}`,...(r=(o=s.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var n,c,d;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: scenarioTitle("back-fields--ios-27-pass-details"),
  args: comparisonArgs("back-fields--ios-27-pass-details", backFields1, {
    targetOs: "ios27"
  }),
  parameters: {
    __id: "back-fields--ios-27-pass-details",
    docs: {
      description: {
        story: "The web preview is flipped through its existing public interaction and shows the component's in-card back. The native iOS 27 reference is Wallet's full Pass Details screen, with a front-card thumbnail, pass description, Remove Pass control, and light grouped fields. The web component does not implement that screen, so this comparison documents the difference instead of imitating it in Storybook."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const infoButton = canvasElement.querySelector<HTMLElement>(".infoButton");
    infoButton?.click();
    await new Promise(resolve => window.setTimeout(resolve, 0));
  }
}`,...(d=(c=i.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const S=["BackFields1","Ios27PassDetails"];export{s as BackFields1,i as Ios27PassDetails,S as __namedExportsOrder,_ as default};
