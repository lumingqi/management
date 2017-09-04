export default {
    'pageName': 'studentpurpose',
    'pageLable': '意向程度',
    'form': {
        'purpose':''
    },
    'formField': [
       {
            'type': 'select',
            'label': '意向程度',
            'prop': '',
            'field': 'purpose',
            'dict': function(vm){
                return 6
            }
        },
    ],
    'pageTable': 'student',
    'pageTemplate': 'form',
    'pagePath': ''
}