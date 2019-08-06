/**
 * article接口
 */

import axios from 'js/http'; // 导入封装的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表

export default {
  // 展示文章
  allArticle() {
    return axios.get(base.allArticle);
  },
  // 添加文章
  addArticle(params) {
    return axios.post(base.addArticle, qs.stringify(params))
  },
  //上传图片
  uploadImg(file) {
    return axios.post(base.uploadImg, file)
  }
};
