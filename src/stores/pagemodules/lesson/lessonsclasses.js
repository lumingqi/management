export default {
    'pageName': 'lessonsclasses',
    'pageLable': '教室管理',
    'tableSearch':[],
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
                    'showdialog':'sclassesform',
                    'actionoption':'lessonsclasses'
                }
            ]
        },
    ],
    'pageTableField': [
        {
            'type': 'operation',
            'label': '操作',
            'prop': 'setting',
            'fields': [{'msg':'编辑','action':'plus'},{'msg':'删除','action':'delete'}]
        },
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
    'pagePath': '/lesson/sclasses'
}