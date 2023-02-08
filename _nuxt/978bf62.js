(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{435:function(e,t,r){"use strict";r.r(t);var n=r(438),o=r(424),d=r(385),l=r(532),c=r(523),k=r(531),h=r(526),v=r(423),m=r(522),f=r(380),w=r(437),y=r(527),_=(r(15),r(56),r(41),r(7),r(49),r(50),r(261),{data:function(){return{readOnlyMode:!0,showNewTask:!1,saving:!1,task:{},rules:{required:function(e){return!!String(e)||"Este campo es requerido"}}}},methods:{show:function(e){var t=this;this.$refs.taskForm&&this.$refs.taskForm.reset(),this.showNewTask=!0,this.task={token:"ayred",title:"",is_completed:"",due_date:"",comments:"",description:"",tags:""},this.readOnlyMode=!1,e?this.$axios.get("/vdev/tasks-challenge/tasks/".concat(e,"?token=").concat("ayred")).then((function(e){if(e&&200==e.status)return t.readOnlyMode=!0,t.showNewTask=!0,void(t.task=e.data[0])})):this.showNewTask=!0},submit:function(){this.$refs.taskForm&&this.$refs.taskForm.validate()&&(this.task.id?this.update():this.create(),this.saving=!0,this.$refs.taskForm.reset())},create:function(){var e=this;this.$axios.post("/vdev/tasks-challenge/tasks",this.taskParams).then((function(t){e.refreshTasks(t)})).finally((function(){e.saving=!1}))},update:function(){var e=this;this.$axios.put("/vdev/tasks-challenge/tasks/".concat(this.task.id),this.taskParams).then((function(t){e.refreshTasks(t)})).finally((function(){e.saving=!1}))},refreshTasks:function(e){201==e.status?(this.$store.commit("updateRefreshTasks",!0),this.showNewTask=!1):alert(e.data.detail,{title:"AVISO"})}},computed:{taskParams:function(){var e=new URLSearchParams;for(var t in this.task)e.append(t,this.task[t]);return e},title:function(){return this.task.id?this.readOnlyMode?"Tarea #".concat(this.task.id):"Editar Tarea #".concat(this.task.id):"Nueva Tarea"}}}),x=r(85),component=Object(x.a)(_,(function(){var e=this,t=e._self._c;return t("div",[t(k.a,{attrs:{width:"800",persistent:""},model:{value:e.showNewTask,callback:function(t){e.showNewTask=t},expression:"showNewTask"}},[t(o.a,{attrs:{shaped:""}},[t(d.c,{staticClass:"secondary py-1 px-1"},[t("div",{staticClass:"mx-2"},[e._v(e._s(e.title))]),e._v(" "),t(f.a),e._v(" "),t(n.a,{staticClass:"ma-0 pa-0",attrs:{text:"",fab:"","x-small":"",disabled:e.saving},on:{click:function(t){e.showNewTask=!1}}},[t(v.a,{attrs:{small:"",color:"white"}},[e._v("mdi-close")])],1)],1),e._v(" "),t(h.a,{ref:"taskForm",on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[t(d.b,[t("div",{staticClass:"px-3"},[t(m.a,[t(c.a,{staticClass:"pb-0"},[t(w.a,{attrs:{rules:[e.rules.required],rounded:"",outlined:"",dense:"",label:"Título",disabled:e.readOnlyMode},model:{value:e.task.title,callback:function(t){e.$set(e.task,"title",t)},expression:"task.title"}})],1),e._v(" "),t(c.a,{staticClass:"pa-0 pb-0",attrs:{cols:"12",sm:"6",md:"3"}},[t(l.a,{attrs:{label:1==e.task.is_completed?"Completada":"No Completada","false-value":0,"true-value":1,color:"orange",disabled:e.readOnlyMode},model:{value:e.task.is_completed,callback:function(t){e.$set(e.task,"is_completed",t)},expression:"task.is_completed"}})],1)],1),e._v(" "),t(m.a,[t(c.a,{staticClass:"pb-0",attrs:{cols:"12",sm:"6",md:"3"}},[t(w.a,{attrs:{rules:[e.rules.required],rounded:"",outlined:"",dense:"",type:"date",label:"Fecha límite",disabled:e.readOnlyMode},model:{value:e.task.due_date,callback:function(t){e.$set(e.task,"due_date",t)},expression:"task.due_date"}})],1),e._v(" "),t(c.a,{staticClass:"pb-0"},[t(w.a,{attrs:{rules:[e.rules.required],rounded:"",outlined:"",dense:"",label:"Comentarios",disabled:e.readOnlyMode},model:{value:e.task.comments,callback:function(t){e.$set(e.task,"comments",t)},expression:"task.comments"}})],1)],1),e._v(" "),t(m.a,[t(c.a,{staticClass:"pb-0",attrs:{cols:"12",sm:"12"}},[t(y.a,{attrs:{rules:[e.rules.required],outlined:"",rounded:"",label:"Descripción",disabled:e.readOnlyMode},model:{value:e.task.description,callback:function(t){e.$set(e.task,"description",t)},expression:"task.description"}})],1),e._v(" "),t(c.a,{staticClass:"pb-0"},[t(w.a,{attrs:{rules:[e.rules.required],rounded:"",outlined:"",dense:"",label:"Etiquetas",disabled:e.readOnlyMode},model:{value:e.task.tags,callback:function(t){e.$set(e.task,"tags",t)},expression:"task.tags"}})],1)],1)],1)]),e._v(" "),t(d.a,[t(n.a,{directives:[{name:"show",rawName:"v-show",value:e.readOnlyMode,expression:"readOnlyMode"}],attrs:{color:"secondary",depressed:"",rounded:"",type:"button",disabled:e.saving},on:{click:function(t){e.readOnlyMode=!1}}},[e._v("Editar Tarea")]),e._v(" "),t(f.a),e._v(" "),t(n.a,{directives:[{name:"show",rawName:"v-show",value:!e.readOnlyMode,expression:"!readOnlyMode"}],attrs:{color:"default",depressed:"",rounded:"",type:"button",disabled:e.saving},on:{click:function(t){e.showNewTask=!1}}},[e._v("Cancelar")]),e._v(" "),t(n.a,{directives:[{name:"show",rawName:"v-show",value:!e.readOnlyMode,expression:"!readOnlyMode"}],attrs:{color:"secondary",depressed:"",rounded:"",type:"submit",disabled:e.saving}},[e._v("Confirmar")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);