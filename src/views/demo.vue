<template>
  <div style="width:100%;height:100%;">
    <a-button @click="dawerVisible = !dawerVisible" type="ghost" shape="circle" icon="bars" style="position: absolute; z-index: 99; right: 4rem; top: 1rem; " />
    <router-view />
    <a-drawer
      title="Canvas Demos"
      width="320"
      placement="right"
      :closable="false"
      :visible="dawerVisible"
      @close="onDrawerClose"
    >
      <div
        class="demo-list"
        v-for="(demo, index) in demoList"
        :key="index"
        :title="demo.title"
        @click="startCanvasAnimate(demo.name)"
      >
        <span class="index" :style="{background:randomColor()}">{{index+1}}</span>
        {{demo.title}}
      </div>
    </a-drawer>
  </div>
</template>

<script>
import demoList from '@/config/canvasDemos'

export default {
  name: "demo",
  data() {
    return {
      demoList,
      dawerVisible: false,

    }
  },
  methods: {
    randomColor() {
      let alpha = Math.floor( Math.random() * 10 + 2 ) / 10;
      let getRandomColor = () => ~~( Math.random() * 255 );
      return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${alpha})`;
    },
    onDrawerClose() {
      this.dawerVisible = false
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-list {
  padding: 8px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #f5f5f5;
  }

  .index {
    color: white;
    padding: 2px 6px;
    margin-right: 8px;
  }
}
</style>
