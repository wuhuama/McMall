<template>
  <div class="container">
    <div class="fl submenu">
      <div class="sub-menu-wrapper">
        <ul class="sub-nav-items">
          <li class="sub-nav-item" v-for="(item, index) in 8" :key="item.id" @click="getGoodsList(item, index)">
            二级菜单
          </li>
        </ul>
      </div>
    </div>
    <div class="fr goods-wrapper">
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClassGoods',
  data () {
    return {
      subMenuList: []
    }
  },
  methods: {
    getGoodsList(item, index) {
      console.log(index)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
