<template>
    <label class="btn btn-default" @click="handleClick" :class="{'active':active}">
        <i :class='iclass' v-if="iclass"></i>{{itext}}
    </label>
</template>
<script>
export default {
    name: 'LbButtongroupItem',
    props: ['iclass', 'itext', 'ivalue', 'iactive'],
    data() {
        return {
            curactive:this.iactive
        }
    },
    computed: {
        active() {
            return this.iactive == this.ivalue
        }
    },
    methods: {
        handChange() {
            this.curactive = false
        },
        handleClick() {
            this.curactive = true
            let uid = this._uid
            if (this.curactive) {
                this.$parent.$children.forEach(child => {
                    if (child._uid !== uid) {
                        if (typeof(child.handChange) == 'function')
                            child.handChange()
                    }
                })
            }
            this.$emit('selected', this.ivalue)
        }
    }
}
</script>
