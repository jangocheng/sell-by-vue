<template>
    <div class="recomends">
        <div class="recommend-title">推荐商品</div>
        <div v-for="recommendItem of recommendObj">
            <recommendItem :recommendItem="recommendItem"></recommendItem>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, DOMAIN } from 'store/storage'
    import recommendItem from 'components/index-components/recommend-item'
    export default {
        data() {
            return {
                sellerId: sellerId,
                recommendObj: {}
            }
        },
        components: {
            recommendItem
        },
        created() {
            this.getRecommendGoods()
        },
        methods: {
            // 首页外卖推荐
            getRecommendGoods() {
                let query = {
                    storeId: this.sellerId,
                }
                xhr.getRecommendGoods({ query }).then(res => {
                    let arr = res,
                        obj = {};
                    arr.map((item) => {
                        obj[item.id] = item
                    })

                    this.recommendObj = obj
                }).catch((err) => {
                    console.log('推荐 fail', err)
                })
            },
        }
    }

</script>
<style scoped>
    .recomends {
        background: #fff;
        margin-top: 0.2rem;
    }
    
    .recommend-title {
        height: 0.8rem;
        line-height: 0.8rem;
        padding-left: 0.2rem;
        border-bottom: 0.01rem solid #ddd;
    }
</style>