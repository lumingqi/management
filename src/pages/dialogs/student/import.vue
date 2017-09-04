<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div>
                <div class="modal-header">
                    <button class="close" type="button"  @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="glyphicon glyphicon-import"></i>导入学员档案
                    </h3>
                </div>
                <div class="modal-body" ng-if="step==1">
                    <div class="well">
                        <p>
                            <strong>批量导入学员档案说明.</strong>
                        </p>
                        <ol>
                            <li>
                                下载EXCEL文档模板文件。
                                <a class="btn btn-info btn-xs" href="/tpl/student_import.xls" target="_blank">
                                    <i class="glyphicon glyphicon-cloud-download"></i>点击下载
                                </a>
                            </li>
                            <li>下载之后打开EXCEL文件，阅读第2个sheet表“填写说明”</li>
                            <li>按格式要求将学员档案信息录入Excel表格</li>
                            <li>将填写好的Excel文件上传</li>
                        </ol>
                    </div>
                    <p ng-if="ready" >
                        <button  bind-uploader="uploader" file-select="upload(uploader)" class="btn btn-info ng-isolate-scope">
                            <i class="glyphicon glyphicon-cloud-upload"></i>
                            <span >上传填好的Excel文件</span>
                        </button>
                        <input type="file" nv-file-select uploader="uploader" style="display:none">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'import',
    data() {
        let localdata = {}
        return {
            localdata,
        }
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>