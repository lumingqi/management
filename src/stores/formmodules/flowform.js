export default {
    'pageName': 'flowform',
    'pageLable': '流水',
    'form': {
        'type': '0',
        'amount': '',
        'odi_id': '',
        'sel': '',
        'note': '',
        'teacher_id': '',
        'create_time': new Date(),
        'check_status': 0,
    },
    'formField': [
        {
            'type': 'radiogroup',
            'label': '类型',
            'prop': 'type',
            'field': 'type',
            'labels': [
                { 'label': '支出' },
                { 'label': '收入' }
            ]
        },
         {
            'type': 'numberinput',
            'label': '金额',
            'text': '元',
            'prop': 'amount',
            'field': 'amount'
        },
        {
            'type': 'select',
            'label': '所属分类',
            'prop': '',
            'field': 'sel',
            'dict': function(vm){
                let dict = 8
                if (vm.localdata.form.type==0){
                    dict = 7
                }
                return dict
            }
        },
        {
            'type': 'input',
            'label': '备注',
            'prop': '',
            'field': 'note',
        },
         {
            'type': 'selectSearch',
            'label': '经办人',
            'prop': 'student_id',
            'field': 'student_id',
            'text': '请选择老师',
            'showdialog': 'selectstudentdialog',
            'search': 'student_name'
        },
        {
            'type': 'datetime',
            'label': '日期',
            'prop': '',
            'field': 'create_time',
            'datetype': 'date',
        }
    ],
    'pageTable': 'flow',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {}
}
