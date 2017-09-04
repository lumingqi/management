export default {
    'pageName': 'hourssuspends',
    'pageLable': '停课设置',
    'tableSearch': [{
        'localField': 'student_id',
        'from': 'student',
        'foreignField': '_id',
        'as': 'student'
    }],
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
                    'label': '停课登记',
                    'type': 'success',
                    'showdialog': 'suspendform',
                    'actionoption': 'hourssuspends'
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
            'label': '停课学员',
            'table': 'student',
            'prop': 'student_name',
        },
        {
            'type': 'datetime',
            'label': '停课时间',
            'prop': 'daterange1'
        },
        {
            'type': 'text',
            'label': '停课原因',
            'prop': 'reason',
        },
        {
            'type': 'datetime',
            'label': '登记时间',
            'prop': 'createtime',
        }
    ],
    'pageTable': 'suspend',
    'pageTemplate': 'table1',
    'pagePath': ''
}