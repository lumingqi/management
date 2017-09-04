export default {
    'pageName': 'rolesform',
    'pageLable': '权限',
    'form': {
        'name': '',
        'desc': '',
    },
    'formField': [
        {
            'type': 'input',
            'label': '角色名称',
            'prop': 'name',
            'field': 'name'
        },
        {
            'type': 'input',
            'label': '角色描述',
            'prop': '',
            'field': 'desc'
        },
        {
            'type': 'switch',
            'label': '默认角色',
            'prop': '',
            'field': 'defrole'
        }
    ],
    'pageTable': 'role',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
    }
}