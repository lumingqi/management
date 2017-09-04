<template>
    <div class="wrapper bg-light b-a m-t-xs">
        <p class="m-t m-b text-success text-2x">
            <i class="fa fa-check-circle-o"></i>订单创建成功！
        </p>
        <p>
            订单编号:
            <span class="text-info">{{stepsdata.order_no}}</span>，应缴金额:
            <span class="text-success">{{stepsdata.order_amount}}</span>元,请选择接下来的操作.
        </p>
        <div class="row no-gutter m-t">
            <div class="col-xs-3">
                <button type="button" @click="handleShowDialog('lb-paynowmodal',stepsdata)" class="btn btn-primary btn-block">
                    <i class="icon-wallet"></i>缴费
                </button>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
export default {
    name: 'orderandpay',
    props: ['stepsdata'],
    data() {
        let localdata = {}
        return {
            localdata,
        }
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>
