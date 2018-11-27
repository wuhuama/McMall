<template>
  <div class="container">
    <div class="main-content">
      <div class="title title-18">订单信息</div>
      <div class="productlist">
        <div class="orderman-info">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="80px" @submit.native.prevent>
            <el-form-item label="联系人" prop="name">
              <el-input
                v-model="ruleForm.name"
                size="small"
                style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobile">
              <el-input
                v-model="ruleForm.mobile"
                size="small"
                style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="goods-wrapper">
          <div class="order-info">
            <div>订单编号: 11111111</div>
            <div>2018/11/20 16:44</div>
          </div>
          <ul class="goods-list">
            <li>
              <div class="item-pro">
                <img :src="productInfo.ProductPic">
                <div class="name">{{ productInfo.ProductName }}</div>
              </div>
              <input-num ref="rInputNum" :count="count" v-on:getTotalMoney="getPrice" v-on:addCount="addProductCount" v-on:reduceCount="reduceProductCount"></input-num>
              <div class="price">￥{{ productInfo.ProductPrice }}</div>
            </li>
          </ul>
          <div class="payInfo">
            <div class="black-text-20">待支付: <span class="total-price">{{ totalPrice }}</span></div>
            <div class="btnPay" @click="getpPayCode">立即支付</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validateMobile } from '@/utils/validate'
import InputNum from '@/components/common/InputNum'

export default {
  name: 'ProductDetail',
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!validateMobile(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    const productInfos = localStorage.getItem('goodsIinfo')
    return {
      count: 1,
      totalPrice: 0,
      productInfo: JSON.parse(productInfos),
      labelPosition: 'left',
      ruleForm: {
        name: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validPhone, trigger: 'blur, change' }
        ]
      }
    }
  },
  components: {
    InputNum
  },
  mounted () {
    let num = this.$route.query.count
    this.count = parseInt(num)
    this.totalPrice = num * this.productInfo.ProductPrice
  },
  methods: {
    getpPayCode () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$http.post('/bbc/ShopOrder/SubmitOrder', {
            ProductID: this.productInfo.ProductID,
            ProductNum: this.$refs.rInputNum.count,
            LinkMan: this.ruleForm.name,
            LinkTel: this.ruleForm.mobile
          }).then((response) => {
            if (response.status === 0) {
              let orderNo = response.data.str_OrderNo
              let money = response.data.dec_Money

              localStorage.setItem('current-OrderNo', orderNo)
              localStorage.setItem('current-Money', money)
              this.$router.push({
                path: '/scancode'
              })
            }
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getPrice (num) {
      this.totalPrice = num * this.productInfo.ProductPrice
    },
    addProductCount (val) {
      if (val) {
        this.count++
      }
      this.getPrice(this.count)
    },
    reduceProductCount () {
      if (this.count > 1) {
        this.count--
      } else {
        this.count = 1
      }
      this.getPrice(this.count)
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
    padding-bottom: 30px;
    .title-18 {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 18px;
        color: #000;
        border-left: 3px solid #F18103;
    }
    .productlist {
      padding: 10px;
      .orderman-info {
      }
      .goods-wrapper {
        width: 98%;
        margin: 0 auto;
        .order-info {
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          background-color: #e2e2e2;
          display: flex;
          justify-content: space-between;
          display: none;
        }
        .goods-list {
          margin-bottom: 30px;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #f1f1f1;
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
            padding: 10px 20px;
            .item-pro {
              img {
                vertical-align:top;
                width: 100px;
                height: 100px;
                background-color: #000;
              }
              .name {
                display: inline-block;
                width: 300px;
                margin-left: 5px;
              }
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
            .price {
              color: #F18103;
              font-size: 20px;
            }
          }
        }
        .payInfo {
          text-align: right;
          .black-text-20 {
            display: inline-block;
            color: #000;
            font-size: 20px;
            .total-price {
              color: #F18103;
            }
          }
          .btnPay {
            display: inline-block;
            text-align: center;
            height: 36px;
            padding: 0 20px;
            margin-left: 30px;
            line-height: 36px;
            color: #fff;
            font-size: 18px;
            border-radius: 5px;
            background-color: #F18103;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
