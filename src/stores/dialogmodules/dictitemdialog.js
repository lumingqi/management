export default {
    'pageName': 'dictitemdialog',
    'pageLable': ' 字典项目',
    'tableSearch': [],
    'created': function (vm) {
        if (vm.$store.state.dialogs.dailogdata) {
            let type = vm.$store.state.dialogs.dailogdata.type
            vm.deffilterObj.push({
                'key': 'type',
                'value': type,
                'type': ''
            })
        }
    },
    'getOpenDialogData': function (vm) {
        let data = {}
        if (vm.$store.state.dialogs.dailogdata) {
            data = vm.$store.state.dialogs.dailogdata
        }
        console.log(data)
        return data
    },
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '内容',
                    'defvalue': '',
                    'default': true,
                    'value': 'text'
                },
                {
                    'label': '排序',
                    'defvalue': '',
                    'default': true,
                    'value': 'sort'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '新增',
                    'type': 'success',
                    'showdialog': 'dictform',
                    'actionoption': 'dictform',
                },
            ]
        },
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
            'prop': 'setting'
        },
        {
            'type': 'text',
            'label': '内容',
            'prop': 'text'
        },
        {
            'type': 'text',
            'label': '排序',
            'prop': 'sort',
        },
        {
            'type': 'checkstatus',
            'statutype': 'defvaluestatus',
            'label': '状态',
        }
    ],
    'pageTable': 'dictionary',
    'pageTemplate': 'table1',
    'pagePath': ''
}