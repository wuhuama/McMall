<template>
  <div class="container">
    <mc-head></mc-head>
    <div class="content">
      <div class="main-content clearfix">
        <div class="fl submenu">
          <div class="sub-menu-wrapper">
            <ul class="sub-nav-items">
              <li class="sub-nav-item" v-for="(item, index) in 8" :key="item.id" @click="getGoodsList(item, index)">
                二级菜单werer
              </li>
            </ul>
          </div>
        </div>
        <div class="fl goods-wrapper">
            <ul class="goods-items clearfix">
              <li class="goods-item item-four fl" v-for="item in 5" :key="item">
                <div class="goods-box">
                  <img class="goods-img" src="" alt="">
                  <span class="goods-price red">$200</span>
                  <div class="goods-name">华视电子 CVR-100UC身份证阅读器</div>
                </div>
              </li>
            </ul>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev, pager, next, total"
              :total="total">
            </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import McHead from '@/components/common/Head'

export default {
  name: 'ClassGoods',
  data () {
    return {
      subMenuList: [],
      productList: [],
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 12 // 每页显示的数据条数
    }
  },
  components: {
    McHead
  },
  created () {
    this.getClassList()
  },
  methods: {
    getClassList () {
      let params = this.$route.params
      this.$http.post('ShopOrder/GetClass', {
        PreID: params.preID
      }).then((response) => {
        this.subMenuList = response.data
      })
    },
    getGoodsList (item, index) {
      console.log(index)
      var start = (this.currentPage - 1) * this.pageSize
      // 请求的数据从第start条开始
      var end = this.currentPage * this.pageSize - 1
      // 到第end条结束
      this.$http.post('/ShopOrder/GetProduct', {
        PageIndex: start,
        PageSize: end,
        ClassID: item.id
      }).then(function (response) {
        this.productList = response.data
      }, function (err) {
        console.log(err)
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
    padding: 10px;
    padding-top: 20px;
    background-color: #fff;
    .submenu {
      .sub-nav-items {
        .sub-nav-item {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          border: 1px solid #d8d7d7;
          border-bottom: 0;
        }
        .sub-nav-item:last-child{
          border-bottom: 1px solid #d8d7d7;
        }
      }
    }
    .goods-wrapper {
      margin-left: 20px;
      /* border: 1px solid #d8d7d7; */
      max-width: 800px;
      .item-four{
        width: 23%;
        height: 300px;
        margin-left: 2%;
        margin-bottom: 10px;
        text-align: center;
        border: 1px solid #dce4e4;
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
</style>
