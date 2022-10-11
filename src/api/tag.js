import request from "@/utils/request";

//获取标签列表
export function getTagList() {
  return request({
    url: "/server/tag/list",
    method: "get",
  });
}

//新增标签
export function saveTag(data) {
  return request({
    url: "/server/tag/save",
    method: "post",
    data,
  });
}

//更新标签信息
export function updateTag(data) {
  return request({
    url: "/server/tag/update",
    method: "put",
    data,
  });
}

//删除标签
export function deleteTag(tagId) {
  return request({
    url: `/server/tag/delete/${tagId}`,
    method: "delete",
  });
}
