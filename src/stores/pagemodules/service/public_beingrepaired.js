export default {
    'pageName': 'beingrepaired',
    'pageLable': '物业人员',
    'tableSearch': [],
    'pageSearch': [{
            'fields': [{
                    'label': '姓名',
                    'defvalue': '',
                    'default': true,
                    'value': 'owner_name'
                },
                {
                    'label': '房号',
                    'defvalue': '',
                    'default': true,
                    'value': 'room_number'
                },
                {
                    'label': '类别',
                    'defvalue': '',
                    'default': true,
                    'value': 'stype'
                },
                {
                    'label': '联系方式',
                    'defvalue': '',
                    'default': true,
                    'value': 'tel_number'
                },

            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [{
                'label': ' 添加维修',
                'type': 'success',
                'showdialog': 'beingrepairedAdd',
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
            'type': 'datetime',
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
            'label': '图片',
            'prop': 'image',
        },
        {
            'type': 'text',
            'label': '状态',
            'prop': 'status',
        },
        {
            'type': 'text',
            'label': '类别',
            'prop': 'stype',
        }
    ],
    'pageTable': 'service',
    'pageTemplate': '',
    'pagePath': ''
}