<template>
    <div>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_search">查询</el-button>
                <el-button type="" @click="_resetSearch">重置</el-button>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="_createSysAccount">新增</el-button>
        <el-button type="" @click="_deleteBatch">批量删除</el-button>
        <TablePager :pageSize="pageSize"
                    :pageSizes="pageSizes"
                    :total="total"
                    @handlePageSize="handlePageSize"
                    @handleCurrentPage="handleCurrentPage">
            <el-table
            :data="sysAcountTableData"
            border
            @selection-change="selectedChange"
            style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="性别"
                    width="150">
                <template slot-scope="scope">
                    {{scope.row.gender ===1 ? '男' : '女'}}
                </template>
            </el-table-column>
            <el-table-column
                    label="生日"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="个性介绍"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.introduce }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="地区"
                    width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.city }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="100px" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.state == '01'? '可用' : '不可用' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="_updateSysAccount(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="_deleteOne(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </TablePager>

        <SysAccountForm v-if="isShow" :dialogVisible="dialogVisible"
                        :currentAccount="currentAccount"
                        @reflushTable="reflushTable"
                        @dialogClosed="dialogClosed"></SysAccountForm>
    </div>
</template>
<script>
    import TablePager from 'base/table/TablePager'
    import SysAccountForm from 'components/sys/account/SysAccountForm'
    import { sysAccountGetPager, deleteOneOrBatchService} from 'common/js/sys/sysAccountService'
    export default {
        components:{
            TablePager,SysAccountForm
        },
        data () {
          return {
              pageSize: 5,
              pageSizes: [5,10],
              start: 0,
              sysAcountTableData: [],
              total: 0,
              currentPage: 0,
              dialogVisible: false,
              currentAccount: {
                  id: '',
                  name: '',
                  city: '',
                  birthday: '',
                  gender: '',
                  myLike: [],
                  introduce: ''
              },
              isShow: false,
              selectedRows: [],
              searchForm: {
                  name: ''
              }
          }
        },
        methods: {
            handlePageSize (val) {
                console.log(`父组件打印 pageSize ${val}`)
                this.pageSize = val
                this._initData()
            },
            handleCurrentPage (val) {
                console.log(`父组件打印 current ${val}`)
                this.currentPage = val
                this._initData((this.currentPage  -1 ) * this.pageSize)
            },
            selectedChange (val) {
                this.selectedRows = val
            },
            dialogClosed () {
                this.dialogVisible = false
                this.isShow =false
                this._clearCurrentAccount()
            },
            reflushTable () {
                this._initData()
            },
            _initData (start) {
                sysAccountGetPager(this.$_ISNULL (start) ? this.start : start,this.pageSize, this.searchForm.name).then(res => {
                    this.sysAcountTableData = res.data.sysAccountList
                    this.total = res.data.total
                }).catch( res => {
                    console.log(res)
                })
            },
            _createSysAccount () {
                this.dialogVisible = true
                this.isShow = true
            },
            _updateSysAccount (row) {
                console.log(row)
                this.currentAccount = row
                this.currentAccount.myLike = this.currentAccount.myLike.toString().split(',')
                this.dialogVisible = true
                this.isShow = true
            },
            _clearCurrentAccount () {
               this.currentAccount = {
                    id: '',
                    name: '',
                    city: '',
                    birthday: '',
                    gender: '',
                    myLike: [],
                    introduce: ''
                }
            },
            _deleteOne (row) {

                if(this.$_ISNULL(row.id)){
                    this.$_COMMONUTILS.errorMessage('请选中行数据')
                    return
                }

                deleteOneOrBatchService (row.id).then( res => {
                    this.$_COMMONUTILS.successMessage('删除成功')
                    this._initData()
                }).catch(res => {
                    this.$_COMMONUTILS.errorMessage('删除失败')
                })
            },
            _deleteBatch () {
                let ids = ''
                this.selectedRows.forEach(v => {
                    ids += v.id + ","
                })
                deleteOneOrBatchService (ids).then( res => {
                    this.$_COMMONUTILS.successMessage('删除成功')
                    this._initData()
                }).catch(res => {
                    this.$_COMMONUTILS.errorMessage('删除失败')
                })
            },
            _search () {
                if (this.$_ISNULL( this.searchForm.name)) {
                    this.$_COMMONUTILS.errorMessage('请填写查询条件')
                    return
                }
                this._initData()
            },
            _resetSearch () {
                this.searchForm = {
                    name: ''
                }
                this._initData()
            }
        },
        created () {
            this._initData()
        },
        mounted () {

        }
    }
</script>
