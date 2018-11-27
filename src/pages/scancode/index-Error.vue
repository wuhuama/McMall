<template>
  <div class="container">
    <div class="main-content">
      <div class="code-box">
        <div class="code alipay-code">
          <fieldset class="alipay-border">
            <legend>支付宝</legend>
            <div class="qrcode">
              <img :src="ali_imgUrl">
            </div>
          </fieldset>
        </div>
        <div class="code wechat-code">
          <fieldset class="wepay-border">
            <legend>微信</legend>
            <div class="qrcode">
              <img :src="wechat_imgUrl">
            </div>
          </fieldset>
        </div>
      </div>
      <div class="black-30">请选择支付方式</div>
      <div class="orange-24">需支付{{ pay_money }}元</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pay_money: localStorage.getItem('current-Money'),
      ali_imgUrl: '',
      wechat_imgUrl: '',
      timer: null
    }
  },
  mounted () {
    // 支付宝
    this.creatQRCode(1)
    // 微信
    this.creatQRCode(2)
    this.clearTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    creatQRCode (type) {
      let orderno = localStorage.getItem('current-OrderNo')
      this.$http.post('/ShopOrder/CreatQRCode', {
        OrderNo: orderno,
        PayType: type
      }).then((response) => {
        // console.log(response.data)
        if (response.status === 0) {
          if (type === 1) {
            this.ali_imgUrl = 'data:image/png;base64,' + response.data
          } else if (type === 2) {
            this.wechat_imgUrl = 'data:image/png;base64,' + response.data
          }
          setTimeout(() => {
            this.clearTimer()
            this.verifyPaySuccess()
          }, 3000)
        }
      })
    },
    clearTimer () {
      clearInterval(this.timer)
      this.timer = null
    },
    verifyPaySuccess () {
      this.isPay(1)
      this.isPay(2)
    },
    isPay (type) {
      this.timer = setInterval(() => {
        let orderno = localStorage.getItem('current-OrderNo')
        this.$http.post('/ShopOrder/IsPayOrder', {
          OrderNo: orderno,
          PayType: type
        }).then((response) => {
          if (response.status === 0) {
            console.log(type)
            if (response.data) {
              this.clearTimer()
              this.$router.push({path: '/paysuccess'})
            }
          }
        })
      }, 5000)
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
    padding-top: 30px;
    padding-bottom: 30px;
    .code-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      .code {
        text-align: center;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-content: center;
        &:last-child{
          margin-left: 90px;
        }
        .alipay-border, .wepay-border{
          border: 2px solid #1598D7;
          border-radius: 18px;
          padding: 45px;
        }
        .wepay-border {
          border-color: #42AC38;
          .qrcode {
            border-color: #42AC38;
          }
        }
        fieldset{
          width: 230px;
          .qrcode{
            width: 180px;
            height: 180px;
            border: 1px solid #1598d7;
            padding: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .black-30{
      text-align: center;
      color: #000;
      font-size: 30px;
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .orange-24 {
      text-align: center;
      color: #F37E02;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
