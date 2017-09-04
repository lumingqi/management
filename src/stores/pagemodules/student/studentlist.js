export default {
    'pageName': 'studentlist',
    'pageLable': '学员管理',
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
                    'value': 'student_name'
                },
                {
                    'label': '手机号',
                    'defvalue': '',
                    'default': true,
                    'value': 'first_tel'
                },
                {
                    'label': '住址',
                    'defvalue': '',
                    'default': true,
                    'value': 'home_address'
                },
                {
                    'label': '英文名',
                    'defvalue': '',
                    'default': true,
                    'value': 'nickname'
                }
            ]
        },
        {
            'type': 'radioGroupSearch',
            'span': 12,
            'searchfunction': function (form) {
                let filterObj = []
                let search_value = form + ''
                if (search_value.length > 0) {
                    if (search_value != '0') {
                        filterObj.push({
                            'key': 'status',
                            'value': status,
                            'type': ''
                        })
                    }
                }
                return filterObj
            },
            'fields': [
                {
                    'labels': [
                        { 'label': '所有' },
                        { 'label': '未报读' },
                        { 'label': '已报读' }
                    ]
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '已封存档案',
                    'type': 'success',
                    'showdialog': 'trashdialog',
                    'actionoption': 'studentlist'
                },
            ]
        },

    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
            'student':true,
            'prop': 'setting'
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
            'type': 'fromNow',
            'label': '年龄',
            'prop': 'birth',
        },
        {
            'type': 'text',
            'label': '住址',
            'prop': 'home_address',
        },
        {
            'type': 'getEmployeeName',
            'label': '学员归属',
        },
        {
            'type': 'text',
            'label': '档案备注',
            'prop': 'note',
        },
    ],
    'pageTable': 'student',
    'pageTemplate': 'table1',
    'pagePath': ''
}