"use strict";(self["webpackChunkel_table_sticky"]=self["webpackChunkel_table_sticky"]||[]).push([[678],{325:function(t,e,a){a.r(e),a.d(e,{default:function(){return m}});var r=function(){var t=this,e=t._self._c;return e("div",[e("el-table",{directives:[{name:"sticky-header",rawName:"v-sticky-header"},{name:"sticky-footer",rawName:"v-sticky-footer"}],attrs:{data:t.tableData,border:"","summary-method":t.getSummaries,"show-summary":""}},[e("el-table-column",{attrs:{prop:"id",label:"ID",width:"180"}}),e("el-table-column",{attrs:{prop:"name",label:"姓名",width:"500"}}),e("el-table-column",{attrs:{prop:"amount1",label:"数值 1（元）",width:"300"}}),e("el-table-column",{attrs:{prop:"amount2",label:"数值 2（元）",width:"300"}}),e("el-table-column",{attrs:{prop:"amount3",label:"数值 3（元）",width:"300"}})],1)],1)},l=[],u=(a(7658),{name:"StickySumView",data(){return{tableData:[]}},mounted(){for(let t=0;t<100;t++)this.tableData.push({id:"1298712"+t,name:"王小虎",amount1:"234",amount2:"3.2",amount3:10})},methods:{getSummaries(t){const{columns:e,data:a}=t,r=[];return e.forEach(((t,e)=>{if(0===e)return void(r[e]="总价");const l=a.map((e=>Number(e[t.property])));l.every((t=>isNaN(t)))?r[e]="N/A":(r[e]=l.reduce(((t,e)=>{const a=Number(e);return isNaN(a)?t:t+e}),0),r[e]+=" 元")})),r}}}),n=u,o=a(1001),s=(0,o.Z)(n,r,l,!1,null,null,null),m=s.exports}}]);
//# sourceMappingURL=stickySum.38b9a48a.js.map