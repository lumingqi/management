export default {
    'pageName': 'lessonclasses',
    'pageLable': '班级设置',
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
            'searchfunction': function (form) {
                console.log('js', form)
                let filterObj = []
                let status = form + ''
                if (status.length > 0) {
                    let opentime = new Date()
                    if (status == '0') {
                        filterObj.push({
                            'key': 'open_time',
                            'value': opentime.getTime(),
                            'type': 'lte'
                        })
                    }
                    if (status == '1') {
                        filterObj.push({
                            'key': 'open_time',
                            'value': opentime.getTime(),
                            'type': 'gt'
                        })
                    }
                    if (status == '2') {
                        filterObj.push({
                            'key': 'status',
                            'value': 2,
                            'type': ''
                        })
                    }
                }
                return filterObj
            },
            'fields': [
                {
                    'labels': [
                        { 'label': '已开课' },
                        { 'label': '未开课' },
                        { 'label': '已结课' },

                    ]
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '开班',
                    'type': 'success',
                    'showdialog': 'classesform',
                    'actionoption': 'lessonclasses'
                },
            ]
        },

    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
            'prop': 'setting'
        },
        {
            'type': 'text',
            'label': '班级名',
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
            'type': 'datetime',
            'label': '开课时间',
            'prop': 'open_time',
        },
        {
            'type': 'checkstatus',
            'statutype': 'openlessonsstatus',
            'label': '状态',
        },
        {
            'type': 'payconditions',
            'label': '缴费情况',
            'order': 'order',
        },
        {
            'type': 'progress',
            'label': '招生情况',
        }
    ],
    'pageTable': 'classes',
    'pageTemplate': 'table1',
    'pagePath': ''
}