<template>
    <div class="header-bar">
        <a href="javascript:history.go(-1)" v-if="isBack">
            <span class="fa fa-angle-left icon-back"><span class="back-text">返回</span></span>
        </a>

        <router-link :to="{name:'index'}" v-if="isHome">
            <span class="fa fa-angle-left icon-back"><span class="back-text">首页</span></span>
        </router-link>


        <p class="header-bar-text">{{titleText}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            titleText: {
                Type: String
            },
            isBack: {
                Type: Boolean
            },
            isHome: {
                Type: Boolean
            }
        }
    }

</script>
<style scoped>
    .header-bar {
        position: fixed;
        top: 0;
        z-index: 999;
        width: 100%;
        background: #fd7144;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #fff;
    }
    
    .header-bar-text {
        text-align: center;
    }
    
    .icon-back {
        position: absolute;
        left: 0.3rem;
        display: block;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.5rem;
        color: #fff;
    }
    
    .back-text {
        padding-left: 0.1rem;
        position: relative;
        top: -0.08rem;
        line-height: 0.8rem;
        height: 0.8rem;
        font-size: 0.28rem;
    }
</style>