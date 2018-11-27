<template>
  <div>
    <div class="go-top">
      <div class="box">
        <a href="#" @click="goTop">
            <span ref="btn">
                <i class="fa fa-chevron-up fa-2x" aria-hidden="true"></i>
            </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isTop: true,
      timer: null
    }
  },
  mounted () {
    this.needScroll()
  },
  methods: {
    needScroll () {
      // 可视高度
      // let clientHeight = document.documentElement.clientHeight
      let obtn = this.$refs.btn
      window.onscroll = function () {
        // 滚动的高度
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        if (osTop >= 40) {
          obtn.style.display = 'block'
        } else {
          obtn.style.display = 'none'
        }
        if (!this.isTop) {
          clearInterval(this.timer)
        }
        this.isTop = false
      }
    },
    goTop () {
      let self = this
      self.timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        self.isTop = true
        if (osTop === 0) {
          clearInterval(self.timer)
        }
      }, 30)
    }
  }
}
</script>
<style lang="scss" scoped>
.go-top{
  position: fixed;
  z-index: 50;
  right: 10px;
  bottom: 10px;
  .box{
    a {
      text-decoration: underline;
      color: #ff712c;
      -webkit-transition: all .3s ease;
      transition: all .3s ease;
      span {
        display: none;
        float: left;
        width: 42px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        font-size: 1.25em;
        color: #fff;
        background: #ff712c;
        border-radius: 4px;
        padding-top: 1px;
        margin: 0 5px;
        cursor: pointer;
        -webkit-transition: background .3s ease;
        transition: background .3s ease;
        &:hover{
          background: #f85100;
        }
      }
    }
  }
}
</style>
