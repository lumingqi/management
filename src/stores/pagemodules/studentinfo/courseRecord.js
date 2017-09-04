export default {
    'pageName': 'courseRecord',
    'pageLable': '排课记录',
    'tableSearch': [
        {
            'localField': 'sclasses_id',
            'from': 'sclasses',
            'foreignField': '_id',
            'as': 'sclasses'
        }, {
            'localField': 'teacher_id',
            'from': 'employee',
            'foreignField': '_id',
            'as': 'employee'
        }, {
            'localField': 'classes_id',
            'from': 'classes',
            'foreignField': '_id',
            'as': 'classes'
        },{
            'localField': 'classes_id',
            'from': 'order',
            'foreignField': 'classes_id',
            'as': 'order'
        }],
    'pageSearch': [],
    'pageTableField': [
        {
            'type': 'tabletext',
            'label': '班级名',
            'table': 'classes',
            'prop': 'class_name',
        },
        {
            'type': 'tabletext',
            'label': '教室',
            'table': 'sclasses',
            'prop': 'class_name',
        },
        {
            'type': 'tabletext',
            'label': '上课老师',
            'table': 'employee',
            'prop': 'name',
        },
        {
            'type': 'datetime',
            'label': '开课日期',
            'prop': 'start',
        },
        {
            'type': 'datetimeRange',
            'label': '上课时间段',
            'prop1': 'start',
            'prop2': 'end',
        },
        {
            'type': 'checkweek',
            'label': '上课星期',
        }
    ],
    'pageTable': 'coursescheduling',
    'pageTemplate': 'table1',
    'pagePath': ''
}