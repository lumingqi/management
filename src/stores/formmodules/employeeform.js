export default {
    'pageName': 'employeeform',
    'pageLable': '员工',
    'form': {
        'name': '',
        'sex': '0',
        'roles_id': [],
        'is_part_time': '0',
        'tel': '',
        'email': '',
        'lock': false,
        'birth': ''
    },
    'formField': [
        {
            'type': 'input',
            'label': '姓名',
            'prop': 'name',
            'field': 'name'
        },
        {
            'type': 'input',
            'label': '账号(手机)',
            'prop': 'tel',
            'field': 'tel'
        },
        {
            'type': 'input',
            'label': 'Email',
            'prop': '',
            'field': 'email'
        },
        {
            'type': 'option',
            'label': '角色',
            'prop': '',
            'field': 'roles_id',
        },
        {
            'type': 'datetime',
            'label': '出生日期',
            'prop': '',
            'field': 'birth',
            'datetype': 'date',
        },
        {
            'type': 'radiogroup',
            'label': '性别',
            'prop': '',
            'field': 'sex',
            'labels': [
                { 'label': '男' },
                { 'label': '女' }
            ]
        },
        {
            'type': 'radiogroup',
            'label': '类型',
            'prop': '',
            'field': 'is_part_time',
            'labels': [
                { 'label': '全职' },
                { 'label': '兼职' }
            ]
        }
    ],
    'pageTable': 'employee',
    'pageTemplate': 'form',
    'pagePath': '',
    mounted(vm) {
        vm.getTableApidata('role')
    },
    rulesData(vm) {
        return {
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 1, max: 256, message: '长度在 1 到 256个字符', trigger: 'blur' }
            ],
            tel: [
                { validator: vm.validateTel, required: true, trigger: 'blur' }
            ],
        }
    }
}