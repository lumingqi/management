export default {
    'pageName': 'studentregion',
    'pageLable': '学员归属',
    'form': {
        'region_oe_id': '0'
    },
    'formField': [
        {
            'type': 'selectSearch',
            'label': '授课老师',
            'prop': '',
            'field': 'region_oe_id',
            'text': '请选择老师',
            'showdialog': 'selectteacherdialog',
            'search': 'name',
            'table':'employee'
        },
    ],
    'pageTable': 'student',
    'pageTemplate': 'form',
    'pagePath': ''
}