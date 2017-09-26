export default {
    'pageName': 'beingrepairedAdd',
    'pageLable': '维修物品',
    'form': {
        'room_number': '',
        'repair_name': '',
        'tel_phone': '',
        'datetime': '',
        'repair_content': '',
        'repair_status': '',
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
            'prop': 'repair_name',
            'field': 'repair_name'
        },
        {
            'type': 'input',
            'label': '电话号码',
            'prop': 'tel_phone',
            'field': 'tel_phone'
        },
        {
            'type': 'input',
            'label': '日期',
            'prop': '',
            'field': 'datetime',
        },
        {
            'type': 'input',
            'label': '内容',
            'prop': '',
            'field': 'repair_content',
        },
        {
            'type': 'option',
            'label': '状态',
            'prop': '',
            'field': 'repair_status',
            'optionData': [{
                value: '受理中',
                label: '受理中'
            }, {
                value: '已完成',
                label: '已完成'
            }, {
                value: '已取消',
                label: '已取消'
            }],
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
            telephone_number: [{ required: true, validator: vm.validateTel, trigger: 'change' }],

        }
    },
}