import{j as G}from"./jsx-runtime-BjG_zV1W.js";import{a}from"./index-7HgYpVP8.js";import{c as s,C as S}from"./Comparison-C1yXtaYo.js";import{b as m}from"./boarding-pass-1-BFcnIaR2.js";import{b as r}from"./scenarioCatalog-9H8HOlHn.js";import"./index-DDqTwqBQ.js";const t=T=>{const e=m["pass.json"],c=e.boardingPass,y=c.primaryFields;return{...m,"pass.json":{...e,boardingPass:{...c,transitType:T,headerFields:[{key:"header-flight",label:"FLIGHT",value:"TIK 100"}],primaryFields:[{...y[0],value:"Prague"},y[1]]}}}},J={title:"Features/Transit",id:"features-transit",render:(T,e)=>G.jsx(S,{...T,scenarioId:e.id}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"Boarding-pass transit icons for air, train, bus, boat and generic journeys, compared with native Wallet references."}}}},n={name:r("boarding-pass--transit-type-air"),args:s("boarding-pass--transit-type-air",t(a.PKTransitTypeAir)),parameters:{__id:"boarding-pass--transit-type-air"}},i={name:r("boarding-pass--transit-type-train"),args:s("boarding-pass--transit-type-train",t(a.PKTransitTypeTrain)),parameters:{__id:"boarding-pass--transit-type-train"}},p={name:r("boarding-pass--transit-type-bus"),args:s("boarding-pass--transit-type-bus",t(a.PKTransitTypeBus)),parameters:{__id:"boarding-pass--transit-type-bus"}},o={name:r("boarding-pass--transit-type-boat"),args:s("boarding-pass--transit-type-boat",t(a.PKTransitTypeBoat)),parameters:{__id:"boarding-pass--transit-type-boat"}},d={name:r("boarding-pass--transit-type-generic"),args:s("boarding-pass--transit-type-generic",t(a.PKTransitTypeGeneric)),parameters:{__id:"boarding-pass--transit-type-generic"}};var g,b,u;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: scenarioTitle("boarding-pass--transit-type-air"),
  args: comparisonArgs("boarding-pass--transit-type-air", withTransitType(PassTransitType.PKTransitTypeAir)),
  parameters: {
    __id: "boarding-pass--transit-type-air"
  }
}`,...(u=(b=n.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var l,_,P;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: scenarioTitle("boarding-pass--transit-type-train"),
  args: comparisonArgs("boarding-pass--transit-type-train", withTransitType(PassTransitType.PKTransitTypeTrain)),
  parameters: {
    __id: "boarding-pass--transit-type-train"
  }
}`,...(P=(_=i.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var K,f,h;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: scenarioTitle("boarding-pass--transit-type-bus"),
  args: comparisonArgs("boarding-pass--transit-type-bus", withTransitType(PassTransitType.PKTransitTypeBus)),
  parameters: {
    __id: "boarding-pass--transit-type-bus"
  }
}`,...(h=(f=p.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var A,B,w;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: scenarioTitle("boarding-pass--transit-type-boat"),
  args: comparisonArgs("boarding-pass--transit-type-boat", withTransitType(PassTransitType.PKTransitTypeBoat)),
  parameters: {
    __id: "boarding-pass--transit-type-boat"
  }
}`,...(w=(B=o.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var j,F,x;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: scenarioTitle("boarding-pass--transit-type-generic"),
  args: comparisonArgs("boarding-pass--transit-type-generic", withTransitType(PassTransitType.PKTransitTypeGeneric)),
  parameters: {
    __id: "boarding-pass--transit-type-generic"
  }
}`,...(x=(F=d.parameters)==null?void 0:F.docs)==null?void 0:x.source}}};const L=["TransitTypeAir","TransitTypeTrain","TransitTypeBus","TransitTypeBoat","TransitTypeGeneric"];export{n as TransitTypeAir,o as TransitTypeBoat,p as TransitTypeBus,d as TransitTypeGeneric,i as TransitTypeTrain,L as __namedExportsOrder,J as default};
