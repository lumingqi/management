<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" @click="lbClosedialog($event)">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">关闭</span>
                </button>
                <h3 class="modal-title">
                    {{rote.name}} 的权限设置
                </h3>
            </div>
            <div class="modal-body">
                <el-tree :data="authoritymenu" :default-checked-keys="rote.authority" show-checkbox ref="tree" node-key="id" :props="defaultProps">
                </el-tree>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click="handleSave">确定</button>
                <button class="btn btn-warning" @click="lbClosedialog($event)">关闭</button>
            </div>
        </div>
    </div> 
</template>
<script>
import menus from '~/stores/menu'
export default {
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            rote: {}
        }
    },
    mounted() {
        if (this.$store.state.dialogs.dailogdata) {
            let id = this.$store.state.dialogs.dailogdata['_id']
            this.handleGetTableID('role', id).then((obj) => {
                if (obj.data && obj.data.length > 0) {
                    this.rote = obj.data[0]
                    if (this.rote.authority && this.rote.authority.length > 0) {
                        this.$refs.tree.setCheckedKeys(this.rote.authority)
                    }
                }
            })
        }
    },
    computed: {
        authoritymenu() {
            let treedata = []
            let menudata = {}
            menudata.id = 'menu'
            menudata.label = '菜单权限'
            menudata.children = []
            treedata.push(menudata)

            let optdata = {}
            optdata.id = 'opt'
            optdata.label = '功能权限'
            optdata.children = []
            treedata.push(optdata)
            this.gettreedata(menudata.children, optdata.children, menus)
            return treedata
        }
    },
    watch: {},
    methods: {
        handleSave() {
            let auth = this.$refs.tree.getCheckedKeys()
            this.updateTeble('role', this.rote._id, {
                'authority': auth
            }).then(() => {
                this.lbClosedialog()
            })
        },
        getoptdata(optdata, dropDownMenu) {
            dropDownMenu.forEach((item) => {
                let optitem = {}
                if (item.url) {
                    optitem.id = item.url + '_opt'
                } else if (item.action) {
                    optitem.id = item.action + '_opt'
                }
                optitem.label = item.text
                optdata.push(optitem)
            })
        },
        getoptmenudata(optdata, dropDownMenu,to) {
            dropDownMenu.forEach((item) => {
                let optitem = {}
                if (item.url) {
                    optitem.id = item.url + '_opt'
                } else if (item.action) {
                    optitem.id = to + item.action + '_opt'
                }
                optitem.label = item.text
                optdata.push(optitem)
            })
        },
        gettreedata(menudata, optdata, menus) {
            if (menus) {
                menus.forEach((element) => {
                    if (element.menuShow != 0) {
                        let obj = {}
                        obj.id = element.to
                        obj.label = element.menuTitle
                        obj.children = []
                        if (element.dropDownMenu || element.action) {
                            let optitem = {}
                            optitem.id = element.to + "_opt"
                            optitem.label = element.menuTitle
                            optitem.children = []
                            if (element.dropDownMenu) {
                                this.getoptmenudata(optitem.children, element.dropDownMenu,element.to)
                            }
                            if (element.action) {
                                this.getoptdata(optitem.children, element.action)
                            }
                            optdata.push(optitem)
                        }
                        this.gettreedata(obj.children, optdata, element.menu)
                        menudata.push(obj)
                    }
                })
            }
        }
    },
}
</script>

