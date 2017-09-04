export default {
    'pageName': 'lessonmanage',
    'pageLable': '课程设置',
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
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [
                {
                    'label': '添加课程',
                    'type': 'success',
                    'showdialog': 'lb-newlessonmodal',
                    'actionoption': 'lessonmanageadd'
                }, {
                    'label': '课程分类',
                    'type': '',
                    'showdialog': 'lb-cate',
                    'actionoption': 'lessonmanageles'
                },
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
            'prop': 'setting',
        },
        {
            'type': 'lesson',
            'label': '课程',
            'lesson_type': 'lesson_type',
            'lesson_name': 'lesson_name',
            'lesson_no': 'lesson_no',
            'othertype':[{
                'value': '0',
                'text': '班课'
            }, {
                'value': '1',
                'text': '1对1'
            }, {
                'value': '2',
                'text': '课时包'
            }],
        },
        {
            'type': 'lessonpriceText',
            'typeinfo':'singleprice',
            'label': ' 课程单价',
            'prop': 'unit_price',
        },
        {
            'type': 'lessonpriceText',
            'typeinfo':'price',
            'label': '课程售价',
            'prop': 'price',
        },
        {
            'type': 'contentText',
            'typeinfo':'singletime',
            'label': '单次课时',
        },
        {
            'type': 'contentText',
            'typeinfo':'time',
            'label': '总课时',
        }
    ],
    'pageTable': 'course',
    'pageTemplate': 'table1',
    'pagePath': ''
}