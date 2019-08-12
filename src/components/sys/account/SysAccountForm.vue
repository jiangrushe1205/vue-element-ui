<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                height="60%"
                :before-close="handleClose">
            <el-form :model="sysAccount" :rules="rules" ref="sysAccountForm" label-width="100px"  class="demo-ruleForm">
                <el-input v-model="sysAccount.id" type="hidden"></el-input>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="sysAccount.name"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="city">
                    <el-select v-model="sysAccount.city" placeholder="请选择城市">
                        <el-option label="郑州" value="郑州"></el-option>
                        <el-option label="新乡" value="新乡"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                            v-model="sysAccount.birthday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="sysAccount.gender">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="爱好" prop="myLike">
                    <el-checkbox-group v-model="sysAccount.myLike">
                        <el-checkbox label="1" name="myLike">游戏</el-checkbox>
                        <el-checkbox label="2" name="myLike">读书</el-checkbox>
                        <el-checkbox label="3" name="myLike">社交</el-checkbox>
                        <el-checkbox label="4" name="myLike">旅游</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="个人介绍" prop="introduce">
                    <el-input type="textarea" v-model="sysAccount.introduce"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="_submitForm('sysAccountForm')">提交</el-button>
                    <el-button type="primary" @click="_resetForm('sysAccountForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import { createOrUpdateService } from "common/js/sys/sysAccountService";
    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                defalut: false
            },
            currentAccount: {
                id: '',
                name: '',
                city: '',
                birthday: '',
                gender: '',
                myLike: [],
                introduce: ''
            }
        },
        data () {
            let checkBirthDay = (rule, value ,callBack) => {
                console.log(rule)
                if(this.$_ISNULL(value)) {
                    callBack('请填写日期')
                } else {
                    const birthday  = this.$_DATE_FORMAT(value, 'yyyy-MM-dd')
                    const regx =  /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/
                    if( !regx.test(birthday)){
                        callBack('输入的格式不正确')
                    } else {
                        this.sysAccount.birthday = birthday;
                        callBack()
                    }
                }
            }
            return  {
                sysAccount: {
                    id: '',
                    name: '',
                    city: '',
                    birthday: '',
                    gender: '',
                    myLike: [],
                    introduce: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3 - 10 个字符', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: '请选择城市', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, validator:checkBirthDay, trigger: 'change'}
                    ],
                    myLike: [
                        {required: true, message: '请选择爱好', trigger: 'change'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    introduce: [
                        {required: true, message: '请填写个人介绍', trigger: 'blur'}
                    ]
                },
            }
        },
        methods : {
            handleClose (done) {
                this.$emit('dialogClosed')
            },
            _submitForm (formName) {
                this.$refs[formName].validate( val => {
                    if( val ){
                        this.sysAccount.myLike = this.sysAccount.myLike.toString()
                        createOrUpdateService(this.sysAccount).then( res => {
                            this.$_COMMONUTILS.successMessage('保存成功')
                            this.$emit('reflushTable')
                            this.$emit('dialogClosed')
                            this._resetForm(formName)
                        }).catch( res =>{
                            this.$_COMMONUTILS.errorMessage('保存失败')
                        })

                    }else {
                        this.$_COMMONUTILS.errorMessage('bu符合我们的校验')
                    }
                })
            },
            _resetForm (formName) {
                this.$refs[formName].resetFields()
            }

        },
        mounted () {
            this.sysAccount = this.currentAccount
        }
    }
</script>
