<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>


<style lang="stylus">
@media (max-width: 500px)
  .myMsg
    min-width: 300px !important
    max-width: 300px !important
</style>
