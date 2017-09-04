<template>
    <div class="modal"  :style="{ 'z-index': zindex, 'display': 'block'}">
        <slot>未加载</slot>
    </div>
</template>
<script>
export default {
    name: 'dialog',
    props: ['zindex'],
    data() {
        return {
        }
    }
}
</script>