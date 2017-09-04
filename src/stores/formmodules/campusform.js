export default {
    'pageName': 'campusform',
    'pageLable': '校区',
    'form': {
        'group_name': '',
        'branch_name': '',
        'short_name': '',
        'branch_tel': '',
        'city': '',
        'branch_address': ''
    },
    'formField': [
        {
            'type': 'input',
            'label': '校区名',
            'prop': 'branch_name',
            'field': 'branch_name'
        },
        {
            'type': 'input',
            'label': '校区简称',
            'prop': '',
            'field': 'short_name'
        },
        {
            'type': 'input',
            'label': '联系电话',
            'prop': '',
            'field': 'branch_tel'
        },
        {
            'type': 'input',
            'label': '所在地区',
            'prop': '',
            'field': 'group_name'
        },
        {
            'type': 'input',
            'label': '详细地址',
            'prop': '',
            'field': 'address'
        }
    ],
    'pageTable': 'campus',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        branch_name: [
            { required: true, message: '请输入校区名', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
    }
}