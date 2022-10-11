<template>
  <div>
    <el-card>
      <div>
        <!--分类选择框-->
        <el-select v-model="articleVo.categoryId" placeholder="请选择分类">
          <el-option
            v-for="item in categories"
            :value="item.categoryId"
            :label="item.categoryName"
          >
          </el-option>
        </el-select>
        <!--标签选择框-->
        <el-select
          v-if="tagSelectVisible"
          placeholder="+添加标签"
          v-model="tag"
          style="margin: 5px"
          @change="addTag"
        >
          <el-option
            v-for="item in tags"
            :value="item.tagId"
            :label="item.tagName"
          ></el-option>
        </el-select>
        <el-button
          v-else
          @click="showTagSelect"
          style="margin: 5px"
          type="primary"
          >添加标签</el-button
        >
        <el-tag
          v-for="item in showTags"
          style="margin: 5px"
          closable
          @close="handleClose(item)"
          >{{ item }}</el-tag
        >
      </div>
      <!--markdown输入框-->
      <mavon-editor
        v-model="articleVo.contentMd"
        style="margin-bottom: 5px"
        :ishljs="true"
        ref="md"
        placeholder="在此处开始编写您的文章吧!支持markdown格式"
      />
      <!--文章标题输入框-->
      <div>
        <el-input
          placeholder="请输入文章标题"
          v-model="articleVo.title"
          style="width: 30%; margin-bottom: 5px"
        >
        </el-input>
      </div>
      <!--文章概要输入框-->
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入文章概要"
        v-model="articleVo.articleSummary"
        style="width: 30%"
      >
      </el-input>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:88/server/article/upload"
        :show-file-list="false"
        :on-success="handleCoverSuccess"
        style="margin-top: 5px"
      >
        <el-button size="small" type="primary">点击上传封面</el-button>
      </el-upload>
      <!--发布博客按钮-->
      <el-button @click="publish" style="margin-top: 5px" type="success"
        >发布博客</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { publishArticle } from "@/api/article";
import { getTagList } from "@/api/tag";
import { getCategoryList } from "@/api/category";
export default {
  data() {
    return {
      //分类列表
      categories: [],
      //标签列表
      tags: [],
      //控制标签选择框是否显示
      tagSelectVisible: false,
      //选中的标签
      tag: "",
      //保存文章信息
      articleVo: {
        //文章标题
        title: "",
        //文章概要
        articleSummary: "",
        //markdown编辑框的值
        contentMd: "",
        //分类id
        categoryId: "",
        //标签id
        tagIds: [],
        //封面url
        coverUrl: "",
      },
    };
  },
  //计算属性
  computed: {
    //标签名数组
    showTags: function () {
      let data = [];
      //根据标签id找到标签名
      for (let i = 0; i < this.articleVo.tagIds.length; i++) {
        //遍历标签列表
        for (let j = 0; j < this.tags.length; j++) {
          if (this.tags[j].tagId === this.articleVo.tagIds[i]) {
            data.push(this.tags[j].tagName);
            break;
          }
        }
      }
      return data;
    },
  },
  methods: {
    //点击发布博客按钮
    publish() {
      //发送请求保存文章
      this.articleVo.contentMd = this.$refs.md.d_render;
      console.log("准备保存文章", this.articleVo);
      publishArticle(this.articleVo).then((response) => {
        this.$message({
          message: "发布博客成功",
          type: "success",
        });
      });
    },
    //点击添加标签按钮
    showTagSelect() {
      this.tagSelectVisible = true;
    },
    //选中标签后调用的方法
    addTag(value) {
      this.tagSelectVisible = false;
      //将新的标签添加到标签数组中(不能重复添加)
      if (this.articleVo.tagIds.indexOf(this.tag) === -1) {
        this.articleVo.tagIds.push(this.tag);
      }
      this.tag = "";
    },
    //删除标签调用的方法
    handleClose(item) {
      //根据标签名删除对应的标签id
      let tagId = "";
      //根据标签名找标签id
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].tagName === item) {
          tagId = this.tags[i].tagId;
          break;
        }
      }
      //在数组中删除数据
      this.articleVo.tagIds.splice(this.articleVo.tagIds.indexOf(tagId), 1);
    },
    //封面上传成功后的钩子
    handleCoverSuccess(response, file, fileList) {
      this.articleVo.coverUrl = response.data.url;
      this.$message({
        message: "封面上传成功",
        type: "success",
      });
    },
  },
  mounted() {
    //发送请求获取分类数据
    getCategoryList().then((response) => {
      this.categories = response.data.categories;
    });
    //发送请求获取标签数据
    getTagList().then((response) => {
      this.tags = response.data.tags;
    });
  },
};
</script>

<style lang="scss" scoped></style>
