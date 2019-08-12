//工具栏选项（每个数组代表一个分组）
const toolOptions = [
  ['bold', //加粗
    'italic', //斜体
    'underline', //下划线
    'strike', //删除线
    'blockquote', //引用
    'code-block', //代码块
    "clean" //清除字体样式
  ],
  [{
    'list': 'ordered' //有序列表
  }, {
    'list': 'bullet' //圆点列表
  }],
  [{
    'indent': '+1' //缩进
  }, {
    'indent': '-1' //反缩进
  }],
  [{
    'direction': 'rtl' //文本方向切换
  }],
  ['textLight'], //文本高亮（新添加的工具）
  [{
    'color': [] //文字颜色
  }, {
    'background': [] //背景颜色
  }],
  [{
    'header': [1, 2, 3, 4, 5, 6, false] //标题字体
  }],

  [{
    'font': [] //字体样式
  }],
  [{
    'align': [] //对齐方式
  }],
  ['link', 'image', 'video'] //链接、图片、视频

];


const handlers = {
  shadeBox: null,
  //文本高亮
  textLight: function () {
    //被选中文本的标签
    const ele = window.getSelection().anchorNode.parentNode;
    //如果该标签已高亮过了，则终止
    if (ele.isLight) return
    //新建一个code标签
    const code = document.createElement("code");
    //code标签获取选中文本标签的内容
    code.innerText = ele.innerText
    //code标签添加高亮
    code.classList.add("light")
    //把文本标签内容清空，code标签添加进去
    ele.innerHTML = ""
    ele.appendChild(code)
    //标注该code标签已高亮
    code.isLight = true;
  }
};

export default {
  placeholder: '请输入文章内容...',
  theme: 'snow', //主题
  modules: {
    toolbar: {
      container: toolOptions, //工具栏选项
      handlers: handlers //事件重写
    }
  },
  initButton: function () { //在使用的页面中初始化按钮样式
    const sourceEditorButton = document.querySelector('.ql-textLight')
    sourceEditorButton.classList.add("el-icon-sunny", "edit-icon")
  }
};
