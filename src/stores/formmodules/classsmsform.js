export default {
    'pageName': 'classsmsform',
    'pageLable': '群发短信',
    'student': true,
    'form': {
        'content': '',
        'fixed_time': '',
        'student_id': ''
    },
    'formField': [
        {
            'type': 'textarea',
            'label': '发送内容',
            'prop': 'content',
            'field': 'content'
        },
        {
            'type': 'switchdatetime',
            'label': '定时发送',
            'prop': '',
            'field': 'fixed_time',
            'fieldActive': false,
            'datetype': 'datetime',
        }
    ],
    'pageTable': 'recording',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        content: [
            { required: true, message: '请输入发送内容', trigger: 'blur' },
            { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]
    }
}