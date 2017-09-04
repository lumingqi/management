export default {
    'pageName': 'classesform',
    'pageLable': '班级',
    'form': {
        'class_name': '',
        'course_id': '',
        'open_time': '',
        'close_time': '',
        'max_student_num': 0,
        'teacher_id': '',
        'del_able': false,
        'class_flag': 0
    },
    'formField': [
         {
            'type': 'selectSearch',
            'label': '课程',
            'prop': 'course_id',
            'field': 'course_id',
            'text': '请选择课程',
            'showdialog': 'selectlessondialog',
            'search': 'lesson_name',
            'table':'course'
        },
        {
            'type': 'selectSearch',
            'label': '老师',
            'prop': 'teacher_id',
            'field': 'teacher_id',
            'text': '请选择老师',
            'showdialog': 'selectteacherdialog',
            'search': 'name',
            'table':'employee'
        },
        {
            'type': 'input',
            'label': '班级名称',
            'prop': 'class_name',
            'field': 'class_name'
        },
        {
            'type': 'datetime',
            'label': '开课日期',
            'prop': '',
            'field': 'open_time',
            'datetype': 'date',
        },
        {
            'type': 'datetime',
            'label': '预计结课',
            'prop': '',
            'field': 'close_time',
            'datetype': 'date',
        },
        {
            'type': 'numberinput',
            'label': '额定人数',
            'prop': '',
            'field': 'max_student_num',
            'text': '人'
        }
    ],
    'pageTable': 'classes',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        teacher_id: [
            { required: true, message: '请选择授课老师', trigger: 'blur' }
        ],
        course_id: [
            { required: true, message: '请输入课程', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ],
        class_name: [
            { required: true, message: '请班级名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
        ]
    }
}
