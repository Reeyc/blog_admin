import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/components/Login/Login')), 'Login')
const Index = r => require.ensure([], () => r(require('@/components/Index/Index')), 'Index')
const Home = r => require.ensure([], () => r(require('@/components/Home/Home')), 'Home')
const AllArticle = r => require.ensure([], () => r(require('@/components/Article/AllArticle')), 'AllArticle')
const AddArticle = r => require.ensure([], () => r(require('@/components/Article/AddArticle')), 'AddArticle')
const Administrator = r => require.ensure([], () => r(require('@/components/Administrator/Administrator')), 'Administrator')
const Setting = r => require.ensure([], () => r(require('@/components/Setting/Setting')), 'Setting')
const Explain = r => require.ensure([], () => r(require('@/components/Explain/Explain')), 'Explain')
const Refresh = r => require.ensure([], () => r(require('@/common/Refresh/Refresh')), 'Refresh')

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/index',
    name: 'index',
    component: Index,
    redirect: "/index/home", //嵌套路由的默认子路由
    children: [{
      path: "home",
      component: Home,
      meta: { title: "Welcome！" }
    }, {
      path: "all_article",
      component: AllArticle,
      meta: { title: "All Articles" },
      
    }, {
      path: "add_article",
      component: AddArticle,
      meta: { title: "Write a new Article！" },
      
    }, {
      path: "administrator",
      component: Administrator,
      meta: { title: "Administrator information" },
      
    }, {
      path: "setting",
      component: Setting,
      meta: { title: "Setting" },
      
    }, {
      path: "explain",
      component: Explain,
      meta: { title: "Explain" },
    }, {
      path: "refresh",
      component: Refresh
    }]
  }]
})
