<template>
  <div class>
    <div class="title">Write a new article！</div>
    <div class="content">
      <el-form :model="article">
        <el-col :xs="24" :md="16" class="left">
          <el-form-item label="标题：">
            <el-input v-model="article.title" size="medium" placeholder="请输入文章标题..."></el-input>
          </el-form-item>
          <el-form-item label="正文：">
            <quill-editor v-model="article.content" :options="editorOption"></quill-editor>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="7" class="right">
          <el-form-item label="标题：">
            <el-input v-model="article.he" size="medium" placeholder="请输入文章标题..."></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
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
        category: "", //类别
        content: "", //正文
        he: ""
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
  }
};
</script>

<style lang="stylus" scoped>
.title
  padding: 10px
  margin-bottom: 10px
  font-size: 18px
  border-left: 8px solid rgb(64, 158, 255)
.content
  padding: 10px 0
  .left
    margin-right: 20px
</style>

<style lang="stylus">
.quill-editor //编辑器容器高度（含工具栏）
  height: 480px
  .ql-container //工具栏根据不同的屏幕尺寸、高度不一致，内容盒子取值为容器的70%（不含工具栏）
    height: 70%
.ql-syntax //代码块内容不换行
  word-break: break-word
  word-wrap: normal
  white-space: pre
  overflow: auto
  padding: 8px
  border-radius: 8px
  border: 3px solid #ccc
.ql-picker-label //下拉框内文字高度不平
  line-height: 24px
  overflow: hidden
.ql-size //字体大小[下拉框]宽度太宽
  width: 76px !important
.ql-header //标题字体[下拉框]宽度太宽
  width: 92px !important
.ql-font //字体样式[下拉框]宽度太宽
  width: 100px !important
.ql-picker-options //下拉框下拉距Top太近
  top: 120% !important
</style>

<style lang="stylus">
.el-form-item
  margin-bottom: 15px
.el-form-item__label
  float: none
code, pre //编辑完毕显示的代码块背景
  color: #f8f8f2
  background-color: #23241f
</style>


