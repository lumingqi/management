export default {
    'pageName': 'systemsms',
    'pageLable': ' 短信功能',
    'tableSearch': [
        {
            'localField': 'student_id',
            'from': 'student',
            'foreignField': '_id',
            'as': 'student'
        },
    ],
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
                }
            ]
        },
        {
            'type': 'radioGroupSearch',
            'span': 12,
            'searchfunction': function (form) {
                let filterObj = []
                return filterObj
            },
            'fields': [
                {
                    'labels': [
                        { 'label': '未发送' },
                        { 'label': '已发送' }
                    ]
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [
                {
                    'label': '发送学员',
                    'type': 'success',
                    'showdialog': 'studentsmsform',
                    'actionoption': 'lessonmanageadd'
                }, {
                    'label': '班级群发',
                    'type': '',
                    'showdialog': 'classsmsdialog',
                    'actionoption': 'lessonmanageles'
                },  {
                    'label': '活动推广',
                    'type': '',
                    'showdialog': 'allsmsform',
                    'actionoption': 'allsmsform'
                },
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'studentRouter',
            'label': '学员'
        },
        {
            'type': 'text',
            'label': '联系电话',
            'prop': 'first_tel'
        },
        {
            'type': 'constant',
            'label': '发送内容',
            'prop': '短信内容',
        },
        {
            'type': 'constant',
            'label': '发送时间',
            'prop': '2017-09-18',
        },
        {
            'type': 'constant',
            'label': '状态',
            'prop': '已发送',
        }
    ],
    'pageTable': 'student',
    'pageTemplate': 'table1',
    'pagePath': ''
}