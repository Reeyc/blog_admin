import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/login',
    name: 'login',
    component: r => require(["@/components/Login/Login"], r)
  }, {
    path: '/index',
    name: 'index',
    component: r => require(["@/components/Index/Index"], r),
    redirect: "/index/home", //嵌套路由的默认子路由
    children: [{
      path: "home",
      component: r => require(["@/components/Home/Home"], r)
    }, {
      path: "all_article",
      component: r => require(["@/components/Article/AllArticle"], r)
    }, {
      path: "add_article",
      component: r => require(["@/components/Article/AddArticle"], r)
    }, {
      path: "administrator",
      component: r => require(["@/components/Administrator/Administrator"], r)
    }, {
      path: "setting",
      component: r => require(["@/components/Setting/Setting"], r)
    }, {
      path: "explain",
      component: r => require(["@/components/Explain/Explain"], r)
    }]
  }]
})
