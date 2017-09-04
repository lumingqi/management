export default {
    menuTitle: '人员管理',
    menuIcon: 'glyphicon glyphicon-user',
    index: '1',
    menu: [{
        menuTitle: '正在使用人员',
        menuIcon: 'fa fa-envelope-open',
        index: '1-1',
        submenu: [{
            menuTitle: '业主',
            index: '1-1-1',
            to: 'useingowner',
            menuIcon: 'fa fa-envelope-open-o',
        }, {
            menuTitle: '物业处人员',
            index: '1-1-2',
            to: 'useingproperty',
            menuIcon: 'fa fa-envelope-open-o',
        }]
    },
    {
        menuTitle: '后台人员资料',
        menuIcon: 'fa fa-envelope-open',
        index: '1-2',
        submenu: [{
            menuTitle: '业主',
            index: '1-2-1',
            to: '/student/recording',
            menuIcon: 'fa fa-envelope-open-o',
        }, {
            menuTitle: '物业处人员',
            index: '1-2-2',
            to: '/student/list1',
            menuIcon: 'fa fa-envelope-open-o',
        }]
    }]
}