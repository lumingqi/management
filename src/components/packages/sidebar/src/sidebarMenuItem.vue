<template>
    <li :class="getMenuClass" class="li_arrow" :style="{'z-index':modalShow?1500:3000}">
        <a @click="handleClick">
            <i class="fa" :class="menu.menuIcon"></i>
            <span :class="{'submenu':submenu=='menu-title'}">{{menu.menuTitle}}</span>
               <span v-if="submenu=='menu'" class="arrow">
                   <i class="fa fa-angle-left" :class="{'fa-angle-down':updown,'fa-angle-left':!updown}" style="color:white;"></i>
               </span>
        </a>
        <slot></slot>
    </li>
</template>
<style>
.li_arrow{
    position: relative;
}
.arrow{
    display: inline-block;
    width:10px;
    height: 10px;
    position: absolute;
    right:25px;
}
.cssStyle {
    color: #e74c3c;
}

.activeBg {
    background: #e74c3c;
}

.activeColor {
    color: #e74c3c;
}

/* hover */

.lbSdebarMenu>a:hover {
    background: #e74c3c;
    transition: 0.3s all ease-in-out;
}

.lbSdebarMenu.isActivec>a {
    background: #e74c3c;
    transition: 0.3s all ease-in-out;
}

.lbSdebarMenuItem {
    background: #2a3b4c;
}

.lbSdebarMenuItem>a {
    padding-top: 14px;
}

.lbSdebarMenuItem>a i {
    margin-left: 40px;
}

.lbSdebarMenu.isActivec ul {
    display: block;
}

.lbSdebarMenu ul {
    display: none;
}

.lbSdebarMenuItem>a:hover {
    color: #e74c3c;
    transition: 0.3s all ease-in-out;
}

.lbSdebarMenuItem.isActivec>a {
    color: #e74c3c;
    transition: 0.3s all ease-in-out;
}
</style>
<script>
export default {
    name: 'sidebarMenuItem',
    componentName: 'MenuItem',
    props: ['menu','submenu'],
    data() {
        return {
            updown:false,
        }
    },
    computed: {
        modalShow() {
            return this.$store.state.dialogs.modalbackdrop
        },
        getMenuClass() {
            let css = {}
            css[this.menu.cssStyle] = true
            css.isActivec = this.menu.isActive
            this.updown = this.menu.isActive
            return css
        }
    },
    methods: {
        handleClick() {
            this.$emit('menuchange', this.menu.index)
            if (this.menu.to) {
                this.$store.commit('router',this.menu.to)
            }
            this.updown = !this.updown
        }
    }
}
</script>