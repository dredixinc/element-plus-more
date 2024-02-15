import { defineComponent as u, resolveComponent as l, resolveDirective as h, openBlock as s, createElementBlock as c, createElementVNode as f, renderSlot as i, withDirectives as b, createBlock as m, withCtx as D, createVNode as y } from "vue";
const v = (e) => {
  const t = document.getElementById(e);
  t ? t.scrollIntoView({ behavior: "smooth" }) : console.error(`Element with ID ${e} not found.`);
}, S = () => "test", C = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, r] of t)
    a[n] = r;
  return a;
}, B = u({
  name: "CogPaginatedTable",
  props: {
    apiUrl: {
      type: String,
      required: !0
    },
    baseParams: {
      type: Object,
      required: !1,
      default: () => ({})
    },
    paginationLayout: {
      type: String,
      required: !1,
      default: "total, sizes, prev, pager, next, jumper"
    },
    defaultSort: {
      type: String,
      required: !1,
      default: null
    }
  },
  data() {
    return {
      componentId: null,
      tableData: {
        data: [],
        per_page: 50,
        current_page: 1
      },
      sortBy: null,
      loading: !1
    };
  },
  methods: {
    scrollToElementId: v,
    getUUID: S,
    getData(e = {}, t = !1) {
      return this.getTableData(e, t);
    },
    getTableData(e = {}, t = !1) {
      this.loading = !0, e = Object.assign({}, this.baseParams, e), e.page = this.tableData.current_page, e.limit = this.tableData.per_page, this.sortBy && (e.sortBy = this.sortBy), axios.get(this.apiUrl, { params: e }).then(({ data: a }) => {
        this.tableData = a, t && this.scrollToElementId(this.componentId);
      }).catch((a) => {
        console.error(a), this.$notify.error({
          title: "Error Getting Data",
          message: "There was an error while attempting to retrieve the data"
        });
      }).finally(() => {
        this.loading = !1;
      });
    },
    handleSortChange({ column: e, prop: t, order: a }) {
      a ? this.sortBy = `${e.property}|` + (a === "ascending" ? "asc" : "desc") : this.sortBy = this.defaultSort, this.getData();
    }
  },
  mounted() {
    this.componentId = this.getUUID(), this.sortBy = this.defaultSort, this.getTableData();
  }
}), I = { class: "cog-paginated-table" }, $ = ["id", "name"];
function T(e, t, a, n, r, w) {
  const g = l("el-table"), d = l("el-pagination"), p = h("loading");
  return s(), c("div", I, [
    f("a", {
      id: e.componentId,
      name: e.componentId
    }, null, 8, $),
    i(e.$slots, "search"),
    b((s(), m(g, {
      data: e.tableData.data,
      style: { width: "100%" },
      onSortChange: e.handleSortChange
    }, {
      default: D(() => [
        i(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["data", "onSortChange"])), [
      [p, e.loading]
    ]),
    y(d, {
      class: "width-100",
      "current-page": e.tableData.current_page,
      "onUpdate:currentPage": t[0] || (t[0] = (o) => e.tableData.current_page = o),
      "page-size": e.tableData.per_page,
      "onUpdate:pageSize": t[1] || (t[1] = (o) => e.tableData.per_page = o),
      "page-sizes": [25, 50, 100, 200, 300, 400],
      background: !0,
      layout: e.paginationLayout,
      total: e.tableData.total,
      onSizeChange: t[2] || (t[2] = (o) => e.getTableData({}, !0)),
      onCurrentChange: t[3] || (t[3] = (o) => e.getTableData({}, !0))
    }, null, 8, ["current-page", "page-size", "layout", "total"])
  ]);
}
const _ = /* @__PURE__ */ C(B, [["render", T]]);
export {
  _ as CogPaginatedTable
};
