/**
 * article接口
 */

import axios from 'js/http'; // 导入封装的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import base from '../base'; // 导入接口域名列表

export default {
  //文章列表
  allArticle() {
    return axios.get(base.allArticle);
  },
  //添加文章
  addArticle(params) {
    return axios.post(base.addArticle, qs.stringify(params))
  },
  //上传图片
  uploadImg(file) {
    return axios.post(base.uploadImg, file)
  },
  //删除文章
  delArticle(id) {
    return axios.get(base.delArticle, {
      params: {
        id
      }
    })
  },
  //文章详情
  detailArticle(id) {
    return axios.get(base.detailArticle, {
      params: {
        id
      }
    })
  },
  //编辑文章
  editArticle(params) {
    return axios.post(base.editArticle, qs.stringify(params))
  }
};
