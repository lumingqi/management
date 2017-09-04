<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" @click="lbClosedialog()">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">关闭</span>
                </button>
                <h3 class="modal-title">
                    {{title}}</h3>
            </div>
            <div class="modal-body">
                <template v-if="module._type==0">
                    <lb-systemmodule :module="module" :info="true" @tablechange="dialogData"></lb-systemmodule>
                </template>
                <template v-if="module._type==1">
                    <lb-dialogmmoduleform ref="ruleForm" :module="module" :form="form"></lb-dialogmmoduleform>
                </template>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click="handleOk" v-if="module.look?false:true">确定</button>
                <button class="btn btn-warning m-l-xs" @click="lbClosedialog()">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
import systemmodule from '~/pages/views/system/module.vue'
import dialogmmoduleform from './moduleform.vue'

export default {
    name: 'dialogmodule',
    props: ['module'],
    data() {
        return {
            currentRow: null,
            currDialog: '',
            id: '',
            formtype: false,
            form: null
        }
    },
    created() {
        if (this.$store.state.dialogs.dailogdata) {
            if (this.module.student) {
            } else {
                if (this.$store.state.dialogs.dailogdata['_id']) {
                    this.id = this.$store.state.dialogs.dailogdata['_id']
                    this.formtype = true
                    this.form = JSON.parse(JSON.stringify(this.$store.state.dialogs.dailogdata))
                }
            }
        }
    },
    components: { 'lb-systemmodule': systemmodule, 'lb-dialogmmoduleform': dialogmmoduleform },
    computed: {
        title() {
            let text = this.module.pageLable
            if (this.module._type == 0) {
                if (this.module.student) {
                    text = this.getStudentName() + '学员' + this.module.pageLable
                }
            }
            if (this.module._type == 1) {
                if (this.module.student) {
                    text = this.getStudentName() + '学员' + this.module.pageLable
                } else {
                    let formtitle = ''
                    if (this.module.look) {
                    } else {
                        formtitle = '新建'
                        if (this.formtype) {
                            formtitle = '编辑'
                        }
                    }
                    text = formtitle + this.module.pageLable
                }
            }
            return text
        }
    },
    methods: {
        dialogData(val) {
            this.currentRow = val.row
            this.currDialog = val.dialog
        },
        selectmodule() {
            this.lbClosedialog()
            this.$store.state.envs.currDialogResult = this.currentRow
            if (this.currentRow) {
                this.$store.state.envs.currDialog = this.currDialog
            } else {
                this.$store.state.envs.currDialog = this.module.dialogUrl
            }
        },
        appendmodule() {
            this.$refs['ruleForm'].append().then(() => {
                this.lbClosedialog()
                this.$store.state.dialogs.dailogdata = null
                this.$store.state.envs.currDialog = 'moduleform'
            })
        },
        editmodule(id) {
            this.$refs['ruleForm'].append(id).then(() => {
                this.lbClosedialog()
                this.$store.state.dialogs.dailogdata = null
                this.$store.state.envs.currDialog = 'moduleform'
            })
        },
        appendarrage(id) {
            this.$refs['ruleForm'].appendarrage()
        },
        handleOk() {
            if (this.module._type == 0) {
                this.selectmodule()
            }
            if (this.module._type == 1) {
                if (this.module.pageName == 'arrangeform' || this.module.pageName == 'arrangeeditform') {
                    this.appendarrage()
                } else {
                    if (this.id.length > 0) {
                        this.editmodule(this.id)
                    } else {
                        this.appendmodule()
                    }
                }
            }
        }
    }
}
</script>
