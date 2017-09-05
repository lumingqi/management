<template>
    <div>
        <p>
            <router-link to="/user/bar">/user/bar</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
<script>
import menu from '~/stores/menu'
export default {
    name: 'app',
    data() {
        return {

        }
    },
    components: {
    },
    computed: {},
    watch: {
        '$route.path': {
            handler(val) {
                console.log(val)
            }
        }
    },
    methods: {}
}
</script>
