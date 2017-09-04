export default {
    'pageName': 'eventsRecord',
    'pageLable': '赛事记录',
    'pageSearch': [],
    'pageTableField': [
        {
            'type': 'datetime',
            'label': '日期',
            'prop': 'creattime',
        },
        {
            'type': 'text',
            'label': '赛事名称',
            'prop': 'match_name'
        },
        {
            'type': 'text',
            'label': '比赛成绩',
            'prop': 'result'
        }
    ],
    'pageTable': 'recording',
    'pageTemplate': 'table1',
    'pagePath': ''
}