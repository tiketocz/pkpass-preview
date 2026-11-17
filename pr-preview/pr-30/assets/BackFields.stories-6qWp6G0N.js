import{j as f}from"./jsx-runtime-BjG_zV1W.js";import{c as l,C as h}from"./Comparison-uk3WbgbM.js";import{b as m}from"./back-fields-CzUse35s.js";import"./index-BJ7Zqdx-.js";import"./index-3NMXXukK.js";import"./scenarioCatalog-h1R6I7ry.js";import"./_placeholder-Di2y90HQ.js";const P={title:"Features/Back fields",id:"back-fields",render:(i,e)=>f.jsx(h,{...i,scenarioId:e.id}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"Back-field coverage for long-form key/value pairs. The legacy story preserves the front comparison; the iOS 27 Pass Details story flips the component through its public interaction and documents the difference from Wallet's full details screen."}}}},s={name:"Medical assistance card with long back fields",args:l("back-fields--back-fields-1",m),parameters:{__id:"back-fields--back-fields-1"}},a={name:"Back fields — iOS 27 Pass Details",args:l("back-fields--ios-27-pass-details",m,{targetOs:"ios27"}),parameters:{__id:"back-fields--ios-27-pass-details",docs:{description:{story:"The web preview is flipped through its existing public interaction and shows the component's in-card back. The native iOS 27 reference is Wallet's full Pass Details screen, with a front-card thumbnail, pass description, Remove Pass control, and light grouped fields. The web component does not implement that screen, so this comparison documents the difference instead of imitating it in Storybook."}}},play:async({canvasElement:i})=>{const e=i.querySelector(".infoButton");e==null||e.click(),await new Promise(p=>window.setTimeout(p,0))}};var t,o,r;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: "Medical assistance card with long back fields",
  args: comparisonArgs("back-fields--back-fields-1", backFields1),
  parameters: {
    __id: "back-fields--back-fields-1"
  }
}`,...(r=(o=s.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var n,c,d;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Back fields — iOS 27 Pass Details",
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
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const S=["BackFields1","Ios27PassDetails"];export{s as BackFields1,a as Ios27PassDetails,S as __namedExportsOrder,P as default};
