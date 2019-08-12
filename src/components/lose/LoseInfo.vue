<template>
  <div class="error-wrapper">
    <div class="error">
      <div class="error-img">
        <img :src=src>
        <p class="describe">{{des}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loseInfo',
    props: {
      loseType: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        srcData: [require('./images/404.png'), require('./images/500.png'), require('./images/building.png')],
        desData: ['服务器无法访问', '服务器访问出错', '正在建设中...']
      }
    },
    computed: {
      src () {
        return this.srcData[this.loseType]
      },
      des () {
        return this.desData[this.loseType]
      }
    }

  }
</script>

<style scoped>
  .error-wrapper {
    height: 500px;
    background-color: #f7f5f6;
  }

  .error {
    position: absolute;
    top: 135px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: solid 1px #eeeeee;
  }

  .error-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .describe {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }

</style>
