export default {
    'pageName': 'salaryRecord',
    'pageLable': '考勤记录',
    'tableSearch': [
        {
            'localField': 'teacher_id',
            'from': 'employee',
            'foreignField': '_id',
            'as': 'employee'
        }, {
            'localField': 'classes_id',
            'from': 'classes',
            'foreignField': '_id',
            'as': 'classes'
        }, {
            'localField': 'arrange_id',
            'from': 'arrange',
            'foreignField': '_id',
            'as': 'arrange'
        }, {
            'localField': 'student_id',
            'from': 'student',
            'foreignField': '_id',
            'as': 'student'
        }],
    'pageSearch': [],
    'pageTableField': [
        {
            'type': 'tabletext',
            'label': '班级',
            'table': 'classes',
            'prop': 'class_name'
        },
        {
            'type': 'tabletext',
            'label': '上课老师',
            'table': 'employee',
            'prop': 'name'
        },
        {
            'type': 'datetime',
            'label': '考勤时间',
            'prop': 'arrangestart'
        },
        {
            'type': 'constant',
            'label': '出勤状态',
            'prop': '正常出勤'
        }
    ],
    'pageTable': 'attendance',
    'pageTemplate': 'table1',
    'pagePath': ''
}