export default {
    'pageName': 'hoursleaves',
    'pageLable': '班级设置',
    'tableSearch': [{
        'localField': 'student_id',
        'from': 'student',
        'foreignField': '_id',
        'as': 'student'
    }],
    'pageSearch': [
        {
            'type': 'dateSearch',
            'searchfunction': function (form,vm) {
                let filterObj = []
                if (form && form.length == 2) {
                    let startTime = vm.getDatetime(form[0])
                    let endTime = vm.getDatetime(form[1])
                    if (startTime > 0) {
                        if (startTime == endTime) {
                            endTime = vm.getDatetimeEndOf(form[1])
                        }
                        filterObj.push({
                        'key': 'daterange1',
                        'value': startTime,
                        'type': 'gte'
                    })
                    filterObj.push({
                        'key': 'daterange1',
                        'value': endTime,
                        'type': 'lte'
                    })
                    }
                }
                console.log('22222', filterObj)
                return filterObj
            },
            'fields': [{} ]
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
                    'label': '请假登记',
                    'type': 'success',
                    'showdialog':'leavesform',
                    'actionoption':'hoursleaves'
                }
            ]
        },
        
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
        },
        {
            'type': 'tabletext',
            'label': '请假学员',
            'table': 'student',
            'prop': 'student_name',
        },
        {
            'type': 'datetime',
            'label': '请假时间',
            'prop': 'daterange1'
        },
        {
            'type': 'datetime',
            'label': '复课时间',
            'prop': 'daterange2',
        },
        {
            'type': 'text',
            'label': '请假原因',
            'prop': 'reason',
        },
        {
            'type': 'datetime',
            'label': '登记时间',
            'prop': 'createtime',
        }
    ],
    'pageTable': 'leaves',
    'pageTemplate': 'table1',
    'pagePath': ''
}