<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" @click="lbClosedialog()">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">关闭</span>
                </button>
                <h3 class="modal-title">
                    <i class="icon-check"></i>{{getStudentName()}}的档案录入成功!
                </h3>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <h4 class="text-info">
                    您还可以继续对
                    <span class="label bg-info">{{getStudentName()}}</span>进行以下操作
                </h4>
            </div>
            <div class="modal-footer">
                <a @click="handleShowDialog('lb-ordermodal',$store.state.envs.currStudent)" class="btn btn-info">报名</a>
                <a @click="handleShowDialog('inquiryform',$store.state.envs.currStudent)" class="btn btn-info">登记咨询</a>
                <a class="btn btn-success" @click="lbClosedialog($event)">关闭</a>
            </div>
        </div>
    </div>
</template>
<style>
.panel-footer .btn {
    margin-left: 0% !important;
    margin-top: 0px !important;
}
</style>
<script>
export default {
    name: 'finishadd',
    data() {
        let localdata = {}
        return {
            localdata,
        }
    },
    mounted() {
        if (this.$store.state.dialogs.dailogdata) {
            this.$store.state.envs.currStudent = this.$store.state.dialogs.dailogdata
        }
    }
}
</script>