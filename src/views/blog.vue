<template>
  <div class="blog">
    <div class="banner"></div>
    <h1 class="title">博客详情</h1>
    <el-card class="main" shadow="hover"
      ><el-card class="header" shadow="hover"
        ><span><i class="el-icon-user"></i>{{ article.articleUser }}</span>
        <span><i class="el-icon-date"></i>{{ article.pushDate }}</span>
        <span><i class="el-icon-view"></i>{{ article.readCount }}</span>
        <span
          ><i class="el-icon-ice-cream-round"></i>{{ article.likeCount }}</span
        ></el-card
      >
      <el-card class="md" shadow="hover"
        ><div v-html="article.contentMd"></div></el-card
    ></el-card>
  </div>
</template>

<script>
export default {
  name: "Blog",

  data() {
    return {
      article: {},
    };
  },
  methods: {},
  mounted() {
    this.article = this.$route.params.article;
  },
};
</script>

<style lang="css" scoped>
.banner {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/imgs/blog.jpg") center center / cover no-repeat;
  width: 100%;
  height: 50%;
}
.title {
  color: #e8e6e3;
  font-size: 2.5rem;
  font-weight: 600;
  position: absolute;
  top: 24%;
  left: 45%;
}
.main {
  margin-top: 45vh;
  width: 70%;
  margin-left: auto !important;
  margin-right: auto !important;
  /* text-align: center; */
  font-weight: 380;
  font-size: 18px;
}
.header {
  padding-bottom: 10px;
}
.header span {
  float: left;
  margin-right: 15px;
}
.md {
  font-weight: 380;
  font-size: 13px;
}
</style>
