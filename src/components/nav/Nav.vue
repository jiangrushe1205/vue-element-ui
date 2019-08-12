<template>
    <el-row class="tac">
        <el-col :span="12" style="width: 100%">
            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose" :default-openeds="['1-1']">

                    <el-submenu :index="menu.id" v-for="menu in treeData">
                        <template slot="title" ><i class="el-icon-guide"></i>{{ menu.name }}</template>
                        <router-link :to="child.href" v-for="child in menu.children">
                            <el-menu-item :index="child.id"><i class="el-icon-guide"></i>{{ child.name }}</el-menu-item>
                        </router-link>

                    </el-submenu>
                    <el-submenu index="1-2">
                        <template slot="title"><i class="el-icon-guide"></i>demo</template>
                        <router-link to="/sysmenu">
                            <el-menu-item index="1-2"><i class="el-icon-guide"></i>菜单</el-menu-item>
                        </router-link>
                    </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    import { getSysmenuList } from 'common/js/sysmenuService'
    export default {
        created () {
            this._initData()
        },
        mounted () {
            this._initData()
        },
        data () {
            return {
                treeData: []
            }
        },
        methods: {
            // 初始化tree的数据
            _initData () {
                getSysmenuList().then((data) => {
                    this.treeData = data
                });
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
