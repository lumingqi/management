export default {
    'pageName': 'refundfrom',
    'pageLable': '确认退款',
    'form': {
        'order_id': '',
        'student_id': '',
        'pay_id': '',
        'classes_id': '',
        'money_pay_amount':'',
        'amount': 0,
        'refund_to': '0',
        'money_refund_to': '1',
        'times_policy': '0',
        'times': 0,
        'note': ''
    },
    'formField': [
        {
            'type': 'text',
            'label': '学员',
            'prop': '',
            'field': 'student_name'
        },
        {
            'type': 'text',
            'label': '订单号',
            'prop': '',
            'field': 'order_no'
        },
        {
            'type': 'text',
            'label': '订单内容',
            'prop': '',
            'field': 'body'
        },
        {
            'type': 'text',
            'label': '订单金额',
            'prop': '',
            'field': 'order_amount',
            'text':'元'
        },
        {
            'type': 'text',
            'label': '缴费金额',
            'prop': '',
            'field': 'money_pay_amount',
            'text':'元'
        },
        {
            'type': 'constant',
            'label': '缴费方式',
            'prop': '',
            'field': '现金'
        },
        {
            'type': 'getorderPay',
            'label': '课耗金额',
            'prop': '',
            'field': 'getorderPay',
            'text':'元'
        },
        {
            'type': 'text',
            'label': '已退金额',
            'prop': '',
            'field': 'back_amount',
            'text':'元'
        },
        {
            'type': 'getorder',
            'label': '可退金额',
            'prop': '',
            'field': 'getorder',
            'text':'元'
        },
        {
            'type': 'getDatetimeFormat',
            'label': '缴费日期',
            'prop': '',
            'field': 'creattime'
        },
        {
            'type': 'numberinput',
            'label': '退款金额',
            'prop': 'amount',
            'field': 'amount',
            'text': '元'
        },
        {
            'type': 'radiogroup',
            'label': '退款方式',
            'prop': 'refund_to',
            'field': 'refund_to',
            'labels': [
                { 'label': '现金' },
                { 'label': '原路返回' }
            ]
        },
        {
            'type': 'radiogroup',
            'label': '现金退款',
            'prop': 'money_refund_to',
            'field': 'money_refund_to',
            'labels': [
                { 'label': '退现金' },
                { 'label': '退到钱包余额' }
            ]
        },
        {
            'type': 'radiogroup',
            'label': '课时处理',
            'prop': 'times_policy',
            'field': 'times_policy',
            'labels': [
                { 'label': '不用处理' },
                { 'label': '直接结课' },
                { 'label': '扣减课次' }
            ]
        },
         {
            'type': 'input',
            'label': '退款备注',
            'prop': '',
            'field': 'note'
        },
    ],
    'pageTable': 'refund',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {}
}