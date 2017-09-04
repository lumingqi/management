export default {
    'pageName': 'hourslessonsdetail',
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
    'deleteall': function (vm,param) {
        let eve = []
        for (let tableitem of vm.multipleSelection) {
            let item = {
                _id:tableitem._id,
                _delete:true
            }
            eve.push(item)
        }
        if (eve.length > 0) {
            vm.mx_db_bulkwrite('coursescheduling', eve).then(response => {
                vm.$message({
                    message: '操作成功',
                    type: 'success'
                })
                vm.handleSearch()
            })
        } else {
            vm.$message({
                message: '请选择一个排课',
                type: 'success'
            })
        }
    },
    'pageSearch': [
        {
            'type': 'handleback',
            'searchfunction': function (vm) {
                let filterObj = []
                let classId = vm.$store.state.system.currClassID
                if (classId.length > 0) {
                    filterObj.push({
                        'key': 'classes_id',
                        'value': classId,
                        'type': ''
                    })
                }
                return filterObj
            },
            'fields': [{}]
        },
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
                    'search': 'class_name'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [
                {
                    'label': '新增排课',
                    'type': 'success',
                    'showdialog': 'arrangeform',
                    'actionoption': 'lessonmanageadd'
                }, {
                    'label': '批量删除',
                    'type': '',
                    'func': 'deleteall',
                    'actionoption': 'lessonmanageles'
                },
            ]
        }
    ],
    'pageTableField': [
        {
            'type': 'checkbox',
            'label': '',
        },
        {
            'type': 'operation',
            'label': '操作',
            'prop': 'setting'
        },
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
            'label': '星期',
        },
        {
            'type': 'constant',
            'label': '排课状态',
            'prop': '已排课',
        }
    ],
    'pageTable': 'coursescheduling',
    'pageTemplate': 'table1',
    'pagePath': ''
}