<template>
    <div>
        <div v-if="lessonData[typeData.prop] && lessonData[typeData.prop].length > 0">{{getDateFormat(getLookUp(lessonData[typeData.prop], 'track_time'))}}
            <p><el-tag type="success">{{getLookUp(lessonData[typeData.prop], 'detail')}}</el-tag></p>
            <p class="text-gray text-right">{{getLookUp(lessonData[typeData.prop], 'op_name')}}</p>
        </div>
        <span v-else>
            <el-tag type="danger">无跟踪记录</el-tag>
        </span>
    </div>
</template>
<script>
export default {
    name: 'LbLasttrack',
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
