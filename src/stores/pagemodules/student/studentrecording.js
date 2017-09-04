export default {
    'pageName': 'studentrecording',
    'pageLable': '赛事记录',
    'tableSearch': [
        {
            'localField': 'student_id',
            'from': 'student',
            'foreignField': '_id',
            'as': 'student'
        }
    ],
    'pageSearch': [
        {
            'type': 'dateSearch',
            'searchfunction': function (form, vm) {
                let filterObj = []
                if (form && form.length == 2) {
                    let startTime = vm.getDatetime(form[0])
                    let endTime = vm.getDatetime(form[1])
                    if (startTime > 0) {
                        if (startTime == endTime) {
                            startTime = vm.getDatetimeStartOf('day')
                            endTime = vm.getDatetimeStartOf('day', true)
                        }
                        filterObj.push({
                            'key': 'join_date',
                            'value': startTime,
                            'type': 'gte'
                        })
                        filterObj.push({
                            'key': 'join_date',
                            'value': endTime,
                            'type': 'lte'
                        })
                    }
                }
                return filterObj
            },
            'fields': [{}]
        },
        {
            'type': 'selectSearch',
            'searchfunction': function (form) {
                let filterObj = []
                let searchValue = form + ''
                if (searchValue.length > 0) {
                    filterObj.push({
                    'key': 'student_id',
                    'value': searchValue,
                    'type': ''
                })
                }
                return filterObj
            },
            'fields': [
                {
                    'text': '请选择学员',
                    'showdialog': 'selectstudentdialog',
                    'search': 'student_name'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': ' 添加赛事记录',
                    'type': 'success',
                    'showdialog': 'recordingform',
                    'actionoption': 'studentrecording'
                }
            ]
        },
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作'
        },
        {
            'type': 'studentlink',
            'label': '学员',
            'prop': 'student'
        },
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'creattime'
        },
        {
            'type': 'text',
            'label': '赛事名称',
            'prop': 'match_name',
        },
        {
            'type': 'text',
            'label': '比赛成绩',
            'prop': 'result',
        },
        {
            'type': 'constant',
            'label': '录入时间',
            'prop': '2017-06-06',
        }
    ],
    'pageTable': 'recording',
    'pageTemplate': 'table1',
    'pagePath': ''
}