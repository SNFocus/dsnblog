<template>
  <div id="app">
    <a-row id="nav">
      <a-col :xs="{span:24}" :md="{span:12}">
        <a-col :xs="{span:24}" :md="{span:22}" style="padding-top:2rem;">
          <h1 class="white-shadow" style="color:white;cursor:pointer;" @click="$router.push('/home')">Focus On</h1>
          <p class="white-shadow">前端、后端学习笔记，专注成就自我</p>
        </a-col>
        <a-col :xs="{span:20,offset:2}" :md="{span:20,offset:2}" :lg="{span:18,offset:1}">
          <home-navigator></home-navigator>
        </a-col>
      </a-col>
      <a-col :span="12">
        <a-icon type="left-circle" class="backBtn" />
        <a-col
          class="router-wrapper"
          :class="{'markdown-body':isArticlePage}"
          :xs="{span:0}"
          :md="{span:0}"
          :lg="{span:24}"
        >

          <router-view />
        </a-col>
      </a-col>

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
    </a-row>
  </div>
</template>
<script>
import HomeNavigator from '@/components/HomeNavigator'
export default {
  data() {
    return {
      isArticlePage: false
    }
  },
  watch: {
    $route( val ) {
      this.isArticlePage = val.path.includes( '/article/' )
      console.log(val.path,this.isArticlePage)
    }
  },
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
  width: 100%;
  height: 100%;
  background: #ddd url("~@/assets/images/bg1.png") no-repeat;
  background-position: 30% bottom;
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

.router-wrapper {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 3rem !important;
  z-index: 9;
  color: #333;
  text-align: left;
  height: 100vh;
  overflow-y: auto;
}

.markdown-body{
  background:#eee;
}

/* .backBtn{
  position: absolute;
  left: 0;
} */
</style>
