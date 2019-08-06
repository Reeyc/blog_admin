<template>
  <div>
    <div class="header">
      <span @click="collapse" class="iconfont">&#xe611;</span>
      <span class="avatar">
        <el-popover placement="bottom" width="150" trigger="click">
          <p class="profile-item">
            <i class="iconfont">&#xe659;</i>个人信息
          </p>
          <p class="profile-item">
            <i class="iconfont">&#xe7dc;</i>修改密码
          </p>
          <p class="profile-item" @click="loginOut">
            <i class="iconfont">&#xe646;</i>注销登录
          </p>
          <img src="../../assets/img/logo.jpg" slot="reference" />
        </el-popover>
      </span>
    </div>
    <div class="tag">
      <el-tag v-for="item of 5" :key="item" effect="plain" closable class="tag-item">添加英雄</el-tag>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    collapse() {
      this.isCollapse = !this.isCollapse;
      this.$bus.$emit("collapse", this.isCollapse);
    },
    loginOut() {
      localStorage.removeItem("Authorization");
      this.setToken("");
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="stylus" scoped>
.profile-item
  padding: 8px 0
  cursor: pointer
  &:hover
    color: rgb(64, 158, 255)
  .iconfont
    font-size: 12px
    margin-right: 5px
    vertical-align: text-bottom
.header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px 15px
  .iconfont
    font-size: 24px
    cursor: pointer
  .avatar
    img
      width: 40px
      height: 40px
      border-radius: 50%
      cursor: pointer
.tag
  padding: 5px 10px
  background-color: #f8f8f8
  .tag-item
    margin: 5px
    cursor: pointer
</style>
