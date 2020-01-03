<template>
  <div id="app">
    <div id="nav">
      <!-- 前端 后端 工具 面试 demo -->
      <section>
        <h1 class="white-shadow">Focus On</h1>
        <p class="white-shadow">学习前端、后端笔记，专注成就自我</p>
        <section class="home-card-wrapper">
          <div class="home-card"></div>
        </section>
      </section>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(220, 221, 216) url("~@/assets/bg.jpg") no-repeat;
  background-position: 45% 0;
  background-size: 400px 100%;
  color: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.home-card-wrapper {
}

.white-shadow{
  text-shadow: 0 0 4px rgb(255, 255, 255,.6);
}
</style>
