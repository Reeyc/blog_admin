<template>
  <el-row type="flex" justify="center" class="container">
    <el-col :xs="22" :sm="12" :md="6">
      <el-card class="card">
        <h2 class="title">后台管理系统</h2>
        <el-form :model="formData" :rules="rules" class="form">
          <el-form-item prop="user" class="item">
            <el-input
              v-model="formData.user"
              prefix-icon="el-icon-user"
              clearable
              placeholder="请输入账号"
              class="user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass" class="item">
            <el-input
              v-model="formData.pass"
              prefix-icon="el-icon-lock"
              clearable
              placeholder="请输入密码"
              show-password
              class="pass"
            ></el-input>
          </el-form-item>
          <el-form-item class="item last-item">
            <el-button
              size="medium"
              type="primary"
              class="login"
              @click.enter.native="login"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import message from "js/message";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      //表单数据
      formData: {
        user: "",
        pass: ""
      },
      //表单验证规则
      rules: {
        user: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    login() {
      if (!this.formData.user || !this.formData.pass) {
        message("请输入账号和密码");
        return;
      }
      this.$http.login
        .verifyLogin({
          user: this.formData.user,
          pass: this.formData.pass
        })
        .then(res => {
          if (!res) return;
          if (!res.authorization) {
            message(res.message);
          } else {
            this.setToken(res.authorization);
            this.$router.replace("/index");
          }
        })
        .catch(e => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  align-items: center
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  background-color: #006666
  .title
    font-weight: normal
    text-align: center
    font-size: 20px
    margin-bottom: 25px
  .user, .pass
    font-size: 13px
    & >>> .el-input__inner
      &::-webkit-input-placeholder
        color: #7f7f7f
      &:-moz-placeholder
        color: #7f7f7f
      &::-moz-placeholder
        color: #7f7f7f
      &:-ms-input-placeholder
        color: #7f7f7f
  .login
    width: 100%
  .last-item
    margin-bottom: 0
</style>

