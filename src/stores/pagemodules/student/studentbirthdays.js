export default {
    'pageName': 'studentbirthdays',
    'pageLable': '生日学员',
    'tableSearch': [
        {
            'localField': '_id',
            'from': 'order',
            'foreignField': 'student_id',
            'as': 'lesson'
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
                            endTime = vm.getDatetimeEndOf(form[1])
                        }
                        filterObj.push({
                        'key': 'birthstr',
                        'value': vm.getDateNumFormat(startTime),
                        'type': 'gte'
                    })
                    filterObj.push({
                        'key': 'birthstr',
                        'value': vm.getDateNumFormat(endTime),
                        'type': 'lte'
                    })
                    }
                }
                return filterObj
            },
            'fields': [{}]
        }
    ],
    'pageTableField': [
        {
            'type': 'studentRouter',
            'label': '学员'
        },
        {
            'type': 'text',
            'label': '联系电话',
            'prop': 'first_tel',
        },
        {
            'type': 'datetime',
            'label': '出生日期',
            'prop': 'birth'
        },
        {
            'type': 'fromNow',
            'label': '年龄',
            'prop': 'birth'
        },
        {
            'type': 'datetime',
            'label': '建档日期',
            'prop': 'creattime'
        },
        {
            'type': 'lessoncount',
            'label': '已报课程数',
            'prop': 'lesson'
        }
    ],
    'pageTable': 'student',
    'pageTemplate': 'table1',
    'pagePath': ''
}