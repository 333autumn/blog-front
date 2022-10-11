import request from "@/utils/request";

//获取分类列表
export function getCategoryList() {
  return request({
    url: "/server/category/list",
    method: "get",
  });
}

//新增分类
export function saveCategory(data) {
  return request({
    url: "/server/category/save",
    method: "post",
    data,
  });
}

//更新分类信息
export function updateCategory(data) {
  return request({
    url: "/server/category/update",
    method: "put",
    data,
  });
}

//删除分类
export function deleteCategory(categoryId) {
  return request({
    url: `/server/category/delete/${categoryId}`,
    method: "delete",
  });
}
