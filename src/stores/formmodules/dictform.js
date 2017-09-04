export default {
    'pageName': 'dictionary',
    'pageLable': '数据字典',
    'form': {
        'type': '0',
        'text': '默认',
        'sort': '100',
        'defvalue': false
    },
    'mounted': function (vm) {
        if (vm.$store.state.dialogs.dailogdata) {
            vm.localdata.form.type = vm.$store.state.dialogs.dailogdata.type
        }
    },
    'formField': [
        {
            'type': 'input',
            'label': '内容',
            'prop': 'text',
            'field': 'text'
        },
        {
            'type': 'input',
            'label': '排序',
            'prop': '',
            'field': 'sort'
        },
        {
            'type': 'switch',
            'label': '默认',
            'prop': '',
            'field': 'defvalue'
        }
    ],
    'pageTable': 'dictionary',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        text: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
    }
}