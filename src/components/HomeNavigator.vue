<template >
  <!-- 前端 后端 工具 面试 demo -->
  <section class="navigation">
    <router-link class="home-card" to="/font_home">
      <img class="card-img" src="@/assets/images/1.png" alt="目录图片" />
      <span>前端·点滴</span>
    </router-link>
    <router-link class="home-card" to="/serve_home">
      <img class="card-img" src="@/assets/images/3.png" alt="目录图片" />
      <span>后端·笔记</span>
    </router-link>
    <router-link class="home-card" to="/tool">
      <img class="card-img" src="@/assets/images/2.png" alt="目录图片" />
      <span>缘·工具</span>
    </router-link>
    <router-link class="home-card" to="/demos">
      <img class="card-img" src="@/assets/images/7.png" alt="目录图片" />
      <span>随心·DEMO</span>
    </router-link>
  </section>
</template>
<style lang="scss" scoped>
.navigation {
  margin-top: 3rem;
}

.home-card {
  cursor: pointer;
  line-height: 60px;
  border-radius: 40px;
  border: 1px solid white;
  white-space: nowrap;
  margin-right: 1.5rem;
  background: rgba(255, 255, 255, 0.4);

  &:not(.router-link-exact-active):hover .card-img {
    transform: rotate(2turn);
  }

  > span {
    vertical-align: text-bottom;
    margin-left: 1rem;
    margin-right: 1rem;
    display: inline-block;
    width: 4rem;
    color: #303030;
  }
}

.card-img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 30px;
  background: #f5f5f5;
  padding: 8px;
  margin-left: -6px;
  transition: transform 4s, left 4s, -webkit-transform 4s;
}

@media screen and (max-width: 959px) {
  .navigation .home-card {
    width: 100%;
    max-width: 100%;
  }
}

.router-link-exact-active .card-img {
  animation: router-img-rotate 10s linear infinite;
}

@keyframes router-img-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>