export default {
    'pageName': 'opinion',
    'pageLable': '物业人员',
    'tableSearch': [],
    'pageSearch': [{
            'type': 'textSearch',
            'fields': [{
                    'label': '房号',
                    'defvalue': '',
                    'default': true,
                    'value': 'room_number'
                },
                {
                    'label': '姓名',
                    'defvalue': '',
                    'default': true,
                    'value': 'employee_name'
                },
                {
                    'label': '联系方式',
                    'defvalue': '',
                    'default': true,
                    'value': 'tel_number'
                },
                {
                    'label': '日期',
                    'defvalue': '',
                    'default': true,
                    'value': 'time'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [{
                    'label': ' 添加',
                    'type': 'success',
                    'showdialog': 'ownervoteAdd',
                    'actionoption': 'lessonmanageadd'
                }, {
                    'label': '导入',
                    'type': '',
                    'isShow': true
                },
                // {
                //     'label': '导出',
                //     'type': '',
                //     'exported': true
                // },
                {
                    'label': '导出',
                    'type': '',
                    'func': 'exported',
                    'showdialog': '',
                }
            ]
        }
    ],
    'pagesize': 10,
    'alias': 'ownervoteexported',
    'exported': function(vm) {
        vm.pagination.pagesize = 1000
        if (vm.moduledata && vm.moduledata.pageTable) {
            vm.handleGetFilterTableTable(vm.moduledata.pageTable, vm.filterData).then((obj) => {
                var exportedData = obj.data.data
                console.log('189', exportedData)
                    // var aLink = document.createElement('a')
                    // var blob = new Blob(exportedData)
                    // var evt = document.createEvent("HTMLEvents")
                    // evt.initEvent("click", false, false)
                    // aLink.download = fileName
                    // aLink.href = URL.createObjectURL(blob)
                    // aLink.dispatchEvent(evt)
            })
        }
        axios.get('http://api.yx101.cn/management/download/ownervote').then(obj => {
            cosole.log('123', obj)
        })
    },
    'pageTableField': [{
            'type': 'operation',
            'label': '操作',
            'prop': 'setting'
        },
        {
            'type': 'text',
            'label': '房号',
            'prop': 'room_number',
        },
        {
            'type': 'text',
            'label': '姓名',
            'prop': 'owner_name',
        },
        {
            'type': 'text',
            'label': '联系方式',
            'prop': 'telephone_number',
        },
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'time',
        },
        {
            'type': 'text',
            'label': '内容',
            'prop': 'content',
        },
        {
            'type': 'text',
            'label': '选择',
            'prop': 'decision',
        },
    ],
    'pageTable': 'ownervote',
    'pageTemplate': '',
    'pagePath': ''
}