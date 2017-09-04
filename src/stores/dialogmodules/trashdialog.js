export default {
    'pageName': 'trashdialog',
    'pageLable': '已封存档案',
    'tableSearch': [{
        'key': 'isdel',
        'value': true,
        'type': ''
    }],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '学生姓名',
                    'defvalue': '',
                    'default': true,
                    'value': 'student_name'
                },
                {
                    'label': '联系电话',
                    'defvalue': '',
                    'default': true,
                    'value': 'first_tel'
                }
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'studentRouter',
            'label': '学生姓名',
        },
        {
            'type': 'text',
            'label': '联系电话',
            'prop': 'first_tel'
        },
        {
            'type': 'datetime',
            'label': '建档日期',
            'prop': 'creattime'
        },
        {
            'type': 'studentoperation',
            'label': '操作1',
        }
    ],
    'pageTable': 'student',
    'pageTemplate': 'table1',
    'pagePath': ''
}