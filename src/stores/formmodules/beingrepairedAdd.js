export default {
    'pageName': 'beingrepairedAdd',
    'pageLable': '维修物品',
    'form': {
        'room_number': '',
        'owner_name': '',
        'telephone_number': '',
        'time': '',
        'content': '',
        'image': '',
        'status': '',
        'stype': '',
    },
    'formField': [{
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
            'type': 'datetime',
            'label': '日期',
            'prop': '',
            'field': 'time',
            'datetype': 'date',
        },
        {
            'type': 'input',
            'label': '内容',
            'prop': '',
            'field': 'content',
        },
        {
            'type': 'input',
            'label': '图片',
            'prop': '',
            'field': 'image',
        },
        {
            'type': 'input',
            'label': '状态',
            'prop': '',
            'field': 'status',
        }, {
            'type': 'input',
            'label': '类别',
            'prop': '',
            'field': 'stype',
        }
    ],
    'pageTable': 'service',
    'pageTemplate': 'service',
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