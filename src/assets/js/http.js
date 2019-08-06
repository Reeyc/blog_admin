/**
 * axios封装
 * 请求拦截、响应拦截、错误处理
 */
import axios from 'axios';
// import router from '../../router';
import store from '../../store/index';
import {
  Loading
} from 'element-ui'

let loading;

//创建axios实例（含超时时间）
const http = axios.create({
  timeout: 12000
});

//设置post请求头
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 
 * 请求拦截器 
 */
http.interceptors.request.use(
  config => {
    loading = Loading.service({
      lock: true,
      text: 'loading……',
      background: 'rgba(0, 0, 0, 0.8)',
    });
    const token = store.state.token; //获取本地token
    token && (config.headers.Authorization = token); //token存在，则在请求头携带token信息
    return config;
  },
  err => Promise.reject(err))

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  // 请求成功
  res => {
    loading.close();
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
  },
  // 请求失败
  err => {
    // const { res } = error;
    // if (res) {
    // 状态码非2xx的情况
    // errorHandle(res.status, res.data.message);
    return Promise.reject(err);
    // } 
    // else {
    //   //断网的情况
    //   if (!window.navigator.onLine) {
    //     store.commit('changeNetwork', false);
    //   } else {
    //     return Promise.reject(error);
    //   }
    // }
  });

/** 
 * 请求失败后的错误统一处理 
 */
// const errorHandle = (status, other) => {
//   switch (status) {
//     //401: 未登录
//     case 401:
//       alert("未登陆")
//       toLogin();
//       break;
//       //403: token过期
//     case 403:
//       alert("登录过期");
//       localStorage.removeItem('token');
//       store.commit('loginSuccess', null);
//       toLogin();
//       break;
//       //404: 请求不存在
//     case 404:
//       alert("资源不存在");
//       break;
//     default:
//       alert(other);
//   }
// }

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// }

export default http
