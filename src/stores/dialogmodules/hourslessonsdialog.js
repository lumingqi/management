export default {
    'pageName': 'hourslessonsdialog',
    'pageLable': '排课详情',
    'tableSearch': [{
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
    }],
    'created': function (vm) {
        if (vm.$store.state.dialogs.dailogdata){
            vm.selectsearchValue = vm.$store.state.dialogs.dailogdata._id
        }
    },
    'pageSearch': [
        {
            'type': 'dateSearch',
            'fields': [{}]
        },
        {
            'type': 'selectSearch',
            'searchfunction': function (form) {
                let filterObj = []
                let searchValue = form + ''
                if (searchValue.length > 0) {
                    filterObj.push({
                        'key': 'classes_id',
                        'value': searchValue,
                        'type': ''
                    })
                }
                return filterObj
            },
            'fields': [
                {
                    'text': '请选择班级',
                    'showdialog': 'selectclassesdialog',
                    'search': 'class_name',
                    'table':'classes'
                }
            ]
        },
    ],
    'pageTableField': [
        {
            'type': 'tabletext',
            'label': '班级',
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
            'label': '老师',
            'table': 'employee',
            'prop': 'name',
        },
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'start',
        },
        {
            'type': 'datetimeRange',
            'label': '时间段',
            'prop1': 'start',
            'prop2': 'end',
        },
        {
            'type': 'checkweek',
            'label': '星期',
        }
    ],
    'pageTable': 'coursescheduling',
    'pageTemplate': 'table1',
    'pagePath': ''
}