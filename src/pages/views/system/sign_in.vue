<template>
    <div class="modal-over bg-black" style="z-index: 6000;    margin: -100px 0px 0px -100px;">
        <div class="modal-center text-center" style="width:200px;margin:-100px 0 0 -100px">
            <div class="thumb-lg">
                <img class="img-circle" src="/assets/images/a0.jpg">
            </div>
            <p class="h4 m-t m-b">
                <span style="color:white;" v-if="$store.state.system.name.length>0" >{{$store.state.system.name}}</span>
            </p>
            <div class="input-group" v-if="$store.state.system.name.length==0">
                <input type="text" v-model="localdata.form.user" class="form-control text-sm  no-border" placeholder="请输入账号" style="width:198px;    border-top-left-radius : 50px !important;border-top-right-radius: 50px !important;border-bottom-right-radius: 50px !important;border-bottom-left-radius: 50px !important;">
                <span class="input-group-btn"></span>
            </div>
            <br>
            <div class="input-group">
                <input type="password" v-on:keyup.enter="login" v-model="localdata.form.pwd" class="form-control text-sm btn-rounded no-border" placeholder="请输入密码" style="   border-top-left-radius : 50px !important;border-bottom-left-radius: 50px !important;">
                <span class="input-group-btn circles">
                    <a @click="login" class="btn btn-success btn-rounded no-border" style="height:34px ;  border-top-left-radius : 0px !important;border-top-right-radius: 50px !important;border-bottom-right-radius: 50px !important;border-bottom-left-radius: 0px !important;">
                        <i class="fa fa-arrow-right"></i>
                    </a>
                </span>
            </div>
        </div>
    </div>
</template>
<style >

</style>
<script>
import md5 from '~/api/md5.min.js'

export default {
    name: 'signIn',
    data() {
        let localdata = {
            form: {
                user: '',
                pwd: ''
            }
        }
        return {
            localdata,
        }
    },
    computed: {},
    watch: {},
    methods: {
        login() {
            let vm = this
            if (this.$store.state.system.name.length > 0) {
                this.localdata.form.user = this.$store.state.system.tel
            }
            this.localdata.form.pwd = md5(this.localdata.form.pwd)
            let account = { user: this.localdata.form.user, pwd: this.localdata.form.pwd }
            vm.$store.dispatch(this.types.LOGIN_API, account).then((data) => {
                if (data.code == 0) {
                    this.getTableApidata('dictionary')
                    this.$store.commit('user', data.account)
                    this.$store.commit('router', '/web')
                } else {
                    this.$store.commit('user', { name: '', tel: '', _id: '' })
                    this.$message({
                        message: '用户或密码错误！',
                        type: 'error'
                    })
                }
            })
            this.localdata.form = {
                user: '',
                pwd: ''
            }
        }
    }
}
</script>
