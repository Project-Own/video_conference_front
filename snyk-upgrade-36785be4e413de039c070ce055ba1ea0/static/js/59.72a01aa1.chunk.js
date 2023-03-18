"use strict";(self.webpackChunkmajor_project_frontend=self.webpackChunkmajor_project_frontend||[]).push([[59],{3059:function(e,t,n){n.r(t),n.d(t,{default:function(){return se}});var i=n(9439),r=n(7462),o=n(3366),a=n(2791),s=n(8182),d=n(767),c=n(5255),l=n(3736),u=n(703),m=n(4301),p=n(208);function h(e){return(0,m.Z)("MuiCard",e)}(0,p.Z)("MuiCard",["root"]);var g=n(184),x=["className","raised"],Z=(0,c.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{overflow:"hidden"}})),v=a.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiCard"}),i=n.className,a=n.raised,c=void 0!==a&&a,u=(0,o.Z)(n,x),m=(0,r.Z)({},n,{raised:c}),p=function(e){var t=e.classes;return(0,d.Z)({root:["root"]},h,t)}(m);return(0,g.jsx)(Z,(0,r.Z)({className:(0,s.Z)(p.root,i),elevation:c?8:void 0,ref:t,ownerState:m},u))}));function f(e){return(0,m.Z)("MuiCardMedia",e)}(0,p.Z)("MuiCardMedia",["root","media","img"]);var b=["children","className","component","image","src","style"],j=(0,c.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState,i=n.isMediaComponent,r=n.isImageComponent;return[t.root,i&&t.media,r&&t.img]}})((function(e){var t=e.ownerState;return(0,r.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},t.isMediaComponent&&{width:"100%"},t.isImageComponent&&{objectFit:"cover"})})),y=["video","audio","picture","iframe","img"],C=["picture","img"],w=a.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiCardMedia"}),i=n.children,a=n.className,c=n.component,u=void 0===c?"div":c,m=n.image,p=n.src,h=n.style,x=(0,o.Z)(n,b),Z=-1!==y.indexOf(u),v=!Z&&m?(0,r.Z)({backgroundImage:'url("'.concat(m,'")')},h):h,w=(0,r.Z)({},n,{component:u,isMediaComponent:Z,isImageComponent:-1!==C.indexOf(u)}),S=function(e){var t=e.classes,n={root:["root",e.isMediaComponent&&"media",e.isImageComponent&&"img"]};return(0,d.Z)(n,f,t)}(w);return(0,g.jsx)(j,(0,r.Z)({className:(0,s.Z)(S.root,a),as:u,role:!Z&&m?"img":void 0,ref:t,style:v,ownerState:w,src:Z?m||p:void 0},x,{children:i}))}));function S(e){return(0,m.Z)("MuiCardActions",e)}(0,p.Z)("MuiCardActions",["root","spacing"]);var R=["disableSpacing","className"],P=(0,c.ZP)("div",{name:"MuiCardActions",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,!n.disableSpacing&&t.spacing]}})((function(e){var t=e.ownerState;return(0,r.Z)({display:"flex",alignItems:"center",padding:8},!t.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})})),M=a.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiCardActions"}),i=n.disableSpacing,a=void 0!==i&&i,c=n.className,u=(0,o.Z)(n,R),m=(0,r.Z)({},n,{disableSpacing:a}),p=function(e){var t=e.classes,n={root:["root",!e.disableSpacing&&"spacing"]};return(0,d.Z)(n,S,t)}(m);return(0,g.jsx)(P,(0,r.Z)({className:(0,s.Z)(p.root,c),ownerState:m,ref:t},u))})),I=n(4942),A=n(627),k=n(2065),N=n(6734),G=n(9103),_=n(162),L=n(2071),F=n(6199);function O(e){return(0,m.Z)("MuiListItem",e)}var D=(0,p.Z)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);var V=(0,p.Z)("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);function T(e){return(0,m.Z)("MuiListItemSecondaryAction",e)}(0,p.Z)("MuiListItemSecondaryAction",["root","disableGutters"]);var z=["className"],W=(0,c.ZP)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.disableGutters&&t.disableGutters]}})((function(e){var t=e.ownerState;return(0,r.Z)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})})),H=a.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiListItemSecondaryAction"}),i=n.className,c=(0,o.Z)(n,z),u=a.useContext(F.Z),m=(0,r.Z)({},n,{disableGutters:u.disableGutters}),p=function(e){var t=e.disableGutters,n=e.classes,i={root:["root",t&&"disableGutters"]};return(0,d.Z)(i,T,n)}(m);return(0,g.jsx)(W,(0,r.Z)({className:(0,s.Z)(p.root,i),ownerState:m,ref:t},c))}));H.muiName="ListItemSecondaryAction";var B=H,q=["className"],E=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected"],K=(0,c.ZP)("div",{name:"MuiListItem",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.dense&&t.dense,"flex-start"===n.alignItems&&t.alignItemsFlexStart,n.divider&&t.divider,!n.disableGutters&&t.gutters,!n.disablePadding&&t.padding,n.button&&t.button,n.hasSecondaryAction&&t.secondaryAction]}})((function(e){var t,n=e.theme,i=e.ownerState;return(0,r.Z)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!i.disablePadding&&(0,r.Z)({paddingTop:8,paddingBottom:8},i.dense&&{paddingTop:4,paddingBottom:4},!i.disableGutters&&{paddingLeft:16,paddingRight:16},!!i.secondaryAction&&{paddingRight:48}),!!i.secondaryAction&&(0,I.Z)({},"& > .".concat(V.root),{paddingRight:48}),(t={},(0,I.Z)(t,"&.".concat(D.focusVisible),{backgroundColor:n.palette.action.focus}),(0,I.Z)(t,"&.".concat(D.selected),(0,I.Z)({backgroundColor:(0,k.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity)},"&.".concat(D.focusVisible),{backgroundColor:(0,k.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.focusOpacity)})),(0,I.Z)(t,"&.".concat(D.disabled),{opacity:n.palette.action.disabledOpacity}),t),"flex-start"===i.alignItems&&{alignItems:"flex-start"},i.divider&&{borderBottom:"1px solid ".concat(n.palette.divider),backgroundClip:"padding-box"},i.button&&(0,I.Z)({transition:n.transitions.create("background-color",{duration:n.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:n.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(D.selected,":hover"),{backgroundColor:(0,k.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(0,k.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity)}}),i.hasSecondaryAction&&{paddingRight:48})})),X=(0,c.ZP)("li",{name:"MuiListItem",slot:"Container",overridesResolver:function(e,t){return t.container}})({position:"relative"}),Y=a.forwardRef((function(e,t){var n=(0,l.Z)({props:e,name:"MuiListItem"}),i=n.alignItems,c=void 0===i?"center":i,u=n.autoFocus,m=void 0!==u&&u,p=n.button,h=void 0!==p&&p,x=n.children,Z=n.className,v=n.component,f=n.components,b=void 0===f?{}:f,j=n.componentsProps,y=void 0===j?{}:j,C=n.ContainerComponent,w=void 0===C?"li":C,S=n.ContainerProps,R=(S=void 0===S?{}:S).className,P=n.dense,M=void 0!==P&&P,I=n.disabled,k=void 0!==I&&I,V=n.disableGutters,T=void 0!==V&&V,z=n.disablePadding,W=void 0!==z&&z,H=n.divider,Y=void 0!==H&&H,J=n.focusVisibleClassName,Q=n.secondaryAction,U=n.selected,$=void 0!==U&&U,ee=(0,o.Z)(n.ContainerProps,q),te=(0,o.Z)(n,E),ne=a.useContext(F.Z),ie={dense:M||ne.dense||!1,alignItems:c,disableGutters:T},re=a.useRef(null);(0,_.Z)((function(){m&&re.current&&re.current.focus()}),[m]);var oe=a.Children.toArray(x),ae=oe.length&&(0,G.Z)(oe[oe.length-1],["ListItemSecondaryAction"]),se=(0,r.Z)({},n,{alignItems:c,autoFocus:m,button:h,dense:ie.dense,disabled:k,disableGutters:T,disablePadding:W,divider:Y,hasSecondaryAction:ae,selected:$}),de=function(e){var t=e.alignItems,n=e.button,i=e.classes,r=e.dense,o=e.disabled,a={root:["root",r&&"dense",!e.disableGutters&&"gutters",!e.disablePadding&&"padding",e.divider&&"divider",o&&"disabled",n&&"button","flex-start"===t&&"alignItemsFlexStart",e.hasSecondaryAction&&"secondaryAction",e.selected&&"selected"],container:["container"]};return(0,d.Z)(a,O,i)}(se),ce=(0,L.Z)(re,t),le=b.Root||K,ue=y.root||{},me=(0,r.Z)({className:(0,s.Z)(de.root,ue.className,Z),disabled:k},te),pe=v||"li";return h&&(me.component=v||"div",me.focusVisibleClassName=(0,s.Z)(D.focusVisible,J),pe=N.Z),ae?(pe=me.component||v?pe:"div","li"===w&&("li"===pe?pe="div":"li"===me.component&&(me.component="div")),(0,g.jsx)(F.Z.Provider,{value:ie,children:(0,g.jsxs)(X,(0,r.Z)({as:w,className:(0,s.Z)(de.container,R),ref:ce,ownerState:se},ee,{children:[(0,g.jsx)(le,(0,r.Z)({},ue,!(0,A.Z)(le)&&{as:pe,ownerState:(0,r.Z)({},se,ue.ownerState)},me,{children:oe})),oe.pop()]}))})):(0,g.jsx)(F.Z.Provider,{value:ie,children:(0,g.jsxs)(le,(0,r.Z)({},ue,{as:pe,ref:ce,ownerState:se},!(0,A.Z)(le)&&{ownerState:(0,r.Z)({},se,ue.ownerState)},me,{children:[oe,Q&&(0,g.jsx)(B,{children:Q})]}))})})),J=n(1889),Q=n(890),U=n(6151),$=n(493),ee=(0,n(9201).Z)((0,g.jsx)("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"}),"Assignment"),te=n(3967),ne=n(4530),ie=n(9234),re=function(){var e=(0,a.useContext)(ie._).joinRoom,t=(0,a.useState)(""),n=(0,i.Z)(t,2),r=n[0],o=n[1],s=(0,a.useState)(""),d=(0,i.Z)(s,2),c=d[0],l=d[1],u=(0,te.Z)();return(0,g.jsx)(J.ZP,{container:!0,sx:{border:"2px solid ".concat(u.palette.text.primary)},children:(0,g.jsxs)(J.ZP,{item:!0,xs:12,sx:{padding:"2em"},children:[(0,g.jsx)(Q.Z,{gutterBottom:!0,variant:"h5",children:"Gateway to the Room"}),(0,g.jsx)(ne.Z,{label:"Room Name",value:r,onChange:function(e){return o(e.target.value)},onKeyDown:function(t){"Enter"===t.key&&""!==r&&""!==c&&e(r,c)},fullWidth:!0}),(0,g.jsx)(ne.Z,{label:"Name",value:c,onChange:function(e){return l(e.target.value)},onKeyDown:function(t){"Enter"===t.key&&""!==r&&""!==c&&e(r,c)},fullWidth:!0}),(0,g.jsx)(U.Z,{variant:"contained",color:"primary",fullWidth:!0,disabled:""===r||""===c,onClick:function(){return e(r,c)},sx:{mt:"2em"},children:"Host"}),(0,g.jsx)(U.Z,{sx:{mt:"2em"},variant:"contained",color:"secondary",fullWidth:!0,startIcon:(0,g.jsx)(ee,{fontSize:"large"}),onClick:function(){navigator.clipboard.writeText(r||":) Empty string copied")},children:"Copy Room Name"})]})})},oe=function(){var e=(0,a.useContext)(ie._).joinRoom,t=(0,a.useState)(""),n=(0,i.Z)(t,2),r=n[0],o=n[1],s=(0,a.useState)(""),d=(0,i.Z)(s,2),c=d[0],l=d[1],u=(0,te.Z)();return(0,g.jsx)(J.ZP,{container:!0,sx:{border:"2px solid ".concat(u.palette.text.primary)},children:(0,g.jsxs)(J.ZP,{item:!0,xs:12,sx:{padding:"2em"},children:[(0,g.jsx)(Q.Z,{gutterBottom:!0,variant:"h5",children:"Gateway to the Room"}),(0,g.jsx)(ne.Z,{label:"Room Name",value:r,onKeyDown:function(t){"Enter"===t.key&&""!==r&&""!==c&&e(r,c)},onChange:function(e){return o(e.target.value)},fullWidth:!0}),(0,g.jsx)(ne.Z,{label:"Name",value:c,onKeyDown:function(t){"Enter"===t.key&&""!==r&&""!==c&&e(r,c)},onChange:function(e){return l(e.target.value)},fullWidth:!0}),(0,g.jsxs)(U.Z,{variant:"contained",disabled:""===r||""===c,color:"primary",fullWidth:!0,sx:{mt:"2em"},onClick:function(){return e(r,c)},children:[" ","Join"]})]})})},ae=n(362),se=function(){var e=(0,a.useContext)(ae.Q).themeMode,t=(0,a.useState)(!0),n=(0,i.Z)(t,2),r=n[0],o=n[1];return(0,g.jsxs)(J.ZP,{container:!0,direction:"row",style:{width:"100%",height:"100%",padding:32},spacing:6,justifyContent:"center",alignItems:"center",children:[(0,g.jsx)(J.ZP,{item:!0,md:1}),(0,g.jsxs)(J.ZP,{item:!0,container:!0,md:5,direction:"row",alignItems:"center",justifyContent:"center",children:[(0,g.jsx)(J.ZP,{item:!0,xs:12,children:(0,g.jsx)(Q.Z,{variant:"h2",align:"center",children:"Virtual Meet"})}),(0,g.jsx)(J.ZP,{item:!0,style:{marginTop:"15px"},xs:12,children:(0,g.jsx)(Q.Z,{variant:"h4",align:"center",children:"Distance means so little."})}),(0,g.jsx)(J.ZP,{item:!0,xs:12,style:{marginTop:"40px"},children:(0,g.jsx)(Q.Z,{variant:"h6",align:"justify",children:"Virtual meet is a video conferencing app where people can talk with each other. With this app, 3D model can be displayed in augmented reality. Gestures can be used to control different functionalities. Screen sharing can be done for presenting content towards other users. Participant can use the chat feature for communication."})}),(0,g.jsxs)(J.ZP,{item:!0,container:!0,direction:"row",spacing:4,md:12,style:{marginTop:"25px"},children:[(0,g.jsx)(J.ZP,{item:!0,md:6,alignContent:"center",alignItems:"center",children:(0,g.jsx)(U.Z,{variant:"contained",color:"secondary",onClick:function(){o(!1)},children:"Join Meeting"})}),(0,g.jsx)(J.ZP,{item:!0,md:6,children:(0,g.jsx)(U.Z,{variant:"contained",color:"primary",onClick:function(){o(!0)},children:"Host Meeting"})})]})]}),(0,g.jsx)(J.ZP,{item:!0,md:1}),(0,g.jsx)(J.ZP,{container:!0,item:!0,md:4,children:r?(0,g.jsx)(re,{}):(0,g.jsx)(oe,{})}),(0,g.jsx)(J.ZP,{item:!0,md:1}),(0,g.jsxs)(J.ZP,{container:!0,item:!0,md:12,spacing:8,alignItems:"center",justifyContent:"center",children:[(0,g.jsx)(J.ZP,{item:!0,xs:12,children:(0,g.jsx)(Q.Z,{variant:"h4",align:"center",children:"Augmented Reality"})}),(0,g.jsx)(J.ZP,{item:!0,xs:6,md:3,children:(0,g.jsxs)(v,{style:{borderRadius:"1em"},children:[(0,g.jsx)(w,{component:"img",width:"100%",image:"https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png",alt:"Hiro Marker"}),(0,g.jsx)(M,{children:(0,g.jsx)(U.Z,{href:"https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png",target:"_blank",children:"Download"})})]})}),(0,g.jsx)(J.ZP,{item:!0,xs:6,md:4,children:(0,g.jsx)(v,{style:{borderRadius:"1em"},children:(0,g.jsx)(w,{component:"img",width:"100%",image:"".concat("/video_conference_front/snyk-upgrade-36785be4e413de039c070ce055ba1ea0","/AR_edit.png"),alt:"AR on Android Marker"})})}),(0,g.jsx)(J.ZP,{item:!0,direction:"column",xs:6,md:4,children:(0,g.jsx)(v,{style:{borderRadius:"1em"},children:(0,g.jsx)(w,{component:"img",width:"100%",image:"".concat("/video_conference_front/snyk-upgrade-36785be4e413de039c070ce055ba1ea0","/AR_paper_edit.png"),alt:"AR on Paper Marker"})})})]}),(0,g.jsxs)(J.ZP,{container:!0,item:!0,md:12,spacing:8,alignItems:"center",justifyContent:"center",children:[(0,g.jsx)(J.ZP,{item:!0,xs:12,children:(0,g.jsx)(Q.Z,{variant:"h4",align:"center",children:"Single Image Gesture"})}),(0,g.jsx)(J.ZP,{item:!0,xs:12,md:6,children:(0,g.jsx)("img",{style:{borderRadius:"1em"},width:"100%",src:"".concat("/video_conference_front/snyk-upgrade-36785be4e413de039c070ce055ba1ea0").concat("light"===e?"/Gesture_Light_1.png":"/Gesture_Dark_1.png"),alt:"Gesture"})}),(0,g.jsx)(J.ZP,{item:!0,xs:12,md:4,children:(0,g.jsxs)($.Z,{children:[(0,g.jsxs)(Y,{children:["\ud83d\udc4c ",(0,g.jsx)("b",{children:"Movement in Y axis"})," - AR Model Rotation in Y axis"]}),(0,g.jsxs)(Y,{children:["\ud83d\udc4c ",(0,g.jsx)("b",{children:"Movement in X axis"})," - AR Model Rotation in X axis"]}),(0,g.jsxs)(Y,{children:["\u270c ",(0,g.jsx)("b",{children:"Movement in X axis"})," - Scale AR Model"]}),(0,g.jsxs)(Y,{children:["\ud83e\udd18 ",(0,g.jsx)("b",{children:"Movement in X axis"})," - Reset Scale and Rotation"]}),(0,g.jsxs)(Y,{children:["\ud83e\udd19 ",(0,g.jsx)("b",{children:"Stop AR Model "})]}),(0,g.jsxs)(Y,{children:["\ud83d\udc46 ",(0,g.jsx)("b",{children:"Start AR Model"})]})]})})]}),(0,g.jsxs)(J.ZP,{container:!0,item:!0,md:12,spacing:8,alignItems:"center",justifyContent:"center",children:[(0,g.jsx)(J.ZP,{item:!0,xs:12,children:(0,g.jsx)(Q.Z,{variant:"h4",align:"center",children:"Image Sequence Gesture"})}),(0,g.jsx)(J.ZP,{item:!0,xs:12,md:4,children:(0,g.jsxs)($.Z,{children:[(0,g.jsxs)(Y,{children:[(0,g.jsx)("b",{children:"Swipe Left"})," - Open Settings"]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("b",{children:"Swipe Right"})," - Close Settings"]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("b",{children:"Swipe Up"})," - Turn On Microphone"]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("b",{children:"Swipe Down"})," - Turn Off Microphone"]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("b",{children:"Zoom In with Two Fingers"})," - Close Chat"]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("b",{children:"Zoom Out with Two Fingers"})," - Open Chat"]})]})}),(0,g.jsx)(J.ZP,{item:!0,xs:12,md:6,children:(0,g.jsx)("img",{style:{borderRadius:"1em"},width:"100%",src:"".concat("/video_conference_front/snyk-upgrade-36785be4e413de039c070ce055ba1ea0").concat("light"===e?"/Gesture_Light_2.png":"/Gesture_Dark_2.png"),alt:"Gesture"})})]})]})}}}]);
//# sourceMappingURL=59.72a01aa1.chunk.js.map