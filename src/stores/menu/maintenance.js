export default {
    menuTitle: '维修管理',
    menuIcon: 'glyphicon glyphicon-wrench',
    index: '2',
    menu: [{
            menuTitle: '个人维修',
            menuIcon: 'fa fa-envelope-open',
            index: '2-1',
            submenu: [{
                menuTitle: '正在维修',
                index: '2-1-1',
                to: 'beingrepaired',
                menuIcon: 'fa fa-envelope-open-o',
                dropDownMenu: [{
                    'url': 'beingrepairedAdd',
                    'icon': 'fa fa-pencil',
                    'text': '编辑'
                }, {
                    'url': 'beingrepairprice',
                    'icon': 'fa fa-pencil',
                    'text': '报价'
                },{
                    'action': 'delete',
                    'icon': 'fa fa-times',
                    'text': '删除'
                }],
            }, {
                menuTitle: '已完成维修',
                index: '2-1-2',
                to: 'completerepairc',
                menuIcon: 'fa fa-envelope-open-o',
                dropDownMenu: [{
                    'url': 'beingrepairedAdd',
                    'icon': 'fa fa-pencil',
                    'text': '编辑'
                }, {
                    'action': 'delete',
                    'icon': 'fa fa-times',
                    'text': '删除'
                }],
            }, {
                menuTitle: '已取消维修',
                index: '2-1-3',
                to: 'cancelrepair',
                menuIcon: 'fa fa-envelope-open-o',
                dropDownMenu: [{
                    'url': 'beingrepairedAdd',
                    'icon': 'fa fa-pencil',
                    'text': '编辑'
                }, {
                    'action': 'delete',
                    'icon': 'fa fa-times',
                    'text': '删除'
                }],
            }]
        },
        {
            menuTitle: '公共维修',
            menuIcon: 'fa fa-envelope-open',
            index: '2-2',
            submenu: [{
                menuTitle: '正在维修',
                index: '2-2-1',
                to: 'public_beingrepaired',
                menuIcon: 'fa fa-envelope-open-o',
                dropDownMenu: [{
                    'url': 'beingrepairedAdd',
                    'icon': 'fa fa-pencil',
                    'text': '编辑'
                }, {
                    'action': 'delete',
                    'icon': 'fa fa-times',
                    'text': '删除'
                }],
            }, {
                menuTitle: '已完成维修',
                index: '2-2-2',
                to: 'public_completerepairc',
                menuIcon: 'fa fa-envelope-open-o',
                dropDownMenu: [{
                    'url': 'beingrepairedAdd',
                    'icon': 'fa fa-pencil',
                    'text': '编辑'
                }, {
                    'action': 'delete',
                    'icon': 'fa fa-times',
                    'text': '删除'
                }],
            }, {
                menuTitle: '已取消维修',
                index: '2-2-3',
                to: 'public_cancelrepair',
                menuIcon: 'fa fa-envelope-open-o',
                dropDownMenu: [{
                    'url': 'beingrepairedAdd',
                    'icon': 'fa fa-pencil',
                    'text': '编辑'
                }, {
                    'action': 'delete',
                    'icon': 'fa fa-times',
                    'text': '删除'
                }],
            }]
        }
    ]
}