<template>
    <el-tree :data="treeData"
             :show-checkbox="isCheckbox"
             :props="props"
             default-expand-all
             :expand-on-click-node="false"
             @node-click="handleNodeClick"
             @check-change="handleCheckChange">
        <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span >
                          <el-button v-if="appendListen && data.pid == null"
                                  type="text"
                                  size="mini"
                                  @click="() => append(data)">
                            新增
                          </el-button>
                          <el-button v-if="removeListen"
                                  type="text"
                                  size="mini"
                                  @click="() => remove(node, data)">
                            删除
                          </el-button>
                        </span>
                </span>
        <slot></slot>
    </el-tree>
</template>

<script>
    export default {
        props: {
            treeData: {
                type: Array,
                default() {
                    return []
                }
            },
            props: {
                /**
                 * props
                 * label    指定节点标签为节点对象的某个属性值string, function(data, node)    —    —
                 * children    指定子树为节点对象的某个属性值string    —    —
                 * disabled    指定节点选择框是否禁用为节点对象的某个属性值    boolean, function(data, node)    —    —
                 * isLeaf    指定节点是否为叶子节点,仅在指定了lazy 属性的情况下生效    boolean, function(data, node)
                 */
                type: Object,
                default() {
                    return []
                }
            },
            // 是否监听click事件
            clickListen: {
                type: Boolean,
                default: false
            },
            // 是否有增加按钮
            appendListen: {
                type: Boolean,
                default: false
            },
            // 是否有删除按钮
            removeListen: {
                type: Boolean,
                default: false
            },
            isCheckbox: {
                // 是否可选
                type: Boolean,
                default: false
            },
            isLazy: {
                type: Boolean,
                default: false
            },
            defaultProps:{
                type: Object,
                default () {
                    return {
                        children: 'children',
                        name: 'label'
                    }
                }
            }
        },
        methods: {
            handleNodeClick(data) {
                if (this.clickListen && data.url) {
                    this.$emit('nodeClick', data)
                }
            },
            append(data) {
                console.log(data)
                // const newChild = { id: data.id++, label: 'testtest', children: [] };
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
                this.$emit('addNode',data)
            },
            remove(node, data) {
                this.$emit('deleteNode',node,data)
            },
            handleCheckChange(data, checked, indeterminate) {

                this.$emit('selected', data, checked, indeterminate)
            },
        }
    }
</script>
