export default {
    'pageName': 'useingEmployeeAdd',
    'pageLable': '工作人员',
    'form': {
        'department': '',
        'employee_name': '',
        'tel_number': '',
        'position': '',
        'note': '',
    },
    'formField': [
        {
            'type': 'input',
            'label': '部门',
            'prop': 'department',
            'field': 'department',
        },
        {
            'type': 'input',
            'label': '姓名',
            'prop': 'employee_name',
            'field': 'employee_name'
        },
        {
            'type': 'input',
            'label': '联系方式',
            'prop': 'telephone_number',
            'field': 'telephone_number'
        },
        {
            'type': 'input',
            'label': '职务',
            'prop': 'position',
            'field': 'position'
        },
        {
            'type': 'input',
            'label': 'openId',
            'prop': '',
            'field': 'wxopen_id'
        },
        {
            'type': 'input',
            'label': '备注',
            'prop': '',
            'field': 'note',
        }
    ],
    'pageTable': 'employee',
    'pageTemplate': 'employee',
    'pagePath': '',
    rulesData(vm) {
        return {
            department: [
                { required: true, message: '请输入部门', trigger: 'blur' },
            ],
            employee_name: [
                { required: true, message: '请输入名字', trigger: 'blur' },
            ],
            tel_number: [
                { required: true, validator: vm.validateTel, trigger: 'change' }
            ],
            position: [
                { required: true, message: '请输入职务', trigger: 'blur' },
            ],
        }
    }
}
