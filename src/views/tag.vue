<template>
  <div class="tag">
    <div class="banner"></div>
    <h1 class="title">标签</h1>
    <div class="main">
      <!--标签部分-->
      <el-card class="tag-card" shadow="hover">
        <span v-for="tag in tags">
          <el-badge :value="tag.articleNums" class="item" type="info">
            <el-tag
              :key="tag.tagId"
              :disable-transitions="true"
              effect="plain"
              type="info"
              @click="getByTag(tag.tagId)"
            >
              {{ tag.tagName }}
            </el-tag>
          </el-badge>
        </span>
      </el-card>
      <!--文章部分-->
      <el-card class="box-card" shadow="hover">
        <el-card
          v-for="article in articles"
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <img :src="article.coverUrl" />
          <h3 style="font-weight: 400">{{ article.title }}</h3>
          <p>
            {{ article.articleSummary }}
          </p>
          <div>
            <span style="float: left; margin-left: 5px"
              ><i class="el-icon-time"></i>{{ article.pushDate }}</span
            ><span style="float: right; margin-right: 5px"
              ><i class="el-icon-user"></i>{{ article.articleUser }}</span
            >
          </div>
          <el-divider></el-divider>
          <el-tag
            effect="dark"
            style="float: left; margin-left: 10px; margin-bottom: 10px"
            >{{ article.categoryName }}</el-tag
          >
          <el-button
            type="success"
            style="float: right; margin-right: 10px; margin-bottom: 10px"
            @click="goToBlog(article)"
            >阅读全文</el-button
          >
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getTagList } from "@/api/tag";
import {
  getArticleList,
  getArticleListByTag,
  addReadCount,
} from "../api/article";
export default {
  name: "Tag",

  data() {
    return {
      tags: [],
      //文章数据
      articles: [],
    };
  },
  mounted() {
    //获取标签列表
    getTagList().then((response) => {
      this.tags = response.data.tags;
    });
    //发送请求获取文章数据
    getArticleList().then((response) => {
      this.articles = response.data.articles;
    });
  },

  methods: {
    //点击某个标签后调用的方法
    getByTag(tagId) {
      getArticleListByTag(tagId).then((response) => {
        this.articles = response.data.articles;
      });
    },
    goToBlog(article) {
      //发送请求为对应的文章增加访问量
      addReadCount(article.articleId).then((response) => {
        console.log("增加访问量成功");
      });
      //路由跳转到博客详情页面,并携带当前博客的信息作为参数
      this.$router.push({ name: "Blog", params: { article: article } });
    },
  },
};
</script>

<style lang="css" scoped>
.banner {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/imgs/tag.jpg") center center / cover no-repeat;
  width: 100%;
  height: 50%;
}
.title {
  color: #e8e6e3;
  font-size: 2.5rem;
  font-weight: 600;
  position: absolute;
  top: 20%;
  left: 45%;
}
.main {
  margin-top: 45vh;
  width: 60% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  text-align: center;
}
.tag-card {
  text-align: left;
}
.tag-card .el-tag {
  cursor: pointer;
  display: inline-flex;
  margin-left: 20px;
  margin-bottom: 15px;
  border: none;
  border: 1px solid rgba(37, 34, 38, 0.15);
  font-size: 18px;
}
.box-card {
  margin-top: 30px;
}
.box-card .el-card {
  display: inline-block;
  vertical-align: top;
  width: 45%;
  margin: 10px;
  border-radius: 16px;
  padding: 0px !important;
  border: none;
}
.box-card .el-card img {
  width: 100%;
  height: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
