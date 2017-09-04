export default {
    'pageName': 'studenttracks',
    'pageLable': '跟踪回访记录',
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
                            endTime = vm.getDatetimeEndOf(form[1])
                        }
                        filterObj.push({
                            'key': 'track_time',
                            'value': startTime,
                            'type': 'gte'
                        })
                        filterObj.push({
                            'key': 'track_time',
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
            'type': 'radioGroupSearch',
            'searchfunction': function (form) {
                console.log('js',form)
                let filterObj = []
                let status = form+''
                if (status.length>0) {
                    filterObj.push({
                        'key': 'track_type',
                        'value': status,
                        'type': ''
                    })
                }
                console.log(filterObj)
                return filterObj
            },
            'fields': [
                {
                    'labels': [
                        { 'label': '售前' },
                        { 'label': '售后' }
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
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '跟踪回访登记',
                    'type': 'success',
                    'icon': 'edit',
                    'showdialog': 'inquiryform',
                    'actionoption': 'studenttracksadd'
                }
            ]
        },
    ],
    'pageTableField': [
        {
            'type': 'studenttracksadd',
            'label': '学员',
            'prop': 'student',
        },
        {
            'type': 'constant',
            'label': '状态',
            'prop': '已报读',
        },
        {
            'type': 'text',
            'label': '沟通内容',
            'prop': 'detail',
        },
        {
            'type': 'text',
            'label': '沟通方式',
            'prop': 'track_way',
        },
        {
            'type': 'text',
            'label': '接洽人',
            'prop': 'op_name',
        },
        {
            'type': 'datetime',
            'label': '沟通时间',
            'prop': 'track_time'
        },
        {
            'type': 'getButtongroupText',
            'label': '类型',
            'color': 'gray',
            'prop': 'track_type',
            'othertype': [{
                'value': '0',
                'text': '售前'
            }, {
                'value': '1',
                'text': '售后'
            }]
        }
    ],
    'pageTable': 'inquiry',
    'pageTemplate': 'table1',
    'pagePath': ''
}