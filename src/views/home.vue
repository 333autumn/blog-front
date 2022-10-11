<template>
  <div class="home">
    <div class="banner"></div>
    <h1 class="title">首页</h1>
    <div class="logo">
      <span
        ><a :href="githubUrl" :title="githubUrl" target="_blank"
          ><img src="@/assets/imgs/github.png" alt="###" /></a
      ></span>
    </div>
    <div class="tip"><span>向下滚动</span><img src="" /></div>
    <div class="main">
      <!--文章展示部分-->
      <div class="article">
        <el-card class="box-card" shadow="hover">
          <div v-if="articles.length > 0">
            <div
              v-for="article in articles"
              @click="goToBlog(article)"
              class="content"
            >
              <div class="left">
                <h3>{{ article.title }}</h3>
                <div>{{ article.articleSummary }}</div>
                <div>
                  <span
                    ><i class="el-icon-user"></i>{{ article.articleUser }}</span
                  >
                  <span
                    ><i class="el-icon-time"></i>{{ article.pushDate }}</span
                  >
                  <span
                    ><i class="el-icon-view"></i>{{ article.readCount }}</span
                  >
                  <span
                    ><i class="el-icon-lollipop"></i
                    >{{ article.likeCount }}</span
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
        </el-card>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="count"
          >
          </el-pagination>
        </div>
      </div>
      <div class="rightNav">
        <!--分类展示部分-->
        <div class="category">
          <el-card shadow="hover" class="tag-card">
            <div class="clearfix">
              <i class="el-icon-paperclip">分类</i>
            </div>
            <el-divider></el-divider>
            <span v-for="category in categories">
              <el-badge :value="category.articleNums" class="item" type="info">
                <el-tag
                  :key="category.categoryId"
                  :disable-transitions="true"
                  effect="plain"
                  type="info"
                >
                  {{ category.categoryName }}
                </el-tag>
              </el-badge>
            </span>
          </el-card>
        </div>
        <!--标签展示部分-->
        <div class="tag">
          <el-card shadow="hover" class="tag-card">
            <div class="clearfix">
              <i class="el-icon-collection-tag">标签</i>
            </div>
            <el-divider></el-divider>
            <span v-for="tag in tags">
              <el-badge :value="tag.articleNums" class="item" type="info">
                <el-tag
                  :key="tag.tagId"
                  :disable-transitions="true"
                  effect="plain"
                  type="info"
                >
                  {{ tag.tagName }}
                </el-tag>
              </el-badge>
            </span>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList, addReadCount } from "@/api/article";
import { getCategoryList } from "@/api/category";
import { getTagList } from "@/api/tag";
export default {
  name: "Home",

  data() {
    return {
      //文章数据
      articles: [],
      //github地址
      githubUrl: "https://github.com/333autumn",
      //标签数据
      tags: [],
      //分类数据
      categories: [],
      //当前页数
      pageNum: 1,
      //每页的条数
      pageSize: 5,
      //一共有几条
      count: 1,
    };
  },

  mounted() {
    //发送请求获取文章数据
    getArticleList(this.pageNum, this.pageSize).then((response) => {
      this.articles = response.data.articles;
      this.count = response.data.count;
    });
    //欢迎消息
    this.$notify({
      message: this.$createElement(
        "i",
        { style: "color: teal" },
        "欢迎来到我的博客!还在不断完善中..."
      ),
      position: "top-left",
      duration: 2500,
    });
    //获取标签列表
    getTagList().then((response) => {
      this.tags = response.data.tags;
    });
    //获取分类列表
    getCategoryList().then((response) => {
      this.categories = response.data.categories;
    });
  },
  methods: {
    //阅读全文
    //传递params参数必须要使用name指定路由!!!
    goToBlog(article) {
      //发送请求为对应的文章增加访问量
      addReadCount(article.articleId).then((response) => {
        console.log("增加访问量成功");
      });
      //路由跳转到博客详情页面,并携带当前博客的信息作为参数
      this.$router.push({ name: "Blog", params: { article: article } });
    },
    //每页条数改变时调用
    handleSizeChange(currentSize) {
      console.log("每页条数变为了", currentSize);
      this.pageSize = currentSize;
      //发送请求获取文章数据
      getArticleList(this.pageNum, this.pageSize).then((response) => {
        this.articles = response.data.articles;
        this.count = response.data.count;
      });
    },
    //当前页码发生变化时调用
    handleCurrentChange(currentPage) {
      console.log("当前页数变为了", currentPage);
      this.pageNum = currentPage;
      //发送请求获取文章数据
      getArticleList(this.pageNum, this.pageSize).then((response) => {
        this.articles = response.data.articles;
        this.count = response.data.count;
      });
    },
  },
};
</script>

<style lang="css" scoped>
.banner {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/imgs/shouye.jpg") center center / cover no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
}
.title {
  color: #e8e6e3;
  font-size: 2.5rem;
  font-weight: 600;
  position: absolute;
  top: 40%;
  left: 45%;
}
.logo {
  position: absolute;
  top: 50%;
  left: 46.5%;
}
.tip {
  color: #e8e6e3;
  font-weight: 600;
  position: absolute;
  top: 95%;
  left: 46%;
}
/**文章内容部分 */
.article {
  float: left;
  margin-top: 95vh;
  width: 45% !important;
  margin-left: 15% !important;
  margin-right: auto !important;
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
/**标签内容部分 */
.rightNav {
  margin-top: 95vh;
  float: right;
  width: 20% !important;
  margin-right: 15% !important;
}
.tag {
  /* margin-right: 15% !important;
  margin-left: auto !important; */
}
.tag-card {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tag-card span {
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 10px;
}
/**分类内容部分 */
.category {
  /* margin-right: 15% !important;
  margin-left: auto !important; */
  margin-bottom: 30px;
}
</style>
