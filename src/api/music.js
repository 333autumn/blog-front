import request from "../utils/request";

//获取轮播图数据
export function getBanners() {
  return request({
    url: "/music/banner",
    method: "get",
  });
}

//获取推荐歌单
export function getPlayList() {
  return request({
    url: "/music/personalized",
    method: "get",
    params: {
      limit: 10,
    },
  });
}

//获取最新mv
export function getLatestMv() {
  return request({
    url: "/music/personalized/mv",
    method: "get",
  });
}

//获取最新音乐
export function getLatestMusics() {
  return request({
    url: "/music/personalized/newsong",
    method: "get",
  });
}
