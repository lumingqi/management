<template>
    <div class="modal-dialog" ng-class="{'modal-sm': size == 'sm', 'modal-lg': size == 'lg','modal-full':size == 'full'}">
        <div class="modal-content" modal-transclude>
            <div page-controller="change_branch" >
                <div class="modal-header">
                    <button class="close" type="button" ng-click="$dismiss()" @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="icon-shuffle"></i>为学员
                        <span class="label bg-info">威锋</span>转校区
                    </h3>
                </div>
                <div class="modal-body">
                    <form name="form1" class="form-validation form-horizontal  ng-dirty -parse">
                        <div class="wrapper-xs">
                            <div class="form-group">
                                <label class="control-label col-md-2 col-xs-3">当前校区：</label>
                                <div class="col-md-5 col-xs-9">
                                    <p class="form-control-static" ng-bind-html="student.ob_id|branch_name">
                                        <label class="badge bg-info badge-xm">福州布尔培训</label>
                                    </p>
                                </div>
                            </div>
                            <div class="form-group" ng-if="branch_rest.$loaded">
                                <label class="col-xs-3 col-md-2 control-label">新校区：</label>
                                <div class="col-xs-9 col-md-5">
                                    <select class="form-control  ng-dirty -parse ng-touched" ng-options="item.ob_id as item.branch_name for item in branch_rest.$list" v-model="localdata.form.change_branch_ob_id">
                                        <option value class>选择校区</option>
                                        <option value="0">福州布尔培训</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" ng-disabled="form1.$invalid || saving" ng-click="save_change()">确定</button>
                    <button class="btn btn-warning" ng-click="$dismiss()" @click="lbClosedialog($event)">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'change_branch',
    data() {
        let localdata = {
            'form': {
                'change_branch_ob_id': ''
            }
        }
        return {
            localdata,
        }
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>