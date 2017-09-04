export default {
    'pageName': 'suspendform',
    'pageLable': '停课',
    'student': true,
    'form': {
        reason: '',
        daterange1: '',
        daterange2: '',
        student_id: ''
    },
    'formField': [{
        'type': 'datetime',
        'label': '停课开始',
        'prop': 'daterange1',
        'field': 'daterange1',
        'datetype': 'date',
    },
    {
        'type': 'datetime',
        'label': '停课结束',
        'prop': 'daterange2',
        'field': 'daterange2',
        'datetype': 'date',
    },
    {
        'type': 'textarea',
        'label': '停课原因',
        'prop': '',
        'field': 'reason'
    }
    ],
    'pageTable': 'suspend',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        daterange1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ],
        daterange2: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ]
    }
}