export default {
    'pageName': 'refundlistdialog',
    'pageLable': '缴费记录',
    'student': true,
    'tableSearch': [],
    'pageSearch': [],
    'pageTableField': [
        {
            'type': 'datetimeMinute',
            'label': '缴费日期',
            'prop': 'creattime'
        },
        {
            'type': 'text',
            'label': '缴费金额',
            'prop': 'money_pay_amount',
        },
        {
            'type': 'constant',
            'label': '缴费方式',
            'prop': '现金'
        }
    ],
    'pageTable': 'pay',
    'pageTemplate': 'table1',
    'pagePath': ''
}