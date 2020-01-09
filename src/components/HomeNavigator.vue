<template >
  <!-- 前端 后端 工具 面试 demo -->
  <section class="navigation">
    <div v-for="item in pages" :key="item.name">
      <router-link
        class="home-card"
        :to="{path:item.path ? item.path:'/home',query:{type:item.key}}"
      >
        <img class="card-img" :src="item.img" alt="目录图片" />
        <span>{{item.name}}</span>
      </router-link>
    </div>
    <div class="links">
      <a-tooltip v-for="(link, index) in links" :key="index" :title="link.name" placement="top">
        <img :src="link.img" class="link" @click="linkTo(link.path)" />
      </a-tooltip>
    </div>
  </section>
</template>

<script>
import { articleFuncs } from '@/assets/utils.js'
import pageMeta from '@/config/pageMeta.js'
export default {
  data() {
    return {
      pages: pageMeta.pages,
      links: pageMeta.links,
      tags: articleFuncs.getTags()
    }
  },
  methods: {
    linkTo( path ) {
      if ( path.codePointAt( 0 ) === 47 ) {
        this.$router.push( path )
      } else {
        window.open( path )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navigation {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
    border: 4px solid white;
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
.links {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  .link {
    width: 26px;
    height: 26px;
    margin-left: 1.4rem;
    border-radius: 30px;
    cursor: pointer;
    border: 4px solid white;
    border-width: 0;
    transition: border-width 0.3s;

    &:hover {
      border-width: 4px;
    }
  }
}

@media screen and (max-width: 959px) {
  .navigation .home-card {
    width: 100%;
    max-width: 100%;
  }
}

.router-link-exact-active .card-img {
  animation: router-img-rotate 10s linear infinite;
  border: 4px solid rgba(0, 0, 0, 0.2);
}

@keyframes router-img-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>