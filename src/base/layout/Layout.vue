<template>
    <div class="layout" :style="{height,backgroundColor:bodyBgc}">
        <div>
            <div class="header" :style="{backgroundColor:headBgc}">
                <div class="logo">
                    <img src="./images/logo.png" alt="">
                    <span class="text">市场监督管理局 综合业务系统</span>
                </div>
                <div class="info">
                    <div>
                        <img src="./images/message.png" alt="信息">
                    </div>
                    <div>
                        <img src="./images/lingdang.png" alt="提醒">
                    </div>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <img src="./images/person.png" alt="人">
                            <span>七月</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <router-link to="/logout"><el-dropdown-item >退出</el-dropdown-item></router-link>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <!-- 左边导航 -->
        <Slider :width="width" @padding="changePadding" ref="slide">
            <slot></slot>
        </Slider>
        <!-- 右边区域路由 -->
        <div class="container-wrapper" :style="{marginLeft}" style="padding: 10px;margin-top: 5px">
            <Header></Header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>
            </el-footer>
        </div>
    </div>
</template>

<script>

    import Slider from 'base/layout/Slider'
    import Header from 'base/header/Header'
    export default {
        name: 'layout',
        components: {
            Slider,Header
        },
        props: {
            model: {
                type: Number,
                default: 1
            },
            width: {
                type: String,
                default: '250px'
            },
            height: {
                type: String,
                default: '100%'
            }
        },
        data () {
            return {
                flag: true
            }
        },
        computed: {
            numberWidth () {
                return Number(this.width.split('px')[0])
            },
            marginLeft () {
                return this.flag ? (this.numberWidth + 10) + 'px' : '0'
            },
            headBgc () {
                return this.model === 1 ? '#4475d8' : '#113e9e'
            },
            bodyBgc () {
                return this.model === 1 ? '#f0f4f9' : '#113e9e'
            }
        },
        mounted () {
            console.log(this.marginLeft)
        },
        methods: {
            changePadding (flag) {
                this.flag = flag
            },
            changePosition () {
                this.$refs.slide.switchPosition()
            },
            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>

<style scoped>
    .layout {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: #f0f4f9;
    }

    .header {
        width: 100%;
        height: 50px;
        background: #4475d8;
        padding: 0 30px;
        line-height: 50px;
    }

    .el-menu {
        border-right: none;
    }

    .logo {
        float: left;
        width: 300px;
    }

    .logo img {
        vertical-align: middle;
        cursor: pointer;
    }

    .logo .text {
        color: #fff;
        line-height: 50px;
    }

    .info {
        float: right;
        width: 300px;
        height: 50px;

    }

    .info div {
        width: 30%;
        float: left;
    }

    .el-dropdown-link {
        color: #fff;
    }

    .info img {
        cursor: pointer;
    }

    .el-dropdown-link img {
        vertical-align: middle;
        padding-right: 5px;
    }

    .container-wrapper {
        transition: all .3s;
        background-color: #fff;
        height: 100%;
    }
</style>
