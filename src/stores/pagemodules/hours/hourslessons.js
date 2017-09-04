export default {
    'pageName': 'hourslessons',
    'pageLable': '排课',
    'tableSearch': [{
        'localField': 'course_id',
        'from': 'course',
        'foreignField': '_id',
        'as': 'course'
    }, {
        'localField': 'teacher_id',
        'from': 'employee',
        'foreignField': '_id',
        'as': 'employee'
    }],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '班级名',
                    'defvalue': '',
                    'default': true,
                    'value': 'class_name'
                },
                {
                    'label': '老师姓名',
                    'defvalue': '',
                    'default': true,
                    'value': 'employee.name'
                }
            ]
        },
        {
            'type': 'radioGroupSearch',
            'fields': [
                {
                    'labels': [
                        { 'label': '未排课' },
                        { 'label': '部分排课' },
                        { 'label': '已排课' },
                    ]
                }
            ]
        },
        {
            'type': 'selectSearch',
            'searchfunction': function (form) {
                let filterObj = []
                let searchValue = form + ''
                if (searchValue.length > 0) {
                    filterObj.push({
                        'key': 'course_id',
                        'value': searchValue,
                        'type': ''
                    })
                }
                return filterObj
            },
            'fields': [
                {
                    'text': '请选择课程',
                    'showdialog': 'selectlessondialog',
                    'search': 'lesson_name'
                }
            ]
        }
    ],
    pageTableOperation:false,
    pageTableCheck:true,
    'pageTableField': [
        {
            'type': 'lessonrouter',
            'label': '排课',
            'prop': '/hours/lessonsdetail'
        },
        {
            'type': 'text',
            'label': '班级',
            'prop': 'class_name',
        },
        {
            'type': 'tabletext',
            'label': '老师',
            'table': 'employee',
            'prop': 'name',
        },
        {
            'type': 'tabletext',
            'label': '课程名',
            'table': 'course',
            'prop': 'lesson_name',
        },
        {
            'type': 'textScale',
            'label': ' 排课次数',
            'prop1': 'total_times',
            'prop2': 'total_times',
        }
    ],
    'pageTable': 'classes',
    'pageTemplate': 'table1',
    'pagePath': ''
}