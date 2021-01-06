<template>
  <div id="app">
    <nav-bar/>
    <BaseDateFilter />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  created(){
    return this.$store.dispatch('getList')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content{
margin-left: 250px;
margin-top: 30px;
}
.content-grid{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 15px;
  margin: 4%;
  
  //grid-auto-rows: minmax(100px, auto);
}
</style>
