<template>
  <div>
    <el-card class="box-card">
      <!--header部分-->
      <div slot="header" class="clearfix">
        <span>用户管理</span>
        <el-button style="float: right" type="primary" @click="handleAddUser"
          >新增用户</el-button
        >
      </div>
      <!--表格部分-->
      <el-table :data="users" style="width: 100%" :key="randomKey" stripe>
        <el-table-column prop="userId" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="userNickname" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="pwd" label="密码" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="avatar" label="头像" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.avatar"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column prop="mobilePhone" label="手机号" align="center">
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
              @onConfirm="handleDelete(scope.row.userId)"
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
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="30%">
      <el-form
        :model="addUserForm"
        label-position="left"
        label-width="auto"
        ref="addUserForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addUserForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userNickname">
          <el-input v-model="addUserForm.userNickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addUserForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:88/server/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="addUserForm.avatar"
              :src="addUserForm.avatar"
              style="width: 50px; height: 50px"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="addUserForm.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addUserForm.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input v-model="addUserForm.mobilePhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refreshAddUser">重 置</el-button>
        <el-button @click="cancelAddUser">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, saveUser, deleteUser, updateUser } from "@/api/user";
export default {
  data() {
    return {
      //用户列表数据
      users: [],
      //新增表单是否显示
      addDialogVisible: false,
      //新增用户对象
      addUserForm: {
        userId: "",
        userName: "",
        userNickname: "",
        pwd: "",
        email: "",
        avatar: "",
        birthday: "",
        age: "",
        mobilePhone: "",
      },
      //列表数据的key
      randomKey: new Date().getTime(),
      //对话框类型
      dialogType: "",
    };
  },
  methods: {
    //获取用户信息列表
    getList() {
      //发送请求获取所有用户信息
      getUserList().then((response) => {
        this.users = response.data.users;
        //刷新key
        this.randomKey = new Date().getTime();
      });
    },
    //点击新增按钮调用的方法
    handleAddUser() {
      this.addDialogVisible = true;
      this.dialogType = "add";
      //重置addUserForm
      Object.keys(this.addUserForm).forEach((key) => {
        this.addUserForm[key] = "";
      });
    },
    //点击对话框的确认新增按钮调用的方法
    confirm() {
      this.addDialogVisible = false;
      //判断对话框是新增对话框还是更新对话框，从而调用对应的方法
      if (this.dialogType === "add") {
        saveUser(this.addUserForm).then((response) => {
          console.log("新增用户成功", response);
          this.$message({
            message: "新增用户成功",
            type: "success",
          });
        });
      } else if (this.dialogType === "update") {
        updateUser(this.addUserForm).then((response) => {
          console.log("更新用户信息成功", response);
          this.$message({
            message: "更新用户信息成功",
            type: "success",
          });
        });
      }
      //刷新用户列表
      this.getList();
    },
    //点击编辑按钮调用的方法
    handleEdit(user) {
      //把一个对象的属性赋值给另一个对象
      Object.keys(this.addUserForm).forEach((key) => {
        this.addUserForm[key] = user[key];
      });
      //显示新增的弹出框
      this.addDialogVisible = true;
      this.dialogType = "update";
      //刷新用户列表
      this.getList();
    },
    //点击删除按钮调用的方法
    handleDelete(userId) {
      deleteUser(userId).then((response) => {
        console.log("删除用户信息成功", response);
        //刷新页面
        this.getList();
        //弹出框提示
        this.$message({
          message: "删除用户成功",
          type: "success",
        });
      });
    },
    //点击对话框的取消按钮调用的方法
    cancelAddUser() {
      this.addDialogVisible = false;
    },
    //点击对话框的重置按钮调用的方法
    refreshAddUser() {
      //重置表单
      this.$refs.addUserForm.resetFields();
    },
    //上传头像之前的钩子
    beforeAvatarUpload(file) {
      //do something before upload avatar
    },
    //头像上传成功后的钩子
    handleAvatarSuccess(response, file, fileList) {
      console.log("头像上传成功", response);
      this.addUserForm.avatar = response.data.url;
    },
  },
  mounted() {
    //发送请求获取所有用户信息
    getUserList().then((response) => {
      this.users = response.data.users;
    });
  },
};
</script>

<style lang="scss" scoped></style>
