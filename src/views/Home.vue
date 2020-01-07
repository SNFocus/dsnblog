<template>
  <div class="filter">
    <a-icon v-if="currentPage>1" class="page-arrow" type="caret-left" @click.native="prevPage" />
    <a-icon
      v-if="currentPage < totalPage"
      class="page-arrow"
      type="caret-right"
      @click.native="nextPage"
    />
    <article
      class="article-card"
      v-for="(article,index) in showArticles"
      :key="index"
      @click="$router.push(article.path)"
    >
      <header class="title">{{article.title}}</header>
      <p class="desc">{{article.categories}}</p>
      <footer class="footer">
        <span class="tags">
          <span v-for="(tag,tag_index) in article.tags" :key="tag_index">{{tag}}</span>
        </span>
        <div class="date">{{article.date}}</div>
      </footer>
    </article>
  </div>
</template>

<script>
import articleList from '@/config/articleMeta'
export default {
  name: "condition",
  data() {
    return {
      articleList,
      currentPage: 1,
      pageSize: 3,
      totalPage: articleList.length / this.pageSize
    }
  },
  computed: {
    showArticles() {
      let start = ( this.currentPage - 1 ) * this.pageSize
      let end = this.currentPage * this.pageSize
      return this.articleList.slice( start, end )
    }
  },
  methods: {
    prevPage() {
      if ( this.currentPage > 1 ) {
        this.currentPage--
      }
    },
    nextPage() {
      if ( this.currentPage === totalPage ) { return; }
      this.currentPage++
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  padding: 1rem 6rem;
  position: relative;
}

.page-arrow {
  position: absolute;
  font-size: 42px;
  top: 40vh;
  color: white;
  cursor: pointer;

  &:nth-child(1) {
    left: 2rem;
  }

  &:nth-child(2) {
    right: 2rem;
  }
}

.article-card {
  position: relative;
  padding: 0.6rem 1rem;
  background-color: #f5f5f5;
  border-radius: 2px;
  left: 0;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  transition: left 1.5s;
  cursor: pointer;

  &:hover {
    left: -30px;
  }

  > .title {
    margin-left: -2rem;
    margin-bottom: 0.6rem;
    padding-left: 0.6rem;
    padding-right: 1.5rem;
    display: inline-block;
    background-color: #5a9aa9;
    font-weight: bold;
    color: white;
    white-space: nowrap;
    max-width: 88%;
    overflow: hidden;
    text-overflow: ellipsis;
    clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
  }
  > .desc {
    text-indent: 1rem;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  > .footer {
    > .tags {
      span {
        padding: 4px 0;
        margin: 0 4px;
        border-bottom: 1px solid #5a9aa9;
      }
    }
    > .date {
      margin-top: 6px;
    }
  }
}
</style>

