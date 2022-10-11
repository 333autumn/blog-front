import Cookies from "js-cookie";

//token的key
const TokenKey = "blog_admin_vue_token";

//获取token
export function getToken() {
  return Cookies.get(TokenKey);
}

//设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

//移除token
export function removeToken() {
  return Cookies.remove(TokenKey);
}
