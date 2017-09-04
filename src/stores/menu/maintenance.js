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
            to: '/lesson/sclasses',
            menuIcon: 'fa fa-envelope-open-o',
        }, {
            menuTitle: '已完成维修',
            index: '2-1-2',
            to: '/lesson/manage',
            menuIcon: 'fa fa-envelope-open-o',
        }, {
            menuTitle: '已取消维修',
            index: '2-1-3',
            to: '/lesson/classes',
            menuIcon: 'fa fa-envelope-open-o',
        }]
    },
    {
        menuTitle: '公共维修',
        menuIcon: 'fa fa-envelope-open',
        index: '2-2',
        submenu: [{
            menuTitle: '正在维修',
            index: '2-2-1',
            to: '/lesson/sclasses',
            menuIcon: 'fa fa-envelope-open-o',
        }, {
            menuTitle: '已完成维修',
            index: '2-2-2',
            to: '/lesson/manage',
            menuIcon: 'fa fa-envelope-open-o',
        }, {
            menuTitle: '已取消维修',
            index: '2-2-3',
            to: '/lesson/classes',
            menuIcon: 'fa fa-envelope-open-o',
        }]
    }]
}