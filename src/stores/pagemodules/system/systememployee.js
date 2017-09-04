export default {
    'pageName': 'systememployee',
    'pageLable': ' 员工管理',
    'tableSearch': [{
        'localField': 'region_oe_id',
        'from': 'employee',
        'foreignField': '_id',
        'as': 'employee'
    }],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '姓名',
                    'defvalue': '',
                    'default': true,
                    'value': 'name'
                },
                {
                    'label': '手机号',
                    'defvalue': '',
                    'default': true,
                    'value': 'mobile'
                }
            ]
        },
        {
            'type': 'radioGroupSearch',
            'span': 12,
            'searchfunction': function (form) {
                let filterObj = []
                let status = form + ''
                if (status.length > 0) {
                    filterObj.push({
                        'key': 'lock',
                        'value': status == '1',
                        'type': ''
                    })
                }
                return filterObj
            },
            'fields': [
                {
                    'labels': [
                        { 'label': '在职' },
                        { 'label': '离职' }
                    ]
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '添加',
                    'type': 'success',
                    'showdialog': 'employeeform',
                    'actionoption': 'systememployeeadd'
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
            'label': '姓名',
            'prop': 'name',
        },
        {
            'type': 'notwrite',
            'label': '账号',
            'prop': 'tel',
        },
        {
            'type': 'teachertype',
            'label': '类型',
            'prop': 'is_part_time',
        },
        {
            'type': 'datetime',
            'label': '生日',
            'prop': 'birth',
        },
        {
            'type': 'text',
            'label': '邮箱',
            'prop': 'email',
        }
    ],
    'pageTable': 'employee',
    'pageTemplate': 'table1',
    'pagePath': ''
}