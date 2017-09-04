export default {
    'pageName': 'useingproperty',
    'pageLable': '物业人员',
    'tableSearch': [],
    'pageSearch': [
        {
            'type': 'textSearch',
            'fields': [
                {
                    'label': '房号',
                    'defvalue': '',
                    'default': true,
                    'value': 'room_number'
                },
                {
                    'label': '姓名',
                    'defvalue': '',
                    'default': true,
                    'value': 'owner_name'
                },
                {
                    'label': '电话号码',
                    'defvalue': '',
                    'default': true,
                    'value': 'telephone_number'
                }
            ]
        },
        {
            'type': 'singleBtnSearch',
            'span': 5,
            'fields': [
                {
                    'label': ' 添加',
                    'type': 'success',
                    'showdialog': 'lb-newlessonmodal',
                    'actionoption': 'lessonmanageadd'
                }, {
                    'label': '导入',
                    'type': '',
                    'showdialog': 'lb-cate',
                    'actionoption': 'lessonmanageles'
                },{
                    'label': '导出',
                    'type': '',
                    'showdialog': 'lb-cate',
                    'actionoption': 'lessonmanageles'
                }
            ]
        }
    ],
    'pageTableField': [
        
    ],
    'pageTable': 'people',
    'pageTemplate': '',
    'pagePath': ''
}