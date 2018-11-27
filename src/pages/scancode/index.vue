<template>
  <div class="container">
    <div class="main-content">
      <div class="title title-18">请选择一种支付方式</div>
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
      ali_timer: null,
      we_timer: null
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
      this.$http.post('/bbc/ShopOrder/CreatQRCode', {
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
      clearInterval(this.ali_timer)
      clearInterval(this.we_timer)
      this.ali_timer = null
      this.we_timer = null
    },
    verifyPaySuccess () {
      this.isAliPay()
      this.isWeChatPay()
    },
    isAliPay () {
      this.ali_timer = setInterval(() => {
        let orderno = localStorage.getItem('current-OrderNo')
        this.$http.post('/bbc/ShopOrder/IsPayOrder', {
          OrderNo: orderno,
          PayType: 1
        }).then((response) => {
          if (response.status === 0) {
            if (response.data) {
              this.clearTimer()
              this.$router.push({path: '/paysuccess'})
            }
          }
        })
      }, 5000)
    },
    isWeChatPay () {
      this.we_timer = setInterval(() => {
        let orderno = localStorage.getItem('current-OrderNo')
        this.$http.post('/bbc/ShopOrder/IsPayOrder', {
          OrderNo: orderno,
          PayType: 2
        }).then((response) => {
          if (response.status === 0) {
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
    padding-bottom: 30px;
    .title-18 {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 18px;
        color: #000;
        border-left: 3px solid #F18103;
        margin-bottom: 50px;
    }
    .code-box {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .code {
        display: inline-block;
        text-align: center;
        display: flex;
        justify-content: center;
        align-content: center;
        &:last-child{
          margin-left: 90px;
        }
        .alipay-border, .wepay-border{
          border: 2px solid #1598D7;
          border-radius: 18px;
          padding: 0;
          margin: 0;
          padding: 45px;
        }
        .wepay-border {
          border-color: #42AC38;
          .qrcode {
            border-color: #42AC38;
          }
        }
        fieldset{
          /* width: 230px; */

          .qrcode{
            width: 202px;
            height: 202px;
            border: 1px solid #1598d7;
            margin: auto;
            padding: 10px;
            position: relative;
            img {
              width: 180px;
              height: 180px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
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
