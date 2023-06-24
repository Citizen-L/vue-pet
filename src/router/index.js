import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


// 路由连续点击报错解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("pages/home/home.vue"),
    meta: {
      title: "宠物交易",
    },
  },
  {
    path: "/about",
    component: () => import("pages/about/About.vue"),
    meta: {
      title: "宠物交易",
    },
  },
  {
    path: "/presell",
    component: () => import("pages/presell/Presell.vue"),
    meta: {
      title: "宠物预售",
    },
  },
  {
    path: "/wantsell",
    component: () => import("pages/presell/Wantsell.vue"),
    meta: {
      title: "宠物交易-出售",
    },
  },
  {
    path: "/detail",
    component: () => import("pages/detail/Detail.vue"),
    meta: {
      title: "宠物交易-宠物详情",
    },
  },
  {
    path: "/purchase",
    component: () => import("pages/purchase/purchase.vue"),
    meta: {
      title: "购买",
    },
  },
  {
    path: "/login",
    component: () => import("pages/login/Login.vue"),
    meta: {
      title: "宠物交易-登录",
    },
  },
  {
    path: "/register",
    component: () => import("pages/register/Register.vue"),
    meta: {
      title: "宠物交易-注册",
    },
  },
  {
    path: "/usercenters",
    component: () => import("pages/usercenters/userCenters.vue"),
    meta: {
      title: "用户管理",
    },
    children: [
      {
        path: "",
        redirect: "user",
      },
      {
        path: "user",
        component: () => import("pages/user/User.vue"),
        meta: {
          title: "宠物交易-个人中心",
        },
        children: [
          {
            path: "",
            redirect: "message",
          },
          {
            path: "message",
            component: () => import("pages/user/childcomps/UserMessage.vue"),
            meta: {
              title: "个人信息",
            },
          },
          {
            path: "changemessage",
            component: () => import("pages/user/childcomps/UserChangeMes.vue"),
            meta: {
              title: "修改资料",
            },
          },
          {
            path: "userplace",
            component: () => import("pages/user/childcomps/UserPlace.vue"),
            meta: {
              title: "地址管理",
            },
          },
          {
            path: "safety",
            component: () => import("pages/user/childcomps/UserSafety.vue"),
            meta: {
              title: "安全中心",
            },
          },
        ],
      },
      {
        path: "petorder",
        component: () => import("pages/petorder/PetOrder.vue"),
        meta: {
          title: "我的订单",
        },
      },
      {
        path: "pet",
        component: () => import("pages/pet/Pet.vue"),
        meta: {
          title: "我的宠物",
        },
      },
    ],
  },

];






const router = new VueRouter({
  // mode:'history',
  routes,
});


// 前置路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})

// 使页面跳转后回到顶部
router.afterEach( (to, from, next) => {
  window.scrollTo(0,0)
})

export default router;
