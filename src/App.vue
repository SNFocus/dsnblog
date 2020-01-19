<template>
  <div id="app">
    <a-row id="nav">
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" style="height:100%;">
        <a-col :xs="{ span: 24 }" :md="{ span: 22 }" style="padding-top:2rem;">
          <h1
            class="white-shadow"
            style="color:white;cursor:pointer;"
            @click="$router.push('/home').catch(err => {})"
          >
            Focus On
          </h1>
          <p class="white-shadow">前端、后端学习笔记，专注成就自我</p>
        </a-col>
        <a-col :span="22" :offset="1" style="max-width:550px;margin-top:10%;">
          <home-navigator></home-navigator>
        </a-col>
      </a-col>
      <a-col
        :xs="{ span: 24 }"
        :md="{ span: 12 }"
        class="router-wrapper"
        :class="{ show: showRouterPage }"
      >
        <a-icon
          v-show="isArticlePage"
          type="left-circle"
          class="backBtn"
          @click="routerBack"
        />
        <a-col
          class="router"
          :class="{ 'markdown-body': isArticlePage }"
          :span="24"
        >
          <router-view />
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import HomeNavigator from "@/components/HomeNavigator.vue";
@Component({
  components: {
    "home-navigator": HomeNavigator
  }
})
export default class App extends Vue {
  isArticlePage: boolean = false;

  get showRouterPage() {
    let showPage: boolean = false;
    if (this.$route.path === "/home") {
      if (this.$route.query.type) {
        showPage = true;
      }
    } else {
      showPage = true;
    }
    return showPage;
  }

  routerBack() {
    this.$router.back();
  }

  @Watch("$route", { immediate: true, deep: true })
  onRouteChange(newVal: any): void {
    this.isArticlePage = newVal.path.includes("/article/");
  }
}
</script>

<style lang="scss">
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
  overflow: hidden;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.white-shadow {
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
}

.router {
  z-index: 9;
  color: #333;
  text-align: left;
  height: 100vh;
  overflow-y: auto;
}

.markdown-body {
  background: #eee;
  padding: 2rem 2rem 3rem !important;
}

.backBtn {
  position: absolute;
  left: -2rem;
  top: 1rem;
  z-index: 99;
  font-size: 20px;
  cursor: pointer;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
}

.backBtn:hover {
  transform: scale(1.1);
}

@media screen and (max-width: 959px) {
  #nav {
    background-position-x: center;
  }
}

@media screen and (max-width: 767px) {
  .router-wrapper {
    position: fixed !important;
    top: 0;
    left: 100%;
    background: rgba(0, 0, 0, 0.4);
    transition: left 0.5s;
  }

  .router-wrapper.show {
    left: 0;
  }
}
</style>
