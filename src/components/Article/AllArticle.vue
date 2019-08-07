<!-- Page of 所有文章 -->
<template>
  <div class="all-article">
    <!-- 批量删除 / 筛选 / 查询 -->
    <div class="filter">
      <el-button type="danger" size="small" :disabled="!check.length">批量删除</el-button>
      <el-select
        v-model="seleVal"
        @change="selectChange"
        size="small"
        placeholder="筛选文章类别..."
        class="select"
      >
        <el-option label="全部" value="all"></el-option>
        <el-option label="Layout" :value="1"></el-option>
        <el-option label="JavaScript" :value="2"></el-option>
        <el-option label="Util" :value="3"></el-option>
      </el-select>
      <el-autocomplete
        v-model="query.queVal"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="querySelec"
        clearable
        size="small"
        placeholder="输入文章名称搜索..."
      ></el-autocomplete>
    </div>
    <!-- 文章列表 -->
    <div class="article-list">
      <el-table :data="handleData" stripe highlight-current-row @selection-change="selectRow">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <!-- 自己定制单元格的模板，方便ellipsis文字溢出省略 -->
        <el-table-column label="文章标题">
          <template slot-scope="data">
            <span class="ellipsis">{{data.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章内容">
          <template slot-scope="data">
            <span class="ellipsis">{{data.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="data">
            <span class="ellipsis">{{formatCate(data.row.category)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="data">
            <el-button plain type="primary" size="mini" class="btn">查看</el-button>
            <el-button plain type="info" size="mini" class="btn">编辑</el-button>
            <el-button plain type="danger" size="mini" class="btn">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <el-pagination
      layout="sizes, total, prev, pager, next, jumper"
      background
      :total="paginations.total"
      :page-size="paginations.pgSz"
      :current-page="paginations.curPg"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //########## 选择器变量 ##########
      seleVal: "all",
      //########## 搜索框 ##########
      query: {
        queVal: "", //搜索框变量
        queData: [] //搜索框数据
      },
      //########## 复选框选中的数组 ##########
      check: [],
      //########## 数据 ##########
      data: {
        handledData: [], //处理过后的数据（用于展示）
        originData: [] //原始数据（用于恢复）
      },
      //########## 页码 ############
      paginations: {
        total: 0, //总条数
        pgSz: 10, //每页展示的条数
        curPg: 1 //当前页
      }
    };
  },
  computed: {
    //########## 分页与数据联动 ##########
    handleData() {
      //从首页到上一页的表单数据
      const oldData = (this.paginations.curPg - 1) * this.paginations.pgSz;
      //从首页到当前页的表单数据
      const newData = this.paginations.curPg * this.paginations.pgSz;
      //截取上一页到当前页的表单数据
      return this.data.handledData.slice(oldData, newData);
    }
  },
  methods: {
    //########## 格式化类别 ##########
    formatCate(cate) {
      switch (Number(cate)) {
        case 1:
          return "Layout";
        case 2:
          return "JavaScript";
        case 3:
          return "Util";
        default:
          return "Unknown";
      }
    },
    //########## 选择器筛选 ##########
    selectChange(cate) {
      //筛选后跳到第一页
      this.paginations.curPg = 1;
      //选中全部
      if (cate === "all") {
        this.data.handledData = this.data.originData;
        return;
      }
      //选中类别
      this.data.handledData = this.data.originData.filter(item => {
        return Number(item.category) === cate;
      });
    },
    //########## 搜索框搜索 ##########
    querySearch(str, cb) {
      let results = null;
      if (str) {
        results = this.query.queData.filter(e => {
          return e.value.toLowerCase().indexOf(str.toLowerCase()) > -1;
        });
      } else {
        results = this.query.queData;
      }
      cb(results);
    },
    //########## 搜索框选中 ##########
    querySelec(val) {
      this.data.handledData = [
        this.data.handledData.find(item => item.title === val.value)
      ];
      this.query.queVal = "";
    },
    //########## 复选框选中 ##########
    selectRow(rows) {
      this.check = rows;
    },
    //########## 更新当前页数 ##########
    handleCurrentChange(val) {
      this.paginations.curPg = val;
    },
    //########## 更新每页的条数 ##########
    handleSizeChange(val) {
      this.paginations.pgSz = val;
    }
  },
  watch: {
    //########## 数据更新 ##########
    "data.handledData"(val) {
      //同步页码总条数
      this.paginations.total = val.length;
      //同步搜索框数据
      this.query.queData = [];
      val.forEach(item => {
        this.query.queData.push({ value: item.title });
      });
    }
  },
  created() {
    //########## 获取数据 ##########
    this.$http.article.allArticle().then(res => {
      if (!res || res.code !== 1) return;
      res.article.forEach(item => {
        //解码
        item.content = decodeURIComponent(item.content);
        //把内容前后的<p></p>去掉
        item.content = item.content.slice(3, -4);
      });
      //初始化数据
      this.data.handledData = this.data.originData = res.article;
      //初始化搜索框数据
      this.query.queData = res.article.map(
        item => (item = { value: item.title })
      );
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~css/mixins.styl'
// 表格文本溢出省略
.ellipsis
  ellipsis()
.all-article
  padding: 10px 5px
  .filter
    display: flex
    margin-bottom: 15px
    .select
      margin: 0 15px
  .el-pagination
    margin: 20px 0
    white-space: normal
    & >>> .el-pagination__sizes
      margin-bottom: 15px
@media (max-width: 1255px)
  .btn
    margin-left: 0
    margin-bottom: 5px
</style>

