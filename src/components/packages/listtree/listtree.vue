<template>
    <span>
        <span>
            <span>
            </span>
            <el-input size="mini" v-model.trim="data.name" type="text" style="width:200px;" @blur="edititem">
            </el-input>
        </span>
        <span style="float: right; margin-right: 20px">
            <el-button size="mini" @click="addItem">添加</el-button>
            <el-button size="mini" @click="remove_cate">删除</el-button>
        </span>
    </span>
</template>
<script>
export default {
    name: 'LbListtree',
    props: ['treeData', 'data'],
    data() {
        let localdata = {
            form: {}
        }
        return {
            localdata,
            name: this.data.name,
            model: 'cate',
            tables: ['cate']
        }
    },
    methods: {
        getCate() {
            let filterObj = []
            let filterTxt = this.base64.encode(JSON.stringify(filterObj))
            this.pagination.pagesize = 1000
            this.handleGetFilterTableTable('cate', filterTxt).then((obj) => {

            })
        },
        edititem() {
            if (this.data.name != name) {
                let vm = this
                vm.updateTeble('cate', this.data._id, { name: this.data.name }).then(() => {
                    vm.getCate()
                }, (e) => {
                    console.log(e)
                })
            }
        },
        addItem() {
            let vm = this
            vm.modalsType = vm.types.APPEND_API
            vm.localdata.form = {
                name: '默认分类',
                pid: vm.data._id,
                save: false
            }
            console.log('add', vm.localdata.form)
            vm.handleSave(vm.localdata.form).then(() => {
                vm.getCate()
            }, (e) => {
                console.log(e)
            })
        },
        remove_cate() {
            let vm = this
            console.log(vm.data.children.length)
            if (vm.data.children.length > 0) {
                this.$message({
                    type: 'info',
                    message: '请先删除子分类，再删除此类'
                })
            } else {
                this.$confirm('删除分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(vm.data._id).then(() => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        vm.getCate()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        }
    },
    computed: {
    },
}
</script>
