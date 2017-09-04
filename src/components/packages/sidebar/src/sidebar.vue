<template>
    <div class="lbSdebar">
        <lb-sidebarHeader></lb-sidebarHeader>
        <lb-sidebarItem></lb-sidebarItem>
    </div>
</template>
<script>
import sidebarHeader from './sidebarHeader.vue'
import sidebarItem from './sidebarItem.vue'
export default {
    name: 'LbSidebar',
    data() {
        return {
            isToUl: false
        }
    },
    components: {
        'lb-sidebarHeader': sidebarHeader,
        'lb-sidebarItem': sidebarItem
    },
    methods: {
        handleClickColl() {
            this.isToUl = !this.isToUl
        }
    }

}
</script>