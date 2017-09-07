export default {
    'pageName': 'opinionAdd',
    'pageLable': '维修意见',
    'form': {
        'room_number': '',
        'owner_name': '',
        'telephone_number': '',
        'time': '',
        'content': '',
        'decision': '',
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
            'type': 'option',
            'label': '选择',
            'prop': '',
            'field': 'decision',
            'optionData': [{
                value: 'yes',
                label: '同意'
            }, {
                value: 'no',
                label: '不同意'
            }]
        }
    ],
    'pageTable': 'vote',
    'pageTemplate': 'vote',
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