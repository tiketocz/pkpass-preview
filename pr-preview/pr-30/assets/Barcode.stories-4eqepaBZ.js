import{j as K}from"./jsx-runtime-BjG_zV1W.js";import{c as e,C as M}from"./Comparison-DXUj9aP7.js";import{c as N,a as T,b as U,d as V,e as W,p as X,f as Y,g as Z,h as $,l as ee}from"./pdf417-4-DuytCxwS.js";import"./index-Bl8Al8O_.js";import"./index-DDqTwqBQ.js";import"./scenarioCatalog-h1R6I7ry.js";const ne={title:"Features/Barcodes",id:"barcode",render:(H,J)=>K.jsx(M,{...H,scenarioId:J.id}),tags:["autodocs","vrt"],parameters:{layout:"centered",docs:{description:{component:"Barcode rendering primitives — code128, PDF417, QR — sizing, positioning and alt-text fallback."}}}},a={name:"Code 128 — 1 character",args:e("barcode--code-128-1",N),parameters:{__id:"barcode--code-128-1"}},r={name:"Code 128 — 3 characters",args:e("barcode--code-128-2",T),parameters:{__id:"barcode--code-128-2"}},o={name:"Code 128 — 20-character message",args:e("barcode--code-128-3",U),parameters:{__id:"barcode--code-128-3"}},s={name:"Code 128 — 40-character message",args:e("barcode--code-128-4",V),parameters:{__id:"barcode--code-128-4"}},c={name:"Code 128 — 80-character message",args:e("barcode--code-128-5",W),parameters:{__id:"barcode--code-128-5"}},d={name:"PDF417 — short alphanumeric message",args:e("barcode--pdf-417-1",X),parameters:{__id:"barcode--pdf-417-1"}},n={name:"PDF417 — 20-character message",args:e("barcode--pdf-417-2",Y),parameters:{__id:"barcode--pdf-417-2"}},m={name:"PDF417 — 40-character message",args:e("barcode--pdf-417-3",Z),parameters:{__id:"barcode--pdf-417-3"}},p={name:"PDF417 — compact alphanumeric message",args:e("barcode--pdf-417-4",$),parameters:{__id:"barcode--pdf-417-4"}},t={name:"QR code — large payload",args:e("barcode--large-barcode",ee),parameters:{__id:"barcode--large-barcode"}};var i,_,g;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Code 128 — 1 character",
  args: comparisonArgs("barcode--code-128-1", code128_1),
  parameters: {
    __id: "barcode--code-128-1"
  }
}`,...(g=(_=a.parameters)==null?void 0:_.docs)==null?void 0:g.source}}};var b,u,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Code 128 — 3 characters",
  args: comparisonArgs("barcode--code-128-2", code128_2),
  parameters: {
    __id: "barcode--code-128-2"
  }
}`,...(f=(u=r.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var l,C,h;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Code 128 — 20-character message",
  args: comparisonArgs("barcode--code-128-3", code128_3),
  parameters: {
    __id: "barcode--code-128-3"
  }
}`,...(h=(C=o.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var P,A,F;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: "Code 128 — 40-character message",
  args: comparisonArgs("barcode--code-128-4", code128_4),
  parameters: {
    __id: "barcode--code-128-4"
  }
}`,...(F=(A=s.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var S,D,x;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Code 128 — 80-character message",
  args: comparisonArgs("barcode--code-128-5", code128_5),
  parameters: {
    __id: "barcode--code-128-5"
  }
}`,...(x=(D=c.parameters)==null?void 0:D.docs)==null?void 0:x.source}}};var B,R,j;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "PDF417 — short alphanumeric message",
  args: comparisonArgs("barcode--pdf-417-1", pdf417_1),
  parameters: {
    __id: "barcode--pdf-417-1"
  }
}`,...(j=(R=d.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var y,Q,v;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "PDF417 — 20-character message",
  args: comparisonArgs("barcode--pdf-417-2", pdf417_2),
  parameters: {
    __id: "barcode--pdf-417-2"
  }
}`,...(v=(Q=n.parameters)==null?void 0:Q.docs)==null?void 0:v.source}}};var E,L,k;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "PDF417 — 40-character message",
  args: comparisonArgs("barcode--pdf-417-3", pdf417_3),
  parameters: {
    __id: "barcode--pdf-417-3"
  }
}`,...(k=(L=m.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var z,I,O;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: "PDF417 — compact alphanumeric message",
  args: comparisonArgs("barcode--pdf-417-4", pdf417_4),
  parameters: {
    __id: "barcode--pdf-417-4"
  }
}`,...(O=(I=p.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var q,w,G;t.parameters={...t.parameters,docs:{...(q=t.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: "QR code — large payload",
  args: comparisonArgs("barcode--large-barcode", largeBarcode),
  parameters: {
    __id: "barcode--large-barcode"
  }
}`,...(G=(w=t.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};const me=["Code128_1","Code128_2","Code128_3","Code128_4","Code128_5","Pdf417_1","Pdf417_2","Pdf417_3","Pdf417_4","LargeBarcode"];export{a as Code128_1,r as Code128_2,o as Code128_3,s as Code128_4,c as Code128_5,t as LargeBarcode,d as Pdf417_1,n as Pdf417_2,m as Pdf417_3,p as Pdf417_4,me as __namedExportsOrder,ne as default};
