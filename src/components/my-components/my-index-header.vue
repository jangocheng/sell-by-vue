<template>
    <div class="my-index-header">
        <div class="avatar">
            <img :src="fullInfo.ico_path" alt="">
        </div>
        <div class="menber">
            <img v-if="fullInfo.Level==1" src="/static/images/vip-normal.png" alt="">
            <img v-if="fullInfo.Level==2" src="/static/images/vip-gold.png" alt="">
            <img v-if="fullInfo.Level==3" src="/static/images/vip-pt.png" alt="">
            <img v-if="fullInfo.Level==4" src="/static/images/vip-diamond.png" alt="">
        </div>
        <p>{{fullInfo.userName}}</p>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { userId } from 'store/storage'
    export default {
        data() {
            return {
                userId: userId,
                fullInfo: {}
            }
        },
        created() {
            this.getUserFullInfo()
        },
        methods: {
            //获取用户全部信息
            getUserFullInfo() {
                let query = { openid: this.userId }
                xhr.getUserFullInfo({ query }).then((res) => {
                    this.fullInfo = res
                }).catch((err) => { console.log('info err', err) })
            },
        }
    }

</script>
<style scoped>
    .my-index-header{position: relative; width: 100%; height: 2.8rem; background: url('/static/images/background.png') no-repeat 100% 100%;} .my-index-header img{width: 100%; height: 100%;} .avatar{position: absolute; left: 44%; top: 25%; width: 1.2rem; border: 0.05rem solid #fff; background: #fff; height: 1.2rem; border-radius: 100%;} .avatar img{width: 100%; height: 100%; border-radius: 100%;} .menber{position: absolute; left: 56%; top: 50%; width: 0.4rem; height: 0.4rem; border: 0.02rem solid #fff; border-radius: 100%;} .my-index-header p{position: absolute; bottom: 10%; width: 100%; text-align: center; color: #fff;}
</style>