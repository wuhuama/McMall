<template>
    <div class="container">
        <mc-head :classList="classList" :active="activeIndex" @togClassGoods="toClassGoods"></mc-head>
        <div class="home-wrapper">
          <div class="home-box">
            <header class="storey-title">
              <h5 class="title">热门商品</h5>
            </header>
            <div class="category-normal-wrapper">
              <section class="items-wrapper clearfix">
                <ul class="items hot-items clearfix">
                  <li class="item-five fl" v-for="item in 5" :key="item">
                    <div class="goods-box">
                      <img class="goods-img" src="" alt="">
                      <span class="goods-price red">$200</span>
                      <div class="goods-name">精伦iDR210</div>
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
                  <li class="item-five fl" v-for="item in 5" :key="item">
                    <div class="goods-box">
                      <img class="goods-img" src="" alt="">
                      <span class="goods-price red">$200</span>
                      <div class="goods-name">华视电子 CVR-100UC身份证阅读器</div>
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
import McHead from '@/components/common/Head'

export default {
  name: 'Home',
  data () {
    return {
      hotGoods: [],
      activeIndex: 0,
      classList: [{id: 1, className: '首页'}, {id: 2, className: '电脑'}, {id: 3, className: '手机'}, {id: 4, className: '品牌周边'}]
    }
  },
  components: {
    McHead
  },
  methods: {
    toClassGoods (item) {
      console.log(item)
      // this.activeIndex = index
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
          .goods-img{
            display: block;
            margin: 0 auto;
            width: 200px;
            height: 200px;
          }
          .goods-price {
            color: $red
          }
          .goods-name {
            padding: 0 3px;
          }
        }
      }
    }
  }
}
</style>
