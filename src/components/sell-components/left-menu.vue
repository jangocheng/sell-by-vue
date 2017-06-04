<template>
    <div class="left-menu">
        <div v-for="(item,index) in goodList">
            <div class="item " :class="{'active':selectIdx==index}">
                <a href="javascript:void(0)" @click="goAnchor(index)">{{item.categoryName}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            'goodList': {
                type: Object,
                default: {}
            },
            'categoryArr': {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                selectIdx: 0,
            }
        },

        mounted() {
            this.staticSelected()
        },
        methods: {
            //跳到锚点
            goAnchor(idx) {
                this.selectIdx = idx
                this.$bus.$emit('sendIdx', idx)
            },
            //默认选中第一位
            staticSelected() {
                this.$bus.$on('staticIdx', (idx) => {
                    this.selectIdx = idx
                })

            }

        }
    }

</script>
<style scoped>
    .item {
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background: #f2f2f2;
    }
    
    .item + .item {
        border-top: .02rem solid #e5e6e7;
    }
    
    .active {
        background: #fff;
        border-left: 0.05rem solid #ff5722;
        color: #ff5722;
    }
</style>