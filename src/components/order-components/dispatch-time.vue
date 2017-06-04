<template>
    <div class="time-bar">
        <div class="mask"></div>
        <div class="content">
            <div class="title">
                <el-row>
                    <el-col :span="4"><span @click="cancel" style="color: #0cce6b">取消</span></el-col>
                    <el-col :span="16">配送时间</el-col>
                    <el-col :span="4"><span @click="sure" style="color: #0cce6b">确定</span></el-col>
                </el-row>
            </div>
            <div class="itemList">
                <div class="item" :class="{'active':activeIdx==index}" v-for="(item,index) in timeArr" @click="selectTime(item,index)">
                    {{item}}
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId } from 'store/storage'
    export default {
        data() {
            return {
                timeArr: [],
                activeIdx: 0,
                sellerId: sellerId,
                isNotServer: false
            }
        },
        mounted() {
            this.getReserve()
        },
        methods: {
            //获取支持配送时间
            getReserve() {
                let query = { id: this.sellerId }
                xhr.getReserve({ query }).then((res) => {
                    let originalTimeArr = res,
                        finalTimeArr = [];
                    if (originalTimeArr.length == 0) {
                        this.isNotServer = true//不再配送时间
                    }
                    for (let j in originalTimeArr) {
                        finalTimeArr[j] = originalTimeArr[j].substring(11, 16)
                    }
                    this.timeArr = finalTimeArr
                    this.originalTimeArr = originalTimeArr

                }).catch((err) => { console.log(err) })
            },
            cancel() {
                this.$emit('cancel')
            },
            sure() {

                this.$emit('sure')
            },
            selectTime(txt, index) {
                this.$emit('select-time', txt)
                this.activeIdx = index
            }
        }
    }

</script>
<style scoped>
    .time-bar, .mask{position: fixed; top: 0; bottom: 0; left: 0; right: 0;} .mask{background: rgba(0, 0, 0, .5)} .content{position: absolute; bottom: 0; width: 100%; background: #fff;} .title{height: .8rem; line-height: .8rem; text-align: center; border-bottom: 0.01rem solid #999;} .itemList{margin: 0 auto; width: 50%; max-height: 3.2rem; overflow-y: scroll;} .item{height: .8rem; line-height: .8rem; text-align: center;} .item + .item{border-top: 0.01rem solid #e5e6e7;} .active{color: #fd7144; border-bottom: 0.01rem solid #fd7144;}
</style>