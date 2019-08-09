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
code, pre
  color: #e4e7ed
  background-color: #263238
  font-family: Consolas, Monaco, Menlo, Bitstream Vera Sans Mono, DejaVu Sans Mono, monospace !important
@media (max-width: 500px)
  .myMsg
    min-width: 300px !important
    max-width: 300px !important
  .myConfirm
    min-width: 300px !important
    max-width: 300px !important
</style>
