(function(o,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(o=typeof globalThis<"u"?globalThis:o||self,t(o.DevDeps={},o.Vue))})(this,function(o,t){"use strict";const s=e=>{const a=document.getElementById(e);a?a.scrollIntoView({behavior:"smooth"}):console.error(`Element with ID ${e} not found.`)},d=()=>"test",p=(e,a)=>{const n=e.__vccOpts||e;for(const[i,l]of a)n[i]=l;return n},g=t.defineComponent({name:"DredixPaginatedTable",props:{apiUrl:{type:String,required:!0},baseParams:{type:Object,required:!1,default:()=>({})},paginationLayout:{type:String,required:!1,default:"total, sizes, prev, pager, next, jumper"},defaultSort:{type:String,required:!1,default:null}},data(){return{componentId:null,tableData:{data:[],per_page:50,current_page:1},sortBy:null,loading:!1}},methods:{scrollToElementId:s,getUUID:d,getData(e={},a=!1){return this.getTableData(e,a)},getTableData(e={},a=!1){this.loading=!0,e=Object.assign({},this.baseParams,e),e.page=this.tableData.current_page,e.limit=this.tableData.per_page,this.sortBy&&(e.sortBy=this.sortBy),axios.get(this.apiUrl,{params:e}).then(({data:n})=>{this.tableData=n,a&&this.scrollToElementId(this.componentId)}).catch(n=>{console.error(n),this.$notify.error({title:"Error Getting Data",message:"There was an error while attempting to retrieve the data"})}).finally(()=>{this.loading=!1})},handleSortChange({column:e,prop:a,order:n}){n?this.sortBy=`${e.property}|`+(n==="ascending"?"asc":"desc"):this.sortBy=this.defaultSort,this.getData()}},mounted(){console.log("Mounted DredixPaginatedTable"),this.componentId=this.getUUID(),this.sortBy=this.defaultSort,this.getTableData()}}),u={class:"dredix-paginated-table"},h=["id","name"];function f(e,a,n,i,l,y){const b=t.resolveComponent("el-table"),D=t.resolveComponent("el-pagination"),m=t.resolveDirective("loading");return t.openBlock(),t.createElementBlock("div",u,[t.createElementVNode("a",{id:e.componentId,name:e.componentId},null,8,h),t.renderSlot(e.$slots,"search"),t.withDirectives((t.openBlock(),t.createBlock(b,{data:e.tableData.data,style:{width:"100%"},onSortChange:e.handleSortChange},{default:t.withCtx(()=>[t.renderSlot(e.$slots,"default")]),_:3},8,["data","onSortChange"])),[[m,e.loading]]),t.createVNode(D,{class:"width-100","current-page":e.tableData.current_page,"onUpdate:currentPage":a[0]||(a[0]=r=>e.tableData.current_page=r),"page-size":e.tableData.per_page,"onUpdate:pageSize":a[1]||(a[1]=r=>e.tableData.per_page=r),"page-sizes":[25,50,100,200,300,400],background:!0,layout:e.paginationLayout,total:e.tableData.total,onSizeChange:a[2]||(a[2]=r=>e.getTableData({},!0)),onCurrentChange:a[3]||(a[3]=r=>e.getTableData({},!0))},null,8,["current-page","page-size","layout","total"])])}const c=p(g,[["render",f]]);o.DredixPaginatedTable=c,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});