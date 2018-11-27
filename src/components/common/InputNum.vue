<template>
  <div class="input-num-wrapper">
    <div class="p-num-text">数量：</div>
    <input type="text" class="p-num" :value="count" @input="handleInput"/>
    <div class="p-num-modify">
      <div @click="addCount">+</div>
      <div @click="reduceCount">-</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['count'],
  methods: {
    addCount () {
      this.$emit('addCount', true)
    },
    reduceCount () {
      this.$emit('reduceCount')
    },
    handleInput () {
      this.$emit('input', this.$event.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.input-num-wrapper {
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
      border-left: 0;
      cursor: pointer;
      user-select:none;
    }
  }
}
</style>
