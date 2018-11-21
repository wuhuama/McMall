<template>
  <div class="container">
    <div class="main-content">
      <div class="title title-18">订单信息</div>
      <div class="productlist">
        <div class="orderman-info">
          <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="80px" @submit.native.prevent>
            <el-form-item label="联系人" prop="name">
              <el-input
                v-model="form.name"
                size="small"
                style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobile">
              <el-input
                v-model="form.mobile"
                size="small"
                style="width: 200px"></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <div class="goods-wrapper">
          <div class="order-info">
            <div>订单编号: 11111111</div>
            <div>2018/11/20 16:44</div>
          </div>
          <ul class="goods-list">
            <li>
              <img src="" alt="">
              <div class="name">新中心 FFFDD-23324</div>
              <div class="p-num-box">
              <div class="p-num-text">数量：</div>
                <input class="p-num" v-model="count" />
                <div class="p-num-modify">
                  <div @click="addCount()">+</div>
                  <div @click="reduceCount">-</div>
                </div>
              </div>
              <div class="price">￥500</div>
            </li>
          </ul>
          <div class="payInfo">
            <div class="black-text-20">待支付: <span class="total-price">500</span></div>
            <div class="btnPay">立即支付</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validateMobile } from '@/utils/validate'
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
    return {
      count: 1,
      labelPosition: 'left',
      form: {
        name: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validPhone, message: '请输入联系电话', trigger: 'blur,change' }
        ]
      }

    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
          justify-content: space-between
        }
        .goods-list {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 5px;
            img {
              width: 100px;
              height: 100px;
              background-color: #000;
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
