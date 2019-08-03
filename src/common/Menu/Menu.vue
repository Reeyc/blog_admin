<template>
  <el-menu
    router
    :default-active="$route.path"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#fff"
    active-text-color="rgb(64, 158, 255)"
    class="menu el-menu-vertical-demo"
  >
    <!-- logo -->
    <el-menu-item class="logo">
      <img src="../../assets/img/logo.jpg" />
      <span>Back Stage</span>
    </el-menu-item>
    <!-- 首页 -->
    <el-menu-item index="/index/home">
      <i class="iconfont">&#xe601;</i>
      <span>首页</span>
    </el-menu-item>
    <!-- 文章 -->
    <el-submenu index="empty">
      <template slot="title">
        <i class="iconfont">&#xe602;</i>
        <span>文章</span>
      </template>
      <el-menu-item index="/index/all_article">
        <i class="iconfont">&#xe617;</i>
        <span>所有文章</span>
      </el-menu-item>
      <el-menu-item index="/index/add_article">
        <i class="iconfont">&#xe6ab;</i>
        <span>添加文章</span>
      </el-menu-item>
    </el-submenu>
    <!-- 管理员 -->
    <el-menu-item index="/index/administrator">
      <i class="iconfont">&#xe600;</i>
      <span>管理员</span>
    </el-menu-item>
    <!-- 设置 -->
    <el-menu-item index="/index/setting">
      <i class="iconfont">&#xe6b6;</i>
      <span>设置</span>
    </el-menu-item>
    <!-- 说明 -->
    <el-menu-item index="/index/explain">
      <i class="iconfont">&#xe60f;</i>
      <span>说明</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    this.$bus.$on("collapse", signal => {
      this.isCollapse = signal;
    });
  }
};
</script>

<style lang="stylus" scoped>
.menu
  color: #fff
  border-right-width: 0
  touch-action: none
  .logo
    padding: 0 10px !important
    margin: 15px 0
    font-size: 20px
    img
      height: 80%
      border-radius: 50%
  .iconfont
    margin-right: 10px
// 展开时的宽度
.el-menu-vertical-demo:not(.el-menu--collapse)
  width: 260px
</style>
