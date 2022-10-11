<template>
  <div>
    <el-card class="box-card">
      <!--header部分-->
      <div slot="header" class="clearfix">
        <span>分类管理</span>
        <el-button style="float: right" type="primary" @click="handleAddTag"
          >新增分类</el-button
        >
      </div>
      <!--表格部分-->
      <el-table :data="categories" style="width: 100%" :key="randomKey" stripe>
        <el-table-column prop="categoryId" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="categoryName" label="分类名" align="center">
        </el-table-column>
        <el-table-column prop="aliasName" label="分类别名" align="center">
        </el-table-column>
        <el-table-column prop="description" label="分类描述" align="center">
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
              @onConfirm="handleDelete(scope.row.categoryId)"
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
        :model="addCategoryForm"
        label-position="left"
        label-width="auto"
        ref="addCategoryForm"
      >
        <el-form-item label="分类名" prop="categoryName">
          <el-input v-model="addCategoryForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="aliasName">
          <el-input v-model="addCategoryForm.aliasName"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input v-model="addCategoryForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddCategory">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCategoryList,
  saveCategory,
  deleteCategory,
  updateCategory,
} from "@/api/category";
export default {
  data() {
    return {
      //分类数据
      categories: [],
      randomKey: new Date().getTime(),
      //新增分类对象
      addCategoryForm: {
        categoryId: "",
        categoryName: "",
        aliasName: "",
        description: "",
      },
      addDialogVisible: false,
      //对话框类型
      dialogType: "",
    };
  },
  methods: {
    //刷新页面
    refresh() {
      getCategoryList().then((response) => {
        this.categories = response.data.categories;
      });
      this.randomKey = new Date().getTime();
    },
    //新增分类
    handleAddTag() {
      this.dialogType = "add";
      this.addDialogVisible = true;
      Object.keys(this.addCategoryForm).forEach((key) => {
        this.addCategoryForm[key] = "";
      });
    },
    //编辑分类
    handleEdit(category) {
      this.dialogType = "edit";
      Object.keys(this.addCategoryForm).forEach((key) => {
        this.addCategoryForm[key] = category[key];
      });
      this.addDialogVisible = true;
    },
    //删除分类
    handleDelete(categoryId) {
      deleteCategory(categoryId).then((response) => {
        this.$message({
          message: "删除分类成功",
          type: "success",
        });
      });
      this.refresh();
    },
    //确认提交表单
    confirm() {
      if (this.dialogType === "add") {
        saveCategory(this.addCategoryForm).then((response) => {
          this.$message({
            message: "保存分类成功",
            type: "success",
          });
        });
      } else {
        updateCategory(this.addCategoryForm).then((response) => {
          this.$message({
            message: "编辑分类成功",
            type: "success",
          });
        });
      }
      this.addDialogVisible = false;
      this.refresh();
    },
    //取消提交表单
    cancelAddCategory() {
      this.addDialogVisible = false;
    },
  },
  mounted() {
    //发送请求获取分类数据
    getCategoryList().then((response) => {
      this.categories = response.data.categories;
    });
  },
};
</script>

<style lang="scss" scoped></style>
