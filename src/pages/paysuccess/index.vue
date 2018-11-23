<template>
  <div class="container">
    <div class="main-content">
      <div class="img"></div>
      <div class="text orange-30">支付成功！</div>
      <div class="text black-20">感谢您的购买</div>
      <div class="text black-20">可在
        <router-link to="/orderlist" class="order">"我的订单"</router-link>
        找到您支付的订单</div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.container{
  width: 1000px;
  margin: 0 auto;
  .main-content{
    margin-top: 25px;
    background-color: #fff;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    .img {
      width: 130px;
      height: 130px;
      margin: 0 auto;
    }
    .orange-30 {
      color: #F37E02;
      font-size: 30px;
      margin-bottom: 25px;
    }
    .black-20 {
      color: #000;
      font-size: 20px;
      .order {
        color: orangered;
      }
    }
  }
}
</style>
