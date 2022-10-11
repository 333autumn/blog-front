import request from "@/utils/request";

//用户登录
export function login(data) {
  console.log("登录接口被调用-----");
  return request({
    url: "/server/user/login",
    method: "post",
    data,
  });
}

//根据id获取用户信息
export function getInfo(token) {
  return request({
    url: "/server/user/info",
    method: "get",
    params: { token },
  });
}

//获取所有用户信息
export function getUserList() {
  return request({
    url: "/server/user/list",
    method: "get",
  });
}

//新增用户信息
export function saveUser(data) {
  return request({
    url: "/server/user/save",
    method: "post",
    data,
  });
}

//更新用户信息
export function updateUser(data) {
  return request({
    url: "/server/user/update",
    method: "put",
    data,
  });
}

//删除用户信息
export function deleteUser(userId) {
  return request({
    url: `/server/user/delete/${userId}`,
    method: "delete",
  });
}
