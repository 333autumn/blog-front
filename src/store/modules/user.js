import { login, logout, getInfo, getUserList } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    console.log("3、执行vuex中的login方法");
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      console.log("4、开始请求登录接口");
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
          console.log("5、登录接口调用成功");
        })
        .catch((error) => {
          // reject(error);
          console.log("登录接口调用失败", error);
        });
    });
  },
  //根据id获取用户信息
  getInfo({ commit, state }) {
    console.log("11、开始执行vuex中的getInfo方法");
    return new Promise((resolve, reject) => {
      console.log("12、请求后端获取用户信息接口");
      getInfo(state.token)
        .then((response) => {
          console.log("请求后端获取用户信息相应结果==>", response);
          const { data } = response;
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          const { name, avatar } = data;
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
          console.log("13、获取用户信息成功");
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 移除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
  //获取所有用户信息
  getUserList() {
    return new Promise(() => {
      getUserList().then((response) => {
        console.log("获取所有用户信息接口调用成功=>", response);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
