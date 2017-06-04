<template>
    <div class="tab-bar">
        <el-row>
            <el-col :span="8">
                <router-link :to="{name:'index'}" tag="div" active-class="tab-active">
                    <div class="item">
                        <img src="/static/images/home-0.png" v-show="name !=='index' " alt="">
                        <img src="/static/images/home-1.png" v-show="name ==='index' " alt="">
                        <p>首页</p>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link :to="{name:'sell'}" tag="div" active-class="tab-active">
                    <div class="item">
                        <img src="/static/images/sell-0.png" v-show="name !=='sell' " alt="">
                        <img src="/static/images/sell-1.png" v-show="name ==='sell' " alt="">
                        <p>外卖</p>
                    </div>
                </router-link>

            </el-col>
            <el-col :span="8">
                <router-link :to="{name:'my'}" tag="div" active-class="tab-active">
                    <div class="item">
                        <img src="/static/images/my-0.png" v-show="name !=='my' " alt="">
                        <img src="/static/images/my-1.png" v-show="name ==='my' " alt="">
                        <p>我的</p>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        computed: {
            name() {
                return this.$route.name
            }
        }
    }

</script>
<style scoped>
    .tab-bar{position: fixed; bottom: 0; background: #fff; padding: 0.1rem 0; width: 100%; height: 1rem; border-top: 0.01rem solid #ddd; text-align: center; color: #999;} .tab-bar span{font-size: 0.5rem;} .tab-bar p{font-size: 0.26rem;} .tab-bar img{width: .4rem; height: .4rem;} .tab-active{color: #fd7144;}
</style>