<template>
    <div class='lbSdebarUlStyle'>
        <el-menu theme="dark">
            <template v-for='menuItem in menu'>
                <el-submenu :index='menuItem.index?menuItem.index:""'>
                    <template slot="title">
                        <i :class="menuItem.menuIcon"></i>
                        <span slot="title">{{menuItem.menuTitle}}</span>
                    </template>
                    <template v-if="menuItem.menu">
                        <template v-for="menuItem1 of menuItem.menu">
                            <el-submenu v-if="menuItem1.submenu" :index='menuItem1.index?menuItem1.index:""'>
                                <template slot="title">{{menuItem1.menuTitle}}</template>
                                <template v-for="menuItem2 of menuItem1.submenu">
                                    <el-menu-item :index='menuItem2.index?menuItem2.index:""' @click="handleClick(menuItem2)">{{menuItem2.menuTitle}}</el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item v-if="!menuItem1.submenu" :index='menuItem1.index?menuItem1.index:""' @click="handleClick(menuItem1)">{{menuItem1.menuTitle}}</el-menu-item>
                        </template>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<style>

</style>
<script>
import menuStore from '~/stores/menu'
export default {
    name: 'sidebarItem',
    data() {
        return {
            menu: []
        }
    },
    mounted() {
        for (var item of menuStore) {
            let menuitem = {}
            Object.assign(menuitem, item)
            this.menu.push(menuitem)
        }
    },
    methods: {
        handleClick(item) {
            if (item.to) {
                console.log(item.to)
                this.$store.commit('router', item.to)
            }
        },
    }
}
</script>