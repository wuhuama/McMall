<template>
  <div class="container">
    <div class="content">
      <div class="main-content">
        <div class="product-main clearfix">
          <img class="fl p-img p-left" :src="goodsInfo.ProductPic" alt="">
          <div class="fl p-right">
            <div class="p-name">{{ goodsInfo.ProductName }}</div>
            <div class="p-price">￥{{ goodsInfo.ProductPrice }}</div>
            <input-num ref="refInputNum"></input-num>
            <div class="btnBuy" @click="buyProduct()">立刻购买</div>
          </div>
        </div>
        <div class="procuct-desc-wrapper">
          <p class="p-desc-text">
            {{ goodsInfo.ProductDesc }}
          </p>
          <div class="p-img-list">
            <ul>
              <li v-for="(itemsrc, index) in goodsInfo.Pics" :key="index">
                <img class="goods-bigImage" :src="itemsrc">
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
import InputNum from '@/components/common/InputNum'
export default {
  name: 'ProductDetail',
  data () {
    const goodsInfos = localStorage.getItem('goodsIinfo')
    return {
      subMenuList: [],
      activeIndex: 0,
      count: 1,
      goodsInfo: JSON.parse(goodsInfos)
    }
  },
  components: {
    InputNum
  },
  mounted () {
    // console.log(this.$route)
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      // let routerParams = this.$route.query
      // 将数据放在当前组件的数据内
      // this.msg = routerParams
      // console.log(routerParams)
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
      localStorage.setItem('num', this.$refs.refInputNum.count)
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
      .p-img-list {
        li img {
          width: 100%
        }
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
