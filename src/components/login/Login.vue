<template>
  <div style="margin-bottom: 100px">
    <login-info :loginType='"login1"' :form-obj="loginForm"></login-info>
  </div>
</template>

<script>
  import loginInfo from './LoginPages'

  export default {
    name: 'login',
    components: {
      loginInfo
    },
    data () {
      return {
        loginForm: {
          name: '',
          password: '',
          checkedPass: false,
          checkedAutoLogin: false,
          checkedPhone: false,
          phone: '',
          verificationCode: ''
        },
        tableData1: [
          {
            para: 'loginType',
            introduce: '登录页面类型',
            type: 'Number',
            options: '"login1", "login2", "login3"',
            default: 'login1'
          },
          {
            para: 'loginForm',
            introduce: '登录信息',
            type: 'Object',
            options: 'name(登录名 string)，password(密码 string)，phone(手机号 string)，verificationCode(验证码 string)，' +
              'checkedPass(记住密码 boolean),checkedAutoLogin(免密登陆 boolean),checkedPhone(记住手机号 boolean)',
            default: '{}'
          }
        ]
      }
    }
  }
</script>

<style>

  .login_tabs > .el-tabs__content {
    min-height: 520px;
  }

  .login_tabs .login-wrapper {
    position: absolute;
  }
</style>
