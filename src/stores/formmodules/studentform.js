export default {
    'pageName': 'student',
    'pageLable': '新建学员',
    'localdata': {
        'form': '',
        'sex': [{
            'value': '1',
            'iclass': 'fa fa-male  mans',
            'text': '男'
        }, {
            'value': '2',
            'iclass': 'fa fa-female woman',
            'text': '女'
        }, {
            'value': '0',
            'iclass': 'fa fa-question-circle',
            'text': '待确定'
        }],
        'classes': [{
            'value': '0',
            'label': '1'
        }, {
            'value': '1',
            'label': '2'
        }, {
            'value': '2',
            'label': '3'
        }, {
            'value': '3',
            'label': '4'
        }, {
            'value': '4',
            'label': '5'
        }, {
            'value': '5',
            'label': '6'
        }, {
            'value': '6',
            'label': '7'
        }, {
            'value': '7',
            'label': '8'
        }, {
            'value': '8',
            'label': '9'
        }, {
            'value': '9',
            'label': '10'
        }, {
            'value': '10',
            'label': '11'
        }, {
            'value': '11',
            'label': '12'
        }, {
            'value': '12',
            'label': '13'
        }],
        'grade': [{
            'value': '0',
            'label': '不确定'
        }, {
            'value': '1',
            'label': '一年级'
        }, {
            'value': '2',
            'label': '二年级'
        }, {
            'value': '3',
            'label': '三年级'
        }, {
            'value': '4',
            'label': '四年级'
        }, {
            'value': '5',
            'label': '五年级'
        }, {
            'value': '6',
            'label': '六年级'
        }, {
            'value': '7',
            'label': '初一'
        }, {
            'value': '8',
            'label': '初二'
        }, {
            'value': '9',
            'label': '初三'
        }, {
            'value': '10',
            'label': '高一'
        }, {
            'value': '11',
            'label': '高二'
        }, {
            'value': '12',
            'label': '高三'
        }]
    },
    'formField': [
        {
            'type': 'input',
            'label': '班级',
            'prop': 'student_name',
            'field':'student_name'
        }
    ],
    'pageTable': 'student',
    'pageTemplate': 'form',
    'pagePath': '',
    'rules': {
        'student_name': [
            { 'required': true, 'message': '请输入姓名', 'trigger': 'blur' },
            { 'min': 1, 'max': 256, 'message': '长度在 1 到 256个字符', 'trigger': 'blur' }
        ],
        'first_tel': [
            { 'validator': 'validateTel', 'required': true, 'trigger': 'blur' }
        ]
    }
}