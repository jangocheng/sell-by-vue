<template>
    <div class="notice-bar">
        <el-row>
            <el-col :span="1">
                <span class="fa fa-volume-up"></span>
            </el-col>
            <el-col :span="23" class="notice-rg"> {{notice}}</el-col>
        </el-row>

    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId } from 'store/storage'
    export default {
        data() {
           return{
                sellerId: sellerId,
                notice:''
           }
        },
        created() {
            this.getSellerInfo()
        },
        methods: {
            //获取商家信息 
            getSellerInfo() {
                let query = {
                    storeId: this.sellerId,
                }
                xhr.getSellerInfo({ query }).then(res => {
                    this.notice = res.Notice
                }).catch((err) => {
                    console.log('test fail', err)
                })
            }
        }
    }

</script>
<style scoped>
    .notice-bar {
        padding: 0.2rem;
        background: #fff;
    }
    
    .notice-rg {
        padding-left: 0.1rem;
    }
</style>