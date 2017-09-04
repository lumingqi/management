export default {
    'pageName': 'payRecord',
    'pageLable': '缴费记录',
    'tableSearch': [{
        'localField': 'classes_id',
        'from': 'classes',
        'foreignField': '_id',
        'as': 'classes'
    }],
    'pageSearch': [],
    'pageTableField': [
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'creattime',
        },
        {
            'type': 'text',
            'label': '金额',
            'prop': 'money_pay_amount'
        },
        {
            'type': 'payment',
            'label': '付款方式',
            'prop': 'region_oe_id'
        },
        {
            'type': 'tabletext',
            'label': '课程/班级',
            'prop': 'class_name',
            'table':'classes'
        },
        {
            'type': 'text',
            'label': '备注',
            'prop': 'order_remark'
        }
    ],
    'pageTable': 'pay',
    'pageTemplate': 'table1',
    'pagePath': ''
}