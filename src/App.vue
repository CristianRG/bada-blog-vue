<template>
  <div id="app">
    <router-view />
  </div>

</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import MainApp from './components/MainApp.vue'

export default {
  name: 'App'
}
</script>

<style>
#app {
  overflow: hidden;
}

:root {
  --animate-duration: 800ms;
  --animate-delay: 0.2s;
}
</style>