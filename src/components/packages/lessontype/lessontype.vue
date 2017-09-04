<template>
    <div>
        <p>
            {{lessonData[typeData.lesson_name]}}
            <el-tag type="success">{{lessonData[typeData.lesson_no]}}</el-tag>
            <el-tag type="danger">{{getButtongroupText(typeData.othertype,lessonData[typeData.lesson_type])}}</el-tag>
        </p>
    </div>
</template>
<script>
export default {
    name: 'LbLessontype',
    props: ['lessonData', 'typeData'],
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
