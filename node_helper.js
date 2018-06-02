module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("request-promise")},function(e,t){e.exports=require("fs")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function i(e){try{u(r.next(e))}catch(e){c(e)}}function s(e){try{u(r.throw(e))}catch(e){c(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,s)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),c=n(0);t.TokenManager=class{constructor(e){this.config=e,this.currentRefreshToken=this.config.refreshToken,this.accessToken$=this.refreshAccess(),this.accessToken$.catch(console.error),setInterval(()=>{this.accessToken$=this.refreshAccess(),this.accessToken$.catch(console.error)},216e5)}refreshAccess(){return r(this,void 0,void 0,function*(){const e=yield c.post("https://api.monzo.com/oauth2/token",{form:{grant_type:"refresh_token",client_id:this.config.clientId,client_secret:this.config.clientSecret,refresh_token:this.currentRefreshToken},json:!0});return this.writeNewRefreshToken(this.currentRefreshToken,e.refresh_token),this.currentRefreshToken=e.refresh_token,e.access_token})}writeNewRefreshToken(e,t){if(!e)throw Error("No Refresh Token");const n=o.readFileSync("./config/config.js","utf-8").replace(e,t);o.writeFileSync("./config/config.js",n,"utf-8"),console.log("Written new refresh token")}get AccessToken$(){return this.accessToken$}}},function(e,t){e.exports=require("currency-formatter")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function i(e){try{u(r.next(e))}catch(e){c(e)}}function s(e){try{u(r.throw(e))}catch(e){c(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,s)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(3),c=n(0);t.MonzoFetcher=class{constructor(e){this.accountId=e}fetch(e){return r(this,void 0,void 0,function*(){const t=this.fetchTransactions(this.accountId,e),n=this.fetchBalance(this.accountId,e),[r,c]=yield Promise.all([t,n]),i=o.currencies.find(e=>e.code===c.currency);return{transactions:r,balance:c,currency:i}})}fetchTransactions(e,t){return r(this,void 0,void 0,function*(){const n=yield c.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${e}`,{headers:{Authorization:`Bearer ${t}`},json:!0});return n.transactions.slice(Math.max(n.transactions.length-80,0))})}fetchBalance(e,t){return r(this,void 0,void 0,function*(){return yield c.get(`https://api.monzo.com/balance?account_id=${e}`,{headers:{Authorization:`Bearer ${t}`},json:!0})})}}},function(e,t){e.exports=require("node_helper")},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function i(e){try{u(r.next(e))}catch(e){c(e)}}function s(e){try{u(r.throw(e))}catch(e){c(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,s)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),c=n(4),i=n(2);let s,u;e.exports=o.create({start(){},fetch(){return r(this,void 0,void 0,function*(){const e=yield s.AccessToken$,t=yield u.fetch(e);this.sendSocketNotification("monzo-data",t)})},socketNotificationReceived(e,t){return r(this,void 0,void 0,function*(){switch(e){case"config":const n=function(e){if(void 0===e.accountId)throw Error("Missing accountId");if(void 0===e.clientId)throw Error("Missing clientId");if(void 0===e.clientSecret)throw Error("Missing clientSecret");if(void 0===e.refreshToken)throw Error("Missing refreshToken");return e}(t);s=new i.TokenManager(n),u=new c.MonzoFetcher(n.accountId),yield this.fetch(),setInterval(()=>{this.fetch()},6e4)}})}})}]);