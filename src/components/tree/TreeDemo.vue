<template>
        <div>
                <el-button
                           type="text"
                           size="mini"
                           @click="() => addNode()">
                        新增
                </el-button>
                <Tree @selected="selected" :removeListen="true" :appendListen="true" @addNode="addNode" @deleteNode="deleteNode" :clickListen="clickListen" :isCheckbox="isCheckbox" :treeData="treeData" :props="defaultProps">
                </Tree>
                <!-- 增加修改 -->
                <el-dialog
                        title="添加节点"
                        :visible.sync="dialogVisible"
                        width="50%"
                        height="50%"
                        :before-close="handleClose">

                        <el-form :inline="true" :model="nodeObj"  ref="nodeObj" :rules="rules" class="demo-ruleForm">
                                <el-form-item label="节点名字" prop="name">
                                        <el-input v-model="nodeObj.name" placeholder="节点名字" ref="name"></el-input>
                                </el-form-item>
                                <el-form-item label="路径" prop="href">
                                        <el-input v-model="nodeObj.href" placeholder="路径" ref="href"></el-input>
                                </el-form-item>
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="_addNodeSave('nodeObj')">确 定</el-button>
                        </el-form>
                </el-dialog>
        </div>
</template>

<script>
    /* eslint-disable */
    import Tree from 'base/tree/Tree'
    import { getSysmenuList, sysmenuAdd, sysmenuDelete, createMenu } from 'common/js/sysmenuService'
    export default {
        name: 'treeDemo',
        components: {
            Tree
        },
        created () {
            this._initData()
        },
        computed: {
        },
        data () {
            return {
                //选中的当前节点
                currentNodeObj:{
                    id: '',
                    name: '',
                    children: '',
                },
                rules: {name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ]
                },
                // 是否弹窗
                dialogVisible: false,
                //监听树的点击事件
                clickListen: true,
                // 是否显示复选框
                isCheckbox: true,
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    id: ''
                },
                // 节点对象
                nodeObj:{
                    id: '',
                    name: '',
                    href: '',
                },
                // tree的数据
                treeData: []
            }
        },
        methods : {
            // 初始化tree的数据
            _initData () {
                getSysmenuList().then((data) => {
                    console.log(data)
                    this.treeData = data
                });
            },
            // 关闭弹窗
            handleClose (done) {
                done()
            },
            // 编辑
            addNode (obj) {
                this.dialogVisible = true
                console.log(obj)
                if(obj){
                    this.currentNodeObj.id = obj.id
                }else{
                    this.currentNodeObj = {}
                }
            },
            _addNodeSave(formName){

                // 表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('当前节点:' + this.currentNodeObj.id)
                        let newChild = {
                            menuName: this.nodeObj.name,
                            href: this.nodeObj.href,
                            parentId: this.currentNodeObj.id? this.currentNodeObj.id:'',
                            isFloder: 2
                        }
                        console.log('当前节点:' + newChild)
                        this.dialogVisible = false
                        console.log(newChild)
                        sysmenuAdd(newChild).then(res => {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.nodeObj={}
                            this._initData()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            },
            // 删除节点
            deleteNode (node,data) {

                sysmenuDelete(data.id).then( res => {
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.id === data.id);
                        children.splice(index, 1);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                })

            },
            /**
             *
             * @param data 节点数据
             * @param checked 是否选中
             * @param indeterminate
             */
            selected (data, checked, indeterminate) {
                if(checked){
                    this.$message({
                        message: '选中节点:-名字:' + data.label +',id'+data.id+'操作'
                    })
                }else{
                    this.$message({
                        message: '取消选中节点:-名字:' + data.label +',id'+data.id+'操作'
                    })
                }
                console.log(data, checked, indeterminate);
            }
        },
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
