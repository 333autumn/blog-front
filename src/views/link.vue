<template>
  <div class="link">
    <div class="banner"></div>
    <h1 class="title">友链</h1>
    <div class="main">
      <el-card shadow="hover" class="addLink"
        >在此处添加您的链接吧!
        <el-button type="primary" @click="handleAddLink" plain>添加</el-button>
      </el-card>
      <div class="tag-card" v-if="links.length > 0">
        <div class="card" v-for="link in links">
          <img :src="link.coverUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <h3 class="card-title">{{ link.linkName }}</h3>
            <p class="card-text">
              {{ link.linkSummary }}
            </p>
            <el-divider></el-divider>
            <a class="card-link" :href="link.linkUrl">{{ link.linkUrl }}</a>
          </div>
        </div>
      </div>
    </div>
    <!--新增表单部分-->
    <el-dialog title="新增友链" :visible.sync="addDialogVisible" width="30%">
      <el-form
        :model="addLinkForm"
        label-position="left"
        label-width="auto"
        ref="addLinkForm"
      >
        <el-form-item label="友链名" prop="linkName">
          <el-input v-model="addLinkForm.linkName"></el-input>
        </el-form-item>
        <el-form-item label="友链地址" prop="linkUrl">
          <el-input v-model="addLinkForm.linkUrl"></el-input>
        </el-form-item>
        <el-form-item label="友链描述" prop="linkSummary">
          <el-input v-model="addLinkForm.linkSummary"></el-input>
        </el-form-item>
        <el-form-item label="封面url" prop="coverUrl">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:88/server/link/upload"
            :show-file-list="false"
            :on-success="handleCoverUrlSuccess"
          >
            <img
              v-if="addLinkForm.coverUrl"
              :src="addLinkForm.coverUrl"
              style="width: 50px; height: 50px"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddLink">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLinkList, saveLink } from "@/api/link";
export default {
  name: "BlogVueLink",

  data() {
    return {
      links: [],
      addDialogVisible: false,
      addLinkForm: {
        linkName: "",
        linkUrl: "",
        linkSummary: "",
        coverUrl: "",
      },
    };
  },

  mounted() {
    getLinkList().then((response) => {
      this.links = response.data.links;
    });
  },

  methods: {
    //新增友链
    handleAddLink() {
      this.addDialogVisible = true;
      Object.keys(this.addLinkForm).forEach((key) => {
        this.addLinkForm[key] = "";
      });
    },
    //确认提交表单
    confirm() {
      this.addDialogVisible = false;
      saveLink(this.addLinkForm).then((response) => {
        this.$message({
          message: "新增友链成功",
          type: "success",
        });
      });
    },
    //取消提交表单
    cancelAddLink() {
      this.addDialogVisible = false;
    },
    //封面上传成功后的钩子
    handleCoverUrlSuccess(response, file, fileList) {
      this.$message({
        message: "上传封面成功",
        type: "success",
      });
      this.addLinkForm.coverUrl = response.data.url;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.banner {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/imgs/link.jpg") center center / cover no-repeat;
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
  width: 70% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.addLink {
  width: 65%;
  margin: 0 auto;
}
.tag-card {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px;
  width: 55%;
  background-color: white;
  margin: 0 auto;
  margin-top: 20px;
}
.card {
  align-items: flex-start;
  width: 300px !important;
  margin-bottom: 40px;
}
.card:hover {
  // margin-top: 0px; /*和hover的margin-top有对比，原无30,现在0，相当于上移了,30px*/
  box-shadow: 0 0 20px 2px #918f8f; /*盒子阴影*/
  transition: all 0.5s; /*持续时间*/
}
.card-img-top {
  object-fit: cover;
  width: 100%;
}
.card-title {
  margin-left: 15px;
}
.card-text {
  margin-left: 15px;
  margin-top: 10px;
}
.card-link {
  margin-left: 15px;
}
</style>
