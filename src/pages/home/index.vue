<template>
    <div class="container">
        <div class="home-wrapper">
          <div class="home-box">
            <header class="storey-title">
              <h5 class="title">热门商品</h5>
            </header>
            <div class="category-normal-wrapper">
              <section class="items-wrapper clearfix">
                <ul class="items hot-items clearfix">
                  <li class="item-five fl" v-for="(item, index) in hotGoods" :key="index" @click="getProductDetail(item)">
                    <div class="goods-box">
                      <img class="goods-img" :src="item.ProductPic">
                      <span class="goods-price red">￥{{item.ProductPrice}}</span>
                      <div class="goods-name">{{item.ProductName}}</div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div class="home-box">
            <header class="storey-title">
              <h5 class="title">最新商品</h5>
            </header>
            <div class="category-normal-wrapper">
              <section class="items-wrapper clearfix">
                <ul class="items new-items clearfix">
                  <li class="item-five fl" v-for="(item, index) in newGoods" :key="index" @click="getProductDetail(item)">
                    <div class="goods-box">
                      <img class="goods-img" :src="item.ProductPic">
                      <span class="goods-price red">￥{{item.ProductPrice}}</span>
                      <div class="goods-name">{{item.ProductName}}</div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      hotGoods: [],
      newGoods: []
    }
  },
  components: {
  },
  created () {
    this.getProductData()
  },
  methods: {
    getProductData () {
      this.$http.post('/bbc/ShopOrder/GetHomeProduct').then((response) => {
        this.hotGoods = response.data.HList
        this.newGoods = response.data.NList
      })
    },
    getProductDetail (item) {
      this.$router.push({
        path: '/detail'
      })
      localStorage.setItem('goodsIinfo', JSON.stringify(item))
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/variables.scss";
.container {
  .home-wrapper{
    width: 1000px;
    margin: 0 auto;
    .home-box {
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      background-color: #fff;
      box-sizing: border-box;
      margin-top: 25px;
      .storey-title{
        display: block;
        position: relative;
        font-size: 18px;
        color: #666;
        background: #fafafa;
        border-bottom: 1px solid rgba(0,0,0,.1);
        .title {
          margin-left: 25px;
        }
      }
      .category-normal-wrapper{
        .item-five{
          width: 20%;
          height: 300px;
          text-align: center;
          border-right: 1px solid #dce4e4;
          border-bottom: 1px solid #dce4e4;
          position: relative;
          cursor: pointer;
          .goods-box {
            padding: 5px;
            .goods-img{
              display: block;
              margin: 0 auto;
              width: 100%;
              height: 200px;
            }
            .goods-price {
              color: $red;
              display: inline-block;
              margin-top: 20px;
              height: 30px;
              line-height: 30px;
            }
            .goods-name {
              padding: 0 3px;
              font-size: 12px;
              overflow: hidden;
              margin: 0 12px 0 16px;
              height: 14px;
              line-height: 1;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
