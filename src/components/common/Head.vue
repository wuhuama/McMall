<template>
  <div class="header-wrapper">
      <div class="header_container">
          <div class="mc-header">
              <div class="site-nav-bd-l">
                  <img class="logo" src="" alt="">
                  <span style="font-size: 20px;">陌创商城</span>
              </div>
              <div class="site-nav-bd-r">
                  <div class="store-name">欢迎光临{{storename}}陌创商城</div>
                  <div class="btn-order">我的订单</div>
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
// import axios from 'axios'
export default {
  name: 'Head',
  data () {
    return {
      storename: 'xxxx',
      activeIndex: 0,
      classList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // this.$http.get('/api').then((response) => {
      //   console.log(response)
      // })
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
        console.log(item.ClassID)
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
      }
    }
  }
  .header-sub-container {
    height: 60px;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
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
        &:hover {
          color: #5079d9;
        }
      }
      .active {
        color: #000;
      }
    }
  }
}
</style>
