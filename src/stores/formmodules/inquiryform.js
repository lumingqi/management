export default {
    'pageName': 'inquiryform',
    'pageLable': '回访记录',
    'student': true,
    'form': {
        'track_type': '0',
        'track_way': '',
        'track_time': '',
        'next_time': '',
        'active': false,
        'detail': '',
        'student_id': ''
    },
    'formField': [
        {
            'type': 'radiogroup',
            'label': '类型',
            'prop': 'track_type',
            'field': 'track_type',
            'labels': [
                { 'label': '售前' },
                { 'label': '售后' }
            ]
        },
        {
            'type': 'inputselect',
            'label': '沟通方式',
            'prop': 'track_way',
            'field': 'track_way',
            data(vm) {
                return vm.getDictData('4')
            }
        },
        {
            'type': 'input',
            'label': '接洽人',
            'prop': 'op_name',
            'field': 'op_name'
        },
        {
            'type': 'datetime',
            'label': '沟通日期',
            'prop': 'track_time',
            'field': 'track_time',
            'datetype': 'datetime',
        },
        {
            'type': 'textarea',
            'label': '沟通内容',
            'prop': '',
            'field': 'detail'
        },
        {
            'type': 'switchdatetime',
            'label': '下次回访提醒',
            'prop': '',
            'field': 'next_time',
            'fieldActive': false,
            'datetype': 'datetime',
        }
    ],
    'pageTable': 'inquiry',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        track_way: [
            { required: true, message: '请选择沟通方式', trigger: 'change' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
        detail: [
            { required: true, message: '请输入沟通内容', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
        op_name: [
            { required: true, message: '请输入接洽人名字', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
        track_time: [
            { type: 'date', required: true, message: '请输入日期', trigger: 'blur' }
        ],
    }
}