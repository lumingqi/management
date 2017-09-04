export default {
    'pageName': 'selectteacherdialog',
    'pageLable': '选择老师',
    'tableSearch': [
        {
            'localField': 'region_oe_id',
            'from': 'employee',
            'foreignField': '_id',
            'as': 'employee'
        }
    ],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '老师',
                    'defvalue': '',
                    'default': true,
                    'value': 'name'
                },
                {
                    'label': '性别',
                    'defvalue': '',
                    'default': true,
                    'value': 'sex'
                },
                {
                    'label': '类型',
                    'defvalue': '',
                    'default': true,
                    'value': 'is_part_time'
                }
            ]
        }
    ],
    'dialogUrl': 'selectteacherdialog',
    'pageTableField': [
        {
            'type': 'text',
            'label': '老师',
            'prop': 'name'
        },
        {
            'type': 'teachertype',
            'label': '类型',
            'prop': 'is_part_time',
        }
    ],
    'pageTable': 'employee',
    'pageTemplate': 'table1',
    'pagePath': ''
}