import{j as O}from"./jsx-runtime-BjG_zV1W.js";import{a as s}from"./index-pN0gf5PW.js";import{C as R}from"./Comparison-DRLfXGr3.js";import{b as d,a as q,c as z}from"./boarding-pass-3-DkyU69eA.js";import"./index-3NMXXukK.js";const V={title:"Boarding pass",render:T=>O.jsx(R,{...T}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"boardingPass — variants by transit type (air/train/bus/boat/generic), with terminal sub-fields and primary destination layout."}}}},r={name:"Boarding pass 1",args:{values:d,screenshot:"boarding-pass-1"}},e={name:"Boarding pass 2",args:{values:q,screenshot:"boarding-pass-2"}},n={name:"Boarding pass 3",args:{values:z,screenshot:"boarding-pass-3"}},a=T=>{const m=d["pass.json"],g=m.boardingPass,u=g.primaryFields;return{...d,"pass.json":{...m,boardingPass:{...g,transitType:T,headerFields:[{key:"header-flight",label:"FLIGHT",value:"TIK 100"}],primaryFields:[{...u[0],value:"Prague"},u[1]]}}}},t={name:"Transit type — Air",args:{values:a(s.PKTransitTypeAir),screenshot:"transit-air"}},i={name:"Transit type — Train",args:{values:a(s.PKTransitTypeTrain),screenshot:"transit-train"}},o={name:"Transit type — Bus",args:{values:a(s.PKTransitTypeBus),screenshot:"transit-bus"}},p={name:"Transit type — Boat",args:{values:a(s.PKTransitTypeBoat),screenshot:"transit-boat"}},c={name:"Transit type — Generic",args:{values:a(s.PKTransitTypeGeneric),screenshot:"transit-generic"}};var y,l,P;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Boarding pass 1",
  args: {
    values: boardingPass1,
    screenshot: "boarding-pass-1"
  }
}`,...(P=(l=r.parameters)==null?void 0:l.docs)==null?void 0:P.source}}};var b,h,B;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Boarding pass 2",
  args: {
    values: boardingPass2,
    screenshot: "boarding-pass-2"
  }
}`,...(B=(h=e.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var v,K,S;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "Boarding pass 3",
  args: {
    values: boardingPass3,
    screenshot: "boarding-pass-3"
  }
}`,...(S=(K=n.parameters)==null?void 0:K.docs)==null?void 0:S.source}}};var f,w,G;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Transit type — Air",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeAir),
    screenshot: "transit-air"
  }
}`,...(G=(w=t.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};var A,j,x;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "Transit type — Train",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeTrain),
    screenshot: "transit-train"
  }
}`,...(x=(j=i.parameters)==null?void 0:j.docs)==null?void 0:x.source}}};var F,C,E;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Transit type — Bus",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeBus),
    screenshot: "transit-bus"
  }
}`,...(E=(C=o.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var I,_,k;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Transit type — Boat",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeBoat),
    screenshot: "transit-boat"
  }
}`,...(k=(_=p.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var H,J,L;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: "Transit type — Generic",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeGeneric),
    screenshot: "transit-generic"
  }
}`,...(L=(J=c.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};const W=["BoardingPass1","BoardingPass2","BoardingPass3","TransitTypeAir","TransitTypeTrain","TransitTypeBus","TransitTypeBoat","TransitTypeGeneric"];export{r as BoardingPass1,e as BoardingPass2,n as BoardingPass3,t as TransitTypeAir,p as TransitTypeBoat,o as TransitTypeBus,c as TransitTypeGeneric,i as TransitTypeTrain,W as __namedExportsOrder,V as default};
