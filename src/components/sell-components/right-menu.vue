<template>
    <div class="right-menu">
        <ul>
            <li v-for="(good,index) of goodList" >
                <rightMenuItem :good="good"></rightMenuItem>
            </li>
        </ul>
    </div>
</template>
<script>
    import rightMenuItem from 'components/sell-components/right-menu-item'
    //ui组件

    export default {
        props: {
            'goodList': {
                type: Object,
                default: {}
            }
        },
        components: {
            rightMenuItem
        }
    }

</script>
<style scoped>
    .right-menu {
        top: 2rem;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        overflow-y: scroll;
    }
</style>