import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [
  //设置默认打开页面
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    hidden: true,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/music",
    component: () => import("@/views/music"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/tag",
    component: () => import("@/views/tag"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/category",
    component: () => import("@/views/category"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/link",
    component: () => import("@/views/link"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/views/blog"),
    meta: {
      keepAlive: true,
    },
  },
  //后台管理登录页面
  {
    path: "/login",
    component: () => import("@/views/login"),
    meta: {
      keepAlive: false,
    },
  },
  //404页面
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  //后台管理页面
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  //基础管理部分
  {
    path: "/basis",
    redirect: "/basis/blog",
    name: "basis",
    component: Layout,
    meta: { title: "基础管理", icon: "example" },
    children: [
      {
        path: "blog",
        name: "Blog",
        component: () => import("@/views/basis/article/index"),
        meta: { title: "博客管理", icon: "form" },
      },
      {
        path: "publish",
        name: "Publish",
        component: () => import("@/views/basis/publish/index"),
        meta: { title: "发布博客", icon: "example" },
      },
      {
        path: "comment",
        name: "Comment",
        component: () => import("@/views/basis/comment/index"),
        meta: { title: "评论管理", icon: "tree" },
      },
      {
        path: "category",
        name: "Category",
        component: () => import("@/views/basis/category/index"),
        meta: { title: "分类管理", icon: "tree" },
      },
      {
        path: "tag",
        name: "Tag",
        component: () => import("@/views/basis/tag/index"),
        meta: { title: "标签管理", icon: "tree" },
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/basis/user/index"),
        meta: { title: "用户管理", icon: "user" },
      },
      {
        path: "link",
        name: "Link",
        component: () => import("@/views/basis/link/index"),
        meta: { title: "友链管理", icon: "example" },
      },
    ],
  },
  //路由没有匹配到，跳转到404页面
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
