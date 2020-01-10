<template>
  <section style="width:100%;height:100%;position:absolute; top: 0; left: 0;">
    <a-col :xs="{span:24}" :sm="{span:24}" :md="{span:0}" class="abs toolbar">
      <a-button type="ghost" shape="circle" icon="rollback"></a-button>
      <a-button @click="dawerVisible = !dawerVisible" type="ghost" shape="circle" icon="bars" />

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
            <a-slider v-model="animateOptions.radius" range :min="1" :max="30" />
          </div>
        </div>
        <a-button type="ghost" shape="circle" icon="setting" />
      </a-popover>
    </a-col>
    <canvas ref="canvas" class="abs" :width="canvasWidth" :height="canvasHeight"></canvas>
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
  </section>
</template>
<script>
import demoList from '@/config/canvasDemos'
export default {
  data() {
    return {
      animateOptions: {
        population: 40,
        color: '',
        speed: 20,
        radius: [5, 15],
      },
      demoList,
      dawerVisible: false,
      canvasWidth: 0,
      canvasHeight: 0,
      canvasManager: "",
      showSettings: false
    }
  },
  watch: {
    animateOptions: {
      handler: function ( val ) {
        this.canvasManager.resetOptions( val )
      },
      deep: true
    }
  },
  mounted() {
    let canvas = this.$refs['canvas']
    let ctx = canvas.getContext( '2d' )
    let pEle = canvas.parentElement
    this.canvasWidth = pEle.clientWidth, this.canvasHeight = pEle.clientHeight
    this.startCanvasAnimate()
    this.dawerVisible = true;
  },
  methods: {
    randomColor() {
      let alpha = Math.floor( Math.random() * 10 + 2 ) / 10;
      let randomColor = () => ~~( Math.random() * 255 );
      return `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, ${alpha})`;
    },
    startCanvasAnimate( targetFile = 'bubble' ) {
      if ( this.canvasManager ) {
        this.canvasManager.stopAnimate()
      }
      let canvas = this.$refs['canvas']
      let ctx = canvas.getContext( '2d' )
      let vm = this
      //   let manager = require( "./" + targetFile ).default
      let manager = import( "./" + targetFile ).then( _ => {
        vm.canvasManager = new _.default( ctx, vm.canvasWidth, vm.canvasHeight, vm.population )
        vm.animateOptions = Object.assign( {}, vm.animateOptions, vm.canvasManager.presetOptions )
        vm.canvasManager.startAnimate()
      }
      )
    },
    onDrawerClose() {
      this.dawerVisible = false
    }
  },

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
