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
          <quill-editor v-model="article.contentShow" :options="editorOption"></quill-editor>
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
            <el-option-group v-for="group of sele" :key="group.title" :label="group.title">
              <el-option
                v-for="(item,index) of group.content"
                :key="index"
                :label="item.label"
                :value="item.value"
              >{{ item.label }}</el-option>
            </el-option-group>
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
            :on-success="uploadSuccess"
            class="uploader"
          >
            <img v-if="article.imgShow" :src="article.imgShow" />
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
import message from "js/message";
import { cateFormat, selectCate } from "js/cate";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      //是否是编辑文章 （提交时根据该变量调整接口）
      isEdit: false,
      //格式化分类
      cate: cateFormat,
      //分类选择器数据
      sele: [],
      //文章数据
      article: {
        title: "", //标题
        content: "", //内容
        contentShow: "", //本地内容展示
        category: "", //类别
        desc: "", //描述
        img: "", //图片地址
        imgShow: "" //本地图片展示
      },
      //编辑器配置
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
          ]
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
        message("图片只能是 JPG 或者 PNG 格式!");
        return false;
      }
      //验证大小
      if (!size) {
        message("图片大小不能超过 2MB!");
        return false;
      }
      //上传至服务器
      if (type && size) {
        let fd = new FormData();
        fd.append("img", file);
        this.$http.article.uploadImg(fd).then(res => {
          if (!res) return;
          if (res.code === 1) {
            //获取服务器处理后返回的图片url
            this.article.img = res.img;
            message(res.message, "success");
          } else {
            message(res.message);
          }
        });
      }
    },
    //本地图片展示
    uploadSuccess(res, file) {
      this.article.imgShow = URL.createObjectURL(file.raw);
    },
    //文章提交
    submit() {
      let msg = "";
      let isLegal = true;
      switch (true) {
        case !this.article.title:
          msg = "请输入文章标题";
          isLegal = false;
          break;
        case !this.article.contentShow:
          msg = "请输入文章内容";
          isLegal = false;
          break;
        case !this.article.category:
          msg = "请选择文章类别";
          isLegal = false;
          break;
        case !this.article.desc:
          msg = "请输入文章描述";
          isLegal = false;
          break;
      }
      //表单填写不合法
      if (!isLegal) {
        message(msg);
        return;
      }

      //content编码，show用于本地展示，真正提交的是content
      this.article.content = encodeURIComponent(this.article.contentShow);

      //添加文章接口
      if (!this.isEdit) {
        this.$http.article.addArticle(this.article).then(res => {
          if (!res || res.code !== 1) {
            message(res.message);
            return;
          }
          message(res.message, "success");
          //添加文章成功后，清空编辑器内容
          Object.keys(this.article).forEach(item => (this.article[item] = ""));
        });
        return;
      }

      //编辑文章接口
      this.$http.article.editArticle(this.article).then(res => {
        if (!res || res.code !== 1) {
          message(res.message);
          return;
        }
        message(res.message, "success");
        //编辑文章成功后，跳回列表页
        setTimeout(() => {
          this.$router.push("/index/all_article");
        }, 2000);
      });
    },
    //获取编辑文章信息
    edit() {
      //路由id存在说明是编辑文章，反之是添加文章
      const id = this.$route.query.id;
      if (!id) return;
      this.isEdit = true;
      this.$http.article.detailArticle(Number(id)).then(res => {
        if (!res || res.code !== 1) return;
        //特别注意：vue数据新添加的属性是不会双向绑定的，所以要在给vue数据赋值之前就已经存在该属性
        res.article.imgShow = res.article.img;
        this.article = res.article;
        this.article.content = decodeURIComponent(this.article.content); //内容解码
        this.article.contentShow = this.article.content; //本地的展示内容
        this.article.category = Number(this.article.category); //类别转为number
      });
    }
  },
  created() {
    //初始化选择器数据
    this.sele = selectCate();
    this.edit();
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
      opacity: 0.8
    img
      display: block
      width: 180px
      height: 180px
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
</style>


