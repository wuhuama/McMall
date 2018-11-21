<template>
  <div id="app">
    <mc-head></mc-head>
    <router-view/>
  </div>
</template>

<script>
import McHead from '@/components/common/Head'
export default {
  name: 'App',
  components: {
    McHead
  }
}
</script>

<style>

</style>
