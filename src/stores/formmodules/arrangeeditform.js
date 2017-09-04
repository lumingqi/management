export default {
    'pageName': 'arrangeeditform',
    'pageLable': '编辑排课',
    'form': {
        day_1: false,
        day_2: false,
        day_3: false,
        day_4: false,
        day_5: false,
        day_6: false,
        day_0: false,
        dayloop: false,
        daterange1: '',
        daterange2: '',
        classes_id: '',
        sclasses_id: '',
        teacher_id: '',
        timerange: [new Date(), new Date()]
    },
    'formField': [
        {
            'type': 'selectSearch',
            'label': '授课老师',
            'prop': 'teacher_id',
            'field': 'teacher_id',
            'text': '请选择老师',
            'showdialog': 'selectteacherdialog',
            'search': 'name',
            'table': 'employee'
        },
        {
            'type': 'selectSearch',
            'label': '班级',
            'prop': 'classes_id',
            'field': 'classes_id',
            'text': '请选择',
            'showdialog': 'selectclassesdialog',
            'search': 'class_name',
            'table': 'classes'
        },
        {
            'type': 'selectSearch',
            'label': '上课教室',
            'prop': 'sclasses_id',
            'field': 'sclasses_id',
            'text': '请选择课程',
            'showdialog': 'selectsclassesdialog',
            'search': 'class_name',
            'table': 'sclasses'
        },
        {
            'type': 'datetime',
            'label': '开始日期',
            'prop': 'daterange1',
            'field': 'daterange1',
            'datetype': 'date',
        },
        {
            'type': 'timetype',
            'label': '上课时间',
            'prop': '',
            'field': 'timerange',
        }
    ],
    'pageTable': 'arrange',
    'pageTemplate': 'form',
    'pagePath': '',
    rulesData(vm) {
        return {
            teacher_id: [
                { required: true, message: '请选择老师', trigger: 'change' }
            ],
            classes_id: [
                { required: true, message: '请选择班级', trigger: 'change' }
            ],
            sclasses_id: [
                { required: true, message: '请选择教室', trigger: 'change' }
            ],
            daterange1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
            ]
        }
    }
}