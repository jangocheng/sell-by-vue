<template>
  <div id="app">

    <router-view></router-view>
    <div v-if="ifTabShow">
      <tabBar></tabBar>
    </div>
  </div>
</template>

<script>
  import tabBar from 'components/common-components/tab-bar'
  export default {
    name: 'app',
    components: {
      tabBar
    },
    computed: {
      ifTabShow() {
        let name = this.$route.name
        if (name == 'index' || name == 'sell' || name == 'my') {
          return true
        } else {
          return false
        }
      }
    },

  }

</script>

<style scoped>
  #app {
    position: absolute;
    top: 0.8rem;
    width: 100%;
  }
</style>