import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",

    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      isShowTabBar: true
    },
    component: Home,
    children: [
      {
        path: "popup",
        name: "Popup",
        component: () => import("../views/MyPopup")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/productdetail",
    name: "ProductDetail",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetail.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    path: "/topic",
    name: "Topic",
    meta: {
      isShowTabBar: true
    },
    component: () => import("../views/Topic")
  },
  {
    path: "/user",
    name: "User",
    meta: {
      isShowTabBar: true
    },
    component: () => import("../views/User")
  },
  {
    path: "/category",
    name: "Category",
    meta: {
      isShowTabBar: true
    },
    component: () => import("../views/Category")
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {
      isShowTabBar: true
    },
    component: () => import("../views/Cart")
  },
  {
    path: "/branddetail/:id",
    name: "BrandDetail",

    component: () => import("../views/BrandDetail")
  },
  {
    path: "/channel/:id",
    name: "Channel",

    component: () => import("../views/Channel")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.path === "/cart") {
    if (token) {
      next();
    } else {
      Vue.prototype.$toast("请先登录");
      setTimeout(() => {
        next("/user");
      }, 2000);
    }
    return;
  }
  next();
});
export default router;
