export default {
    'pageName': 'studentlist0',
    'pageLable': '咨询管理',
    'tableSearch': [
        {
            'localField': 'region_oe_id',
            'from': 'employee',
            'foreignField': '_id',
            'as': 'employee'
        }, {
            'localField': 'inquiry_id',
            'from': 'inquiry',
            'foreignField': '_id',
            'as': 'inquiry'
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
                            'key': 'inquiry.track_time',
                            'value': startTime,
                            'type': 'gt'
                        })
                        filterObj.push({
                            'key': 'inquiry.track_time',
                            'value': endTime,
                            'type': 'lt'
                        })
                    }
                }
                return filterObj
            },
            'fields': [{}]
        },
        {
            'type': 'radioGroupSearch',
            'searchfunction': function (form) {
                let filterObj = []
                let status = form + ''
                if (status == '1') {
                    filterObj.push({
                        'key': 'region_oe_id',
                        'value': '0',
                        'type': ''
                    })
                }
                return filterObj
            },
            'fields': [
                {
                    'labels': [
                        { 'label': '所有学员' },
                        { 'label': '未归属' },

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
        }
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'student':true,
            'label': '操作'
        },
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
            'type': 'getEmployeeName',
            'label': '学员归属',
        },
        {
            'type': 'getdataPurpose',
            'label': '意向程度',
            'prop': 'purpose',
        },
        {
            'type': 'text',
            'label': '来源渠道',
            'prop': 'track_from',
        },
        {
            'type': 'datetime',
            'label': '建档日期',
            'prop': 'creattime'
        },
        {
            'type': 'text',
            'label': '档案备注',
            'prop': 'note',
        },
        {
            'type': 'lastTrack',
            'label': '最后跟踪',
            'prop': 'inquiry',
        }
    ],
    'pageTable': 'student',
    'pageTemplate': 'table1',
    'pagePath': ''
}