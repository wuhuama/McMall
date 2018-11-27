<template>
  <div>
    <h6>我是子组件</h6>
    <button @click="changeText()">点击改变父组件的数据</button>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  props: ['msg'],
  methods: {
    changeText () {
      this.$emit('change-Text', '这是子组件传递给父组件的文字')
    }
  }
}
</script>
