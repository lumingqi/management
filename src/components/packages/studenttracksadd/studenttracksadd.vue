<template>
    <div>
        <template v-if="getActionOption('studenttracksadd')">
            <a class="link" @click="handleAddTrack(lessonData[typeData.prop])" tooltip="新增记录">
                <i class="fa fa-plus"></i>
            </a>
        </template>
        <a @click="handleRouter($event,lessonData[typeData.prop])">
            {{ getLookUp(lessonData[typeData.prop],'student_name') }}
        </a>
    </div>
</template>
<script>
export default {
    name: 'LbStudenttracksadd',
    props: ['lessonData', 'typeData'],
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
        handleAddTrack(item) {
            let student = this.getLookUp(item)
            this.$store.state.envs.currStudent = student
            this.handleShowDialog('inquiryform', student)
        },
    },
    computed: {
    }
}
</script>
