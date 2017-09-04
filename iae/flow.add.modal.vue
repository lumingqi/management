<template>
    <div class="modal-dialog">
        <div class="modal-content" modal-transclude>
            <div page-controller="flow_add">
                <div class="modal-header">
                    <button class="close" type="button" @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="fa fa-money">记账</i>
                    </h3>
                </div>
                <div class="modal-body">
                    <form name="form1" class="form-horizontal ">
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">
                                <span class="text-danger">*</span>类型
                            </label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <lb-buttongroup :group-data="localdata.type" v-model="localdata.form.type"></lb-buttongroup>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">
                                <span class="text-danger">*</span>金额
                            </label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <div class="input-group w-sm">
                                    <lb-numberinput type="number" name="amount" class="form-control " required v-model="localdata.form.amount">
                                    </lb-numberinput>
                                    <span class="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">所属分类</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <el-select v-model="localdata.form.sel" placeholder="请选择">
                                    <el-option v-for="item in getDictData(getNum)" :key="item._id" :label="item.text" :value="item._id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">备注</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <div class="input-group">
                                    <input type="text" name="note" class="form-control" v-model="localdata.form.note">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label" :class="changeSelectTeacher">经办人</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <div class="inline w">
                                    <div class="input-group">
                                        <input type="text" class="form-control" readonly v-model="teacher_name">
                                        <span class="input-group-btn">
                                            <button class="btn btn-default" @click="lbShowdialog($event,'lb-selectteachertpl')">
                                                <i class="fa fa-user"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">日期</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <div class="inline">
                                    <el-date-picker type="datetime" v-model="localdata.form.create_time"></el-date-picker>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="handleClick">确定</button>
                    <button class="btn btn-warning" @click="lbClosedialog($event)">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'flow',
    data() {
        let localdata = {
            'type': [{
                'value': '0',
                'text': '支出'
            }, {
                'value': '1',
                'text': '收入'
            }],
            'form': {
                'type': '0',
                'amount': '',
                'odi_id': '',
                'sel': '',
                'note': '',
                'teacher_id': this.$store.state.system.id,
                'create_time': new Date(),
                'check_status': 0,
            },
            'validator': {
                'type': 'object',
                'errorStatus': false,
                'additional': true,
                'fields': {
                    'create_time': {
                        'type': 'date',
                    }
                }
            },
        }
        return {
            localdata,
            model: 'flow',
            teacher_name: this.$store.state.system.name,
        }
    },
    computed: {
        getNum() {
            let Num = ''
            if (this.localdata.form.type == '0') {
                Num = '7'
            } else {
                Num = '8'
            }
            return Num
        },
        changeSelectTeacher() {
            let result = false
            if (this.$store.state.envs.currDialog == 'lb-selectteachertpl') {
                if (this.$store.state.envs.currDialogResult) {
                    this.teacher_name = this.$store.state.envs.currDialogResult.name
                    this.localdata.form.teacher_id = this.$store.state.envs.currDialogResult._id
                } else {
                    this.teacher_name = '请选择老师'
                    this.localdata.form.teacher_id = ''
                }

                result = true
            }
            return result
        },
    },
    watch: {},
    methods: {
        handleClick() {
            //判定
            if (this.localdata.form.amount && this.localdata.form.sel && this.teacher_name!='luban') {
                this.handleSave().then(() => {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                    this.lbClosedialog()
                    this.$store.state.envs.currDialog = 'lb-flow'
                })
            } else {
                this.$message({
                    message: '请将表单填写完整!',
                    type: 'warning'

                })
            }

        },
    }
}
</script>
