export default {
    'pageName': 'lessonsclasses',
    'pageLable': '教室管理',
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '教室名称',
                    'defvalue': '',
                    'default': true,
                    'value': 'classname'
                },
                {
                    'label': '教师名字',
                    'defvalue': '',
                    'default': true,
                    'value': 'teachername'
                }
            ]
        },
        {
            'type': 'dateSearch',
            'fields': [{}]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '新建教室',
                    'type': 'success',
                    'showdialog': 'lb-newsclassmodal',
                    'actionoption': 'lessonsclasses'
                }
            ]
        },
        {
            'type': 'selectUserSearch',
            'fields': [
                {}
            ]
        },
        {
            'type': 'groupBtnSearch',
            'fields': [
                {
                    'label': '已开课',
                    'type': 'primary',
                    'icon': ''
                },
                {
                    'label': '未开课',
                    'type': 'primary',
                    'icon': ''
                },
                {
                    'label': '已结课',
                    'type': 'primary',
                    'icon': ''
                }
            ]
        },
        {
            'type': 'radioGroupSearch',
            'fields': [
                {
                    'labels': [
                        { 'label': '所有学员' },
                        { 'label': '未报读学员' },
                        { 'label': '已报读学员' }
                    ]
                },
                {
                    'labels': [
                        { 'label': '头像' },
                        { 'label': '列表' },
                    ]
                }
            ]
        },
    ],
    'pageTableField': [
        {
            'type': 'text',
            'label': '学员姓名',
            'prop': 'name',
        },
        {
            'type': 'datetime',
            'label': '入学日期',
            'prop': 'date'
        },
        {
            'type': 'fromNow',
            'label': '年龄',
            'prop': 'birth'
        },
        {
            'type': 'operation',
            'label': '操作'
        },
        {
            'type': 'getToFixed',
            'label': '订单金额',
            'prop': 'origin_amount',
        },
        {
            'type': 'tabletext',
            'label': '学员',
            'table': 'student',
            'prop': 'student_name',
        },
        {
            'type': 'getEmployeeName',
            'label': '学员归属',
        },
        {
            'type': 'getdataPurpose',
            'label': '意向程度',
            'prop': 'purpose',
        },
        {
            'type': 'studentRouter',
            'label': '学员'
        },
        {
            'type': 'constant',
            'label': '付款方式',
            'prop': '现金',
        },
        {
            'type': 'textTag',
            'label': '出勤情况',
            'prop': 'tagtext',
            'color': 'gray'
        },
        {
            'type': 'progress',
            'label': '招生情况',
            'order': 'order',
            'max_student_num': 'max_student_num'
        },
        {
            'type': 'getButtongroupText',
            'label': '付款情况',
            'color': 'gray',
            'prop': 'pay_status',
            'othertype': [{
                'value': -1,
                'text': '所有'
            }, {
                'value': 0,
                'text': '未付款'
            }, {
                'value': 1,
                'text': '部分付款'
            }, {
                'value': 2,
                'text': '已付款'
            }]
        },
        {
            'type': 'priceText',
            'label': '定价',
        },
        {
            'type': 'contentText',
            'label': '内容'
        },
        {
            'type': 'checkStatus',
            'statutype':'accountcheck',
            'label': '对账状态'
        },
        {
            'type': 'negativeTag',
            'label': '金额',
            'prop': 'amount',
            'color': 'gray'
        },
        {
            'type': 'lastTrack',
            'label': '最后跟踪',
            'prop': 'inquiry',
        },
    ],
    'pageTable': 'sclasses',
    'pageTemplate': 'table1',
    'pagePath': '/lesson/sclasses'
}