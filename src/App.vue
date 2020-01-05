<template>
  <div id="app">
    <div id="nav">
      <a-row>
        <a-col :xs="{span:24}" :md="{span:22}">
          <h1 class="white-shadow" style="color:white;">Focus On</h1>
          <p class="white-shadow">前端、后端学习笔记，专注成就自我</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="{span:20,offset:2}" :md="{span:20,offset:1}" :lg="{span:7,offset:1}">
          <home-navigator></home-navigator>
        </a-col>
        <a-col :xs="{span:0}" :md="{span:0}" :lg="{span:12,offset:4}">
          <router-view />
        </a-col>
      </a-row>

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
    </div>
  </div>
</template>
<script>
import HomeNavigator from '@/components/HomeNavigator'
export default {
  components: {
    'home-navigator': HomeNavigator
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#container {
  position: absolute;
}

#nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #ddd url("~@/assets/images/bg1.png") no-repeat;
  background-position: 35% bottom;
  color: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
@media screen and (max-width: 959px) {
  #nav {
    background-position-x: center;
  }
}

.white-shadow {
  text-shadow: 0 0 4px rgb(255, 255, 255, 0.6);
}
</style>
