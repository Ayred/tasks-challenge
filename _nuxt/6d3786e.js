(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{235:function(t,e,r){var content=r(318);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(40).default)("6cd9a3d1",content,!0,{sourceMap:!1})},255:function(t,e,r){"use strict";var n=r(379),o=r(383),l=r(384),c=r(382),d=r(381),f=r(380),h=r(253),_=(r(148),{name:"DefaultLayout",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-apps",title:"Detalle de Tarea",to:"/"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Gestor de Tareas"}}}),v=r(85),component=Object(v.a)(_,(function(){var t=this,e=t._self._c;return e(n.a,{attrs:{dark:""}},[e(o.a,{attrs:{"clipped-left":t.clipped,fixed:"",app:""}},[e(h.a,{domProps:{textContent:t._s(t.title)}}),t._v(" "),e(f.a)],1),t._v(" "),e(d.a,[e(l.a,[e("Nuxt")],1)],1),t._v(" "),e(c.a,{attrs:{absolute:!t.fixed,app:""}},[e("span",[t._v("© "+t._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);e.a=component.exports},270:function(t,e,r){r(271),t.exports=r(272)},317:function(t,e,r){"use strict";r(235)},318:function(t,e,r){var n=r(39)((function(i){return i[1]}));n.push([t.i,"h1[data-v-35e10596]{font-size:20px}",""]),n.locals={},t.exports=n},353:function(t,e,r){"use strict";r.r(e),r.d(e,"state",(function(){return n})),r.d(e,"mutations",(function(){return o}));var n=function(){return{taskDetails:[],refreshTasks:!1}},o={updateRefreshTasks:function(t,e){t.refreshTasks=e}}},71:function(t,e,r){"use strict";var n=r(379),o={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},l=(r(317),r(85)),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e(n.a,{attrs:{dark:""}},[404===t.error.statusCode?e("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);e.a=component.exports}},[[270,9,4,10]]]);