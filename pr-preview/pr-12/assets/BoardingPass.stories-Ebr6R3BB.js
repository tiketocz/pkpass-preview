import{j as z}from"./jsx-runtime-BjG_zV1W.js";import{a as s}from"./index-JvPUtnRF.js";import{C as D}from"./Comparison-BzJ0B67L.js";import{b as m,a as F,c as H}from"./boarding-pass-3-DkyU69eA.js";import"./index-3NMXXukK.js";const U={title:"Boarding pass",render:T=>z.jsx(D,{...T}),tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"boardingPass — variants by transit type (air/train/bus/boat/generic), with terminal sub-fields and primary destination layout."}}}},r={name:"Boarding pass 1",args:{values:m,screenshot:"boarding-pass-1"}},e={name:"Boarding pass 2",args:{values:F,screenshot:"boarding-pass-2"}},n={name:"Boarding pass 3",args:{values:H,screenshot:"boarding-pass-3"}},a=T=>{const d=m["pass.json"],q=d.boardingPass;return{...m,"pass.json":{...d,boardingPass:{...q,transitType:T}}}},t={name:"Transit type — Air",args:{values:a(s.PKTransitTypeAir),screenshot:"transit-air"}},o={name:"Transit type — Train",args:{values:a(s.PKTransitTypeTrain),screenshot:"transit-train"}},i={name:"Transit type — Bus",args:{values:a(s.PKTransitTypeBus),screenshot:"transit-bus"}},p={name:"Transit type — Boat",args:{values:a(s.PKTransitTypeBoat),screenshot:"transit-boat"}},c={name:"Transit type — Generic",args:{values:a(s.PKTransitTypeGeneric),screenshot:"transit-generic"}};var g,u,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Boarding pass 1",
  args: {
    values: boardingPass1,
    screenshot: "boarding-pass-1"
  }
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var P,l,b;e.parameters={...e.parameters,docs:{...(P=e.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Boarding pass 2",
  args: {
    values: boardingPass2,
    screenshot: "boarding-pass-2"
  }
}`,...(b=(l=e.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var B,h,v;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "Boarding pass 3",
  args: {
    values: boardingPass3,
    screenshot: "boarding-pass-3"
  }
}`,...(v=(h=n.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var K,S,w;t.parameters={...t.parameters,docs:{...(K=t.parameters)==null?void 0:K.docs,source:{originalSource:`{
  name: "Transit type — Air",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeAir),
    screenshot: "transit-air"
  }
}`,...(w=(S=t.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var f,A,G;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Transit type — Train",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeTrain),
    screenshot: "transit-train"
  }
}`,...(G=(A=o.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var j,x,C;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "Transit type — Bus",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeBus),
    screenshot: "transit-bus"
  }
}`,...(C=(x=i.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var E,_,J;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "Transit type — Boat",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeBoat),
    screenshot: "transit-boat"
  }
}`,...(J=(_=p.parameters)==null?void 0:_.docs)==null?void 0:J.source}}};var O,R,k;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: "Transit type — Generic",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeGeneric),
    screenshot: "transit-generic"
  }
}`,...(k=(R=c.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};const V=["BoardingPass1","BoardingPass2","BoardingPass3","TransitTypeAir","TransitTypeTrain","TransitTypeBus","TransitTypeBoat","TransitTypeGeneric"];export{r as BoardingPass1,e as BoardingPass2,n as BoardingPass3,t as TransitTypeAir,p as TransitTypeBoat,i as TransitTypeBus,c as TransitTypeGeneric,o as TransitTypeTrain,V as __namedExportsOrder,U as default};
