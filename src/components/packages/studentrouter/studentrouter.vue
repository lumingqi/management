<template>
    <a class="link" @click="handleRouter($event,lessonData)" v-if="lessonData">
        <span>
            <i class="fa" :class="{'fa-female ':lessonData.sex=='2','fa-male':lessonData.sex=='1'
            ,'mans':lessonData.sex=='1','woman':lessonData.sex=='2'}"></i>
        </span>{{ lessonData.student_name}}
        <span v-if="lessonData.nickname != ''">{{ lessonData.nickname}}</span>
    </a> 
</template>
<script>
export default {
    name: 'LbStudentrouter',
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
