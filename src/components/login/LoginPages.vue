<template>
    <div class="login-page" :class="loginType">
        <div class="login-wrapper" >
            <h1 class="login-header">管理系统</h1>
            <div class="login-content">
                <h4 class="login-title">用户登录</h4>
                <el-form class="login-body" ref="formObj" :model="formObj" label-width="80px">
                    <div class="line">
                        <el-input v-model="formObj.name" placeholder="请输入用户">
                            <i slot="prefix" class="el-input__icon el-icon-vueTop-ren"></i>
                        </el-input>
                    </div>
                    <div class="line">
                        <el-input v-model="formObj.password" type="password" placeholder="请输入密码">
                            <i slot="prefix" class="el-input__icon el-icon-vueTop-mima"></i>
                        </el-input>
                    </div>
                    <!--<div class="line">-->
                        <!--<el-checkbox class='login-check' v-model="formObj.checkedPass" @click="changeCheckedPass">记住密码-->
                        <!--</el-checkbox>-->
                        <!--<span class="fo-password">忘记密码</span>-->
                    <!--</div>-->
                </el-form>
                <div class="login-footer">
                    <el-button type="primary" style="width: 100%;" @click="goLogin">登 录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loginInfo',
        props: {
            // 接收 props
            formObj: {
                type: Object,
                default () {
                    return {
                        name: '',
                        password: '',
                        checkedPass: false,
                        phone: '',
                        verificationCode: '',
                        checkedAutoLogin: false,
                        checkedPhone: false
                    }
                }
            },
            loginType: {
                type: String,
                default: 'login1'
            }
        },
        data () {
            return {}
        },
        created () {
            this.userdetials = {}
        },
        mounted () {
            // 数据拷贝问题
        },
        methods: {
            changeCheckedPass () {
                this.formObj.checkedPass = !this.formObj.checkedPass
            },
            changeCheckedPhone () {
                this.formObj.checkedPhone = !this.formObj.checkedPhone
            },
            goLogin () {
                if (this.formObj.checkedPass) {
                    this.userdetials.username = this.formObj.name
                    this.userdetials.password = this.formObj.password
                } else if (this.formObj.checkedPhone) {
                    this.userdetials.phone = this.formObj.phone
                } else {
                    this.userdetials.username = this.formObj.name
                }

                this.$_POST(this.$_APIPATH.login, {
                    userName: this.formObj.name,
                    password: this.formObj.password
                }).then((req) => {
                    if (req.data.code === 0) {
                        localStorage.setItem('token', req.data.msg)
                        this.$router.push('/index')
                    }
                })
            }
        }
    }
</script>
<style>
    .login-page {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url(./imgs/bg1.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .login1 {
        background: url(./imgs/bg1.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .login2 {
        background: url(./imgs/bg2.png) no-repeat;
        background-size: 100% 100%;
    }

    .login3 {
        background: url(./imgs/bg3.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .login-wrapper {
        width: 265px;
        height: 300px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .login-wrapper .login-header {
        text-align: center;
        color: white;
        font-size: 40px;
        margin-bottom: 45px;
        letter-spacing: 10px;
    }

    .line {
        margin-bottom: 20px;
        overflow: hidden;
    }

    .fo-password {
        float: right;
        font-size: 14px;
        color: white;
        cursor: pointer;
    }

    .login1 .login-check, .login1 .login-check .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #fff;
    }

    /* 第二种登录样式 start */
    .login2 .login-wrapper {
        width: 330px;
        height: 435px;
    }

    .login2 .login-header {
        color: #4586ff;
    }

    .login2 .login-content {
        padding-bottom: 30px;
        border-radius: 2px;
        box-shadow: 0px 0px 5px #888888;
    }

    .login2 .login-title {
        background-color: #6a9fff;
        height: 60px;
        text-align: center;
        color: white;
        font-size: 20px;
        line-height: 60px;
        font-family: monospace;
        letter-spacing: 5px;
    }

    .login2 .login-check, .login2 .login-check .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #1b69d6;
    }

    .login2 .fo-password {
        color: #1b69d6;
    }

    .login2 .login-body {
        padding: 30px 10% 0;
    }

    .login2 .login-footer {
        padding: 0 10%;
    }

    /* 第二种登录样式 end */
    /* 第三种登录样式 start */
    .login3 .login-wrapper {
        width: 330px;
        height: 505px;
    }

    .login3 .el-tabs {
        border-left: none;
        border-right: none;
    }

    .login3 .el-tabs__nav {
        width: 100%;
    }

    .login3 .el-tabs__content {
        padding: 40px 7.5% 30px;
    }

    .login3 .el-tabs__item {
        width: 50%;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

    .login3 .el-tabs__item:last-child {
        margin-left: 1px;
        border-right: none;
    }

    .login3 .line {
        margin-bottom: 15px;
    }

    .login3 .remember {
        float: right;
        margin-top: 2px;
    }

    .login3 .fo-password {
        color: #1b69d6;
        text-decoration: underline;
    }

    .login3 .img-box {
        display: inline-block;
        vertical-align: bottom;
        width: 70px;
        height: 40px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        margin-left: 10px;
    }

    .login3 .change-code {
        vertical-align: bottom;
        color: #7f7f7f;
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
    }

    /* 第三种登录样式 end */
</style>
