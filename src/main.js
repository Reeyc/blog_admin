// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import "css/reset.css"
import "css/border.css"
import "css/iconfont.css"

// #################################

import axios from 'axios'
Vue.prototype.$axios = axios

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
  next();
});
router.afterEach(() => NProgress.done())

//#################################

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'highlight.js/styles/monokai-sublime.css'

//#################################

import {
  Upload,
  Pagination,
  Popover,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Select,
  Option,
  Button,
  Timeline,
  TimelineItem,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Icon,
  Row,
  Col,
  Card,
  Collapse,
  CollapseItem,
  Link,
  Divider,
  Backtop,
  MessageBox,
  Message,
  Scrollbar,
  Loading
} from 'element-ui';


Vue.use(Upload);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Backtop);
Vue.use(Scrollbar);

import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

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
