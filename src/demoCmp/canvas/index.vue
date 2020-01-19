/** * title: canvas实现的动画效果合集 */
<template>
  <section style="width:100%;height:100%;position:absolute; top: 0; left: 0;">
    <a-row :span="24" type="flex" justify="space-between" class="abs toolbar">
      <a-button
        type="ghost"
        shape="circle"
        icon="rollback"
        @click="$router.push('/demo')"
      ></a-button>
      <a-popover v-model="showSettings" title="Setting" placement="bottomRight">
        <div slot="content">
          <div>
            <span>数量</span>
            <a-slider v-model="animateOptions.population" :min="1" />
          </div>
          <div>
            <span>速度</span>
            <a-slider v-model="animateOptions.speed" :step="1" :min="1" />
          </div>
          <div>
            <span>半径区间</span>
            <a-slider
              v-model="animateOptions.radius"
              range
              :min="1"
              :max="30"
            />
          </div>
        </div>
        <a-button type="ghost" shape="circle" icon="setting" />
      </a-popover>
    </a-row>
    <canvas
      ref="canvas"
      class="abs"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class CanvasPage extends Vue {
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  canvasManager: any = "";
  animateOptions: {
    population: number;
    color: string | null;
    speed: number;
    radius: number[];
  } = {
    population: 40,
    color: "",
    speed: 20,
    radius: [5, 15]
  };

  showSettings: boolean = false;

  @Watch("$route", { deep: true })
  onRouteChange(newVal: any): void {
    this.startCanvasAnimate(newVal.query.name);
  }

  @Watch("animateOptions", { deep: true })
  onAnimateOptionsChange(val: Object): void {
    this.canvasManager.resetOptions(val);
  }

  mounted(): void {
    let canvas: HTMLCanvasElement = this.$refs["canvas"] as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    let pEle: Element = canvas.parentElement as Element;
    (this.canvasWidth = pEle.clientWidth),
      (this.canvasHeight = pEle.clientHeight);
    this.startCanvasAnimate();
  }

  startCanvasAnimate(targetFile: string = "bubble"): void {
    this.canvasManager ? this.canvasManager.stopAnimate() : "";
    let canvas: HTMLCanvasElement = this.$refs["canvas"] as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    let vm: any = this;
    //   let manager = require( "./" + targetFile ).default
    let manager = import("./" + targetFile)
      .then(_ => {
        vm.canvasManager = new _.default(
          ctx,
          vm.canvasWidth,
          vm.canvasHeight,
          vm.population
        );
        vm.animateOptions = Object.assign(
          {},
          vm.animateOptions,
          vm.canvasManager.presetOptions
        );
        vm.canvasManager.startAnimate();
      })
      .catch((error: any) => console.log(error));
  }
}
</script>
<style lang="scss" scoped>
.toolbar {
  z-index: 9;
  padding-left: 1rem;
  padding-top: 1rem;
}

.toolbar ::v-deep .ant-btn {
  margin-right: 1rem;
}

.abs {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
