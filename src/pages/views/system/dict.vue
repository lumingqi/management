<template>
    <div class="panel panel-default">
        <div class="panel-heading">字典列表</div>
        <ul class="list-group">
            <li class="list-group-item clear" v-for="(item, index) in localdata.dict">
                <h6 class="list-group-item-head text-danger" style="font-size:16px;">{{item.text}}
                    <span class="pull-right">
                        <template v-if="getActionOption('systememdictedit')">
                            <a @click="handleShowDialog('dictitemdialog',item)">编辑</a>
                            <!-- lb-dictitems -->
                        </template>
                    </span>
                </h6>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'dict',
    data() {
        let localdata = {
            'dict': [{
                'type': '1',
                'text': '联系人关系'
            }, {
                'type': '2',
                'text': '收款方式'
            }, {
                'type': '3',
                'text': '学员来源'
            }, {
                'type': '4',
                'text': '沟通方式'
            }, {
                'type': '5',
                'text': '杂费项目'
            }, {
                'type': '6',
                'text': '意向程度'
            }, {
                'type': '7',
                'text': '收入类别'
            }, {
                'type': '8',
                'text': '支出类别'
            },]
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
