<template>
    <div class="slide" :style="{backgroundColor,width}" ref="slide" @mouseover="show" @mouseout="hide">
        <slot></slot>
        <div class="control" :style="{left:width}" @click="switchPosition" v-show="showControl || !showFlag">
            <i class="caret" :class="iconClass"></i>
        </div>
    </div>
</template>
<script>

    /**
     * 往左右滑动组件
     */
    export default {
        name: 'slide',
        props: {
            width: {
                type: String,
                default: '200px'
            },
            // 定义左边背景颜色
            backgroundColor: {
                type: String,
                default: '#fff'
            }
        },
        data () {
            return {
                showFlag: true,
                showControl: false
            }
        },
        computed: {
            iconClass () {
                return this.showFlag ? 'el-icon-arrow-left' : 'el-icon-arrow-right'
            },
            leftWidth () {
                return this.showFlag ? '0' : `-${this.width}`
            }
        },
        methods: {
            switchPosition () {
                this.showFlag = !this.showFlag
                this.$refs.slide.style.left = this.leftWidth
                this.$refs.slide.style.transition = 'all 0.3s ease'
                this.$emit('padding', this.showFlag)
            },
            show () {
                this.showControl = true
            },
            hide () {
                this.showControl = false
            }
        }
    }
</script>

<style scoped>
    .slide {
        position: absolute;
        left: 0;
        z-index: 999;
        height: 100%;
    }

    .control {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        height: 50px;
        border-left: 12px solid #909399;
        border-bottom: 14px solid transparent;
        border-top: 14px solid transparent;
        transition: left .3s;
        cursor: pointer;
    }

    .caret {
        color: #fff;
        margin-left: -14px;
        font-size: 16px;
        vertical-align: middle;
    }

    li {
        border: none;
    }

</style>
