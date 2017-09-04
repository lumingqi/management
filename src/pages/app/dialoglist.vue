<template>
    <div v-if="modalShow" class='definitely'>
        <div class="modal-backdrop" :style="{'z-index':(getDialog.length-1)*2+1500-1}">
        </div>
        <template v-for="item,index in getDialog">
            <lb-dialog :zindex="index*2+1500">
                <template v-if="getDialogMoudle(item,index)==1">
                    <lb-systemdialogmmodule :module="moduleObj[index]">
                    </lb-systemdialogmmodule>
                </template>
                <template v-else-if="getDialogMoudle(item,index)==2">
                    <lb-systemdialogmmodulestep :module="moduleObj[index]">
                    </lb-systemdialogmmodulestep>
                </template>
                <template v-else>
                    <component v-bind:is="item"></component>
                </template>
            </lb-dialog>
        </template>
    </div>
</template>
<style>
.definitely {
    position: fixed;
    top: 20%;
    left: 30%;
    z-index: 1500;
}
</style>

<script>
import dialogpages from '~/stores/dialogpages.js'
import module from '~/stores/moduledialog.js'
import moduleform from '~/stores/moduleform.js'
import modulestep from '~/stores/modulestep.js'
import dialog from './dialog.vue'
import systemdialogmmodule from '~/pages/dialogs/system/module.vue'
import systemdialogmmodulestep from '~/pages/dialogs/system/modulestep.vue'

dialogpages['lb-dialog'] = dialog
dialogpages['lb-systemdialogmmodule'] = systemdialogmmodule
dialogpages['lb-systemdialogmmodulestep'] = systemdialogmmodulestep

export default {
    name: 'dialog',
    data() {
        let localdata = {}
        return {
            localdata,
            moduleObj: {}
        }
    },
    components: dialogpages,
    computed: {
        modalShow() {
            return this.$store.state.dialogs.modalbackdrop
        },
        getDialog() {
            return this.$store.state.dialogs.dailoglist
        }
    },
    methods: {
        getDialogMoudle(item, index) {
            console.log(item)
            let isModlues = 0
            if (!this.$store.state.models.login) {
                this.$store.state.system.router = 'lb-systemsign_in'
            } else if (this.$store.state.system.name.length == 0) {
                this.$store.state.system.router = 'lb-systemsign_in'
            } else {
                let to = item
                if (to) {
                    let tomodule = to.replace(/\//g, '')
                    if (module[tomodule]) {
                        let moduleObj = module[tomodule]
                        moduleObj._type = 0
                        this.moduleObj[index] = moduleObj
                        isModlues = 1
                    } else if (moduleform[tomodule]) {
                        let moduleObj = moduleform[tomodule]
                        moduleObj._type = 1
                        this.moduleObj[index] = moduleObj
                        isModlues = 1
                    }
                    else if (modulestep[tomodule]) {
                        let moduleObj = modulestep[tomodule]
                        moduleObj._type = 2
                        this.moduleObj[index] = moduleObj
                        isModlues = 2
                    }
                }
            }
            return isModlues
        }
    }
}
</script>