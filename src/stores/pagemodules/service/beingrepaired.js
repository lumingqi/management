export default {
    'pageName': 'beingrepaired',
    'pageLable': '个人正在维修',
    'tableSearch': [],
    'pageSearch': [{
            'type': 'textSearch',
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
            'label': '报修单号',
            'prop': 'repair_no',
        },
        {
            'type': 'text',
            'label': '房号',
            'prop': 'room_number',
        },
        {
            'type': 'text',
            'label': '姓名',
            'prop': 'repair_name',
        },
        {
            'type': 'text',
            'label': '联系方式',
            'prop': 'tel_phone',
        },
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'datetime',
        },
        {
            'type': 'text',
            'label': '内容',
            'prop': 'repair_content',
        },
        {
            'type': 'getPic',
            'label': '图片',
            'prop': 'picServerId',
        },
        {
            'type': 'text',
            'label': '保价',
            'prop': 'repair_price',
        },
        {
            'type': 'text',
            'label': '状态',
            'prop': 'repair_status',
        },
        {
        'type': 'postbutton',
        'label': '发送',
    }
    ],
    'pageTable': 'service',
    'pageTemplate': '',
    'pagePath': ''
}