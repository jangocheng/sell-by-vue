<template>
    <div class="right-menu-item">
        <div class="category-text">{{good.categoryName}}</div>
        <ul>
            <li v-for="foodItem of good.foodObj">
                <foodItem :foodItem="foodItem"></foodItem>
            </li>
        </ul>
    </div>
</template>
<script>
    import foodItem from 'components/sell-components/food-item'
    export default {
        props: {
            'good': {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            foodItem
        }
    }

</script>
<style scoped>
    .category-text {
        padding-left: 0.2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #f2f2f2;
    }
</style>