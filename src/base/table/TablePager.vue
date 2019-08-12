<!-- 暂时没有封装。请勿使用 -->
<template>
    <div>
        <slot></slot>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"  style="margin-top: 10px">
        </el-pagination>
    </div>
</template>

<script>

    export default {
        props: {
            pageSizes: {
                type: Array,
                defualt: [10, 20, 30, 40],
            },
            pageSize: {
                type: Number,
                defualt: 10
            },
            total: {
                type: Number,
                defualt: 0
            },
            currentPage:{
                type: Number,
                defualt: 1
            }
        },
        data () {
            return {
            }
        },
        methods: {
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
                this.$emit("handlePageSize",val)
            },
            handleCurrentChange (val) {
                console.log(`当前页面 ${val} 条`);
                this.$emit("handleCurrentPage",val)
            }
        },
        created () {

        },
        mounted () {
        }
    }
</script>
