<template>
  <div id="app">
    <NavBar/>
    <transition>
      <router-view  class="animate__animated animate__fadeInRight"/>
    </transition>
  </div>
  
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/navbar/NavBar.vue'
//import MainApp from './components/MainApp.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
  #app{
    overflow: hidden;
  }
  :root {
  --animate-duration: 800ms;
  --animate-delay: 0.2s;
  }
</style>