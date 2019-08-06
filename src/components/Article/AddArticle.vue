<!-- Page of 添加文章 -->
<template>
  <div class="add-article">
    <el-form :model="article">
      <el-col :xs="24" :md="16" class="left">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input v-model="article.title" size="medium" clearable placeholder="请输入文章标题..."></el-input>
        </el-form-item>
        <!-- 正文 -->
        <el-form-item label="正文：">
          <quill-editor v-model="article.content" :options="editorOption"></quill-editor>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="7" class="right">
        <!-- 分类 -->
        <el-form-item label="分类：">
          <el-select
            v-model="article.category"
            size="medium"
            clearable
            placeholder="请选择文章分类..."
            class="category"
          >
            <el-option label="Layout" :value="1"></el-option>
            <el-option label="JavaScript" :value="2"></el-option>
            <el-option label="Utils" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述：">
          <el-input v-model="article.desc" size="medium" clearable placeholder="请输入文章描述..."></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="缩略图：">
          <el-upload
            action="http://www.hellomk.cn/admin/api/upload_img.php"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            class="uploader"
          >
            <img v-if="article.imgUrl" :src="article.imgUrl" />
            <i v-else class="el-icon-plus uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">请选择 JPG 或 PNG 格式的图片，大小不能超过 2MB</div>
          </el-upload>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button size="medium" type="primary" @click="submit" class="submit">提交</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import hljs from "highlight.js";
export default {
  data() {
    return {
      article: {
        title: "", //标题
        content: "", //正文
        category: "", //类别
        desc: "", //描述
        imgUrl: "" //图片
      },
      editorOption: {
        placeholder: "请输入文章内容...",
        modules: {
          toolbar: [
            [
              "bold", //加粗
              "italic", //斜体
              "underline", //下划线
              "strike", //删除线
              "blockquote", //引用
              "code-block", //代码块
              "image", //图片
              "video", //视频
              "clean" //清除字体样式
            ],
            [{ direction: "rtl" }], //文本方向切换
            [{ background: [] }, { color: [] }], //文字颜色、背景颜色
            [{ list: "ordered" }, { list: "bullet" }], //有序列表、圆点列表
            [{ indent: "+1" }, { indent: "-1" }], //缩进、反缩进
            [{ align: [] }], //对齐方式
            [{ font: [] }], //字体样式
            [{ header: [1, 2, 3, 4, 5, 6, false] }] //标题字体
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value //higtlight监听代码设置高亮
          }
        }
      }
    };
  },
  methods: {
    //图片上传
    beforeUpload(file) {
      const type = file.type === "image/jpeg" || file.type === "image/png";
      const size = file.size / 1024 / 1024 < 2;
      //验证类型
      if (!type) {
        this.$message.error("图片只能是 JPG 或者 PNG 格式!");
        return false;
      }
      //验证大小
      if (!size) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
      //上传至服务器
      if (type && size) {
        let fd = new FormData();
        fd.append("img", file);
        this.$http.article.uploadImg(fd).then(res => {
          if (!res) return;
          if (res.code === 1) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    //图片展示
    handleAvatarSuccess(res, file) {
      console.log(file);
      
      this.article.imgUrl = URL.createObjectURL(file.raw);
    },
    submit() {
      let message = "";
      if (!this.article.title) {
        message = "请输入文章标题";
      } else if (!this.article.content) {
        message = "请输入文章内容";
      } else if (!this.article.category) {
        message = "请选择文章类别";
      } else if (!this.article.desc) {
        message = "请输入文章描述";
      } else {
        this.$http.article.addArticle(this.article).then(res => {
          message = "提交成功！";
          this.$message.success(message);
          console.log(res);
        });
        //异步的任务已加入队列，即使return了，then也不会受影响
        return;
      }
      this.$message.error(message);
    }
  }
};
</script>

<style lang="stylus" scoped>
.add-article
  padding: 10px 0
  .left
    margin-right: 20px
.category, .uploader, .submit
  width: 100%
.uploader
  &>>>.el-upload
    border: 1px solid #d9d9d9
    border-radius: 6px
    cursor: pointer
    position: relative
    overflow: hidden
    &:hover
      border-color: #409EFF
      .uploader-icon
        color: #409EFF
    .uploader-icon
      font-size: 28px
      color: #8c939d
      width: 180px
      height: 180px
      line-height: 180px
      text-align: center
    img
      width: 180px
      height: 180px
      display: block
  .el-upload__tip
    line-height: 0
    margin-bottom: 15px
.submit
  margin: 10px 0
</style>

<style lang="stylus">
.quill-editor // 编辑器容器高度（含工具栏）
  height: 480px
  .ql-container // 工具栏根据不同的屏幕尺寸、高度不一致，内容盒子取值为容器的70%（不含工具栏）
    height: 70%
.ql-syntax // 代码块内容不换行
  word-break: break-word
  word-wrap: normal
  white-space: pre
  overflow: auto
  padding: 8px
  border-radius: 8px
  border: 3px solid #ccc
.ql-picker-label // 下拉框内文字高度不平
  line-height: 24px
  overflow: hidden
.ql-size // 字体大小[下拉框]宽度太宽
  width: 76px !important
.ql-header // 标题字体[下拉框]宽度太宽
  width: 92px !important
.ql-font // 字体样式[下拉框]宽度太宽
  width: 100px !important
.ql-picker-options // 下拉框下拉距Top太近
  top: 120% !important
</style>

<style lang="stylus">
.el-form-item
  margin-bottom: 15px
.el-form-item__label
  font-size: 18px
  float: none
code, pre // 编辑完毕显示的代码块背景
  color: #f8f8f2
  background-color: #23241f
</style>


