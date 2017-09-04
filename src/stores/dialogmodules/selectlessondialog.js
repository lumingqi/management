export default {
    'pageName': 'selectlessondialog',
    'pageLable': '选择课程',
    'tableSearch': [],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '课程名',
                    'defvalue': '',
                    'default': true,
                    'value': 'lesson_name'
                },
                {
                    'label': '课程编号',
                    'defvalue': '',
                    'default': true,
                    'value': 'lesson_no'
                }
            ]
        },
    ],
    'dialogUrl': 'selectlessondialog',
    'pageTableField': [
        {
            'type': 'text',
            'label': '课程',
            'prop': 'lesson_name'
        },
        {
            'type': 'text',
            'label': '课程编号',
            'prop': 'lesson_no'
        },
        {
            'type': 'text',
            'label': '课程售价',
            'prop': 'price'
        },
        {
            'type': 'text',
            'label': '课程单价',
            'prop': 'unit_price'
        },
        {
            'type': 'contentText',
            'label': '总课时',
            'typeinfo':'time'
        },
        {
            'type': 'getButtongroupText',
            'label': '授课模式',
            'color': 'danger',
            'prop': 'lesson_type',
            'othertype':[{
                'value': '0',
                'text': '班课'
            }, {
                'value': '1',
                'text': '1对1'
            }, {
                'value': '2',
                'text': '课时包'
            }]
        },
    ],
    'pageTable': 'course',
    'pageTemplate': 'table1',
    'pagePath': ''
}