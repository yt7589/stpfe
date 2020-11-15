<template>
  <div class="custom-image" ref="root">
    <div class="image_wrapper" :style="style">
      <el-image ref="image" fit="fit" class="image" :src="src" @load="onLoaded">
        <div slot="error"></div>
      </el-image>
      <canvas ref="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['src', 'result', 'name'],
    data(){
      return {
        style: {}
      }
    },
    watch: {
      name(){
        this.update()
      }
    },
    mounted(){
      this.initCanvas()
    },
    methods: {
      resize(){
        let image = this.$refs.image
        let canvas = this.$refs.root
        // 画布宽高适配
        let imageRadio = image.imageWidth * 1.0 / image.imageHeight
        if (canvas.clientWidth * 1.0 / canvas.clientHeight > imageRadio) {
          // 宽度缩进
          let diff = canvas.clientWidth - imageRadio * canvas.clientHeight
          this.style = {
            width: `calc(100% - ${diff}px)`,
            height: "100%"
          }
        } else {
          // 高度缩进
          let diff = canvas.clientHeight - canvas.clientWidth / imageRadio
          this.style = {
            height: `calc(100% - ${diff}px)`,
            width: '100%'
          }
        }
      },
      initCanvas(){
        let canvas = this.$refs.canvas

        if (canvas.width !== canvas.clientWidth) {
          canvas.width = canvas.clientWidth
        }
        if (canvas.height !== canvas.clientHeight) {
          canvas.height = canvas.clientHeight
        }
      },
      clearCanvas(){
        let canvas = this.$refs.canvas
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
      update(){
        if (this.result) {
          this.resize()
          this.clearCanvas()
          this.result.forEach((item, index) => {
            if (item.WZTZ && item.WZTZ.CLWZ) {
              let array = item.WZTZ.CLWZ.split(',')
              if (array.length >= 4) {
                this.drawRect(index, parseFloat(array[0]), parseFloat(array[1]), parseFloat(array[2]), parseFloat(array[3]))
              } else {
                console.error("位置格式错误:" + item.WZTZ.CLWZ)
              }
            }
            console.log(this.name, item)
            if (this.name == "车辆个性化特征") {
              let keys = ['CCZTW', 'BJ', 'GJ', 'TC', 'XLJ', 'CSZT', 'CSPS', 'CSGH', 'CSCH']
              keys.forEach(key => {
                if (item.GXHTZ && item.GXHTZ[key]) {
                  let array = item.GXHTZ[key].split("#");
                  array.forEach(bj => {
                    let x, y, w, h
                    let pieces = bj.split("_")
                    if (pieces.length > 0) {
                      let value = pieces[pieces.length - 1];
                      [x, y, w, h] = value.split(',')
                      if (w > 0 && h > 0) {
                        this.drawRect(null, parseFloat(x), parseFloat(y), parseFloat(w), parseFloat(h))
                      }
                    }
                  })
                }
              })
            } else if (this.name == "车牌号码") {
              let keys = ['HPWZ']
              keys.forEach(key => {
                if (item.HPTZ && item.HPTZ[key]) {
                  let array = item.HPTZ[key].split("#");
                  array.forEach(bj => {
                    let x, y, w, h
                    let pieces = bj.split("_")
                    if (pieces.length > 0) {
                      let value = pieces[pieces.length - 1];
                      [x, y, w, h] = value.split(',')
                      if (w > 0 && h > 0) {
                        this.drawRect(null, parseFloat(x), parseFloat(y), parseFloat(w), parseFloat(h))
                      }
                    }
                  })
                }
              })
            }
          })
        }
      },
      onLoaded(){
        this.initCanvas()
        this.update()
      },
      drawRect(index, x, y, w, h){
        let canvas = this.$refs.canvas

        let ctx = canvas.getContext('2d')

        let image = this.$refs.image
        let xRadio = canvas.width / image.imageWidth
        let yRadio = canvas.height / image.imageHeight

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;

        ctx.font = "20px Arial"
        ctx.strokeRect(x * xRadio, y * yRadio, w * xRadio, h * yRadio);
        if (index !== null) {
          ctx.strokeText("" + (index + 1), x * xRadio, (y - 10) * yRadio);
        }

        console.log(x * xRadio, y * yRadio, w * xRadio, h * yRadio)
        console.log(canvas.width, canvas.height, canvas.clientWidth, canvas.clientHeight)
        console.log(canvas.width, canvas.height, image.imageWidth, image.imageHeight)
        console.log("draw:", index, x, y, w, h)
      }
    }
  }
</script>

<style lang="scss">
  .custom-image {
    display: flex;
    align-items: center;
    justify-content: center;

    .image_wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      > .image {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      > .canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
      }
    }
  }
</style>
