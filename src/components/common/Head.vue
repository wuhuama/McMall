<template>
  <div class="header-wrapper">
      <div class="header_container">
          <div class="mc-header">
              <div class="site-nav-bd-l">
                  <img class="logo" src="" alt="">
                  <span style="font-size: 20px;">陌创商城</span>
              </div>
              <div class="site-nav-bd-r">
                  <div class="store-name">欢迎{{storename}}光临陌创商城</div>
                  <div class="btn-order" @click="getAllOrder">我的订单</div>
                  <div class="tel">客服热线：4008060888</div>
              </div>
          </div>
      </div>
      <div class="header-sub-container">
        <div class="nav-sub">
          <div class="nav-sub-wrapper">
            <div class="nav-container">
              <ul class="nav-list" v-if="classList.length>0">
                <li class="nav-item" v-for="(item, index) in classList" :key="item.ClassID" :class="{'active': activeIndex === index}" @click="toggerClassGoods(item, index)">{{ item.ClassName }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  name: 'Head',
  data () {
    // SuperPMSNameStore 酒店名称
    const storename = Cookies.get('SuperPMSNameStore')
    const storeName = unescape(storename)
    return {
      storename: storeName,
      activeIndex: 0,
      classList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.post('/bbc/ShopOrder/GetClass', {
        PreID: 0
      }).then((response) => {
        this.classList = response.data
        this.classList.unshift({classID: 0, ClassName: '首页'})
      })
    },
    toggerClassGoods (item, index) {
      this.activeIndex = index
      if (item.classID !== 0) {
        this.$router.push({
          path: '/classgoods',
          query: {
            preID: item.ClassID
          }
        })
        this.$emit('getClasses', item)
      } else {
        this.$router.push({ path: './' })
      }
    },
    getAllOrder () {
      this.$router.push({
        path: '/orderlist'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  .header_container {
    height: 60px;
    border-bottom: 1px solid #eeecec;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
    .mc-header {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .site-nav-bd-r {
        display: flex;
        justify-content: space-around;
        align-items: center;
        div {
          margin-left: 15px;
        }
        .btn-order {
          box-sizing: border-box;
          height: 30px;
          border: 1px solid #ddd;
          padding: 5px 15px;
          border-radius: 6px;
          cursor: pointer;
        }
      }
    }
  }
  .header-sub-container {
    height: 60px;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
    background-color: #F18103;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
    .nav-list {
      width: 1000px;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      position: relative;
      display: flex;
      justify-content: flex-start;
      .nav-item {
        padding-right: 30px;
        cursor: pointer;
        color: #808080;
        color: #fff;

        &:hover {
          /* color: #5079d9; */
          color: #000;
        }
      }
      .active {
        color: #000;
      }
    }
  }
}
</style>
