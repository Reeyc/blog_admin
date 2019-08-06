/**
 * login接口
 */

import axios from 'js/http'; // 导入封装的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表

export default {
  // 验证登录
  verifyLogin(params) {
    return axios.post(base.user, qs.stringify(params));
  }
};
