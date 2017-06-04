<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <notice></notice>
        <div class="hr"></div>
        <div class="content">
            <mt-navbar v-model="selected">
                <mt-tab-item v-for="(item,index) in  titleArr" :id="index" :data-index="item.value" @click="tab(index)">{{item.name}}</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container :swipeable="true" v-model="active">
                <mt-tab-container-item id="tab-container0">
                    <div v-if="selected==0">
                        <div v-for="orderItem in orderList">
                            <orderItem :orderItem="orderItem"></orderItem>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container1">
                    <div v-if="selected==1">
                        <div v-for="orderItem in orderList">
                            <orderItem :orderItem="orderItem"></orderItem>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                    <div v-if="selected==2">
                        <div v-for="orderItem in orderList">
                            <orderItem :orderItem="orderItem"></orderItem>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>


    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, userId } from 'store/storage'
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    import orderItem from 'components/order-components/order-item'
    import { Navbar, TabContainer, TabContainerItem } from 'mint-ui'
    export default {
        data() {
            return {
                titleText: '我的订单',
                isBack: true,
                selected: 0,
                sellerId: sellerId,
                UserId: userId,
                active: 'tab-container0',
                orderList: [],
                titleArr: {
                    0: { name: '待接单', value: 0 },
                    1: { name: '配送中', value: 1 },
                    2: { name: '全部', value: 2 }
                }
            }
        },
        created() {
            let status2 = 20
            this.getOrderList(status2)//默认//待接单
        },
        methods: {
            tab(idx) {
                let [status2, status4, status8] = [20, 40, '']//待接单//配送//全部
                if (idx == 0) {
                    this.getOrderList(status2)
                } else if (idx == 1) {
                    this.getOrderList(status4)
                } else if (idx == 2) {
                    this.getOrderList(status8)
                }
            },
            //获取订单列表
            getOrderList(status) {
                let query = {
                    storeId: this.sellerId,
                    openid: this.UserId,
                    orderStatus: status
                }
                xhr.getMyOrderList({ query }).then((res) => {
                    this.orderList = res
                }).catch((err) => { console.log(err) })
            },
        },
        watch: {
            selected(val) {
                this.active = 'tab-container' + val;
            },
            active(val) {
                this.selected = parseInt(val.substr(val.length - 1, 1), 10)
            }
        },
        components: {
            headerBar,
            notice,
            orderItem,
            'mt-navbar': Navbar,
            'mt-tab-container': TabContainer,
            'mt-tab-container-item': TabContainerItem,
        }
    }

</script>
<style scoped>
    .hr {
        width: 100%;
        height: 0.2rem;
        background: #f2f2f2;
    }
    
    .content {
        background: #fff;
    }
    
    .tab {
        display: flex;
        width: 100%;
    }
    
    .tab-item {
        flex: 1;
    }
    
    .mint-navbar .mint-tab-item.is-selected {
        color: #fd7144;
        border-bottom: 0.03rem solid #fd7144;
    }
</style>