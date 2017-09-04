<template>
    <div>
        <template v-if="typeData.typeinfo=='singletime'">
            {{lessonData.unit_hours}}小时
        </template >
        <template v-if="typeData.typeinfo=='time'">
            <template v-if="lessonData.lesson_type=='0'&&lessonData.price_model=='0'">
                <el-tag type="gray">{{lessonData.inc_times}}</el-tag>次
            </template>
            <el-tag type="gray">{{lessonData.inc_hours}}</el-tag>课时
        </template >
    </div>
</template>
<script>
export default {
    name: 'LbLessonhours',
    props: ['lessonData','typeData'],
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
