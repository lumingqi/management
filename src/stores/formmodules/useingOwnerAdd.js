export default {
    'pageName': 'useingOwnerAdd',
    'pageLable': '业主',
    'form': {
        'room_number': '',
        'owner_name': '',
        'wxopen_id':'',
        'telephone_number': '',
        'note': '',
    },
    'formField': [
        {
            'type': 'input',
            'label': '房号',
            'prop': 'room_number',
            'field': 'room_number',
        },
        {
            'type': 'input',
            'label': '姓名',
            'prop': 'owner_name',
            'field': 'owner_name'
        },
        {
            'type': 'input',
            'label': '电话号码',
            'prop': 'telephone_number',
            'field': 'telephone_number'
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
    'pageTable': 'owner',
    'pageTemplate': 'owner',
    'pagePath': '',
    rulesData(vm) {
        return {
            room_number: [
                { required: true, message: '请输入房号', trigger: 'blur' },
            ],
            owner_name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            telephone_number: [{ required: true, validator: vm.validateTel, trigger: 'change' }]
        }
    }
}
