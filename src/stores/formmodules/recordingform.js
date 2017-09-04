export default {
    'pageName': 'recordingform',
    'pageLable': '赛事记录',
    'student': true,
    'form': {
        'match_name': '',
        'join_date': '',
        'result': '',
        'info': '',
        'student_id': ''
    },
    'formField': [
        {
            'type': 'input',
            'label': '赛事名称',
            'prop': 'match_name',
            'field': 'match_name'
        },
        {
            'type': 'datetime',
            'label': '参赛日期',
            'prop': 'join_date',
            'field': 'join_date',
            'datetype': 'date',
        },
        {
            'type': 'input',
            'label': '赛事成绩',
            'prop': 'result',
            'field': 'result'
        },
        {
            'type': 'textarea',
            'label': '赛事详情记录',
            'prop': 'info',
            'field': 'info'
        }
    ],
    'pageTable': 'recording',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        match_name: [
            { required: true, message: '请输入赛事名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
        join_date: [
            { type: 'date', required: true, message: '请输入日期', trigger: 'blur' }
        ],
        result: [
            { required: true, message: '请输入赛事成绩', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ]
    }
}