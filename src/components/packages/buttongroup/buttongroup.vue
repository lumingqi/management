<template>
    <div class="btn-group">
        <template v-for="item in groupData">
            <lb-buttongroup-item :iclass='item.iclass' :itext='item.text' :ivalue='item.value' :iactive='value' @selected="handleSelected"></lb-buttongroup-item>
        </template>
    </div>
</template>
<script>
import buttongroupitem from './buttongroupitem.vue'

export default {
    name: 'LbButtongroup',
    props: ['groupData', 'name', 'value'],
    data() {
        return {

        }
    },
    components: {
        'lb-buttongroup-item': buttongroupitem
    },
    methods: {
        handleSelected(value) {
            this.$emit('input', value)
        }
    },
    computed: {},
}
</script>
