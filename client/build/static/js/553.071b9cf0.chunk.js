"use strict";(self.webpackChunkquiccasa_client=self.webpackChunkquiccasa_client||[]).push([[553],{3553:function(n,e,t){t.r(e);var r=t(390),c=t(971),o=t(3721),u=t(6715),i=t(6733),s=t(2333),f=t(4100),a=t(1661);function l(){var n=(0,c.k6)(),e=(0,r.useContext)(s.F),t=(0,r.useContext)(i.V),l=t.auth,h=t.setAuth,g=(0,o.$)().t;return(0,r.useEffect)((function(){e?(0,u.w7)({success:function(){console.log("signOut calling setAuth"),h({user:!1}),n.replace("/")},error:function(n){console.error("signOut error:",n),(0,a.ci)("signOut",n),f.A.error(g(n.message))}}):(console.log("signOut calling setAuth"),h({user:!1}),n.replace("/"))}),[e,n,l,h,g]),null}e.default=r.memo(l)},6715:function(n,e,t){t.d(e,{_f:function(){return d},t$:function(){return h},gF:function(){return p},vG:function(){return v},kk:function(){return y},Rv:function(){return m},zB:function(){return l},w7:function(){return E},y1:function(){return g}});var r=t(6515),c=t(6444),o=t(2600),u=t.n(o),i=t(3137),s={signUp:function(n){return f("/api/auth/register","POST",n)},confirmSignUp:function(n){return f("/api/auth/verify/".concat(n.code),"GET",n)},signIn:function(n){return f("/api/auth/login","POST",n)},federatedSignIn:function(n){return console.log("*********************",(0,i.lf)(),n),f("/api/auth/loginGoogle","GET",n)},currentAuthenticatedUser:function(n){return new Promise((function(n,e){var t=JSON.parse(localStorage.getItem("auth"));t?n(t.user):e()}))},signOut:function(n){return new Promise((function(n,e){n()}))}},f=function(n,e,t){return console.log("fetcher:",n,e,t),new Promise((function(c,o){"GET"===e&&t&&(n+="?"+Object.keys(t).map((function(n){return encodeURIComponent(n)+"="+encodeURIComponent(t[n])})).join("&")),console.log("fetcher url 2:",n);var i=(0,r.Z)((0,r.Z)({method:e,headers:new Headers(u().api.headers)},t&&"GET"!==e&&{body:JSON.stringify(t)}),{},{redirect:u().api.redirect});console.log("fetcher opt:",i),fetch(n,(0,r.Z)((0,r.Z)({method:e,headers:new Headers(u().api.headers)},t&&"GET"!==e&&{body:JSON.stringify(t)}),{},{redirect:u().api.redirect})).then((function(e){console.log("fetcher res:",e);try{e.json().then((function(t){console.log("fetcher from ".concat(n," data:"),t),e.ok||o({status:e.status,statusText:e.statusText,message:t.message?t.message:e.statusText}),c(t)}))}catch(t){console.error("fetch ".concat(n," error:"),t)}})).catch((function(e){console.error("fetch ".concat(n," error:"),e),o(e)}))}))},a=s;function l(n,e){var t=e.success,o=e.error,u=e.final;(0,c.JE)(a.signIn((0,r.Z)({},n)).then((function(n){console.log("success:",n),t(n)})).catch((function(n){console.log("error:",n),o(n)})).finally((function(n){return u(n)})))}function h(n,e){e.success,e.error,e.final;a.federatedSignIn((0,r.Z)({},n))}function g(n,e){var t=e.success,o=e.error,u=e.final;(0,c.JE)(a.signUp((0,r.Z)({},n)).then((function(n){return t(n)})).catch((function(n){return o(n)})).finally((function(n){return u(n)})))}function d(n,e){var t=e.success,o=e.error,u=e.final;console.log("TrackPromise - props:",n),(0,c.JE)(a.confirmSignUp((0,r.Z)({},n)).then((function(n){return t(n)})).catch((function(n){return o(n)})).finally((function(n){return u(n)})))}function p(n,e){var t=e.success,r=e.error,o=e.final;(0,c.JE)(a.forgotPassword(n).then((function(n){return t(n)})).catch((function(n){return r(n)})).finally((function(n){return o(n)})))}function m(n,e){var t=e.success,r=e.error,o=e.final;(0,c.JE)(a.resendSignUp(n).then((function(n){return t(n)})).catch((function(n){return r(n)})).finally((function(n){return o(n)})))}function v(n,e,t,r){var o=r.success,u=r.error,i=r.final;(0,c.JE)(a.forgotPasswordSubmit(n,e,t).then((function(n){return o(n)})).catch((function(n){return u(n)})).finally((function(n){return i(n)})))}function y(n,e){var t=e.success,r=e.error,o=e.final;(0,c.JE)(a.resendSignUp(n).then((function(n){return t(n)})).catch((function(n){return r(n)})).finally((function(n){return o(n)})))}function E(n){var e=n.success,t=n.error,r=n.final;(0,c.JE)(a.signOut().then((function(n){return e(n)})).catch((function(n){return t(n)})).finally((function(n){return r(n)})))}}}]);
//# sourceMappingURL=553.071b9cf0.chunk.js.map