export default {
    'pageName': 'iaeflow',
    'pageLable': '流水',
    'tableSearch': [{
        'localField': 'teacher_id',
        'from': 'employee',
        'foreignField': '_id',
        'as': 'employee'
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
                            endTime = this.getDatetimeEndOf(vm.localdata.form.daterange[1])
                        }
                        filterObj.push({
                            'key': 'create_time',
                            'value': startTime,
                            'type': 'gte'
                        })
                        filterObj.push({
                            'key': 'create_time',
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
            'type': 'radioGroupSearch',
            'fields': [
                {
                    'label': '所有',
                    'icon': ''
                },
                {
                    'label': '支出',
                    'icon': ''
                },
                {
                    'label': '收入',
                    'icon': ''
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '记一笔',
                    'type': 'success',
                    'icon': 'edit',
                    'showdialog': 'flowform',
                    'actionoption': 'iaeflow'
                }
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'creattime'
        },
        {
            'type': 'textTag',
            'label': '金额',
            'prop': 'amount',
            'color': 'gray'
        },
        {
            'type': 'getButtongroupText',
            'label': '类型',
            'color': 'gray',
            'othertype': [{
                'value': '',
                'text': '所有'
            }, {
                'value': '0',
                'text': '支出'
            }, {
                'value': '1',
                'text': '收入'
            }],
            'prop': 'type'
        },
        {
            'type': 'text',
            'label': '备注',
            'prop': 'note',
        },
        {
            'type': 'tabletext',
            'label': '经办人',
            'table': 'employee',
            'prop': 'name',
        },
        {
            'type': 'datetime',
            'label': '录入日期',
            'prop': 'creattime'
        }
    ],
    'pageTable': 'flow',
    'pageTemplate': 'table1',
    'pagePath': ''
}