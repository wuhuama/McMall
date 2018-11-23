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
          <div class="search-box" v-if="orderList.length>0">
            <input type="text" class="order-search-input" v-model="search_text" placeholder="输入商品名称或订单号进行搜索"><button class="btn-search" @click="btnSearchOrder()">订单搜索</button>
          </div>
          <div class="search-content clearfix">
            <div class="order-item" v-for="(item, index) in orderList" :key="index">
              <div class="item-header">
                <div class="order-create"><span class="order-create-time">{{ item.str_CreatDate.split(' ')[0] }}</span>  &nbsp;<span class="order-num">订单号: {{ item.str_OrderNo }}</span></div>
                <div class="del" v-if="(item.Ing_Statu===0 || item.Ing_Statu===3)" @click="btnDeleteOrder(item.str_OrderNo)"><i class="fa fa-trash-o fa-lg" title="删除订单"></i></div>
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
              v-if="orderList.length>0"
              class="fr"
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev, pager, next, total"
              :page-size="pageSize"
              :total="total">
            </el-pagination>
          </div>
          <div class="empty" v-if="orderList.length===0">
            没有符合条件的宝贝，请尝试其他搜索条件。
          </div>
        </div>
        <div class="loading-mask" v-show="isShowLoading">
          <div class="loading-img">努力加载中...</div>
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
        value: -1,
        title: '所有订单'
      },
      {
        value: 0,
        title: '待付款'
      },
      {
        value: 1,
        title: '已付款'
      },
      {
        value: 2,
        title: '已确认'
      },
      {
        value: 3,
        title: '已完成'
      },
      {
        value: 4,
        title: '已取消'
      }],
      search_text: '',
      activeIndex: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      orderList: [],
      isShowLoading: false
    }
  },
  mounted () {
    this.getOorders(-1)
  },
  methods: {
    toggleTab (index) {
      this.activeIndex = index
      this.search_text = ''
      const flag = this.tabs[index].value
      this.getOorders(flag)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      const flag = this.tabs[this.activeIndex].value
      this.getOorders(flag)
    },
    getOorders (flag) {
      this.isShowLoading = true
      this.$http.post('/bbc/ShopOrder/GetOrderList', {
        Statu: flag,
        KeyText: this.search_text,
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      }).then((response) => {
        if (response.status === 0) {
          this.isShowLoading = false
          this.orderList = response.data
          this.total = response.Total
        }
      })
    },
    btnSearchOrder () {
      const flag = this.tabs[this.activeIndex].value
      this.getOorders(flag)
    },
    btnDeleteOrder (orderno) {
      this.$http.post('/bbc/ShopOrder/CancleOrder', {
        OrderNo: orderno
      }).then((response) => {
        if (response.status === 0) {
          this.$elementMessage('取消成功！', 'success')
          this.btnSearchOrder()
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
  position: relative;
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
            /* outline:none; */
            -webkit-appearance: button;
          }
        }
        .search-content {
          color: #3c3c3c;
          font-size: 12px;
          .order-item {
            margin-bottom: 10px;
            border: 1px solid #f1f1f1;
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
            .item-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 30px;
              line-height: 30px;
              padding: 0 20px;
              background-color: #f1f1f1;
              font-size: 12px;
              .order-create-time {
                font-weight: 700;
                font-family: tahoma
              }
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
                .link-name{
                  margin-bottom: 10px;
                }
              }
              .p-state {
                margin-right: 20px;
              }
            }
          }
        }
        .empty{
          text-align: center;
        }
      }
      .loading-mask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 96px;
        height: 96px;
        margin: auto;
        background-color: rgba(0,0,0,.6);
        border-radius: 8px;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        .loading-img{
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
