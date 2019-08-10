//分类数字对应数据
export const cate = {
    "Html": 1,
    "CSS": 2,
    "Bootstrap": 3,
    "Element": 4,
    "Javascript": 11,
    "ES6+": 12,
    "jQuery": 13,
    "Vue": 14,
    "React": 15,
    "小程序": 16,
    "Plugin": 17,
    "NodeJS": 21,
    "PHP": 22,
    "MySQL": 23,
    "Webpack": 31,
    "Gulp": 32,
    "Grunt": 33,
    "Babel": 34,
    "Photoshop": 35,
    "Git": 36,
    "Linux": 37,
    "Browser": 38,
    "Editor": 39
  }
  
  //格式化分类
  export const cateFormat = (val) => {
    if (!val) return "";
    let result;
    Object.keys(cate).forEach(item => {
      if (Number(val) === cate[item]) result = item;
    });
    return result;
  }
  
  //处理分类选择器数据
  export const selectCate = () => {
    const style = {
      title: "Style",
      content: []
    }
    const js = {
      title: "ECMAScript",
      content: []
    }
    const server = {
      title: "Server",
      content: []
    }
    const utils = {
      title: "Utils",
      content: []
    }
    Object.keys(cate).forEach(key => {
      const val = cate[key]
      if (val > 0 && val <= 10) {
        style.content.push({
          label: key,
          value: val
        })
      } else if (val > 10 && val <= 20) {
        js.content.push({
          label: key,
          value: val
        })
      } else if (val > 20 && val <= 30) {
        server.content.push({
          label: key,
          value: val
        })
      } else {
        utils.content.push({
          label: key,
          value: val
        })
      }
    })
    return [style, js, server, utils];
  }
  