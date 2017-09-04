export default {
    'pageName': 'lessonsclasses',
    'pageLable': '选择班级',
    'tableSearch': [],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '教室名称',
                    'defvalue': '',
                    'default': true,
                    'value': 'class_name'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'fields': [
                {
                    'label': '新建教室',
                    'type': 'success',
                    'showdialog': 'sclassesform',
                    'actionoption': 'lessonsclasses'
                }
            ]
        },
    ],
    'dialogUrl': 'selectsclassesdialog',
    'pageTableField': [
        {
            'type': 'text',
            'label': '教室名称',
            'prop': 'class_name',
        },
        {
            'type': 'text',
            'label': '最大人数',
            'prop': 'max_student_num',
        },
    ],
    'pageTable': 'sclasses',
    'pageTemplate': 'table1',
    'pagePath': ''
}