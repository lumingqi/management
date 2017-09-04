<template>
    <div>
        <template>
            <el-tag type="gray" v-if="lessonData.days == '0'">星期日</el-tag>
            <el-tag type="gray" v-if="lessonData.days == '1'">星期一</el-tag>
            <el-tag type="gray" v-if="lessonData.days == '2'">星期二</el-tag>
            <el-tag type="gray" v-if="lessonData.days == '3'">星期三</el-tag>
            <el-tag type="gray" v-if="lessonData.days == '4'">星期四</el-tag>
            <el-tag type="gray" v-if="lessonData.days == '5'">星期五</el-tag>
            <el-tag type="gray" v-if="lessonData.days == '6'">星期六</el-tag>
        </template>
    </div>
</template>
<script>
export default {
    name: 'LbCheckweek',
    props: ['lessonData'],
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
    },
    computed: {
    }
}
</script>
