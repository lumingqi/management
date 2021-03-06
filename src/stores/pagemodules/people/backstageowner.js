export default {
    'pageName': 'backstageowner',
    'pageLable': '业主',
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
                    'value': 'owner_name'
                },
                {
                    'label': '电话号码',
                    'defvalue': '',
                    'default': true,
                    'value': 'telephone_number'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [{
                'label': ' 添加',
                'type': 'success',
                'showdialog': 'useingOwnerAdd',
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
            'label': '电话号码',
            'prop': 'telephone_number',
        },
        {
            'type': 'text',
            'label': '备注',
            'prop': 'note',
        }
    ],
    'pageTable': 'owner',
    'pageTemplate': '',
    'pagePath': ''
}