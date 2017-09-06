export default {
    'pageName': 'opinion',
    'pageLable': '物业人员',
    'tableSearch': [],
    'pageSearch': [{
            'type': 'textSearch',
            'fields': [{
                    'label': '房号',
                    'defvalue': '',
                    'default': true,
                    'value': 'room_number'
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
                    'value': 'tel_number'
                },
                {
                    'label': '日期',
                    'defvalue': '',
                    'default': true,
                    'value': 'time'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [{
                'label': ' 添加',
                'type': 'success',
                'showdialog': 'ownervoteAdd',
                'actionoption': 'lessonmanageadd'
            }, {
                'label': '导入',
                'type': '',
                'showdialog': 'lb-cate',
                'actionoption': 'lessonmanageles'
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
            'label': '房号',
            'prop': 'room_number',
        },
        {
            'type': 'text',
            'label': '姓名',
            'prop': 'owner_name',
        },
        {
            'type': 'text',
            'label': '联系方式',
            'prop': 'telephone_number',
        },
        {
            'type': 'text',
            'label': '日期',
            'prop': 'time',
        },
        {
            'type': 'text',
            'label': '内容',
            'prop': 'content',
        },
        {
            'type': 'text',
            'label': '选择',
            'prop': 'decision',
        },
    ],
    'pageTable': 'ownervote',
    'pageTemplate': '',
    'pagePath': ''
}