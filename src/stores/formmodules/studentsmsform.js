export default {
    'pageName': 'studentsmsform',
    'pageLable': '发送短信',
    'student': true,
    'form': {
        'tel': [],
        'first_tel': '',
        'content': '',
        'fixed_time': '',
        'student_id': '',
        'new_tel': '',
        'new_name': '',
        'studentInfo': {
            'localField': 'student_id',
            'from': 'student',
            'foreignField': '_id',
            'as': 'student'
        }
    },
    'telshow': 10,
    'created': function (vm) {
        let filterObj = []
        if (vm.module.student) {
            vm.student_id = vm.getStudentId()
            filterObj.push({
                'key': 'student_id',
                'value': vm.student_id,
                'type': ''
            })
            console.log('1111', vm.module.student, vm.getStudentId())
        }
        let filterTxt = vm.base64.encode(JSON.stringify(filterObj))
        vm.pagination.pagesize = 1000
        vm.handleGetFilterTableTable('student', filterTxt).then((obj) => {
            console.log('666',obj)
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
            'fieldActive': false,
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
                { required: true, validator: vm.validatePhone, trigger: 'blur' }
            ]
        }
    }
}