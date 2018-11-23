<template>
  <div class="container">
    <div class="main-content">
      <div class="content-wrapper">
        <div class="tabs-title">
          <div class="tabs-title-container">
            <div class="tab-pane" :class="{'active': activeIndex === index}" v-for="(item, index) in tabs" :key="index" @click="toggleTab(index)">{{ item.title }}</div>
          </div>
        </div>
        <div class="tabs-content">
          <div class="search-box">
            <input type="text" class="order-search-input" placeholder="输入商品名称或订单号进行搜索"><button class="btn-search">订单搜索</button>
          </div>
          <div class="search-content">
            <div class="" v-for="(item, index) in orderList" :key="index">
              <div class="item-header">
                <div class="order-create-time">{{ item.str_CreatDate }}  <span class="order-num">订单号: {{ item.str_OrderNo }}</span></div>
                <div class="del" v-if="(item.Ing_Statu===0 || item.Ing_Statu===1)">del</div>
              </div>
              <div class="product">
                <div class="p-img"></div>
                <div class="p-name">{{ item.str_ProductName }}</div>
                <div class="p-price">￥{{ item.dec_Price }}</div>
                <div class="p-count">{{ item.dec_Num }}</div>
                <div class="p-total">￥{{ item.dec_Money }}</div>
                <div class="p-link">
                  <div class="link-name">{{ item.str_LinkMan }}</div>
                  <div class="link-mobile">{{ item.str_LinkTel }}</div>
                </div>
                <div class="p-operate">

                </div>
                <div class="p-state">{{ item.str_Statu }}</div>
              </div>
            </div>
            <el-pagination
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [{
        title: '所有订单'
      },
      {
        title: '待付款'
      },
      {
        title: '已付款'
      },
      {
        title: '已确认'
      },
      {
        title: '已完成'
      },
      {
        title: '已取消'
      }],
      activeIndex: 0,
      currentPage: 1,
      pageSize: 3,
      total: 0,
      orderList: []
    }
  },
  mounted () {
    this.getOorders()
  },
  methods: {
    toggleTab (index) {
      this.activeIndex = index
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getOorders()
    },
    getOorders (flag) {
      this.$http.post('/bbc/ShopOrder/GetOrderList', {
        KeyText: flag,
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      }).then((response) => {
        if (response.status === 0) {
          this.orderList = response.data
          this.total = response.Total
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  width: 1000px;
  margin: 0 auto;
  .main-content{
    margin-top: 25px;
    background-color: #fff;
    .content-wrapper{
      padding: 10px;
      .tabs-title{
        position: relative;
        margin-top: 20px;
        margin-bottom: 22px;
        border-bottom: 2px solid #e8e8e8;
        .tabs-title-container {
          position: relative;
          bottom: -2px;
          .tab-pane {
            display: inline-block;
            position: relative;
            border-bottom: 2px solid #e8e8e8;
            cursor: pointer;
            padding: 0 20px 12px;

          }
          .active{
            border-bottom-color: #ff6000;
            color: #ff6000;
          }
        }
      }
      .tabs-content {
        .search-box {
          margin-bottom: 20px;
          .order-search-input {
            width: 236px;
            height: 26px;
            margin: 0;
            padding: 4px 8px;
            box-sizing: border-box;
            display: inline-block;
            height: 26px;
            vertical-align: middle;
            border: 1px solid #bfbfbf;
          }
          .btn-search {
            box-sizing: border-box;
            display: inline-block;
            height: 26px;
            vertical-align: middle;
            border: 1px solid #bfbfbf;
            padding: 0 16px;
            cursor: pointer;
            background-color: #f5f5f5;
            border-left: none;
            -webkit-appearance: button;
          }
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          line-height: 30px;
          padding: 0 20px;
          background-color: rgb(214, 214, 214);
          .del {
            cursor: pointer;
          }
        }
        .product {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 10px 0;
          .p-name{
            width: 100px;
          }
          .p-img {
            width: 80px;
            height: 80px;
            margin-left: 20px;
            background-color: #a74040;
          }
          .p-link {
            text-align: center;
          }
          .p-state {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
