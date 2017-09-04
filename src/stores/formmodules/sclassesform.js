export default {
    'pageName': 'sclassesform',
    'pageLable': '教室',
    'form': {
        'class_name': '',
        'max_student_num': 0
    },
    'formField': [
        {
            'type': 'input',
            'label': '教室名称',
            'prop': 'class_name',
            'field': 'class_name'
        },
        {
            'type': 'numberinput',
            'label': '最大人数',
            'text': '人',
            'prop': '',
            'field': 'max_student_num'
        }
    ],
    'pageTable': 'sclasses',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        class_name: [
            { required: true, message: '请输入教室名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
    }
}