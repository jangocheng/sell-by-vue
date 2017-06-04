<template>
    <div class="index-footer">
        <p>抵奥信息公司技术支持</p>
        <p>电话：{{telephone}}</p>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId } from 'store/storage'
    export default {
        data() {
            return {
                sellerId: sellerId,
                telephone:''
            }
        },
        created(){
            this.getSellerInfo()
        },
        methods:{
            //获取商家信息 
            getSellerInfo() {
                let query = {
                    storeId: this.sellerId,
                }
                xhr.getSellerInfo({ query }).then(res => {
                    this.telephone = res.Tele_Phone
                }).catch((err) => {
                    console.log('test fail', err)
                })
            }, 
        }
    }

</script>
<style scoped>
    .index-footer {
        padding-top: 0.1rem;
        margin-bottom: 1rem;
        height: 1.4rem;
        line-height: 0.55rem;
        text-align: center;
    }
</style>