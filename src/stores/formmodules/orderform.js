export default {
    'pageName': 'orderform',
    'pageLable': '报名&缴费',
    'student': true,
    'form': {
        'classes_id': '',
        'course_id': '',
        'origin_times': 0,
        'refund_status': 0,
        'back_amount': 0,
        'unit_price': 0,
        'origin_amount': 0,
        'has_discount': '',
        'has_present': '',
        'c_unit_price': '',
        'order_remark': '',
        'present_times': 0,
        'discount': 0,
        'discount_amount': 0,
        'order_amount': 0,
        'unpay_amount': 0,
        'pay_status': 0,
        'student_id': '',
        'order_no': '',
        'order_type': 1,
        'body': ''
    },
    'formField': [{
        'type': 'datetime',
        'label': '停课开始',
        'prop': 'daterange1',
        'field': 'daterange1',
        'datetype': 'date',
    },
    {
        'type': 'datetime',
        'label': '停课结束',
        'prop': 'daterange2',
        'field': 'daterange2',
        'datetype': 'date',
    },
    {
        'type': 'textarea',
        'label': '停课原因',
        'prop': '',
        'field': 'reason'
    }
    ],
    'pageTable': 'order',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {
        daterange1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ],
        daterange2: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ]
    }
}