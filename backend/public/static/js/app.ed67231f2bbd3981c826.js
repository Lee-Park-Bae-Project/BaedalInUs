webpackJsonp([1],{"+Tuu":function(t,e){},0:function(t,e){},"0QlA":function(t,e){},"1/oy":function(t,e){},"1uuo":function(t,e){},"5E1T":function(t,e){},"9M+g":function(t,e){},GfHa:function(t,e){},I1ey:function(t,e){},Id91:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{attrs:{id:"top_nav"}},[s("b-nav",{attrs:{tabs:"",id:"nav"}},[s("b-nav-item",{attrs:{active:""}},[t._v("로그인")]),t._v(" "),s("b-nav-item",[t._v("내정보")]),t._v(" "),s("b-nav-item",[t._v("주문하기")]),t._v(" "),s("b-nav-item",[t._v("배달하기")]),t._v(" "),s("b-nav-item",{on:{click:t.goChatRooms}},[t._v("채팅")])],1)],1)])},staticRenderFns:[]};var r={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"top_container"}},[e("p",[this._v("this is Bottom Vue")]),this._v(" "),e("p",[this._v("©2019 LeeParkBae")])])}]};var a={name:"App",components:{TopVue:s("VU/8")({name:"TopVue",methods:{goChatRooms:function(){this.$router.push("/ChatRooms")}}},o,!1,function(t){s("0QlA")},"data-v-2a261d8f",null).exports,BottomVue:s("VU/8")({name:"BottomVue"},r,!1,function(t){s("dV/9")},"data-v-3f525cc8",null).exports}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("top-vue"),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var c=s("VU/8")(a,i,!1,function(t){s("I1ey")},null,null).exports,u=s("/ocq"),l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"hello"},[s("h1",[t._v(t._s(t.msg))]),t._v(" "),s("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),s("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),s("br"),t._v(" "),s("li",[s("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};s("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},l,!1,function(t){s("1uuo")},"data-v-d8ec41bc",null).exports;var m={render:function(){var t=this.$createElement;return(this._self._c||t)("h1",[this._v(" 메인 페이지")])},staticRenderFns:[]};var v=s("VU/8")({name:"IndexPage"},m,!1,function(t){s("cxuj")},"data-v-4e13c5dc",null).exports,d={name:"LoginPage",data:function(){return{user:{id:"",pw:""},url:{singUpURL:"/SignUpPage"}}},methods:{login:function(t){var e=this;this.$http.post("/login",{user:this.user}).then(function(t){console.log("----------------------response--------------"),console.log(t),console.log(t.status),200==t.status?(console.log("200"),console.log(t),t.data.complete?(localStorage.setItem("userID",e.user.id),localStorage.setItem("userOID",t.data.oid),e.$router.push("/userList")):alert("wrong password")):201==t.status&&(console.log("201"),alert("no matching id"))},function(t){alert(t.response.data.error)}).catch(function(t){alert(t)})}}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login"}},[s("div",[t._v("Login")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.id,expression:"user.id"}],attrs:{placeholder:"ID"},domProps:{value:t.user.id},on:{input:function(e){e.target.composing||t.$set(t.user,"id",e.target.value)}}}),s("br"),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.pw,expression:"user.pw"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.user.pw},on:{input:function(e){e.target.composing||t.$set(t.user,"pw",e.target.value)}}}),s("br"),t._v(" "),s("button",{on:{click:t.login}},[t._v("login")]),t._v(" "),s("a",{attrs:{href:t.url.singUpURL}},[t._v("Sign up")])])},staticRenderFns:[]};var p=s("VU/8")(d,h,!1,function(t){s("V/ri")},"data-v-c3641a6e",null).exports,g={name:"SignUpPage",data:function(){return{user:{id:"",pw:"",name:""}}},methods:{signUp:function(t){var e=this;console.log("button clicked"),this.$http.post("/signup",{user:this.user}).then(function(t){console.log("----------------response---------------------"),console.log(t),console.log(t.status),204===t.status&&alert("Error, please, try again"),201===t.status&&(alert("Success"),e.$router.push("/login"))}).catch(function(t){alert("error")})}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"SignUp"}},[s("div",[t._v(" Sign Up ")]),t._v("\n  Name22222 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.name,expression:"user.name"}],attrs:{placeholder:"name"},domProps:{value:t.user.name},on:{input:function(e){e.target.composing||t.$set(t.user,"name",e.target.value)}}}),t._v(" "),s("br"),t._v("\n  ID : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.id,expression:"user.id"}],attrs:{placeholder:"ID"},domProps:{value:t.user.id},on:{input:function(e){e.target.composing||t.$set(t.user,"id",e.target.value)}}}),t._v(" "),s("br"),t._v("\n  Password : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.pw,expression:"user.pw"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.user.pw},on:{input:function(e){e.target.composing||t.$set(t.user,"pw",e.target.value)}}}),t._v(" "),s("button",{on:{click:t.signUp}},[t._v("SignUp")])])},staticRenderFns:[]},f=s("VU/8")(g,_,!1,null,null,null).exports,b={name:"MainPage",method:{logout:function(t){console.log("logout button clicked"),this.$router.push("/login")}}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"main"}},[e("div",[this._v("Login")]),this._v(" "),e("button",{on:{click:this.login}},[this._v("logout")])])},staticRenderFns:[]};var I=s("VU/8")(b,w,!1,function(t){s("Yyon")},"data-v-d1af868e",null).exports,k=s("Gu7T"),D=s.n(k),x=s("DmT9"),R=s.n(x),j={name:"ChatPage",data:function(){return{user:"",message:"",messages:[],socket:R()("localhost:3000"),joinedRoom:"square",square:"square",rooms:[],roomID:""}},methods:{sendMessage:function(t){t.preventDefault(),this.send(),this.socket.emit("message",{user:this.user,message:this.message}),this.message=""},makeJoin:function(t){var e=this;this.socket.emit("join",t,function(){e.socket.emit("leave",e.joinedRoom),e.joinedRoom=t,console.log(e.rooms)})},joinRoom:function(){this.roomID?this.makeJoin(this.roomID):alert("input the room ID")},send:function(){var t=this.message;console.log("보낼 메시지 : "+t),this.socket.emit("message",{room:this.joinedRoom,msg:t},function(t){console.log("message.callback>>",t)}),this.messages=[].concat(D()(this.messages),[t])}},mounted:function(){var t=this;this.joinedRoom=null,this.socket.on("connect",function(){console.log("connected"),t.makeJoin(t.square),t.socket.emit("rooms",function(e){console.log("rooms : "+e),t.rooms=[].concat(D()(t.rooms),[e])})}),this.socket.on("message",function(e){t.messages=[].concat(D()(t.messages),[e.msg]),console.log("user : "+e.user+" msg : "+e.message),console.log("messages : "+t.messages.length)}),this.socket.on("disconnect",function(){console.log("disconnected")})}},U={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",[s("hr"),t._v(" "),s("p",[t._v("rooms list")]),t._v(" "),t._l(t.rooms,function(e){return s("ul",[s("li",[t._v(t._s(e))])])}),t._v(" "),s("hr")],2),t._v(" "),s("div",[s("form",{on:{submit:function(e){return e.preventDefault(),t.joinRoom(e)}}},[s("label",[t._v("roomID : ")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.roomID,expression:"roomID"}],staticClass:"form-control",attrs:{type:"text",value:"square"},domProps:{value:t.roomID},on:{input:function(e){e.target.composing||(t.roomID=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[t._v("Join")])])]),t._v(" "),s("div",[s("p",[t._v("current room : "+t._s(t.joinedRoom))])]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"card-footer"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.sendMessage(e)}}},[s("div",{staticClass:"gorm-group"},[s("label",[t._v("User:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.user,expression:"user"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.user},on:{input:function(e){e.target.composing||(t.user=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"gorm-group pb-3"},[s("label",[t._v("Message:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}})]),t._v(" "),s("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[t._v("send")])]),t._v(" "),s("table",t._l(t.messages,function(e){return s("tr",[s("td",[t._v(t._s(e))])])}),0)])])])},staticRenderFns:[]};var $=s("VU/8")(j,U,!1,function(t){s("OLR4")},"data-v-70c518fa",null).exports,y={name:"UsersVue",data:function(){return{users:[],socket:R()("localhost:3000"),room:{senderOID:"",senderID:"",receiverOID:"",receiverID:"",message:""}}},methods:{getUsers:function(t){var e=this;this.$http.post("/users",{user:this.user}).then(function(t){console.log(t),console.log(t.data.length),e.users=t.data},function(t){alert(t.response.data.error)}).catch(function(t){alert(t)})},sendMessage:function(t,e,s,n,o){this.$http.post("/chat/makeRoom",{room:{senderOID:t,senderID:e,receiverOID:s,receiverID:n,message:o}}).then(function(t){console.log("---------------result--------------"),console.log(t),201===t.status?alert("메시지를 보냈습니다."):202===t.status&&alert("잠시 후 다시 시도해 주십시오")}).catch(function(t){alert(t)})},UserMenu:function(t,e){console.log("oid: "+e+" id : "+t);var s=localStorage.getItem("userOID"),n=localStorage.getItem("userID"),o=e,r=t;console.log("senderOID : "+s+" senderID : "+n),console.log("receiverOID : "+o+" receiverID : "+r);var a=prompt("메시지를 입력하세여");console.log("newMSG : "+a),this.sendMessage(s,n,o,r,a)}},mounted:function(){this.socket.on("connect",function(){console.log("connected")})}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",[t._v("this is userList")]),t._v(" "),s("button",{on:{click:t.getUsers}}),t._v(" "),s("ul",t._l(t.users,function(e){return s("li",[s("span",[t._v(t._s(e.id))]),t._v(" "),s("div",[s("b-dropdown",{staticClass:"m-md-2",attrs:{id:"ddown1",text:"메뉴"}},[s("b-dropdown-item",{on:{click:function(s){t.UserMenu(e.id,e._id)}}},[t._v("메시지보내기")]),t._v(" "),s("b-dropdown-item",[t._v("차단")]),t._v(" "),s("b-dropdown-divider")],1)],1)])}),0)])},staticRenderFns:[]};var V=s("VU/8")(y,C,!1,function(t){s("5E1T")},"data-v-1099f56d",null).exports,E={name:"ChatRooms",data:function(){return{user:{id:localStorage.getItem("userID"),oid:localStorage.getItem("userOID")},chatRooms:[]}},methods:{getChatRooms:function(t){var e=this;this.$http.post("/chat/getChatRooms",{user:this.user}).then(function(t){console.log("----------------------response--------------"),console.log(t),200===t.status?(console.log(t),e.chatRooms=t.data):204===t.status&&console.log("no chat rooms")},function(t){alert(t.response.data.error)}).catch(function(t){alert(t)})}},created:function(){console.log("created"),this.getChatRooms()}},P={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var O=s("VU/8")(E,P,!1,function(t){s("+Tuu")},"data-v-e007cb40",null).exports,S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"top_container"}},[s("b-card",{attrs:{id:"text_area"}},[s("b-nav",{attrs:{slot:"header",pills:""},slot:"header"},[s("nav-item",{attrs:{id:"chat_header"}},[t._v("chat room")]),t._v(" "),s("b-dropdown-divider")],1),t._v(" "),s("b-card-body",{ref:"content",staticStyle:{position:"relative",height:"300px","overflow-y":"scroll"},attrs:{id:"nav-scroller"}},t._l(t.chatObjects,function(e){return s("div",[1===e.owner?s("div",{attrs:{id:"my_chat"}},[s("p",{staticStyle:{"text-align":"right"}},[t._v(t._s(e.msg))])]):s("div",{attrs:{id:"your_chat"}},[s("p",{staticStyle:{"text-align":"left"}},[t._v(t._s(e.msg))])])])}),0)],1),t._v(" "),s("div",{attrs:{id:"send_bar"}},[s("b-container",[s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"10"}},[s("b-form-input",{attrs:{id:"input-small",type:"text",placeholder:"Enter message"}})],1),t._v(" "),s("button",[t._v("send")])],1)],1)],1)],1)},staticRenderFns:[]};var M=s("VU/8")({name:"ChatRoom",data:function(){return{text:"",chatObjects:[]}},mounted:function(){this.chatObjects.push({owner:1,msg:"hi im juno",time:1111}),this.chatObjects.push({owner:1,msg:"fuckyou",time:1111}),this.chatObjects.push({owner:2,msg:"123",time:2222}),this.chatObjects.push({owner:1,msg:"hihihihi",time:33333}),this.chatObjects.push({owner:2,msg:"123123123",time:123123})}},S,!1,function(t){s("jiME")},"data-v-7d7c7aed",null).exports;n.a.use(u.a);var F=new u.a({mode:"history",routes:[{path:"/chatroom/:roomID",component:M},{path:"/ChatRooms",component:O},{path:"/userList",name:"UsersVue",component:V},{path:"/chat",name:"ChatPage",component:$},{path:"/",name:"IndexPage",component:v},{path:"/login",name:"LoginPage",component:p},{path:"/signup",name:"SignUpPage",component:f},{path:"/main",name:"MainPage",component:I}]}),L=s("mtWM"),T=s.n(L),N=s("e6fC");s("Jmt5"),s("9M+g");n.a.use(N.a),n.a.prototype.$http=T.a,n.a.config.productionTip=!1,new n.a({el:"#app",router:F,components:{App:c},template:"<App/>"})},OLR4:function(t,e){},"V/ri":function(t,e){},Yyon:function(t,e){},cxuj:function(t,e){},"dV/9":function(t,e){},jiME:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ed67231f2bbd3981c826.js.map