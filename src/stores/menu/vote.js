export default {
    menuTitle: '投票管理',
    menuIcon: 'glyphicon glyphicon-heart-empty',
    index: '4',
    menu: [{
        menuTitle: '大项维修意见征询',
        to: 'opinion',
        menuIcon: 'fa fa-envelope-open',
        index: '4-1',
        dropDownMenu: [{
            'url': 'opinion_add',
            'icon': 'fa fa-pencil',
            'text': '编辑'
        }, {
            'action': 'delete',
            'icon': 'fa fa-times',
            'text': '删除'
        }]
    }, {
        menuTitle: '业主投票',
        to: 'ownervote',
        menuIcon: 'fa fa-envelope-open',
        index: '4-2',
        dropDownMenu: [{
            'url': 'ownervoteAdd',
            'icon': 'fa fa-pencil',
            'text': '编辑'
        }, {
            'action': 'delete',
            'icon': 'fa fa-times',
            'text': '删除'
        }]
    }]
}