<!-- 暂时没有封装。请勿使用 -->
<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSzie" >
    </el-pagination>
</template>

<script>

    export default {
        props: {
            pageSizes: {
                type: String,
                defualt: '[10, 20, 30, 40]',
            },
            pageSize: {
                type: Number,
                defualt: 10
            },
            totalSzie: {
                type: Number,
                defualt: 0
            }
        },
        data () {
            return {
                currentPage: 0,
            }
        },
        methods: {
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange (val) {
                this.currentPage = val
                console.log('-----' + val)
                this._getDeptList(0, (val -1) * 10, 10)
            }
        },
        created () {

        },
        mounted () {
        }
    }
</script>
