import request from "@/utils/request";

//获取友链列表
export function getLinkList() {
  return request({
    url: "/server/link/list",
    method: "get",
  });
}

//新增友链
export function saveLink(data) {
  return request({
    url: "/server/link/save",
    method: "post",
    data,
  });
}

//更新友链信息
export function updateLink(data) {
  return request({
    url: "/server/link/update",
    method: "put",
    data,
  });
}

//删除友链
export function deleteLink(linkId) {
  return request({
    url: `/server/link/delete/${linkId}`,
    method: "delete",
  });
}
