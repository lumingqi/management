import finishadd from '~/pages/dialogs/student/finishadd.vue'
import edit_info from '~/pages/dialogs/student/edit_info.modal.vue'
import order from '~/pages/dialogs/student/order.modal.vue'
import pay_now from '~/pages/dialogs/student/pay_now.modal.vue'
import unpay_clear from '~/pages/dialogs/student/unpay_clear.modal.vue'
import printer_receipt from '~/pages/dialogs/student/printer_receipt.vue'
import orderandpay from '~/pages/dialogs/student/orderandpay.vue'

import cate from '~/pages/dialogs/lesson/cate.vue'
import new_lesson from '~/pages/dialogs/lesson/new_lesson.modal.vue'
import PrintOrder from '~/pages/dialogs/lesson/PrintOrder.vue'

import reset_account from '~/pages/dialogs/system/reset_account.modal.vue'
import authority from '~/pages/dialogs/system/authority.vue'

var pages = {}
pages['lb-finishadd'] = finishadd
pages['lb-editinfomodal'] = edit_info
pages['lb-ordermodal'] = order
pages['lb-paynowmodal'] = pay_now
pages['lb-unpayclearmodal'] = unpay_clear
pages['lb-printerreceipt'] = printer_receipt
pages['lb-orderandpay'] = orderandpay

pages['lb-cate'] = cate
pages['lb-newlessonmodal'] = new_lesson
pages['lb-printerorder'] = PrintOrder

pages['lb-resetaccountmodal'] = reset_account
pages['lb-authority'] = authority

export default pages