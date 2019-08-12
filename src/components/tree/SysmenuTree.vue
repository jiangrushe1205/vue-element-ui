<template>

    <el-container style="height: 900px" >
        <el-aside width="150px" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                <div class="grid-content bg-purple-light">
                    <Tree @nodeClick="nodeClick" :clickListen="clickListen" :isCheckbox="isCheckbox" :treeData="treeData" :props="defaultProps"></Tree>
                </div>
        </el-aside>
        <el-main style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                <div class="grid-content">
                    <router-view></router-view>
                </div>
        </el-main>
    </el-container>

</template>

<script>
    /* eslint-disable */
    import Tree from 'base/tree/Tree'
    export default {
        name: 'treeDemo',
        components: {
            Tree
        },
        computed: {
            currentNodeObjectFun () {
                console.log(this.currentNodeObject)
            }
        },
        methods : {
            nodeClick (nodeObject) {
                console.log("父节点打印信息")
                console.log(nodeObject.url)
                this.$router.push(nodeObject.url)
            }
        },
        data () {
            return {
                clickListen: true,
                isCheckbox: false,
                treeData: [{
                    label: 'demo',
                    children: [{
                        label: '列表',
                        url: '/menu/table',
                    }, {
                        label: 'form表单',
                        url: '/menu/form',
                    },{
                        label: '文件上传',
                        url: '/menu/upload',
                    },{
                        label: '文件下载',
                        url: '/menu/download',
                    },{
                        label: '菜单管理',
                        url: '/tree',
                    },
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
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
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
