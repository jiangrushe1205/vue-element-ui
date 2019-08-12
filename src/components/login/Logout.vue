<template>
  <div style="margin-bottom: 100px">
  </div>
</template>

<script>

  export default {
      name: 'login',
      created () {
          localStorage.clear()
          this.$router.push("/login")
      },
      mounted () {
          this.$router.push("/login")
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
