<template>
  <div>
    <el-card class="box-card">
      <!--header部分-->
      <div slot="header" class="clearfix">
        <span>友链管理</span>
        <el-button style="float: right" type="primary" @click="handleAddLink"
          >新增友链</el-button
        >
      </div>
      <!--表格部分-->
      <el-table :data="links" style="width: 100%" :key="randomKey" stripe>
        <el-table-column prop="linkId" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="linkName" label="友链名" align="center">
        </el-table-column>
        <el-table-column prop="linkUrl" label="友链地址" align="center">
        </el-table-column>
        <el-table-column prop="linkSummary" label="友链描述" align="center">
        </el-table-column>
        <el-table-column prop="coverUrl" label="封面" align="center">
          <template slot-scope="scope"
            ><img
              :src="scope.row.coverUrl"
              alt=""
              style="width: 100px; height: 70px"
          /></template>
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
              @onConfirm="handleDelete(scope.row.linkId)"
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
import { getLinkList, saveLink, deleteLink, updateLink } from "@/api/link";
export default {
  data() {
    return {
      links: [],
      randomKey: new Date().getTime(),
      addDialogVisible: false,
      addLinkForm: {
        linkId: "",
        linkName: "",
        linkUrl: "",
        linkSummary: "",
        coverUrl: "",
      },
      dialogType: "",
    };
  },
  methods: {
    //刷新页面
    refresh() {
      getLinkList().then((response) => {
        this.links = response.data.links;
      });
      this.randomKey = new Date().getTime();
    },
    //删除友链
    handleDelete(linkId) {
      deleteLink(linkId).then((response) => {
        this.$message({
          message: "删除友链成功",
          type: "success",
        });
      });
      this.refresh();
    },
    //新增友链
    handleAddLink() {
      this.addDialogVisible = true;
      this.dialogType = "add";
      Object.keys(this.addLinkForm).forEach((key) => {
        this.addLinkForm[key] = "";
      });
      this.refresh();
    },
    //编辑友链信息
    handleEdit(link) {
      Object.keys(this.addLinkForm).forEach((key) => {
        this.addLinkForm[key] = link[key];
      });
      this.addDialogVisible = true;
      this.dialogType = "edit";
    },
    //取消提交表单
    cancelAddLink() {
      this.addDialogVisible = false;
    },
    //确认提交表单
    confirm() {
      this.addDialogVisible = false;
      if (this.dialogType === "add") {
        saveLink(this.addLinkForm).then((response) => {
          this.$message({
            message: "新增友链成功",
            type: "success",
          });
        });
      } else {
        updateLink(this.addLinkForm).then((response) => {
          this.$message({
            message: "编辑友链成功",
            type: "success",
          });
        });
      }
      this.refresh();
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
  mounted() {
    getLinkList().then((response) => {
      this.links = response.data.links;
    });
  },
};
</script>

<style lang="scss" scoped></style>
