<template>
  <div clas="topNav">
    <div class="nav">
      <el-link icon="el-icon-star-off" :underline="false" @click="goToHome"
        >首页</el-link
      >
      <el-link icon="el-icon-search" :underline="false" @click="search"
        >搜索</el-link
      >
      <el-link icon="el-icon-collection-tag" :underline="false" @click="goToTag"
        >标签</el-link
      >
      <el-link icon="el-icon-paperclip" :underline="false" @click="goToCategory"
        >分类</el-link
      >
      <el-link icon="el-icon-headset" :underline="false" @click="goToMusic"
        >音乐盒</el-link
      >
      <el-link icon="el-icon-lollipop" :underline="false" @click="goToLink"
        >友链</el-link
      >
      <el-link icon="el-icon-user" :underline="false" @click="login"
        >登录</el-link
      >
    </div>
    <!--搜索对话框-->
    <el-dialog :visible.sync="dialogVisible" width="50%" @close="closeDialog">
      <!--输入框-->
      <el-input
        placeholder="请输入文章标题或文章内容"
        prefix-icon="el-icon-search"
        v-model="key"
        @change="searchByKey"
      >
      </el-input>
      <el-divider></el-divider>
      <!--文章展示部分-->
      <div v-if="articles.length > 0" v-loading="loading">
        <div
          v-for="article in articles"
          @click="goToBlog(article)"
          class="content"
        >
          <div class="left">
            <h3>{{ article.title }}</h3>
            <div>{{ article.articleSummary }}</div>
            <div>
              <span><i class="el-icon-user"></i>{{ article.articleUser }}</span>
              <span><i class="el-icon-time"></i>{{ article.pushDate }}</span>
              <span><i class="el-icon-view"></i>{{ article.readCount }}</span>
              <span
                ><i class="el-icon-lollipop"></i>{{ article.likeCount }}</span
              >
              <span
                ><el-tag v-for="tag in article.tagNames">{{
                  tag
                }}</el-tag></span
              >
            </div>
          </div>
          <div class="right">
            <img :src="article.coverUrl" alt="###" />
          </div>
        </div>
      </div>
      <!--搜索失败后的提示-->
      <div class="tips" v-if="searchFail">
        <h1>抱歉!未搜索到相关内容...</h1>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleListByKey, addReadCount } from "@/api/article";
export default {
  name: "TopNav",
  data() {
    return {
      dialogVisible: false,
      key: "",
      articles: [],
      loading: true,
      searchFail: false,
    };
  },
  mounted() {},

  methods: {
    goToHome() {
      this.$router.push({ path: "/home" });
    },
    goToTag() {
      this.$router.push({ path: "/tag" });
    },
    goToMusic() {
      this.$router.push({ path: "/music" });
    },
    goToCategory() {
      this.$router.push({ path: "/category" });
    },
    goToLink() {
      this.$router.push({ path: "/link" });
    },
    login() {
      this.$router.push({ path: "/login" });
    },
    //点击搜索按钮调用的方法
    search() {
      this.dialogVisible = true;
    },
    //输入框失去焦点或用户按下回车时调用的方法
    searchByKey() {
      getArticleListByKey(this.key).then((response) => {
        this.articles = response.data.articles;
        if (this.articles.length === 0) {
          this.searchFail = true;
        }
        this.loading = false;
      });
    },
    //关闭对话框后调用的方法
    closeDialog() {
      this.articles = [];
      this.key = "";
      this.loading = true;
      this.searchFail = false;
    },
    //阅读全文
    //传递params参数必须要使用name指定路由!!!
    goToBlog(article) {
      this.dialogVisible = false;
      this.closeDialog();
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
/*el-link*/
.el-link.el-link--default {
  color: #e8e6e3;
}
.el-link {
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
  text-decoration: none;
}
.el-link.el-link--default:hover {
  color: #409eff;
}
.nav {
  margin-top: 15px;
  z-index: 100; /*调高优先级防止被背景覆盖*/
  position: fixed;
  margin-left: 60%;
}
.el-divider {
  margin: 20px 0;
  border: 2px dashed #d2ebfd;
  background-color: #409eff00;
}
.el-divider--horizontal {
  height: 50%;
}
.tips {
  text-align: center;
}
.content {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  padding-left: 10px;
  padding-bottom: 15px;
}
.left span {
  margin-right: 5px;
}
.right {
  display: flex;
}
.right img {
  width: 250px;
  height: 150px;
  object-fit: cover;
}
</style>
