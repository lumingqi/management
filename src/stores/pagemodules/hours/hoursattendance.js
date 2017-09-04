export default {
    'pageName': 'hoursattendance',
    'pageLable': '考勤',
    'tableSearch': [
        {
            'localField': 'teacher_id',
            'from': 'employee',
            'foreignField': '_id',
            'as': 'employee'
        }, {
            'localField': '_id',
            'from': 'order',
            'foreignField': 'classes_id',
            'as': 'order'
        }],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '班级名称',
                    'defvalue': '',
                    'default': true,
                    'value': 'class_name'
                },
                {
                    'label': '老师姓名',
                    'defvalue': '',
                    'default': false,
                    'value': 'employee.name'
                }
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
            'prop': 'setting',
            'fields': []
        },
        {
            'type': 'text',
            'label': '班级',
            'prop': 'class_name',
        },
        {
            'type': 'tabletext',
            'label': ' 教师',
            'table': 'employee',
            'prop': 'name',
        },
        {
            'type': 'textScale',
            'label': ' 已报人数',
            'prop1': 'order',
            'prop2': 'max_student_num',
        },
        {
            'type': 'constant',
            'label': ' 上课次数',
            'prop': '5/10',
        },
    ],
    'pageTable': 'classes',
    'pageTemplate': 'table1',
    'pagePath': ''
}