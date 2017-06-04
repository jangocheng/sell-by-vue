<template>
    <div class="index">
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <indexHeader></indexHeader>
        <div class="index-notice">
            <notice></notice>
        </div>
        <card></card>
        <recommendGoods></recommendGoods>
        <indexFooter></indexFooter>
        
    </div>
</template>
<script>
    import headerBar from 'components/common-components/header-bar'
    import indexHeader from 'components/index-components/index-header'
    import notice from 'components/common-components/notice'
    import card from 'components/my-card-components/card.vue'
    import recommendGoods from 'components/index-components/recommend-goods'
    import indexFooter from 'components/index-components/index-footer'
    
    export default {
        data() {
            return {
                titleText: '抵奥云饭堂',
                isBack:false
            }
        },
        components: {
            headerBar,
            indexHeader,
            notice,
            card,
            recommendGoods,
            indexFooter
        }
    }

</script>
<style scoped>
    .index {
        background: #f5f5f5;
    }
    
    .index-notice {
        border-top: 0.01rem dashed #fff;
        background: #fd7144;
        color: #fff;
    }
    
    .notice-bar {
        background: #fd7144 !important;
    }
</style>