"use strict";(self.webpackChunkquiccasa_client=self.webpackChunkquiccasa_client||[]).push([[553],{3553:function(n,t,r){r.r(t);var e=r(390),c=r(971),o=r(3721),u=r(6715),i=r(6733),s=r(2333),f=r(4100),a=r(1661);function l(){var n=(0,c.k6)(),t=(0,e.useContext)(s.F),r=(0,e.useContext)(i.V),l=r.auth,h=r.setAuth,g=(0,o.$)().t;return(0,e.useEffect)((function(){t?(0,u.w7)({success:function(){console.log("signOut calling setAuth"),h({user:!1}),n.replace("/")},error:function(n){console.error("signOut error:",n),(0,a.ci)("signOut",n),f.A.error(g(n.message))}}):(console.log("signOut calling setAuth"),h({user:!1}),n.replace("/"))}),[t,n,l,h,g]),null}t.default=e.memo(l)},6715:function(n,t,r){r.d(t,{_f:function(){return g},t$:function(){return l},gF:function(){return d},vG:function(){return m},kk:function(){return v},Rv:function(){return p},zB:function(){return a},w7:function(){return y},y1:function(){return h}});var e=r(6515),c=r(6444),o=r(2600),u=r.n(o),i=(r(3137),{signIn:function(n){return s("/api/auth/login","POST",n)},signUp:function(n){return s("/api/auth/register","POST",n)},confirmSignUp:function(n){return s("/api/auth/verify/".concat(n.code),"GET",n)},currentAuthenticatedUser:function(n){return new Promise((function(n,t){var r=JSON.parse(localStorage.getItem("auth"));r?n(r.user):t()}))},signOut:function(n){return new Promise((function(n,t){n()}))}}),s=function(n,t,r){return console.log("fetcher:",n,t,r),new Promise((function(c,o){"GET"===t&&r&&(n+="?"+Object.keys(r).map((function(n){return encodeURIComponent(n)+"="+encodeURIComponent(r[n])})).join("&")),console.log("fetcher url 2:",n);var i=(0,e.Z)((0,e.Z)({method:t,headers:new Headers(u().api.headers)},r&&"GET"!==t&&{body:JSON.stringify(r)}),{},{redirect:u().api.redirect});console.log("fetcher opt:",i),fetch(n,(0,e.Z)((0,e.Z)({method:t,headers:new Headers(u().api.headers)},r&&"GET"!==t&&{body:JSON.stringify(r)}),{},{redirect:u().api.redirect})).then((function(t){console.log("fetcher res:",t);try{t.json().then((function(n){console.log("fetcher data:",n),t.ok||o({status:t.status,statusText:t.statusText,message:n.message?n.message:t.statusText}),c(n)}))}catch(r){console.error("fetch ".concat(n," error:"),r)}})).catch((function(t){console.error("fetch ".concat(n," error:"),t),o(t)}))}))},f=i;function a(n,t){var r=t.success,o=t.error,u=t.final;(0,c.JE)(f.signIn((0,e.Z)({},n)).then((function(n){console.log("success:",n),r(n)})).catch((function(n){console.log("error:",n),o(n)})).finally((function(n){return u(n)})))}function l(n,t){var r=t.success,o=t.error,u=t.final;(0,c.JE)(f.federatedSignIn((0,e.Z)({},n)).then((function(n){return r(n)})).catch((function(n){return o(n)})).finally((function(n){return u(n)})))}function h(n,t){var r=t.success,o=t.error,u=t.final;(0,c.JE)(f.signUp((0,e.Z)({},n)).then((function(n){return r(n)})).catch((function(n){return o(n)})).finally((function(n){return u(n)})))}function g(n,t){var r=t.success,o=t.error,u=t.final;console.log("TrackPromise - props:",n),(0,c.JE)(f.confirmSignUp((0,e.Z)({},n)).then((function(n){return r(n)})).catch((function(n){return o(n)})).finally((function(n){return u(n)})))}function d(n,t){var r=t.success,e=t.error,o=t.final;(0,c.JE)(f.forgotPassword(n).then((function(n){return r(n)})).catch((function(n){return e(n)})).finally((function(n){return o(n)})))}function p(n,t){var r=t.success,e=t.error,o=t.final;(0,c.JE)(f.resendSignUp(n).then((function(n){return r(n)})).catch((function(n){return e(n)})).finally((function(n){return o(n)})))}function m(n,t,r,e){var o=e.success,u=e.error,i=e.final;(0,c.JE)(f.forgotPasswordSubmit(n,t,r).then((function(n){return o(n)})).catch((function(n){return u(n)})).finally((function(n){return i(n)})))}function v(n,t){var r=t.success,e=t.error,o=t.final;(0,c.JE)(f.resendSignUp(n).then((function(n){return r(n)})).catch((function(n){return e(n)})).finally((function(n){return o(n)})))}function y(n){var t=n.success,r=n.error,e=n.final;(0,c.JE)(f.signOut().then((function(n){return t(n)})).catch((function(n){return r(n)})).finally((function(n){return e(n)})))}}}]);
//# sourceMappingURL=553.af1018d8.chunk.js.map