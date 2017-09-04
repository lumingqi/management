export default {
    'pageName': 'systemschool',
    'pageLable': ' 校区管理',
    'tableSearch': [],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '校区名',
                    'defvalue': '',
                    'default': true,
                    'value': 'branch_name'
                },
                {
                    'label': '校区简称',
                    'defvalue': '',
                    'default': true,
                    'value': 'short_name'
                },
                {
                    'label': '所在地区',
                    'defvalue': '',
                    'default': true,
                    'value': 'group_name'
                },
                {
                    'label': '地址',
                    'defvalue': '',
                    'default': true,
                    'value': 'branch_address'
                },
                {
                    'label': '联系电话',
                    'defvalue': '',
                    'default': true,
                    'value': 'branch_tel'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '添加新校区',
                    'type': 'success',
                    'showdialog': 'campusform',
                    'actionoption': 'systememorgsavestudent'
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
            'label': '校区名',
            'prop': 'branch_name',
        },
        {
            'type': 'text',
            'label': '校区简称',
            'prop': 'short_name',
        },
        {
            'type': 'text',
            'label': '所在地区',
            'prop': 'group_name',
        },
        {
            'type': 'text',
            'label': '地址',
            'prop': 'branch_address',
        },
        {
            'type': 'text',
            'label': '联系电话',
            'prop': 'branch_tel',
        }
    ],
    'pageTable': 'campus',
    'pageTemplate': 'table1',
    'pagePath': ''
}