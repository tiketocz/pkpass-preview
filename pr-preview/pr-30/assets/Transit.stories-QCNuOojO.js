import{j as F}from"./jsx-runtime-BjG_zV1W.js";import{a}from"./index-BJ7Zqdx-.js";import{c as r,C as x}from"./Comparison-uk3WbgbM.js";import{b as m}from"./boarding-pass-1-BFcnIaR2.js";import"./index-3NMXXukK.js";import"./scenarioCatalog-h1R6I7ry.js";const s=T=>{const e=m["pass.json"],c=e.boardingPass,d=c.primaryFields;return{...m,"pass.json":{...e,boardingPass:{...c,transitType:T,headerFields:[{key:"header-flight",label:"FLIGHT",value:"TIK 100"}],primaryFields:[{...d[0],value:"Prague"},d[1]]}}}},H={title:"Features/Transit",id:"features-transit",render:(T,e)=>F.jsx(x,{...T,scenarioId:e.id}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"Boarding-pass transit icons for air, train, bus, boat and generic journeys, compared with native Wallet references."}}}},n={name:"Transit icon — Air",args:r("boarding-pass--transit-type-air",s(a.PKTransitTypeAir)),parameters:{__id:"boarding-pass--transit-type-air"}},t={name:"Transit icon — Train",args:r("boarding-pass--transit-type-train",s(a.PKTransitTypeTrain)),parameters:{__id:"boarding-pass--transit-type-train"}},i={name:"Transit icon — Bus",args:r("boarding-pass--transit-type-bus",s(a.PKTransitTypeBus)),parameters:{__id:"boarding-pass--transit-type-bus"}},o={name:"Transit icon — Boat",args:r("boarding-pass--transit-type-boat",s(a.PKTransitTypeBoat)),parameters:{__id:"boarding-pass--transit-type-boat"}},p={name:"Transit icon — Generic",args:r("boarding-pass--transit-type-generic",s(a.PKTransitTypeGeneric)),parameters:{__id:"boarding-pass--transit-type-generic"}};var y,g,u;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Transit icon — Air",
  args: comparisonArgs("boarding-pass--transit-type-air", withTransitType(PassTransitType.PKTransitTypeAir)),
  parameters: {
    __id: "boarding-pass--transit-type-air"
  }
}`,...(u=(g=n.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var b,_,P;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Transit icon — Train",
  args: comparisonArgs("boarding-pass--transit-type-train", withTransitType(PassTransitType.PKTransitTypeTrain)),
  parameters: {
    __id: "boarding-pass--transit-type-train"
  }
}`,...(P=(_=t.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var l,B,A;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Transit icon — Bus",
  args: comparisonArgs("boarding-pass--transit-type-bus", withTransitType(PassTransitType.PKTransitTypeBus)),
  parameters: {
    __id: "boarding-pass--transit-type-bus"
  }
}`,...(A=(B=i.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};var K,h,f;o.parameters={...o.parameters,docs:{...(K=o.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: "Transit icon — Boat",
  args: comparisonArgs("boarding-pass--transit-type-boat", withTransitType(PassTransitType.PKTransitTypeBoat)),
  parameters: {
    __id: "boarding-pass--transit-type-boat"
  }
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var w,G,j;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Transit icon — Generic",
  args: comparisonArgs("boarding-pass--transit-type-generic", withTransitType(PassTransitType.PKTransitTypeGeneric)),
  parameters: {
    __id: "boarding-pass--transit-type-generic"
  }
}`,...(j=(G=p.parameters)==null?void 0:G.docs)==null?void 0:j.source}}};const J=["TransitTypeAir","TransitTypeTrain","TransitTypeBus","TransitTypeBoat","TransitTypeGeneric"];export{n as TransitTypeAir,o as TransitTypeBoat,i as TransitTypeBus,p as TransitTypeGeneric,t as TransitTypeTrain,J as __namedExportsOrder,H as default};
