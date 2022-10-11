<template>
  <div>
    <el-card class="box-card">
      <!--header部分-->
      <div slot="header" class="clearfix">
        <span>标签管理</span>
        <el-button style="float: right" type="primary" @click="handleAddTag"
          >新增标签</el-button
        >
      </div>
      <!--表格部分-->
      <el-table :data="tags" style="width: 100%" :key="randomKey" stripe>
        <el-table-column prop="tagId" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="tagName" label="标签名" align="center">
        </el-table-column>
        <el-table-column prop="aliasName" label="标签别名" align="center">
        </el-table-column>
        <el-table-column prop="description" label="标签描述" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
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
              @onConfirm="handleDelete(scope.row.tagId)"
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
    <el-dialog title="新增分类" :visible.sync="addDialogVisible" width="30%">
      <el-form
        :model="addTagForm"
        label-position="left"
        label-width="auto"
        ref="addTagForm"
      >
        <el-form-item label="标签名" prop="categoryName">
          <el-input v-model="addTagForm.tagName"></el-input>
        </el-form-item>
        <el-form-item label="标签别名" prop="aliasName">
          <el-input v-model="addTagForm.aliasName"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input v-model="addTagForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddTag">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTagList, saveTag, deleteTag, updateTag } from "@/api/tag";
export default {
  data() {
    return {
      //标签数据
      tags: [],
      randomKey: new Date().getTime(),
      addDialogVisible: false,
      addTagForm: {
        tagId: "",
        tagName: "",
        aliasName: "",
        description: "",
      },
      dialogType: "",
    };
  },
  methods: {
    //刷新页面
    refresh() {
      getTagList().then((response) => {
        this.tags = response.data.tags;
      });
      this.randomKey = new Date().getTime();
    },
    //删除标签
    handleDelete(tagId) {
      deleteTag(tagId).then((response) => {
        this.$message({
          message: "删除标签成功",
          type: "success",
        });
      });
      this.refresh();
    },
    //新增标签
    handleAddTag() {
      this.addDialogVisible = true;
      this.dialogType = "add";
      Object.keys(this.addTagForm).forEach((key) => {
        this.addTagForm[key] = "";
      });
      this.refresh();
    },
    //编辑标签信息
    handleEdit(tag) {
      Object.keys(this.addTagForm).forEach((key) => {
        this.addTagForm[key] = tag[key];
      });
      this.addDialogVisible = true;
      this.dialogType = "edit";
    },
    //取消提交表单
    cancelAddTag() {
      this.addDialogVisible = false;
    },
    //确认提交表单
    confirm() {
      this.addDialogVisible = false;
      if (this.dialogType === "add") {
        saveTag(this.addTagForm).then((response) => {
          this.$message({
            message: "新增标签成功",
            type: "success",
          });
        });
      } else {
        updateTag(this.addTagForm).then((response) => {
          this.$message({
            message: "编辑标签成功",
            type: "success",
          });
        });
      }
      this.refresh();
    },
  },
  mounted() {
    //发送请求获取标签数据
    getTagList().then((response) => {
      this.tags = response.data.tags;
    });
  },
};
</script>

<style lang="scss" scoped></style>
