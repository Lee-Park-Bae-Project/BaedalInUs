webpackJsonp([1],{0:function(e,t){},"1/oy":function(e,t){},"1uuo":function(e,t){},"5E1T":function(e,t){},"9M+g":function(e,t){},"9weP":function(e,t){},GfHa:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},NGnD:function(e,t){},NHnr:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("7+uW"),s={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"top_container"}},[o("b-card",{attrs:{id:"text_area"}},[o("b-nav",{attrs:{slot:"header",pills:""},slot:"header"},[o("nav-item",{attrs:{id:"chat_header"}},[e._v("chat room")]),e._v(" "),o("b-dropdown-divider")],1),e._v(" "),o("b-card-body",{ref:"content",staticStyle:{position:"relative",height:"300px","overflow-y":"scroll"},attrs:{id:"nav-scroller"}},e._l(e.chatObjects,function(t){return o("div",[1===t.owner?o("div",{attrs:{id:"my_chat"}},[o("p",{staticStyle:{"text-align":"right"}},[e._v(e._s(t.msg))])]):o("div",{attrs:{id:"your_chat"}},[o("p",{staticStyle:{"text-align":"left"}},[e._v(e._s(t.msg))])])])}),0)],1),e._v(" "),o("div",{attrs:{id:"send_bar"}},[o("b-container",[o("b-row",{staticClass:"my-1"},[o("b-col",{attrs:{sm:"10"}},[o("b-form-input",{attrs:{id:"input-small",type:"text",placeholder:"Enter message"}})],1),e._v(" "),o("button",[e._v("send")])],1)],1)],1)],1)},staticRenderFns:[]};var r=o("VU/8")({name:"ChatRoom",data:function(){return{text:"",chatObjects:[]}},mounted:function(){this.chatObjects.push({owner:1,msg:"hi im juno",time:1111}),this.chatObjects.push({owner:1,msg:"fuckyou",time:1111}),this.chatObjects.push({owner:2,msg:"123",time:2222}),this.chatObjects.push({owner:1,msg:"hihihihi",time:33333}),this.chatObjects.push({owner:2,msg:"123123123",time:123123})}},s,!1,function(e){o("sd6i")},"data-v-2af0ee8d",null).exports,a={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container"},[o("div",{attrs:{id:"logo"}},[o("h2",{on:{click:e.mainPage}},[e._v("LOGO")])]),e._v(" "),o("div",{attrs:{id:"menu"}},[o("ul",[o("li",[e._v("내 정보")]),e._v(" "),o("li",{on:{click:e.login}},[e._v("로그인")]),e._v(" "),o("li",[e._v("주문하기")]),e._v(" "),o("li",[e._v("배달하기")]),e._v(" "),o("li",{on:{click:e.chat}},[e._v("채팅")])])]),e._v(" "),o("hr")])},staticRenderFns:[]};var i={name:"App",components:{HeaderComponent:o("VU/8")({name:"Header",methods:{login:function(){this.$router.push("/login")},mainPage:function(){this.$router.push("/")},chat:function(){this.$router.push("/chatroomlist")}}},a,!1,function(e){o("RVsG")},"data-v-a34bb8bc",null).exports,chatVue:r}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("header-component"),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var u=o("VU/8")(i,c,!1,function(e){o("NGnD")},null,null).exports,l=o("/ocq"),v={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"hello"},[o("h1",[e._v(e._s(e.msg))]),e._v(" "),o("h2",[e._v("Essential Links")]),e._v(" "),e._m(0),e._v(" "),o("h2",[e._v("Ecosystem")]),e._v(" "),e._m(1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[o("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[e._v("\n        Core Docs\n      ")])]),e._v(" "),o("li",[o("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[e._v("\n        Forum\n      ")])]),e._v(" "),o("li",[o("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[e._v("\n        Community Chat\n      ")])]),e._v(" "),o("li",[o("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[e._v("\n        Twitter\n      ")])]),e._v(" "),o("br"),e._v(" "),o("li",[o("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("\n        Docs for This Template\n      ")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};o("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},v,!1,function(e){o("1uuo")},"data-v-d8ec41bc",null).exports;var m={name:"LoginPage",data:function(){return{user:{id:"",pw:""},url:{singUpURL:"/SignUpPage"}}},methods:{login:function(e){var t=this;this.$http.post("/login",{user:this.user}).then(function(e){console.log("----------------------response--------------"),console.log(e),console.log(e.status),200==e.status?(console.log("200"),console.log(e),e.data.complete?(localStorage.setItem("userID",t.user.id),localStorage.setItem("userOID",e.data.oid),t.$router.push("/userList")):alert("wrong password")):201==e.status&&(console.log("201"),alert("no matching id"))},function(e){alert(e.response.data.error)}).catch(function(e){alert(e)})}}},d={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"login"}},[o("div",[e._v("Login")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.user.id,expression:"user.id"}],attrs:{placeholder:"ID"},domProps:{value:e.user.id},on:{input:function(t){t.target.composing||e.$set(e.user,"id",t.target.value)}}}),o("br"),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.user.pw,expression:"user.pw"}],attrs:{type:"password",placeholder:"password"},domProps:{value:e.user.pw},on:{input:function(t){t.target.composing||e.$set(e.user,"pw",t.target.value)}}}),o("br"),e._v(" "),o("button",{on:{click:e.login}},[e._v("login")]),e._v(" "),o("a",{attrs:{href:e.url.singUpURL}},[e._v("Sign up")])])},staticRenderFns:[]};var p=o("VU/8")(m,d,!1,function(e){o("WY9+")},"data-v-7f1a21b5",null).exports,h={name:"SignUpPage",data:function(){return{user:{id:"",pw:"",name:""}}},methods:{signUp:function(e){var t=this;console.log("button clicked"),this.$http.post("/signup",{user:this.user}).then(function(e){console.log("----------------response---------------------"),console.log(e),console.log(e.status),204===e.status&&alert("Error, please, try again"),201===e.status&&(alert("Success"),t.$router.push("/login"))}).catch(function(e){alert("error")})}}},g={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"SignUp"}},[o("div",[e._v(" Sign Up ")]),e._v(" "),e._v("\n\n  Name : "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],attrs:{placeholder:"name"},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}}),e._v(" "),o("br"),e._v("\n  ID : "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.user.id,expression:"user.id"}],attrs:{placeholder:"ID"},domProps:{value:e.user.id},on:{input:function(t){t.target.composing||e.$set(e.user,"id",t.target.value)}}}),e._v(" "),o("br"),e._v("\n  Password : "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.user.pw,expression:"user.pw"}],attrs:{type:"password",placeholder:"password"},domProps:{value:e.user.pw},on:{input:function(t){t.target.composing||e.$set(e.user,"pw",t.target.value)}}}),e._v(" "),o("button",{on:{click:e.signUp}},[e._v("SignUp")])])},staticRenderFns:[]};var _=o("VU/8")(h,g,!1,function(e){o("kgVS")},"data-v-26ea260e",null).exports,f={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container"},[o("div",{attrs:{id:"search"}},[o("label",{attrs:{for:"distance"}},[e._v("거리")]),e._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{id:"distance"},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selected=t.target.multiple?o:o[0]}}},[o("option",[e._v("1km ↓")]),e._v(" "),o("option",[e._v("3km ↓")]),e._v(" "),o("option",[e._v("5km ↓")]),e._v(" "),o("option",[e._v("10km ↓")]),e._v(" "),o("option",[e._v("10km ↑")])]),e._v(" "),o("label",{attrs:{for:"fee"}},[e._v("수수료")]),e._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{id:"fee"},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selected=t.target.multiple?o:o[0]}}},[o("option",[e._v("50,000원 ↑")]),e._v(" "),o("option",[e._v("30,000원 ↑")]),e._v(" "),o("option",[e._v("10,000원 ↑")]),e._v(" "),o("option",[e._v("5,000원 ↑")]),e._v(" "),o("option",[e._v("5,000원 ↓")])]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.stuffName,expression:"stuffName"}],attrs:{placeholder:" 상품명"},domProps:{value:e.stuffName},on:{input:function(t){t.target.composing||(e.stuffName=t.target.value)}}}),e._v(" "),o("button",[e._v("검색")])])])},staticRenderFns:[]};var b={name:"MainPage",methods:{logout:function(e){console.log("logout button clicked"),this.$router.push("/login")}},components:{SearchBar:o("VU/8")({name:"Dropdown",data:{selected:"",stuffName:""}},f,!1,function(e){o("qTFu")},"data-v-12f805be",null).exports}},w={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"container"},[t("div",{staticClass:"outer"},[t("div",{staticClass:"inner"},[t("SearchBar")],1)])])},staticRenderFns:[]};var k=o("VU/8")(b,w,!1,function(e){o("9weP")},"data-v-3d9334e4",null).exports,D=o("Gu7T"),I=o.n(D),x=o("DmT9"),R=o.n(x),U={name:"ChatPage",data:function(){return{user:"",message:"",messages:[],socket:R()("localhost:3000"),joinedRoom:"square",square:"square",rooms:[],roomID:""}},methods:{sendMessage:function(e){e.preventDefault(),this.send(),this.socket.emit("message",{user:this.user,message:this.message}),this.message=""},makeJoin:function(e){var t=this;this.socket.emit("join",e,function(){t.socket.emit("leave",t.joinedRoom),t.joinedRoom=e,console.log(t.rooms)})},joinRoom:function(){this.roomID?this.makeJoin(this.roomID):alert("input the room ID")},send:function(){var e=this.message;console.log("보낼 메시지 : "+e),this.socket.emit("message",{room:this.joinedRoom,msg:e},function(e){console.log("message.callback>>",e)}),this.messages=[].concat(I()(this.messages),[e])}},mounted:function(){var e=this;this.joinedRoom=null,this.socket.on("connect",function(){console.log("connected"),e.makeJoin(e.square),e.socket.emit("rooms",function(t){console.log("rooms : "+t),e.rooms=[].concat(I()(e.rooms),[t])})}),this.socket.on("message",function(t){e.messages=[].concat(I()(e.messages),[t.msg]),console.log("user : "+t.user+" msg : "+t.message),console.log("messages : "+e.messages.length)}),this.socket.on("disconnect",function(){console.log("disconnected")})}},$={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",[o("hr"),e._v(" "),o("p",[e._v("rooms list")]),e._v(" "),e._l(e.rooms,function(t){return o("ul",[o("li",[e._v(e._s(t))])])}),e._v(" "),o("hr")],2),e._v(" "),o("div",[o("form",{on:{submit:function(t){return t.preventDefault(),e.joinRoom(t)}}},[o("label",[e._v("roomID : ")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.roomID,expression:"roomID"}],staticClass:"form-control",attrs:{type:"text",value:"square"},domProps:{value:e.roomID},on:{input:function(t){t.target.composing||(e.roomID=t.target.value)}}}),e._v(" "),o("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[e._v("Join")])])]),e._v(" "),o("div",[o("p",[e._v("current room : "+e._s(e.joinedRoom))])]),e._v(" "),o("div",{staticClass:"content"},[o("div",{staticClass:"card-footer"},[o("form",{on:{submit:function(t){return t.preventDefault(),e.sendMessage(t)}}},[o("div",{staticClass:"gorm-group"},[o("label",[e._v("User:")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.user,expression:"user"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.user},on:{input:function(t){t.target.composing||(e.user=t.target.value)}}})]),e._v(" "),o("div",{staticClass:"gorm-group pb-3"},[o("label",[e._v("Message:")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.message},on:{input:function(t){t.target.composing||(e.message=t.target.value)}}})]),e._v(" "),o("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[e._v("send")])]),e._v(" "),o("table",e._l(e.messages,function(t){return o("tr",[o("td",[e._v(e._s(t))])])}),0)])])])},staticRenderFns:[]};var j=o("VU/8")(U,$,!1,function(e){o("OLR4")},"data-v-70c518fa",null).exports,C={name:"UsersVue",data:function(){return{users:[],socket:R()("localhost:3000"),room:{senderOID:"",senderID:"",receiverOID:"",receiverID:"",message:""}}},methods:{getUsers:function(e){var t=this;this.$http.post("/users",{user:this.user}).then(function(e){console.log(e),console.log(e.data.length),t.users=e.data},function(e){alert(e.response.data.error)}).catch(function(e){alert(e)})},sendMessage:function(e,t,o,n,s){this.$http.post("/chat/makeRoom",{room:{senderOID:e,senderID:t,receiverOID:o,receiverID:n,message:s}}).then(function(e){console.log("---------------result--------------"),console.log(e),201===e.status?alert("메시지를 보냈습니다."):202===e.status&&alert("잠시 후 다시 시도해 주십시오")}).catch(function(e){alert(e)})},UserMenu:function(e,t){console.log("oid: "+t+" id : "+e);var o=localStorage.getItem("userOID"),n=localStorage.getItem("userID"),s=t,r=e;console.log("senderOID : "+o+" senderID : "+n),console.log("receiverOID : "+s+" receiverID : "+r);var a=prompt("메시지를 입력하세여");console.log("newMSG : "+a),this.sendMessage(o,n,s,r,a)}},mounted:function(){this.socket.on("connect",function(){console.log("connected")})}},y={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("p",[e._v("this is userList")]),e._v(" "),o("button",{on:{click:e.getUsers}}),e._v(" "),o("ul",e._l(e.users,function(t){return o("li",[o("span",[e._v(e._s(t.id))]),e._v(" "),o("div",[o("b-dropdown",{staticClass:"m-md-2",attrs:{id:"ddown1",text:"메뉴"}},[o("b-dropdown-item",{on:{click:function(o){e.UserMenu(t.id,t._id)}}},[e._v("메시지보내기")]),e._v(" "),o("b-dropdown-item",[e._v("차단")]),e._v(" "),o("b-dropdown-divider")],1)],1)])}),0)])},staticRenderFns:[]};var P=o("VU/8")(C,y,!1,function(e){o("5E1T")},"data-v-1099f56d",null).exports,S={name:"ChatRoomList",data:function(){return{user:{id:localStorage.getItem("userID"),oid:localStorage.getItem("userOID")},chatRooms:[]}},methods:{getChatRooms:function(e){var t=this;this.$http.post("/chat/getChatRooms",{user:this.user}).then(function(e){console.log("----------------------response--------------"),console.log(e),200===e.status?(console.log(e),t.chatRooms=e.data):204===e.status&&console.log("no chat rooms")},function(e){alert(e.response.data.error)}).catch(function(e){alert(e)})}},created:function(){console.log("created"),this.getChatRooms()}},N={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"top_container"}},[t("p",[this._v("chat list")])])}]};var O=o("VU/8")(S,N,!1,function(e){o("am4J")},"data-v-bfcec0b6",null).exports;n.a.use(l.a);var E=new l.a({mode:"history",routes:[{path:"/chatroomlist",component:O},{path:"/chatroom/:roomID",component:r},{path:"/userList",name:"UsersVue",component:P},{path:"/chat",name:"ChatPage",component:j},{path:"/login",name:"LoginPage",component:p},{path:"/SignUpPage",name:"SignUpPage",component:_},{path:"/",name:"MainPage",component:k}]}),V=o("mtWM"),F=o.n(V),M=o("e6fC");o("Jmt5"),o("9M+g");n.a.use(M.a),n.a.prototype.$http=F.a,n.a.config.productionTip=!1,new n.a({el:"#app",router:E,components:{App:u},template:"<App/>"})},OLR4:function(e,t){},RVsG:function(e,t){},"WY9+":function(e,t){},am4J:function(e,t){},kgVS:function(e,t){},qTFu:function(e,t){},sd6i:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.8869705a6989457054f3.js.map