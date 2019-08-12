<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择城市">
                <el-option label="郑州" value="郑州"></el-option>
                <el-option label="新乡" value="新乡"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="date1">
            <el-date-picker
                    v-model="ruleForm.date1"
                    type="datetime"
                    placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="1" >男</el-radio>
                <el-radio label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="即时配送" prop="delivery">-->
            <!--<el-switch v-model="ruleForm.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item label="爱好" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="1" name="type">游戏</el-checkbox>
                <el-checkbox label="2" name="type">读书</el-checkbox>
                <el-checkbox label="3" name="type">社交</el-checkbox>
                <el-checkbox label="4" name="type">旅游</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="个人介绍" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <!-- 图片上传了做 隐藏input是为了做校验使用-->
        <el-form-item label="上传头像" prop="files" ref="files">
            <el-input v-model="ruleForm.files" style="display: none;"></el-input>
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
                <div slot="tip" class="el-upload__tip">只能上传3文件，且不超过1024kb</div>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        created () {
        },
        mounted () {
            // form 表单回显
            this.ruleForm={
                name: '演唱会',
                region: 'beijing',
                date1: '2019-12-12 23:12:12',
                delivery: true,
                desc: '123123132',
                type: ['3','4'],
                resource: '1',
                files:''
            }
        },
        data() {
            // 校验日期
            let checkDate1 = (rule, value, callback) => {
                value = this._dateFormat(value,'yyyy-MM-dd HH:mm:ss')
                console.log(value)
                if (!value) {
                    return callback(new Error('日期不能为空'));
                }
                const regx = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}\s(([0-1]{1}[0-9]{1})|([2]{1}[0-4]{1}))([:])(([0-5]{1}[0-9]{1}|[6]{1}[0]{1}))([:])((([0-5]{1}[0-9]{1}|[6]{1}[0]{1})))/
                if (!regx.test(value)) {
                    callback(new Error('请输入正确的日期'));
                } else {
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
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    files:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { validator: checkDate1, trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],
                    files: [
                        { required: true, message: '请上传图片', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
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
                        this.$_POST_FORM(this.$_APIPATH.upload.formUploadFiles,this.formData).then((req) => {
                            this.$message({
                                massage: '保存成功',
                                type: 'success'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重制form表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /**
             * 校验上传的图片是否符合要求，如果符合要求，清除校验
             * @param file
             * @returns {boolean}
             */
            onChange (file) {
                const isJPG = this.fileType.indexOf(file.raw.type) >= 0
                const isLtKb = file.size / 1024  < this.limitSize;

                if (!isJPG) {
                    this.$message.error('文件格式不对，只能上传 ' +this.fileType + ' 格式!');
                }
                if (!isLtKb) {
                    this.$message.error('文件大小不能超过 ' + this.limitSize + 'k!');
                }
                this.ruleForm.files = file.raw.name
                this.$refs.files.clearValidate()
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
                    }
                    return value
                }
            },
            // 时间格式化不够两位的，前面补充0
            _timeSupplement_0 (value){
                return value < 10 ? ('0' + value) : value
            }
        }
    }
</script>
