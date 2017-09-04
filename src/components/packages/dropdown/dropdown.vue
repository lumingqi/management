<template>
    <el-dropdown @command="handleCommand" menu-align="start">
        <div>
            <slot name="buttonslot"></slot>
        </div>
    
        <el-dropdown-menu slot="dropdown">
            <template v-if="getDropMenu.length>0">
                <template v-for="item in getDropMenu">
                    <el-dropdown-item :command="getItemCommand(item)">
                        <a :id="id">
                            <i :class="item.icon" v-if="item.icon"></i>{{item.text}}
                        </a>
                    </el-dropdown-item>
                </template>
            </template>
            <template v-else>
                <el-dropdown-item>
                    无操作
                </el-dropdown-item>
            </template>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name: 'LbDropdown',
    props: ['dropMenuData', 'id', 'menuData','student'],
    data() {
        return {
        }
    },
    computed: {
        getDropMenu() {
            let menu = []
            if (this.dropMenuData) {
                for (var item of this.dropMenuData) {
                    let action = item.url
                    if (item.action) {
                        let to = this.$store.state.system.router
                        action = to + item.action
                    }
                    if (this.getShowStatus(item) && this.getActionOption(action)) {
                        menu.push(item)
                    }
                }
            }
            return menu
        }
    },
    methods: {
        getShowStatus(item) {
            let result = true
            if (item.menuctrl) {
                if (_.isArray(item.menuvalue)) {
                    result = item.menuvalue.indexOf(this.menuData[item.menuctrl]) != -1
                } else {
                    result = this.menuData[item.menuctrl] == item.menuvalue
                }
            }
            return result
        },
        handleCommand(common) {
            if (common.indexOf('u:') >= 0) {
                let url = common.replace('u:', '')
                if (this.student){
                    this.$store.state.envs.currStudent = this.menuData
                }
                this.handleShowDialog(url, this.menuData)
            } else {
                let action = common.replace('a:', '')
                this.$emit('command', {
                    'action': action,
                    'data': this.menuData
                })
            }
        },
        getItemCommand(item) {
            let result = 'u:' + item.url
            if (item.action) {
                result = 'a:' + item.action
            }
            return result
        }
    }
}
</script>
