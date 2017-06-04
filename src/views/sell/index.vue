<template>
    <div class="sell">
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <div class="sell-notice">
            <notice></notice>
        </div>
        <div class="menu">
            <div class="menu-lf">
                <!--scroller是vue-scroller插件的组件-->
                <scroller ref="left_menu">
                    <leftMenu :goodList="goodList" :categoryArr="categoryArr"></leftMenu>
                </scroller>
            </div>
            <div class="menu-rg" id="_right_menu">
                <scroller ref="right_menu">
                    <rightMenu :goodList="goodList"></rightMenu>
                </scroller>
            </div>
        </div>
        <div class="cart-list-bar" v-if="ifCartBarShow">
            <cartList></cartList>
        </div>
        <div class="shop-cart-container">
            <shopCart></shopCart>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import tool from 'utils/tool'
    import { sellerId, DOMAIN, userId } from 'store/storage'
    // 公共组件
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    //菜单组件
    import leftMenu from 'components/sell-components/left-menu'
    import rightMenu from 'components/sell-components/right-menu'
    import cartList from 'components/sell-components/cart-list'
    import shopCart from 'components/sell-components/shop-cart'
    export default {
        data() {
            return {
                titleText: '外卖',
                isBack: false,
                ifCartBarShow: false,
                sellerId: sellerId,
                goodList: {},//将菜单由原始数据的数组转为集合
                categoryArr: [],//分类id组成的数组
                listHeightArr: [],//菜品每一类的高度
                timer: 0,//计时器
                scrollTopH: 0//y轴滚动距离
            }
        },
        components: {
            headerBar,
            notice,
           
            leftMenu,
            rightMenu,
            cartList,
            shopCart
        },
        created() {
            //使用bus接收的事件要写在created
            this.onIfCartBarShow()
            this.onHideCartBar()
            this.onSelectIdx()
            this.onNumberChange()
        },
        mounted() {
            this.getFoodList()
            //监听滚动高度
            this.onRightMenuScroll()

        },
        methods: {
            //获取到所有商品的列表
            getFoodList() {
                let query = {
                    storeId: this.sellerId
                }
                xhr.TakeoutList({ query }).then((res) => {
                    let arr1 = res,
                        obj = {},
                        arr2 = [],
                        listNum = {},
                        foodItemObj = {};
                    let vuexCart = JSON.parse(this.$localStorage.get('vuex_cart'))
                    //将原始数据由数组变集合，key为菜品分类的id
                    for (let i in arr1) {
                        foodItemObj = {}
                        for (let j in arr1[i].goodListDtos) {
                            foodItemObj[arr1[i].goodListDtos[j].goodId] = arr1[i].goodListDtos[j]
                            foodItemObj[arr1[i].goodListDtos[j].goodId].ifReduceActive = false
                            foodItemObj[arr1[i].goodListDtos[j].goodId].ifPlusActive = false
                            foodItemObj[arr1[i].goodListDtos[j].goodId].cateId = arr1[i].categoryId,
                                foodItemObj[arr1[i].goodListDtos[j].goodId].goodId = foodItemObj[arr1[i].goodListDtos[j].goodId].goodId - 0,//将商品id转为Number类型,用于和vuex的比较
                                foodItemObj[arr1[i].goodListDtos[j].goodId].inventory = foodItemObj[arr1[i].goodListDtos[j].goodId].inventory - 0//库存转为Number类型
                            for (let n in vuexCart) {
                                if (arr1[i].goodListDtos[j].goodId == n) {
                                    foodItemObj[arr1[i].goodListDtos[j].goodId].num = vuexCart[n].num
                                }
                            }
                        }
                        arr1[i].foodObj = foodItemObj
                        obj[arr1[i].categoryId] = arr1[i]

                    }
                    this.goodList = obj
                    this.categoryArr = Object.keys(this.goodList)//分类keys的数组
                    this.$bus.$emit('staticIdx', this.categoryArr[0])//默认选中分类是该数组的下标为0的分类id
                    this.caucateListItemHeight()
                    
                }).catch((err) => { })
            },
            //计算每个分类的高度(标题0.8rem,菜单列表 (1.9+0.2*2)*菜单列表数组长度)
            caucateListItemHeight() {
                let titleHeight = 0.8,
                    itemHeight = 2.3,
                    times = 42,//1rem=42px//倍数
                    arr1 = [],
                    arr2 = [];
                for (let i in this.goodList) {
                    let arrLength = 0,
                        contentHeight = 0;
                    arrLength = this.goodList[i].goodListDtos.length//每个分类的具体有多少道菜
                    contentHeight = parseInt(tool.mul(tool.accAdd(tool.mul(itemHeight, arrLength), titleHeight), times))//每个分类的总长度
                    arr1.push(contentHeight)
                }
                for (let j in arr1) {
                    if (j > 0) {
                        arr2[j] = arr1[j] + arr2[j - 1]
                    } else {
                        arr2[0] = arr1[0]
                    }
                }
                this.listHeightArr = arr2
            },
            //从商品加减组件传来事件
            onNumberChange() {
                this.$bus.$on('number-change', () => {
                    this.getFoodList()
                })
            },
            //从shopCart传过来的事件
            onIfCartBarShow() {
                this.$bus.$on('toggle-cartBar', () => {
                    this.ifCartBarShow = !this.ifCartBarShow
                })
            },
            //从cartList传过来的事件
            onHideCartBar() {
                this.$bus.$on('hide-cartBar', () => {
                    this.ifCartBarShow = false
                })
            },
            //
            onSelectIdx() {
                this.$bus.$on('sendIdx', (idx) => {
                    //传过来的是分类的id,然后对比this.categoryArr 中和此id对应的元素的下标
                    for (let j in this.categoryArr) {
                        if (idx == this.categoryArr[0]) {
                            this.$refs.right_menu.scrollTo(0, 0, true)
                        } else if (idx == this.categoryArr[j]) {
                            let scrollToHeight = this.listHeightArr[j - 0 - 1]
                            this.$refs.right_menu.scrollTo(0, scrollToHeight, true)
                            this.$refs.left_menu.resize()
                            return
                        }
                    }
                })
            },
            //右边菜单滚动到一定距离切换左边菜单的选中的分类
            onScrollHeight() {
                let listHeightArr = this.listHeightArr
                for (let i in listHeightArr) {
                    if (this.scrollTopH < listHeightArr[0]) {
                        this.$bus.$emit('staticIdx', this.categoryArr[0])//下标0为选中的菜单分类
                        return
                    } else if (this.scrollTopH >= listHeightArr[i - 0 - 1] && this.scrollTopH < listHeightArr[i]) {
                        this.$bus.$emit('staticIdx', this.categoryArr[i])//下标为i的分类为选中的菜单分类
                        return
                    }
                }
            },
            //监听滚动的高度
            onRightMenuScroll() {
                this.timer = setInterval(() => {
                    let scrollTopH = this.$refs.right_menu.getPosition().top
                    this.scrollTopH = scrollTopH
                    //根据滚动距离切换选中的分类
                    this.onScrollHeight()
                }, 50)
            }
        },
        destroyed() {
            clearInterval(this.timer)//组件撤销前清除定时器
        }
    }

</script>
<style scoped>
    .sell {
        background: #f2f2f2;
    }
    
    .sell-notice {
        position: fixed;
        z-index: 99;
        width: 100%;
        top: .8rem;
    }
    
    .menu {
        position: absolute;
        top: .1rem;
        width: 100%;
        height: 12rem;
    }
    /*修改vue-scroller插件的内置样式*/
    
    .menu-lf ._v-container {
        top: .8rem !important;
        width: 25% !important;
    }
    
    .menu-rg ._v-container {
        top: .8rem !important;
        width: 75% !important;
        left: 25% !important;
    }
    /**/
    
    .cart-list-bar {
        width: 100%;
    }
    
    .shop-cart-container {
        position: fixed;
        width: 100%;
        bottom: 1rem;
    }
</style>