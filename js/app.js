(function(e){function t(t){for(var r,n,o=t[0],l=t[1],c=t[2],p=0,d=[];p<o.length;p++)n=o[p],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&d.push(i[n][0]),i[n]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],r=!0,o=1;o<a.length;o++){var l=a[o];0!==i[l]&&(r=!1)}r&&(s.splice(t--,1),e=n(n.s=a[0]))}return e}var r={},i={app:0},s=[];function n(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=r,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);var r=a("2b0e"),i=function(){var e=this,t=e._self._c;return t("div",[t("agora-video",{attrs:{appid:e.appid,token:e.token,channel:e.channel,uid:e.uid}})],1)},s=[],n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("p",{ref:"playername",staticClass:"player-name",attrs:{id:"local-player-name"}}),t("div",{ref:"player",staticClass:"player",attrs:{id:"local-player"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.isStatus,expression:"!isStatus"}],staticClass:"call",on:{click:e.sharRTC}}),t("div",{directives:[{name:"show",rawName:"v-show",value:e.isStatus,expression:"isStatus"}],staticClass:"answer",on:{click:e.Leave}})]),t("div",{ref:"playlist",attrs:{id:"remote-playerlist"}})])},o=[],l=a("e671"),c=a.n(l),u={name:"App",data(){return{isStatus:!1,agoraClient:null,localTracks:{videoTrack:null,audioTrack:null},options:{},remoteUsers:{}}},props:{appid:String,token:String,channel:String,uid:Number},mounted(){},methods:{sharRTC(){this.agoraClient=c.a.createClient({mode:"rtc",codec:"vp8"}),this.options={appid:this.appid,channel:this.channel,uid:8848,token:this.token},this.join()},async join(){this.isStatus=!this.isStatus,this.agoraClient.on("user-published",this.handleUserPublished),this.agoraClient.on("user-unpublished",this.handleUserUnpublished),[this.uid,this.localTracks.audioTrack,this.localTracks.videoTrack]=await Promise.all([this.agoraClient.join(this.appid,this.channel,this.token||null),c.a.createMicrophoneAudioTrack(),c.a.createCameraVideoTrack()]),await this.agoraClient.publish(Object.values(this.localTracks)),this.localTracks.videoTrack.play("local-player")},handleUserPublished(e,t){const a=e.uid;this.remoteUsers[a]=e,this.subscribe(e,t)},handleUserUnpublished(e){const t=e.uid;delete this.remoteUsers[t],console.log("我离开了，请销毁我的Dom结构！~~~"),setTimeout(()=>{var e=document.querySelectorAll(".players");console.log(e.length);for(let t=0;t<e.length;t++)""==e[t].innerHTML&&(e[t].parentNode.parentNode.removeChild(e[t].parentNode),console.log("销毁成功"))},1e3)},async subscribe(e,t){const a=e.uid;if(await this.agoraClient.subscribe(e,t),"video"===t){let t=document.createElement("div"),r=document.createElement("div");t.setAttribute("class","player-wrapper-id"),r.setAttribute("id","player-"+a),r.setAttribute("class","players"),t.appendChild(r),this.$refs.playlist.append(t),e.videoTrack.play("player-"+a),e.audioTrack.play()}"audio"===t&&e.audioTrack.play()},async Leave(){this.localTracks.videoTrack.stop(),this.localTracks.videoTrack.close(),this.localTracks.audioTrack.stop(),this.localTracks.audioTrack.close(),this.remoteUsers={},this.$refs.playlist.innerHTML="",await this.agoraClient.leave(),console.log("客户离开信道成功"),this.isStatus=!this.isStatus}}},p=u,d=(a("d1ef"),a("2877")),h=Object(d["a"])(p,n,o,!1,null,null,null),f=h.exports,b={components:{AgoraVideo:f},data(){return{appid:"6a4b4379828e4f85bb7f41b8b3aee304",token:"007eJxTYHhcfknfrqPV60Od42+RXWeVq+wOMUw9pNQs7vlr752DWfIKDGaJJkkmxuaWFkYWqSZpFqZJSeZpJoZJFknGiampxgYmr9cEJDcEMjII/LnHyMgAgSA+E4OhIQMDAEHwH1Y=",channel:"11",uid:8848}}},v=b,y=Object(d["a"])(v,i,s,!1,null,null,null),k=y.exports,m=a("bc4a"),T=a.n(m);a("c0f6");r["default"].use(T.a,{appid:"6a4b4379828e4f85bb7f41b8b3aee304",token:"007eJxTYOgufbG8T9b7zYmP19ec3szevmq2xcWbkgoO4Yu1At8+VpJUYDBLNEkyMTa3tDCySDVJszBNSjJPMzFMskgyTkxNNTYwWaQckNwQyMhwTHEuIyMDBIL4TAyGhgwMAHhWHuw="}),new r["default"]({render:e=>e(k)}).$mount("#app")},b105:function(e,t,a){},d1ef:function(e,t,a){"use strict";a("b105")}});