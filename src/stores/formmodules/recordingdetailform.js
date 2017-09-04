export default {
    'pageName': 'recordingdetailform',
    'pageLable': '赛事详情',
    'look': true,
    'form': {
        'creattime':'',
        'match_name':'',
        'result':'',
        'info':'',
    },
    'created': function (vm) {
        if (vm.$store.state.dialogs.dailogdata) {
            console.log(vm.$store.state.dialogs.dailogdata)
        }
    },
    'formField': [
        {
            'type': 'datetimetext',
            'label': '参赛日期',
            'prop': 'creattime',
            'field': 'creattime'
        },
        {
            'type': 'text',
            'label': '赛事名称',
            'prop': '',
            'field': 'match_name',
        },
        {
            'type': 'text',
            'label': '赛事成绩',
            'prop': '',
            'field': 'result'
        },
        {
            'type': 'text',
            'label': '赛事详情',
            'prop': '',
            'field': 'info'
        }
    ],
    'pageTable': 'recording',
    'pageTemplate': 'form',
    'pagePath': '',
    rules: {}
}