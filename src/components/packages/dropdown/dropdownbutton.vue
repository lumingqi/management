<template>
    <button :class="buttonClass" :tooltip="buttonTooltip" type="button">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'LbDropdownButton',
    props: ['buttonClass', 'buttonTooltip'],
    data() {
        return {
            
        }
    },
    methods: {
    },
    computed: {},
}
</script>
