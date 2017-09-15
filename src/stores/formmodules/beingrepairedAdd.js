export default {
    'pageName': 'beingrepairedAdd',
    'pageLable': '维修物品',
    'form': {
        'room_number': '',
        'owner_name': '',
        'tel_number': '',
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
            'prop': 'tel_number',
            'field': 'tel_number'
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
            'type': 'option',
            'label': '状态',
            'prop': '',
            'field': 'stype',
            'optionData': [{
                value: 'wks',
                label: '未开始'
            }, {
                value: 'jxz',
                label: '进行中'
            }, {
                value: 'yjj',
                label: '已解决'
            }],
        }, {
            'type': 'option',
            'label': '类别',
            'prop': '',
            'field': 'status',
            'optionData': [{
                value: 'wks',
                label: '灯类'
            }, {
                value: 'jxz',
                label: '电器类'
            }, {
                value: 'yjj',
                label: '通讯类'
            }]

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