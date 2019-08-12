<template>
    <div>
        <div style="margin-top: 20px">
            <el-button @click="_createDept()" style="margin-left: 10px">新增</el-button>
            <el-button @click="_operationSelectedData()">批量删除</el-button>
        </div>
        <el-table
                :data="accountList" ref="accountListTables"
                @selection-change="_handleSelectionChange">
            style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="180px" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="性别"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" v-if="scope.row.gender  == 2"> 女</span>
                    <span style="margin-left: 10px" v-if="scope.row.gender  == 1"> 男</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="生日"
                    width="180">
                <template slot-scope="scope">
                        <span style="margin-left: 10px" >{{ scope.row.birthday }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="头像"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><a @click="_lookImage(scope.row.images)">查看</a></span>
                    <span style="margin-left: 10px"><a @click="_download(scope.row.images)">下载</a></span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
                    <!--</el-button>-->
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
                    :page-size="10"
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

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="city">
                    <el-select v-model="ruleForm.city" placeholder="请选择城市">
                        <el-option label="郑州" value="郑州"></el-option>
                        <el-option label="新乡" value="新乡"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                        <el-date-picker
                                v-model="ruleForm.birthday"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="ruleForm.gender">
                        <el-radio label="1" >男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item label="即时配送" prop="delivery">-->
                <!--<el-switch v-model="ruleForm.delivery"></el-switch>-->
                <!--</el-form-item>-->
                <el-form-item label="爱好" prop="myLike">
                    <el-checkbox-group v-model="ruleForm.myLike">
                        <el-checkbox label="1" name="myLike">游戏</el-checkbox>
                        <el-checkbox label="2" name="myLike">读书</el-checkbox>
                        <el-checkbox label="3" name="myLike">社交</el-checkbox>
                        <el-checkbox label="4" name="myLike">旅游</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="个人介绍" prop="introduce">
                    <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
                </el-form-item>

                <!-- 图片上传了做 隐藏input是为了做校验使用-->
                <el-form-item label="上传头像" prop="images" ref="images">
                    <el-input v-model="ruleForm.images" style="display: none;"></el-input>
                    <el-upload ref="upload"
                               class="upload-demo"
                               action="/"
                               multiple
                               :limit="1"
                               list-type="picture"
                               :auto-upload="false"
                               :on-change="onChange"
                               :before-upload="beforeAvatarUpload"
                               :http-request="uploadFile"
                               :file-list="fileList">
                        <el-button   size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传1文件，且不超过1024kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <!-- 增加修改 -->
        <el-dialog
                title="查看头像"
                :visible.sync="dialogImages"
                width="400px"
                height="400px"
                :before-close="imagesClose">
            <img :src="currentImage" ref="currentImage"  style="width: 300px;height: 300px;"/>
        </el-dialog>
    </div>
</template>

<script>
    import { getAccountList, accountAdd } from 'common/js/accountService'

    export default {
        created () {
            // 加载前，先加载数据
            this._getAccountList()
        },
        mounted () {
        },
        data () {
            // 校验日期
            let checkDate1 = (rule, value, callback) => {
                value = this._dateFormat(value,'yyyy-MM-dd')
                console.log(value)
                if (!value) {
                    return callback(new Error('日期不能为空'));
                }
                const regx = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/
                if (!regx.test(value)) {
                    callback(new Error('请输入正确的日期'));
                } else {
                    this.ruleForm.birthday = value
                    callback()
                }
            }
            return {
                    // 图片类型
                    fileType: 'image/jpeg',
                    // 上传大小
                    limitSize: 1024,
                    // 文件列表
                    fileList: [],
                    // form提交参数
                    formData: {},
                    ruleForm: {
                        name: '',
                        city: '',
                        birthday: '',
                        myLike: [],
                        gender: '',
                        introduce: '',
                        images:''
                    },
                    rules: {
                        name: [
                            { required: true, message: '请输入姓名', trigger: 'blur' },
                            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                        ],
                        city: [
                            { required: true, message: '请选择城市', trigger: 'change' }
                        ],
                        birthday: [
                            { validator: checkDate1, trigger: 'change' }
                        ],
                        myLike: [
                            { type: 'array', required: true, message: '请选择爱好', trigger: 'change' }
                        ],
                        gender: [
                            { required: true, message: '请选择性别', trigger: 'change' }
                        ],
                        introduce: [
                            { required: true, message: '请填写个人介绍', trigger: 'blur' }
                        ],
                        images: [
                            { required: true, message: '请上传头像', trigger: 'blur' }
                        ]
                    },
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
                    accountList: [],
                    multipleSelection: [],
                    // 是否显示弹窗
                    dialogVisible: false,
                    dialogImages: false,
                    currentImage: ''
            }
        },
        methods: {
            // 初始化数据
            _getAccountList (start, data) {
                getAccountList(0, this.$_ISNULL(start) ? this.start : start, this.length, data).then((res) => {
                    this.accountList = res.data.data
                    this.totalSzie = res.data.total

                    if(this.accountList.length == 0 && this.totalSzie > 0){
                        this._getAccountList(0,10);
                    }
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
            imagesClose (done) {
                done()
            },
            // 编辑
            handleEdit (index, row) {
                this.dialogVisible = true
                this.ruleForm = row
                this.fileList = []
                var url = this.$_LOOK(this.$_APIPATH.upload.download ,{
                    images: row.images
                })
                this.fileList.push({
                    name:row.images,
                    url:url
                })
                this.ruleForm.myLike = row.myLike.toString().split(',')
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
            _deleteOne (id) {
                this.$_GET(this.$_APIPATH.account.deptDelete + '/' + id).then((req) => {
                    if (req.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this._getAccountList()
                    }
                })
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`)
                this.length = val
                this._getAccountList(0,this.length);
            },
            // 点击当前页刷新数据
            handleCurrentChange (val) {
                this.currentPage = val
                this._getAccountList((val - 1) * this.length)
            },
            // 查询提交
            _onSubmit (formName) {
                this._getAccountList(0, this.formInline)
            },
            // 选中行
            _toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.accountListTables.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.accountListTables.clearSelection()
                }
            },
            _handleSelectionChange (val) {
                console.log('_handleSelectionChange' + val)
                this.multipleSelection = val
            },
            _operationSelectedData () {
                let ids = ''
                this.multipleSelection.forEach(v => {
                    ids += v.id + ','
                })

                this._deleteOne(ids)
                // this.$message({
                //     message: '可以选中的数据做任何操作:' + ids
                // })
            },
            submitForm(formName) {

                // 表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        // 封装需要提交的form
                        this.formData = new FormData();
                        // 提交上传图片，并把文件数据放入formData中
                        this.$refs.upload.submit()
                        for(let k in this.ruleForm){
                            this.formData.append(k,this.ruleForm[k])
                        }
                        this.$_POST_FORM(this.$_APIPATH.account.accountAdd,this.formData).then((req) => {

                            if(req.data.code === 0){
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                                this.dialogVisible = false
                                this._getAccountList();
                                this.resetForm('ruleForm')
                            }else{
                                this.$message.error( '保存失败')
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重制form表单
            resetForm(formName) {
                this.fileList = []
                this.$refs[formName].resetFields();
            },
            _lookImage (val) {
                this.dialogImages = true
                this.currentImage = this.$_LOOK(this.$_APIPATH.upload.download ,{
                    images: val
                })
            },
            _download (val) {
                this.$_DOWNLOAD(this.$_APIPATH.upload.download ,{
                    images: val
                })
            },
            /**
             * 校验上传的图片是否符合要求，如果符合要求，清除校验
             * @param file
             * @returns {boolean}
             */
            onChange (file) {

                let isJPG = false;
                if(file.raw.type){
                    isJPG = this.fileType.indexOf(file.raw.type) >= 0
                }

                const isLtKb = file.size / 1024  < this.limitSize;

                if (!isJPG) {
                    this.$message.error('文件格式不对，只能上传 ' +this.fileType + ' 格式!');
                }
                if (!isLtKb) {
                    this.$message.error('文件大小不能超过 ' + this.limitSize + 'k!');
                }
                this.ruleForm.images = file.raw.name
                this.$refs.images.clearValidate()
                return isJPG && isLtKb;

            },
            /**
             * 上传之前校验
             * @param file
             */
            beforeAvatarUpload (file) {
            },
            /**
             * 点击提交 调用的是这个事件
             * @param files
             */
            uploadFile (files) {
                this.formData.append('file',files.file)
            },
            // 时间格式化
            _dateFormat (time,formatStr) {
                console.log(time,formatStr)
                if(time === null || time === '' || time === undefined){
                    console.log('time is Undefined')
                } else {
                    const  date = new Date(time)
                    console.log(date,formatStr)
                    const  year = date.getFullYear()
                    const month = date.getMonth() + 1
                    const day = date.getDate()
                    const hour = date.getHours()
                    const minu = date.getMinutes()
                    const second = date.getSeconds()
                    console.log(day)
                    let value = ''
                    switch (formatStr) {
                        case 'yyyy-MM-dd HH:mm:ss':
                            value =  year + '-' + this._timeSupplement_0(month) + "-" + this._timeSupplement_0(day)+" " + this._timeSupplement_0(hour) + ':' + this._timeSupplement_0(minu) + ':' +  this._timeSupplement_0(second)
                            break
                        case 'yyyy-MM-dd':
                            value =  year + '-' + this._timeSupplement_0(month) + "-" + this._timeSupplement_0(day)
                            break
                    }
                    console.log(value)
                    return value
                }
            },
            // 时间格式化不够两位的，前面补充0
            _timeSupplement_0 (value) {
                return value < 10 ? ('0' + value) : value
            }
        }
    }
</script>
