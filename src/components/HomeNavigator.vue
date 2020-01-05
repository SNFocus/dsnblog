<template >
  <!-- 前端 后端 工具 面试 demo -->
  <section class="navigation">
    <div class="home-card">
      <img class="card-img" src="@/assets/images/1.png" alt="目录图片" />
      <span>前端·点滴</span>
    </div>
    <div class="home-card">
      <img class="card-img" src="@/assets/images/3.png" alt="目录图片" />
      <span>后端·笔记</span>
    </div>
    <div class="home-card">
      <img class="card-img" src="@/assets/images/2.png" alt="目录图片" />
      <span>缘·工具</span>
    </div>
    <div class="home-card">
      <img class="card-img" src="@/assets/images/7.png" alt="目录图片" />
      <span>随心·DEMO</span>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.navigation {
  margin-top: 5rem;
  width: 100%;
}

.home-card {
  left: 0;
  height: 60px;
  cursor: pointer;
  max-width: 450px;
  min-width: 278px;
  line-height: 60px;
  position: relative;
  border-radius: 40px;
  border: 1px solid white;
  border-top-width: 0;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.4);

  &:first-child {
    border-top-width: 1px;
  }

  &:nth-child(even) {
    text-align: right;
    direction: rtl;
  }

  &:nth-child(odd) {
    text-align: left;
  }

  &:hover .card-img {
    transform: rotate(2turn);
    left: 20px;
  }

  > span {
    vertical-align: text-bottom;
    margin-left: 1rem;
    margin-right: 1rem;
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
  transition: transform 4s, left 4s, -webkit-transform 4s;
}

@media screen and (max-width: 959px) {
  .navigation .home-card {
    width: 100%;
    max-width: 100%;
  }
}

/* .home-card::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  background: white;
  transition: width 2s;
  border-radius: 60px;
  z-index: -1
} 
.home-card:nth-child(odd)::after {
  left: 0;
}

.home-card:nth-child(even)::after {
  right: 0;
}

.home-card:hover::after {
  width: 100%;
}

*/
</style>