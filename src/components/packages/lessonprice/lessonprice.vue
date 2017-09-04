<template>
    <div>
        <template v-if="typeData.typeinfo=='singleprice'">
            {{getToFixed(lessonData[typeData.prop])}}元/次
       </template>
        <template v-if="typeData.typeinfo=='price'">
            {{getToFixed(lessonData[typeData.prop])}}元
        </template>
    </div>
</template>
<script>
export default {
    name: 'LbLessonprice',
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
