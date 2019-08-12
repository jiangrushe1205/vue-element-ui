<template>
  <div style="margin-bottom: 100px">
    <lose-info :loseType= $route.params.id ></lose-info>
  </div>
</template>

<script>
  import loseInfo from './LoseInfo'

  export default {
    name: 'serverLose',
    components: {
      loseInfo
    },
    data () {
      return {
        loseType: 1,
        tableData: [
          {
            para: 'loseType',
            introduce: '服务端未响应页面类型',
            type: 'Number',
            options: '0,1,2',
            default: '—'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
