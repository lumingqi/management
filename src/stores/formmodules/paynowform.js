export default {
    'pageName': 'paynowform',
    'pageLable': '缴费',
    'student': true,
    'form': {
        'order_id': '',
        'student_id': '',
        'classes_id': '',
        'money_pay_amount': 0,
        'pay_type': 0,
        'use_balance': false,
        'balance_pay_amount': 0,
        'region_oe_id': '',
        'print': false
    },
    'numberChange': function (vm, obj) {
        if (vm.localdata.form.use_balance) {
            if (vm.localdata.form.balance_pay_amount == 0 ){
                if (vm.order.unpay_amount>vm.currStudent.amount){
                    vm.localdata.form.balance_pay_amount = vm.currStudent.amount
                }else{
                    vm.localdata.form.balance_pay_amount = vm.order.unpay_amount
                }
            }else if (vm.localdata.form.balance_pay_amount>vm.order.unpay_amount){
                vm.localdata.form.balance_pay_amount = vm.order.unpay_amount
            }
            vm.localdata.form.money_pay_amount = vm.order.unpay_amount - vm.localdata.form.balance_pay_amount
        } else {
            vm.localdata.form.money_pay_amount = vm.order.unpay_amount
        }
        console.log( vm.order.unpay_amount , vm.localdata.form.balance_pay_amount)
    },
    'created': function (vm) {
        if (vm.$store.state.dialogs.dailogdata) {
            vm.order = vm.$store.state.dialogs.dailogdata
            vm.currStudent = vm.$store.state.envs.currStudent
        }
    },
    'beforeSave': function (vm) {
        vm.localdata.form.order_id = vm.order._id
        vm.localdata.form.classes_id = vm.order.classes_id
    },
    'afterSave': function (vm, obj) {
        return new Promise((resolve, reject) => {
            function updateOrder() {
                let unpay_amount = vm.order.unpay_amount - vm.localdata.form.money_pay_amount
                if (vm.localdata.form.use_balance) {
                    unpay_amount -= vm.localdata.form.balance_pay_amount
                }
                let pay_status = 1
                if (unpay_amount == 0) {
                    pay_status = 2
                } else if (unpay_amount == vm.order.order_amount) {
                    pay_status = 0
                }
                vm.order.unpay_amount = unpay_amount
                vm.order.pay_amount = vm.order.order_amount - unpay_amount
                vm.updateTeble('order', vm.order._id, {
                    'pay_status': pay_status,
                    'unpay_amount': unpay_amount,
                    'pay_amount': vm.order.pay_amount
                }).then(() => {
                    resolve(obj)
                })
            }
            function setStudentAmountOrder() {
                let amount = Number(vm.currStudent.amount) - Number(vm.localdata.form.balance_pay_amount)
                vm.updateTeble('student', vm.currStudent._id, {
                    'amount': amount
                }).then(() => {
                    updateOrder()
                })
            }
            function setStudentAmount() {
                let amount = Number(vm.currStudent.amount) + Number(vm.order.back_amount) + Number(vm.order.origin_amount)
                vm.updateTeble('student', vm.currStudent._id, {
                    'amount': amount
                }).then(() => {
                    updateOrder()
                })
            }
            if (vm.order.order_type == 2) {
                setStudentAmount()
            } else if (vm.order.order_type == 1) {
                setStudentAmountOrder()
            }
        })
    },
    'formField': [
        {
            'type': 'vmsubtext',
            'label': '订单号',
            'prop': 'order',
            'subprop': 'order_no'
        },
        {
            'type': 'vmsubtext',
            'label': '订单内容',
            'prop': 'order',
            'subprop': 'body'
        },
        {
            'type': 'vmsubtext',
            'label': '订单金额',
            'prop': 'order',
            'subprop': 'order_amount',
            'text': '元'
        },
        {
            'type': 'vmsubtext',
            'label': '已缴金额',
            'prop': 'order',
            'subprop': 'pay_amount',
            'text': '元'
        },
        {
            'type': 'vmsubtext',
            'label': '未缴金额',
            'prop': 'order',
            'subprop': 'unpay_amount',
            'text': '元'
        },
        {
            'type': 'orderpaystudent',
            'label': '余额付款',
            'prop': '',
            'field': 'balance_pay_amount',
            'fieldActive': 'use_balance',
            'text': '元'
        },
        {
            'type': 'numberinput',
            'label': '现款缴费',
            'prop': 'money_pay_amount',
            'field': 'money_pay_amount',
            'text': '元'
        },
        {
            'type': 'select',
            'label': '缴费方式',
            'prop': 'region_oe_id',
            'field': 'region_oe_id',
            'dict': function (vm) {
                let dict = 2
                return dict
            }
        },
    ],
    'pageTable': 'pay',
    'pageTemplate': 'form',
    'pagePath': '',
    rulesData: function (vm) {
        return {
            money_pay_amount: [
                { required: true, validator: vm.validateNumberinput, message: '请输入金额', trigger: 'blur' }
            ],
            region_oe_id: [
                { required: true, message: '请选择缴费方式', trigger: 'change' }
            ]
        }
    }
}
