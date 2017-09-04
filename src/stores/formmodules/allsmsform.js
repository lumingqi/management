export default {
    'pageName': 'allsmsform',
    'pageLable': '活动推广',
    'form': {
        'tel': [],
        'content': '',
        'active': false,
        'telActive': false,
        'fixed_time': '',
        'student_id': '',
        'new_tel': '',
        'new_name': ''
    },
    'telshow': 10,
    'created': function (vm) {
        let filterObj = []
        let filterTxt = vm.base64.encode(JSON.stringify(filterObj))
        vm.pagination.pagesize = 1000
        vm.handleGetFilterTableTable('student', filterTxt).then((obj) => {
            let objData = obj.data.data
            for (let index in objData) {
                let telitem = {}
                telitem.tel = objData[index].first_tel
                telitem.student_id = objData[index]._id
                telitem.name = objData[index].student_name
                vm.localdata.form.tel.push(telitem)
            }
            vm.module.telshow = 10
            vm.formdata = vm.localdata.form.tel.slice(0, 10)
        })
    },
    'formField': [
        {
            'type': 'phoneInput',
            'label': '发送号码',
            'prop': 'first_tel',
            'field': 'first_tel'
        },
        {
            'type': 'addphone',
            'switchlabel': '添加新号码',
            'fieldActive': 'telActive',
            'prop1': 'new_name',
            'prop2': 'new_tel'
        },
        {
            'type': 'textarea',
            'label': '发送内容',
            'prop': 'content',
            'field': 'content'
        },
        {
            'type': 'switchdatetime',
            'label': '定时发送',
            'prop': '',
            'field': 'fixed_time',
            'fieldActive': 'active',
            'datetype': 'datetime',
        }
    ],
    'pageTable': 'smssend',
    'pageTemplate': 'form',
    'pagePath': '',
    rulesData(vm) {
        return {
            'content': [
                { required: true, message: '请输入发送内容', trigger: 'blur' },
                { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
            ],
            'new_name': [
                { required: true, message: '请输入名字', trigger: 'blur' },
                { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
            ],
            'new_tel': [
                { required: true,validator: vm.validatePhone, trigger: 'blur' }
            ]
        }
    }
}