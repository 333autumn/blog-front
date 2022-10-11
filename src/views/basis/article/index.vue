<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>博客管理</span>
      </div>
      <!--表格部分-->
      <el-table :data="articles" style="width: 100%" :key="randomKey" stripe>
        <el-table-column prop="articleId" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="articleUser" label="发表用户" align="center">
        </el-table-column>
        <el-table-column prop="pushDate" label="发布日期" align="center">
        </el-table-column>
        <el-table-column prop="likeCount" label="点赞数" align="center">
        </el-table-column>
        <el-table-column prop="commentCount" label="评论数" align="center">
        </el-table-column>
        <el-table-column prop="readCount" label="浏览量" align="center">
        </el-table-column>
        <el-table-column prop="categoryName" label="分类" align="center">
        </el-table-column>
        <el-table-column prop="tagNames" label="标签" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <span>
                查看标签<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in scope.row.tagNames">{{
                  item
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column prop="topFlag" label="置顶" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.topFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeTopFlag(scope.row.articleId)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              style="margin-right: 3px"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row.articleId)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, switchTop, deleteArticle } from "@/api/article";
export default {
  data() {
    return {
      //博客列表信息
      articles: [],
      //显示的文章
      article: {},
      //列表数据的key
      randomKey: new Date().getTime(),
    };
  },
  methods: {
    //刷新页面
    refresh() {
      //发送请求获取文章列表
      getArticleList().then((response) => {
        this.articles = response.data.articles;
        this.randomKey = new Date().getTime();
      });
    },
    //阅读全文
    handleReadFull(article) {
      this.readFullDialogVisible = true;
      this.article = article;
    },
    //更改是否置顶
    changeTopFlag(articleId) {
      //发送请求更新置顶状态
      switchTop(articleId).then((response) => {
        this.$message({
          message: "切换置顶状态成功",
          type: "success",
        });
      });
    },
    //删除博客
    handleDelete(articleId) {
      deleteArticle(articleId).then((response) => {
        this.$message({
          message: "删除博客成功",
          type: "success",
        });
      });
      this.refresh();
    },
    //编辑博客
    handleEdit(article) {
      this.article = article;
    },
  },
  //生命周期钩子
  mounted() {
    //发送请求获取文章列表
    getArticleList().then((response) => {
      console.log("获取文章列表成功", response);
      this.articles = response.data.articles;
    });
  },
};
</script>

<style lang="css" scoped></style>
