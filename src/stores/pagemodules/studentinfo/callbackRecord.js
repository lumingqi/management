export default {
    'pageName': 'callbackRecord',
    'pageLable': '跟踪回访记录',
    'pageSearch': [],
    'pageTableField': [
        {
            'type': 'text',
            'label': '沟通内容',
            'prop': 'detail'
        },
        {
            'type': 'text',
            'label': '沟通方式',
            'prop': 'track_way',
        },
        {
            'type': 'text',
            'label': '接洽人',
            'prop': 'op_name'
        },
        {
            'type': 'datetime',
            'label': '沟通时间',
            'prop': 'track_time'
        }
    ],
    'pageTable': 'inquiry',
    'pageTemplate': 'table1',
    'pagePath': ''
}