export default {
    'pageName': 'hoursteacher',
    'pageLable': '教师课耗',
    'tableSearch': [
        {
            'localField': 'student_id',
            'from': 'student',
            'foreignField': '_id',
            'as': 'student'
        },
        {
            'localField': 'coursescheduling_id',
            'from': 'coursescheduling',
            'foreignField': '_id',
            'as': 'coursescheduling'
        },
        {
            'localField': 'classes_id',
            'from': 'classes',
            'foreignField': '_id',
            'as': 'classes'
        },
        {
            'localField': 'teacher_id',
            'from': 'employee',
            'foreignField': '_id',
            'as': 'employee'
        },
        {
            'key': 'course_id',
            'value': '$classes',
            'type': 'unwind'
        },
        {
            'localField': 'classes.course_id',
            'from': 'course',
            'foreignField': '_id',
            'as': 'course'
        },
    ],
    'pageSearch': [
        {
            'type': 'selectSearch',
            'searchfunction': function (form) {
                let filterObj = []
                let searchValue = form + ''
                if (searchValue.length > 0) {
                    filterObj.push({
                        'key': 'teacher_name',
                        'value': searchValue,
                        'type': ''
                    })
                }
                return filterObj
            },
            'fields': [
                {
                    'text': '请选择老师',
                    'showdialog': 'selectteacherdialog',
                    'search': 'teacher_name'
                }
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'tabletext',
            'label': '老师',
            'prop': 'name',
            'table': 'employee'
        },
        {
            'type': 'subtext',
            'label': '班级',
            'prop': 'classes',
            'subprop': 'class_name'
        },
        {
            'type': 'tabledatetime',
            'label': '上课时间',
            'table': 'coursescheduling',
            'prop': 'start'
        },
        {
            'type': 'tabletext',
            'label': '时长',
            'table': 'course',
            'prop': 'unit_hours'
        },
        {
            'type': 'substatus',
            'label': '类型',
            'prop': 'course',
            'subprop': 'lesson_type'
        },
        {
            'type': 'tabletext',
            'label': '课程金额',
            'prop': 'unit_price',
            'table': 'course'
        }
    ],
    'pageTable': 'attendance',
    'pageTemplate': 'table',
    'pagePath': ''
}