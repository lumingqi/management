<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" @click="lbClosedialog()">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">关闭</span>
                </button>
                <h3 class="modal-title">
                    <i class="fa fa-book"></i>课程分类设置</h3>
            </div>
            <div class="modal-body">
                <p>
                    <a class="btn btn-default" @click="handleClick">
                        <i class="fa fa-plus"></i>新增大类
                    </a>
                </p>
                <el-tree :data="getreeData" :props="defaultProps" node-key="_id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
                </el-tree>
            </div>
            <div class="modal-footer text-center">
                <button class="btn btn-warning" @click="lbClosedialog($event)">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
let id = 10000
export default {
    name: 'cate',
    data() {
        let localdata = {
            'form': {
                'name': ''
            }
        }
        return {
            localdata,
            model: 'cate',
            tables: ['cate'],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    computed: {
        getreeData() {
            let cateTree = []
            let cateTreeMap = {}
            let cateData = this.$store.state.models.models.cate.data
            for (let item of cateData) {
                let treeitem = item
                if (cateTreeMap[item._id]) {
                    treeitem.children = cateTreeMap[item._id].children
                } else {
                    treeitem.children = []
                }
                cateTreeMap[item._id] = treeitem
                if (item.pid == '') {
                    cateTree.push(treeitem)
                } else {
                    if (cateTreeMap[item.pid]) {
                        cateTreeMap[item.pid].children.push(treeitem)
                    } else {
                        cateTreeMap[item.pid] = {}
                        cateTreeMap[item.pid].children = []
                        cateTreeMap[item.pid].children.push(treeitem)
                    }
                }
            }
            console.log('data', cateData,cateTreeMap)
            return cateTree
        }
    },
    watch: {},
    methods: {
        append(store, data) {
            store.append({ id: id++, label: 'testtest', children: [] }, data);
        },
        remove(store, data) {
            store.remove(data);
        },
        renderContent(h, { node, data, store }) {
            return h('lb-listtree', {
                props: {
                    data
                }
            })
        },
        handleClick() {
            let vm = this
            vm.modalsType = vm.types.APPEND_API
            vm.localdata.form = {
                name: '默认分类',
                pid: '',
                save: false
            }
            vm.handleSave().then(() => {
                vm.handleGetTable()
            }, (e) => {
                console.log(e)
            })
        }
    }
}
</script>
