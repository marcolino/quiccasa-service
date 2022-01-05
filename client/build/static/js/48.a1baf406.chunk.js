"use strict";(self.webpackChunkquiccasa_client=self.webpackChunkquiccasa_client||[]).push([[48],{1411:function(e,a,i){var n=i(7462),o=i(5987),r=i(4942),t=i(390),l=(i(188),i(4977)),s=i(6533),c=i(4799),d=i(18),p=i(6195),m=i(8458),u=i(2548),v=i(6990),h={enter:u.x9.enteringScreen,exit:u.x9.leavingScreen},x=t.forwardRef((function(e,a){var i=e.BackdropProps,r=e.children,s=e.classes,u=e.className,x=e.disableBackdropClick,f=void 0!==x&&x,b=e.disableEscapeKeyDown,g=void 0!==b&&b,Z=e.fullScreen,k=void 0!==Z&&Z,E=e.fullWidth,y=void 0!==E&&E,w=e.maxWidth,W=void 0===w?"sm":w,S=e.onBackdropClick,C=e.onClose,B=e.onEnter,N=e.onEntered,D=e.onEntering,P=e.onEscapeKeyDown,T=e.onExit,M=e.onExited,A=e.onExiting,K=e.open,R=e.PaperComponent,$=void 0===R?v.Z:R,F=e.PaperProps,z=void 0===F?{}:F,Y=e.scroll,H=void 0===Y?"paper":Y,X=e.TransitionComponent,j=void 0===X?m.Z:X,q=e.transitionDuration,I=void 0===q?h:q,L=e.TransitionProps,_=e["aria-describedby"],O=e["aria-labelledby"],U=(0,o.Z)(e,["BackdropProps","children","classes","className","disableBackdropClick","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","onEnter","onEntered","onEntering","onEscapeKeyDown","onExit","onExited","onExiting","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps","aria-describedby","aria-labelledby"]),V=t.useRef();return t.createElement(d.Z,(0,n.Z)({className:(0,l.Z)(s.root,u),BackdropComponent:p.Z,BackdropProps:(0,n.Z)({transitionDuration:I},i),closeAfterTransition:!0},f?{disableBackdropClick:f}:{},{disableEscapeKeyDown:g,onEscapeKeyDown:P,onClose:C,open:K,ref:a},U),t.createElement(j,(0,n.Z)({appear:!0,in:K,timeout:I,onEnter:B,onEntering:D,onEntered:N,onExit:T,onExiting:A,onExited:M,role:"none presentation"},L),t.createElement("div",{className:(0,l.Z)(s.container,s["scroll".concat((0,c.Z)(H))]),onMouseUp:function(e){e.target===e.currentTarget&&e.target===V.current&&(V.current=null,S&&S(e),!f&&C&&C(e,"backdropClick"))},onMouseDown:function(e){V.current=e.target}},t.createElement($,(0,n.Z)({elevation:24,role:"dialog","aria-describedby":_,"aria-labelledby":O},z,{className:(0,l.Z)(s.paper,s["paperScroll".concat((0,c.Z)(H))],s["paperWidth".concat((0,c.Z)(String(W)))],z.className,k&&s.paperFullScreen,y&&s.paperFullWidth)}),r))))}));a.Z=(0,s.Z)((function(e){return{root:{"@media print":{position:"absolute !important"}},scrollPaper:{display:"flex",justifyContent:"center",alignItems:"center"},scrollBody:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}},container:{height:"100%","@media print":{height:"auto"},outline:0},paper:{margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},paperScrollPaper:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},paperScrollBody:{display:"inline-block",verticalAlign:"middle",textAlign:"left"},paperWidthFalse:{maxWidth:"calc(100% - 64px)"},paperWidthXs:{maxWidth:Math.max(e.breakpoints.values.xs,444),"&$paperScrollBody":(0,r.Z)({},e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})},paperWidthSm:{maxWidth:e.breakpoints.values.sm,"&$paperScrollBody":(0,r.Z)({},e.breakpoints.down(e.breakpoints.values.sm+64),{maxWidth:"calc(100% - 64px)"})},paperWidthMd:{maxWidth:e.breakpoints.values.md,"&$paperScrollBody":(0,r.Z)({},e.breakpoints.down(e.breakpoints.values.md+64),{maxWidth:"calc(100% - 64px)"})},paperWidthLg:{maxWidth:e.breakpoints.values.lg,"&$paperScrollBody":(0,r.Z)({},e.breakpoints.down(e.breakpoints.values.lg+64),{maxWidth:"calc(100% - 64px)"})},paperWidthXl:{maxWidth:e.breakpoints.values.xl,"&$paperScrollBody":(0,r.Z)({},e.breakpoints.down(e.breakpoints.values.xl+64),{maxWidth:"calc(100% - 64px)"})},paperFullWidth:{width:"calc(100% - 64px)"},paperFullScreen:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,"&$paperScrollBody":{margin:0,maxWidth:"100%"}}}}),{name:"MuiDialog"})(x)},2398:function(e,a,i){var n=i(7462),o=i(5987),r=i(390),t=(i(188),i(4977)),l=i(6533),s=r.forwardRef((function(e,a){var i=e.disableSpacing,l=void 0!==i&&i,s=e.classes,c=e.className,d=(0,o.Z)(e,["disableSpacing","classes","className"]);return r.createElement("div",(0,n.Z)({className:(0,t.Z)(s.root,c,!l&&s.spacing),ref:a},d))}));a.Z=(0,l.Z)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiDialogActions"})(s)},9797:function(e,a,i){var n=i(7462),o=i(5987),r=i(390),t=(i(188),i(4977)),l=i(6533),s=r.forwardRef((function(e,a){var i=e.classes,l=e.className,s=e.dividers,c=void 0!==s&&s,d=(0,o.Z)(e,["classes","className","dividers"]);return r.createElement("div",(0,n.Z)({className:(0,t.Z)(i.root,l,c&&i.dividers),ref:a},d))}));a.Z=(0,l.Z)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(s)},6826:function(e,a,i){var n=i(7462),o=i(5987),r=i(390),t=(i(188),i(4977)),l=i(6533),s=i(1395),c=r.forwardRef((function(e,a){var i=e.children,l=e.classes,c=e.className,d=e.disableTypography,p=void 0!==d&&d,m=(0,o.Z)(e,["children","classes","className","disableTypography"]);return r.createElement("div",(0,n.Z)({className:(0,t.Z)(l.root,c),ref:a},m),p?i:r.createElement(s.Z,{component:"h2",variant:"h6"},i))}));a.Z=(0,l.Z)({root:{margin:0,padding:"16px 24px",flex:"0 0 auto"}},{name:"MuiDialogTitle"})(c)},5416:function(e,a,i){var n=i(5318),o=i(862);a.Z=void 0;var r=o(i(390)),t=(0,n(i(7581)).default)(r.createElement("path",{d:"M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"}),"ConfirmationNumber");a.Z=t}}]);
//# sourceMappingURL=48.a1baf406.chunk.js.map