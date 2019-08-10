// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import "./assets/css/reset.css"
import "./assets/css/border.css"
import "./assets/css/iconfont.css"

// #################################

import http from 'api'
Vue.prototype.$http = http

// #################################

import fastclick from "fastclick"
fastclick.attach(document.body)

// #################################

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease', //动画方式    
  speed: 500, //递增进度条的速度    
  showSpinner: false, //是否显示加载ico    
  trickleSpeed: 200, //自动递增间隔    
  minimum: 0.3 //初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    next();
  } else {
    //token验证
    const token = localStorage.getItem("Authorization")
    token ? next() : next('/login')
  }
});
router.afterEach(() => NProgress.done())

//#################################

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//#################################

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
