<template>
  <div style="width:100%;height:100%;">
    <a-button
      @click="dawerVisible = !dawerVisible"
      type="ghost"
      shape="circle"
      icon="bars"
      style="position: absolute; z-index: 99; right: 4rem; top: 1rem; "
    />
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
        v-for="(demo, index) in drawerData"
        :key="index"
        :title="demo.title"
        @click="toDemoPage(demo)"
      >
        <span class="index" :style="{ background: randomColor() }">
          {{ index + 1 }}
        </span>
        {{ demo.title }}
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import DemoList from "@/config/demosMeta";
import CanvasDemosList from "@/config/canvasDemos";

@Component
export default class Demo extends Vue {
  demoList: any = DemoList;
  canvasDemosList: any = CanvasDemosList;
  dawerVisible: boolean = false;

  get drawerData(): any[] {
    return this.$route.path.includes("/demo/canvas")
      ? this.canvasDemosList
      : this.demoList;
  }

  randomColor(): string {
    let alpha: number = Math.floor(Math.random() * 10 + 2) / 10;
    let getRandomColor = () => ~~(Math.random() * 255);
    return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${alpha})`;
  }

  onDrawerClose(): void {
    this.dawerVisible = false;
  }

  toDemoPage(demo: any): void {
    this.$router
      .push({ path: demo.path, query: { name: demo.name } })
      .catch(_ => {});
  }
}
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
