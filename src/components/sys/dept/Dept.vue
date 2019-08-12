<template>
    <div>
        <el-form :inline="true" :model="formInline"   ref="formInline" class="demo-form-inline">
            <el-form-item label="linkPerson" prop="linkPerson">
                <el-input v-model="formInline.linkPerson" placeholder="名字"></el-input>
            </el-form-item>
            <el-form-item label="公司" prop="company">
                <el-select v-model="formInline.company" placeholder="公司">
                    <el-option label="拓普" value="拓普"></el-option>
                    <el-option label="13" value="13"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_onSubmit('formInline')">查询</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top: 20px">
            <el-button @click="_createDept()" style="margin-left: 10px">新增</el-button>
            <el-button @click="_toggleSelection([depts[1], depts[2]])">选中某行</el-button>
            <el-button @click="_toggleSelection()">取消选择</el-button>
            <el-button @click="_operationSelectedData()">选中数据操作</el-button>
        </div>
        <el-table
                :data="depts" ref="deptsTables"
                @selection-change="_handleSelectionChange">
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="ID"
                    width="180px" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="name"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="linkPerson"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>id: {{ scope.row.id }}</p>
                        <p>名称: {{ scope.row.linkPerson }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.linkPerson }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="公司"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.company }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="length"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSzie" >
            </el-pagination>
        </div>

        <!-- 增加修改 -->
        <el-dialog
                title="编辑部门信息"
                :visible.sync="dialogVisible"
                width="50%"
                height="50%"
                :before-close="handleClose">
            <el-form :model="dept" :rules="rules" ref="deptFrom" label-width="100px" class="demo-ruleForm">
                <el-form-item label="name"  prop="name">
                    <el-input v-model="dept.name"></el-input>
                </el-form-item>
                <el-form-item label="linkPerson" prop="linkPerson">
                    <el-input v-model="dept.linkPerson"></el-input>
                </el-form-item>
                <el-form-item label="company" prop="company">
                    <el-input v-model="dept.company"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('deptFrom')">重置</el-button>
                    <el-button type="primary" @click="_saveOrUpdate('deptFrom')">确 定</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import { getDeptListPage, updateDeptService, saveDept } from 'common/js/deptService'

    export default {
        created () {
            // 加载前，先加载数据
            this._getDeptList()
        },
        mounted () {
        },
        data () {
            return {
                formInline: {
                    linkPerson: '',
                    company: ''
                },
                // 总页数
                totalSzie: 0,
                // 当前页
                currentPage: 1,
                // 从第几行数据开始
                start: 0,
                // 每页返回的数据
                length: 10,
                // 列表数据
                depts: [],
                multipleSelection: [],
                dept: {
                    id: '',
                    company: '',
                    name: '',
                    linkPerson: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    linkPerson: [
                        { required: true, message: '请填写联系人', trigger: 'change' }
                    ],
                    company: [
                        { required: true, message: '请填写公司', trigger: 'change' }
                    ]
                },
                // 是否显示弹窗
                dialogVisible: false
            }
        },
        methods: {
            // 初始化数据
            _getDeptList (start, data) {
                getDeptListPage(0, this.$_ISNULL(start) ? this.start : start, this.length, data).then((res) => {
                    this.depts = res.data.data
                    this.totalSzie = res.data.total
                })
            },
            // 新增
            _createDept () {
                this.dialogVisible = true
            },
            // 关闭弹窗
            handleClose (done) {
                done()
            },
            // 编辑
            handleEdit (index, row) {
                this.dialogVisible = true
                this.dept = {
                    id: row.id,
                    name: row.name,
                    company: row.company,
                    linkPerson: row.linkPerson
                }
            },
            // 删除
            handleDelete (index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this._deleteOne(row.id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 保存更新
            _saveOrUpdate (formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        if (this.dept.id) {
                            updateDeptService(this.dept).then((req) => {
                                this.$message('修改成功')
                                this._getDeptList()
                                this.dept = {}
                                this.resetForm()
                            })
                        } else {
                            saveDept(this.dept).then((req) => {
                                this.$message('保存成功')
                                this._getDeptList()
                                this.dept = {}
                                this.resetForm()
                            })
                        }
                    }
                })
            },
            resetForm (formName) {
                this.dialogVisible = false
                this.$refs[formName].resetFields()
            },
            _deleteOne (id) {
                this.$_GET(this.$_APIPATH.dept.deptDelete + '/' + id).then((req) => {
                    if (req.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this._getDeptList()
                    }
                })
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`)
                this.length = val
                this._getDeptList()
            },
            // 点击当前页刷新数据
            handleCurrentChange (val) {
                this.currentPage = val
                console.log('-----' + val)
                this._getDeptList((val - 1) * this.length)
            },
            // 查询提交
            _onSubmit (formName) {
                this._getDeptList(0, this.formInline)
            },
            // 选中行
            _toggleSelection (rows) {
                if (rows) {
                        rows.forEach(row => {
                        this.$refs.deptsTables.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.deptsTables.clearSelection()
                }
            },
            _handleSelectionChange (val) {
                console.log(val)
                this.multipleSelection = val
            },
            _operationSelectedData () {
                let ids = ''
                this.multipleSelection.forEach(v => {
                    ids += v.id + ','
                })

                this.$message({
                    message: '可以选中的数据做任何操作:' + ids
                })
            }
        }
    }
</script>
