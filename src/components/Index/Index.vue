<!--结构模板页面-->
<template>
  <div class="container">
    <Menu></Menu>
    <div class="main">
      <Header></Header>
      <div class="content">
        <transition name="page" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "common/Menu/Menu";
import Header from "common/Header/Header";
export default {
  components: { Menu, Header }
};
</script>

<style lang="stylus" scoped>
.container
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  display: flex
  .main
    width: 100%
    .content
      padding: 20px 30px
.page-enter, .page-leave-to
  opacity: 0
  transform: translate(100px)
.page-enter-active, .page-leave-active
  transition: all 0.2s
</style>
