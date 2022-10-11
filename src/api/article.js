import request from "@/utils/request";

//获取博客列表
export function getArticleList(pageNum, pageSize) {
  return request({
    url: "/server/article/list",
    method: "get",
    params: { pageNum: pageNum, pageSize: pageSize },
  });
}

//更新博客置顶状态
export function switchTop(articleId) {
  return request({
    url: `/server/article/switchTop/${articleId}`,
    method: "patch",
  });
}

//删除博客
export function deleteArticle(articleId) {
  return request({
    url: `/server/article/delete/${articleId}`,
    method: "delete",
  });
}

//发布博客
export function publishArticle(articleVo) {
  return request({
    url: "/server/article/publish",
    method: "post",
    data: articleVo,
  });
}

//增加访问量
export function addReadCount(articleId) {
  return request({
    url: `/server/article/addReadCount/${articleId}`,
    method: "put",
  });
}

//增加点赞数
export function addLikeCount(articleId) {
  return request({
    url: `/server/article/addLikeCount/${articleId}`,
    method: "put",
  });
}

//根据关键字获取博客列表
export function getArticleListByKey(key) {
  return request({
    url: `/server/article/list/${key}`,
    method: "get",
  });
}

//获取对应分类下的所有博客
export function getArticleListByCategory(categoryId) {
  return request({
    url: `/server/article/listByCategory/${categoryId}`,
    method: "get",
  });
}

//获取对应标签下的所有博客
export function getArticleListByTag(tagId) {
  return request({
    url: `/server/article/listByTag/${tagId}`,
    method: "get",
  });
}
