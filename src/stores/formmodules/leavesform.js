export default {
    'pageName': 'leavesform',
    'pageLable': '请假',
    'student': true,
    'form': {
        reason: '',
        daterange1: '',
        daterange2: '',
        student_id: ''
    },
    'formField': [{
        'type': 'datetime',
        'label': '请假开始',
        'prop': 'daterange1',
        'field': 'daterange1',
        'datetype': 'date',
    },
    {
        'type': 'datetime',
        'label': '请假结束',
        'prop': 'daterange2',
        'field': 'daterange2',
        'datetype': 'date',
    },
    {
        'type': 'textarea',
        'label': '请假原因',
        'prop': '',
        'field': 'reason'
    }
    ],
    'pageTable': 'leaves',
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