<template>
    <div class="modal-dialog" ng-class="{'modal-sm': size == 'sm', 'modal-lg': size == 'lg','modal-full':size == 'full'}">
        <div class="modal-content" modal-transclude>
            <div page-controller="change_class" >
                <div class="modal-header">
                    <button class="close" type="button" ng-click="$dismiss()" @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="fa fa-exchange">办理转班</i>
                        <span class="label bg-info">(李哥)</span>
                    </h3>
                </div>
                <div class="modal-body">
                    <div class="panel panel-default">
                        <div class="panel-heading">转出班级</div>
                        <ul class="list-group" ng-if="class_rest.$loaded && class_rest.$list.length > 0">
                            <li class="list-group-item active" ng-class="{'active':item.lesson_type == occ.lesson_type && item.oc_id == occ.from_oc_id}" ng-click="select_from_class(item)" ng-repeat="item in class_rest.$list">
                                <i class="fa fa-angle-right"></i>3期班
                                <span class="badge bg-info" tooltip="剩余课次">62</span>
                            </li>
                        </ul>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">转入班级</div>
                        <div class="panel-body">
                            <div class="form-group" ng-if="occ.from_oc_id != 0 && occ.lesson_type == 0">
                                <div class="input-group">
                                    <input type="text" placeholder="班级" class="form-control   ng-invalid ng-invalid-required -parse" ng-readonly="true" required readonly="readonly" v-model="localdata.form.occ_selected_class_name">
                                    <span class="input-group-btn">
                                        <button ng-disabled="occ.from_oc_id == 0" class="btn btn-default" select-tpl="tpl/directive/selectClassTpl.html" select-id-field="oc_id" max-num="1" on-selected="select_to_class" select-params="{ob_id:user.gv.ob_id,t:'order'}" select-title="请选择班级" @click="lbShowdialog($event,'lb-selectclasstpl')">
                                            <i class="fa fa-flag"></i>选择班级
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" ng-disabled="form_invalid() || saving" ng-click="do_ok()" disabled="disabled">确认转班</button>
                    <button class="btn btn-warning" ng-click="$dismiss()" @click="lbClosedialog($event)">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'change_class',
    data() {
        let localdata = {
            'form': {
                'occ_selected_class_name': ''
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