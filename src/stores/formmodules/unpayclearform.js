export default {
    'pageName': 'unpayclearform',
    'pageLable': '缴费',
    'form': {
        'order_id': '',
        'student_id': '',
        'classes_id': '',
        'times': 0,
        'amount': 0,
        'note': ''
    },
    'formField': [
        {
            'type': 'text',
            'label': '订单号',
            'prop': '',
            'field': 'order_no',
        },
        {
            'type': 'text',
            'label': '订单内容',
            'prop': '',
            'field': 'body'
        },
        {
            'type': 'text',
            'label': '购买课次',
            'prop': '',
            'field': 'origin_times',
            'text': '次'
        },
        {
            'type': 'text',
            'label': '赠送课次',
            'prop': '',
            'field': 'present_times',
            'text': '次'
        },
        {
            'type': 'addition',
            'label': '总课次',
            'prop': '',
            'field1': 'origin_times',
            'field2': 'present_times',
            'text': '次'
        },
        {
            'type': 'text',
            'label': '课次单价',
            'prop': '',
            'field': 'unit_price',
            'text': '元'
        },
        {
            'type': 'text',
            'label': '总金额',
            'prop': '',
            'field': 'order_amount',
            'text': '元'
        },
        {
            'type': 'subduction',
            'label': '已付款',
            'prop': '',
            'field1': 'order_amount',
            'field2': 'unpay_amount',
            'text': '元'
        },
        {
            'type': 'text',
            'label': '欠费金额',
            'prop': '',
            'field': 'unpay_amount',
            'text': '元'
        },
        {
            'type': 'text',
            'label': '订单备注',
            'prop': '',
            'field': 'order_remark'
        },
        {
            'type': 'numberinput',
            'label': '清除课次',
            'text': '次',
            'prop': 'times',
            'field': 'times'
        },
        {
            'type': 'numberinput',
            'label': '清除金额',
            'text': '元',
            'prop': 'amount',
            'field': 'amount'
        },
        {
            'type': 'input',
            'label': '清除备注',
            'prop': 'note',
            'field': 'note'
        }
    ],
    'pageTable': 'clear',
    'pageTemplate': 'form',
    'pagePath': '',
    rulesData(vm) {
        return {
            times: [
                { required: true, validator: vm.validateNumberinput, message: '请输入清除课次', trigger: 'blur' }
            ],
            amount: [
                { required: true, validator: vm.validateNumberinput, message: '请输入清除金额', trigger: 'blur' }
            ],
            note: [
                { required: true, message: '请输入清除原因', trigger: 'blur' },
                { min: 1, max: 256, message: '长度在 1 到 256个字符', trigger: 'blur' }
            ]
        }
    }
}
