<template>
    <div class="dredix-paginated-table">
        <a :id="componentId" :name="componentId"></a>
        <slot name="search"></slot>
        <el-table :data="tableData.data" style="width: 100%" v-loading="loading" @sort-change="handleSortChange">
            <slot></slot>
        </el-table>
        <el-pagination class="width-100" v-model:current-page="tableData.current_page"
            v-model:page-size="tableData.per_page" :page-sizes="[25, 50, 100, 200, 300, 400]" :background="true"
            :layout="paginationLayout" :total="tableData.total" @size-change="getTableData({}, true)"
            @current-change="getTableData({}, true)" />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { scrollToElementId, getUUID } from "../helpers/functions";
export default defineComponent({
    name: "DredixPaginatedTable",
    props: {
        apiUrl: {
            type: String,
            required: true
        },
        baseParams: {
            type: Object,
            required: false,
            default: () => ({})
        },
        paginationLayout: {
            type: String,
            required: false,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        defaultSort: {
            type: String,
            required: false,
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
            loading: false
        }
    },
    methods: {
        scrollToElementId,
        getUUID,
        getData(params = {}, scrollToTop = false) {
            return this.getTableData(params, scrollToTop);
        },
        getTableData(params = {}, scrollToTop = false) {
            this.loading = true;
            params = Object.assign({}, this.baseParams, params);
            params.page = this.tableData.current_page;
            params.limit = this.tableData.per_page;
            if (this.sortBy) {
                params.sortBy = this.sortBy;
            }
            axios.get(this.apiUrl, { params })
                .then(({ data }) => {
                    this.tableData = data;
                    if (scrollToTop) {
                        this.scrollToElementId(this.componentId);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    this.$notify.error({
                        title: 'Error Getting Data',
                        message: 'There was an error while attempting to retrieve the data',
                    })
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        handleSortChange({ column, prop, order }) {
            if (order) {
                this.sortBy = `${column.property}|` + (order === 'ascending' ? 'asc' : 'desc');
            } else {
                this.sortBy = this.defaultSort;
            }
            this.getData();
        },
    },
    mounted() {
        console.log('Mounted DredixPaginatedTable');
        this.componentId = this.getUUID();
        this.sortBy = this.defaultSort;
        this.getTableData();
    }
})
</script>
<style scoped></style>