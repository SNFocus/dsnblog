---

---
<template>
  <canvas ref="canvas" @click="start" style="width:100%;height:100%;"></canvas>
</template>
<script>
export default {
  data() {
    return {
      name: 'bubble',
      popular: 40,
      color: '',
      speed: 0.15,
      radius: [5, 15],
      bubbleList: []
    }
  },
  mounted() {

  },
  methods: {
    start() {
      let canvas = this.$refs['canvas']
      let ctx = canvas.getContext( '2d' )
      let pEle = canvas.parentElement
      let width = pEle.clientWidth, height = pEle.clientHeight
      canvas.width = width
      canvas.height = height
      //   let manager = require( "./" + this.name ).default
      let manager = import( "./" + this.name ).then( _ => {
        new _.default( ctx, width, height, this.popular ).startAnimate()
      }
      )
    }
  }
}

</script>
