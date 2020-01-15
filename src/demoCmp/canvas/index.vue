
/**
* title: canvas实现的动画效果合集
*/
<template>
  <section style="width:100%;height:100%;position:absolute; top: 0; left: 0;">
    <a-row :span="24" type="flex" justify="space-between" class="abs toolbar">
      <a-button type="ghost" shape="circle" icon="rollback" @click="$router.push('/demo')"></a-button>
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
    </a-row>
    <canvas ref="canvas" class="abs" :width="canvasWidth" :height="canvasHeight"></canvas>
  </section>
</template>
<script>
export default {
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      canvasManager: "",
      animateOptions: {
        population: 40,
        color: '',
        speed: 20,
        radius: [5, 15],
      },
      showSettings: false,
    }
  },
  watch: {
    $route(newVal){
      this.startCanvasAnimate(newVal.query.name)
    },
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
  },
  methods: {

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
      ).catch(err=>console.log(error))
    },
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

</style>
