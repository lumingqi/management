export default {
    'pageName': 'useingemployee',
    'pageLable': '物业人员',
    'tableSearch': [],
    'pageSearch': [{
        'type': 'textSearch',
        'fields': [{
            'label': '部门',
            'defvalue': '',
            'default': true,
            'value': 'department'
        },
        {
            'label': '姓名',
            'defvalue': '',
            'default': true,
            'value': 'employee_name'
        },
        {
            'label': '联系方式',
            'defvalue': '',
            'default': true,
            'value': 'telephone_number'
        },
        {
            'label': '职务',
            'defvalue': '',
            'default': true,
            'value': 'position'
        }
        ]
    },
    {
        'type': 'singleBtnSearch',
        'span': 5,
        'fields': [{
            'label': ' 添加',
            'type': 'success',
            'showdialog': 'useingEmployeeAdd',
            'actionoption': 'lessonmanageadd'
        }, {
            'label': '导入',
            'type': '',
            'imported': true
        }, {
            'label': '导出',
            'type': '',
            'showdialog': 'lb-cate',
            'actionoption': 'lessonmanageles'
        }]
    }
    ],
    'pageTableField': [{
        'type': 'operation',
        'label': '操作',
        'prop': 'setting'
    },
    {
        'type': 'text',
        'label': '部门',
        'prop': 'department',
    },
    {
        'type': 'text',
        'label': '姓名',
        'prop': 'employee_name',
    },
    {
        'type': 'text',
        'label': '联系方式',
        'prop': 'telephone_number',
    },
    {
        'type': 'text',
        'label': '职务',
        'prop': 'position',
    },
    {
        'type': 'text',
        'label': 'openId',
        'prop': 'wxopen_id',
    },
    {
        'type': 'text',
        'label': '备注',
        'prop': 'note',
    }
    ],
    'pageTable': 'employee',
    'pageTemplate': '',
    'pagePath': ''
}