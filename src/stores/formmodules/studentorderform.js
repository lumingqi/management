export default {
    'pageName': 'orderform',
    'pageLable': '报名&缴费',
    'student': true,
    'form': {
        'classes_id': '',
        'course_id': '',
        'origin_times': 0,
        'refund_status': 0,
        'back_amount': 0,
        'unit_price': 0,
        'origin_amount': 0,
        'has_discount': false,
        'has_present': false,
        'c_unit_price': '',
        'order_remark': '',
        'present_times': 0,
        'discount': 0,
        'discount_amount': 0,
        'order_amount': 0,
        'pay_amount':0,
        'unpay_amount': 0,
        'pay_status': 0,
        'student_id': '',
        'order_no': '',
        'order_type': 1,
        'totletime': 0,
        'body': ''
    },
    'selectChange':function (vm,obj){
        vm.classes_name = obj.text
    },
    'numberChange': function (vm, obj) {
        if (obj.field == 'discount') {
            vm.localdata.form.discount_amount = vm.localdata.form.origin_amount * vm.localdata.form.discount / 100
        }
        let discount_amount = 0
        if (vm.localdata.form.has_discount) {
            discount_amount = vm.localdata.form.discount_amount
        }
        vm.localdata.form.origin_amount = vm.localdata.form.origin_times * vm.localdata.form.unit_price
        let origin_times = Number(vm.localdata.form.origin_times)
        if (origin_times != 0) {
            vm.localdata.form.c_unit_price = (vm.localdata.form.origin_amount - discount_amount) / origin_times
        }

        vm.localdata.form.order_amount = vm.localdata.form.origin_amount - discount_amount
        vm.localdata.form.unpay_amount = vm.localdata.form.order_amount
        if (vm.localdata.form.has_present) {
            vm.localdata.form.totletime = Number(vm.localdata.form.origin_times) + Number(vm.localdata.form.present_times)
        } else {
            vm.localdata.form.totletime = Number(vm.localdata.form.origin_times)
        }
    },
    'beforeSave': function (vm) {
        vm.localdata.form.order_no = 'LB' + vm.moment().format('YYYYMMDDssSSSS')
        vm.localdata.form.body = `班课[${vm.classes_name}]${vm.localdata.form.totletime}次`
    },
    'formField': [
        {
            'type': 'selectSearch',
            'label': '班级',
            'prop': 'classes_id',
            'field': 'classes_id',
            'text': '请选择',
            'showdialog': 'selectclassesdialog',
            'search': 'class_name',
            'table': 'classes'
        },
        {
            'type': 'numberinput',
            'label': '报名课次',
            'prop': 'origin_times',
            'field': 'origin_times',
            'text': '次'
        },
        {
            'type': 'numberinput',
            'label': '课次单价',
            'prop': 'unit_price',
            'field': 'unit_price',
            'text': '元/次'
        },
        {
            'type': 'numberinput',
            'label': '订单金额',
            'prop': '',
            'field': 'origin_amount',
            'text': '元',
            'disabled': true
        },
        {
            'type': 'switchdiscount',
            'switchlabel1': '折扣金额',
            'switchlabel2': '折扣计算器',
            'prop': '',
            'field1': 'discount_amount',
            'field2': 'discount',
            'fieldActive1': 'has_discount',
            'text1': '元',
            'text2': '%折',
        },
        {
            'type': 'switchnumber',
            'label': '赠送课次',
            'prop': '',
            'field': 'present_times',
            'fieldActive': 'has_present',
            'text': '次'
        },
        {
            'type': 'numberinput',
            'label': '课耗单价',
            'prop': '',
            'field': 'c_unit_price',
            'text': '元/次'
        },
        {
            'type': 'input',
            'label': '订单备注',
            'prop': '',
            'field': 'order_remark'
        },
        {
            'type': 'textTag',
            'label': '应缴金额',
            'prop': '',
            'field': 'order_amount',
            'text': '元'
        },
        {
            'type': 'textTag',
            'label': '总课次',
            'prop': '',
            'field': 'totletime',
            'text': '次'
        },
    ],
    'pageTable': 'order',
    'pageTemplate': 'form',
    'pagePath': '',
    rulesData(vm) {
        return {
            classes_id: [
                { required: true, message: '请选择班级', trigger: 'change' }
            ],
            origin_times: [
                { required: true,validator: vm.validateNumberinput, message: '请输入报名课次',trigger: 'blur' }
            ],
            unit_price: [
                { required: true,validator: vm.validateNumberinput, message: '请输入课次单价',trigger: 'blur' }
            ],
        }
    }
}