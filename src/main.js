// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from  'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import {Loading,Message} from 'element-ui'  // 引用加载和消息组件

// 1、 拦截请求
// 1-1、 定义一个全局的加载组件
let loading;
axios.interceptors.request.use(request=>{
  // 发送请求的时候应该执行什么
  console.log("请求发送");
  loading = Loading.service({fullscreen:true});
  return request
},error => {
  // 请求发送失败应该做什么
  Message.error({
    message:'请求失败'
  });
  return Promise.reject(error)
});
// 2、 拦截请求数据
axios.interceptors.response.use(response => {
  console.log("请求到数据");
  loading.close();
  return response
},error => {
  loading.close();
  Message.error({
    message:'加载超时'
  });
  return Promise.reject(error)
});

/*
* 这里是用户之间通讯所需要用到的组件
* */
// import VueSocketio from 'vue-socket.io'  // 使用vue-socket.io组件进行服务器与客户端的通讯
/*
* 通讯组件到这里结束
* */

  //这里是给原生对象扩展了一个axios方法，现在每个原型对象都有这个方法
/*-------------JW---------------*/
// import Egrid from 'egrid'
// import 'element-ui/lib/theme-default/icon.css'
// import 'element-ui/lib/theme-default/table.css'
// import 'element-ui/lib/theme-default/table-column.css'
// Vue.use(Egrid);
/*--------------------------------*/
Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.axios=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
