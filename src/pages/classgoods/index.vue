<template>
  <div class="container">
    <div class="content">
      <div class="main-content">
        <div class="submenu">
          <div class="sub-menu-wrapper">
            <ul class="sub-nav-items">
              <li :class="['sub-nav-item', {'isActive': activeIndex === index}]" v-for="(item, index) in subMenuList" :key="item.classID" @click="getGoodsList(item, index)">
                {{item.ClassName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-wrapper" v-loading="loading">
            <ul class="goods-items clearfix">
              <li class="goods-item item-four fl" v-for="(item, index) in productList" :key="index" @click="getProductDetail(item)">
                <div class="goods-box">
                  <img class="goods-img" :src="item.ProductPic" alt="">
                  <span class="goods-price red">￥{{ item.ProductPrice }}</span>
                  <div class="goods-name">{{ item.ProductName }}</div>
                </div>
              </li>
            </ul>
            <el-pagination
              v-if="productList.length>0"
              class="fr"
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev, pager, next, total"
              :page-size="pageSize"
              :total="total">
            </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClassGoods',
  data () {
    return {
      subMenuList: [],
      productList: [],
      activeIndex: 0,
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 8, // 每页显示的数据条数,
      preID: 0,
      loading: true
    }
  },
  components: {
  },
  mounted () {
    const pid = this.$route.query.preID
    this.getClassList(pid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getClassList(to.query.preID)
    next()
  },
  methods: {
    getClassList (pid) {
      // let params = this.$route.query
      // console.log(`分类的url参数 ${JSON.stringify(params)}`)
      this.$http
        .post('/ShopOrder/GetClass', {
          PreID: pid
        })
        .then(response => {
          this.subMenuList = response.data
        }).then(() => {
          const rec = this.subMenuList[0]
          this.getGoodsList(rec, 0)
        })
    },
    getGoodsList (item, index) {
      let _this = this
      _this.activeIndex = index
      var start = _this.currentPage
      // var start = (this.currentPage - 1) * this.pageSize
      // 请求的数据从第start条开始
      // var end = this.currentPage * this.pageSize - 1
      // 到第end条结束
      _this.$http
        .post('/ShopOrder/GetProduct', {
          PageIndex: start,
          PageSize: this.pageSize,
          ClassID: item.ClassID
        })
        .then(
          function (response) {
            if (response.status === 0) {
              _this.loading = false
              _this.productList = response.data
              _this.total = response.Total
            }
          },
          function (err) {
            _this.loading = false
            console.log(err)
          }
        )
    },
    handleCurrentChange (val) {
      this.currentPage = val
      const rec = this.productList[this.activeIndex]
      this.getGoodsList(rec, this.currentPage)
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
.content {
  width: 1000px;
  margin: 0 auto;
  .main-content {
    margin-top: 25px;
    padding: 10px;
    padding-top: 20px;
    background-color: #fff;
    display: flex;
    .submenu {
      .sub-nav-items {
        .sub-nav-item {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          border: 1px solid #d8d7d7;
          border-bottom: 0;
          color: #595454;
          cursor: pointer;
        }
        .isActive{
          font-weight: bold;
        }
        .sub-nav-item:last-child {
          border-bottom: 1px solid #d8d7d7;
        }
      }
    }
    .goods-wrapper {
      margin-left: 20px;
      flex: 1;
      /* border: 1px solid #d8d7d7; */
      /* max-width: 800px; */
      .item-four {
        width: 200px;
        height: 300px;
        margin-left: 3px;
        margin-bottom: 10px;
        text-align: center;
        border: 1px solid #dce4e4;
        position: relative;
        cursor: pointer;
        box-sizing: border-box;
        .goods-img {
          display: block;
          margin: 0 auto;
          width: 200px;
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
</style>
