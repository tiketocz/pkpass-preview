import{j}from"./jsx-runtime-BjG_zV1W.js";import{a as s}from"./index-7HgYpVP8.js";import{C as A}from"./Comparison-Ca3SRPM8.js";import{b as m}from"./boarding-pass-1-BFcnIaR2.js";import"./index-DDqTwqBQ.js";const a=o=>{const p=m["pass.json"],T=p.boardingPass,c=T.primaryFields;return{...m,"pass.json":{...p,boardingPass:{...T,transitType:o,headerFields:[{key:"header-flight",label:"FLIGHT",value:"TIK 100"}],primaryFields:[{...c[0],value:"Prague"},c[1]]}}}},I={title:"Features/Transit",id:"features-transit",render:o=>j.jsx(A,{...o}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"Boarding-pass transit icons for air, train, bus, boat and generic journeys, compared with native Wallet references."}}}},r={name:"Air",args:{values:a(s.PKTransitTypeAir),screenshot:"transit-air"},parameters:{__id:"boarding-pass--transit-type-air"}},e={name:"Train",args:{values:a(s.PKTransitTypeTrain),screenshot:"transit-train"},parameters:{__id:"boarding-pass--transit-type-train"}},n={name:"Bus",args:{values:a(s.PKTransitTypeBus),screenshot:"transit-bus"},parameters:{__id:"boarding-pass--transit-type-bus"}},t={name:"Boat",args:{values:a(s.PKTransitTypeBoat),screenshot:"transit-boat"},parameters:{__id:"boarding-pass--transit-type-boat"}},i={name:"Generic",args:{values:a(s.PKTransitTypeGeneric),screenshot:"transit-generic"},parameters:{__id:"boarding-pass--transit-type-generic"}};var d,y,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Air",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeAir),
    screenshot: "transit-air"
  },
  parameters: {
    __id: "boarding-pass--transit-type-air"
  }
}`,...(u=(y=r.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var g,l,b;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Train",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeTrain),
    screenshot: "transit-train"
  },
  parameters: {
    __id: "boarding-pass--transit-type-train"
  }
}`,...(b=(l=e.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var _,P,h;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: "Bus",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeBus),
    screenshot: "transit-bus"
  },
  parameters: {
    __id: "boarding-pass--transit-type-bus"
  }
}`,...(h=(P=n.parameters)==null?void 0:P.docs)==null?void 0:h.source}}};var v,B,K;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Boat",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeBoat),
    screenshot: "transit-boat"
  },
  parameters: {
    __id: "boarding-pass--transit-type-boat"
  }
}`,...(K=(B=t.parameters)==null?void 0:B.docs)==null?void 0:K.source}}};var f,w,G;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Generic",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeGeneric),
    screenshot: "transit-generic"
  },
  parameters: {
    __id: "boarding-pass--transit-type-generic"
  }
}`,...(G=(w=i.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};const k=["TransitTypeAir","TransitTypeTrain","TransitTypeBus","TransitTypeBoat","TransitTypeGeneric"];export{r as TransitTypeAir,t as TransitTypeBoat,n as TransitTypeBus,i as TransitTypeGeneric,e as TransitTypeTrain,k as __namedExportsOrder,I as default};
