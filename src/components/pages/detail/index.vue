<template>
  <div class="container">
    <div class="content">
      <div class="main-content">
        <div class="product-main clearfix">
          <img class="fl p-img p-left" src="https://resource.smartisan.com/resource/2f2afca6f88e3aef5b1f332ea0c1d65a.png?x-oss-process=image/resize,w_527/format,webp" alt="">
          <div class="fl p-right">
            <div class="p-name">新中心读卡器</div>
            <div class="p-price">$500</div>
            <div class="p-num-box">
              <div class="p-num-text">数量：</div>
              <input class="p-num" v-model="count" />
              <div class="p-num-modify">
                <div @click="addCount()">+</div>
                <div @click="reduceCount">-</div>
              </div>
            </div>
            <div class="btnBuy" @click="buyProduct()">立刻购买</div>
          </div>
        </div>
        <div class="procuct-desc-wrapper">
          <p class="p-desc-text">
            酒店覅假道伐虢兄弟空间大幅度发给而ddddd儿童日 酒店覅假道伐虢兄弟空间大幅度发给而ddddd儿童日 酒店覅假道伐虢兄弟空间大幅度发给而ddddd儿童日 酒店覅假道伐虢兄弟空间大幅度发给而ddddd儿童日 酒店覅假道伐虢兄弟空间大幅度发给而ddddd儿童日
          </p>
          <div class="p-img-list">
            <ul>
              <li>
                <img src="https://resource.smartisan.com/resource/2f2afca6f88e3aef5b1f332ea0c1d65a.png?x-oss-process=image/resize,w_527/format,webp" alt="">
              </li>
              <li>
                <img src="https://resource.smartisan.com/resource/2f2afca6f88e3aef5b1f332ea0c1d65a.png?x-oss-process=image/resize,w_527/format,webp" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div class="other-goods">
          <div class="title title-18">其他推荐</div>
          <div class="other-goods-lists">
            <ul>
              <li class="other-goods-item" v-for="(item, index) in 3" :key="index">
                <img src="https://resource.smartisan.com/resource/2f2afca6f88e3aef5b1f332ea0c1d65a.png?x-oss-process=image/resize,w_527/format,webp" alt="">
                <div>hdhdhdhd</div>
                <div>$3333</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      subMenuList: [],
      activeIndex: 0,
      count: 1
    }
  },
  watch: {
    '$route': function (to, from, next) {
      // 监听路由变化
      console.log('变化了', this.$route)
      this.getParams()
    }
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.query
      // 将数据放在当前组件的数据内
      // this.msg = routerParams
      console.log(routerParams)
    },
    addCount () {
      this.count++
    },
    reduceCount () {
      if (this.count > 1) {
        this.count--
      } else {
        this.count = 1
      }
    },
    buyProduct () {
      this.$router.push({
        path: '/orderdetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/variables.scss";
.content {
  width: 1000px;
  margin: 0 auto;
  .main-content {
    margin-top: 25px;
    padding-top: 20px;
    background-color: #fff;
    .product-main {
      border-bottom: 1px solid #cecece;
      padding-bottom: 20px;
      .p-img{
        width: 250px;
        height: 250px;
        margin-right: 20px;
      }
      .p-right {
        .p-name {
          height: 40px;
          line-height: 40px;
          color: #000;
          font-weight: 600;
          font-size: 20px;
        }
        .p-price {
          height: 35px;
          line-height: 35px;
          color: #f90;
          font-size: 16px;
          font-weight: bold
        }
        .p-num-box {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .p-num {
            width: 60px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            box-sizing: border-box;
            outline: none;
          }
          .p-num-modify {
            div {
              padding: 0;
              margin: 0;
              font-size: 16px;
              height: 18px;
              width: 18px;
              text-align: center;
              line-height: 18px;
              box-sizing: border-box;
              border: 1px solid #cecece;
              cursor: pointer;
              user-select:none;
            }
          }
        }
        .btnBuy {
          text-align: center;
          margin-top: 30px;
          height: 36px;
          line-height: 36px;
          color: #fff;
          font-size: 18px;
          border-radius: 18px;
          background-color: #F18103;
          cursor: pointer;
        }
      }
    }
    .procuct-desc-wrapper {
      padding: 15px;
      .p-desc-text {
        font-size: 16px;
      }
    }
    .other-goods {
      margin-bottom: 30px;
      .title-18 {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 18px;
        color: #000;
        border-left: 3px solid #F18103;
      }
      .other-goods-lists {
        ul {
          display: flex;
          .other-goods-item {
            img{
              width: 120px;
              height: 120px;
            }
          }
        }
      }
    }
  }
}
</style>
