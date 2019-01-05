// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//请求前处理
axios.interceptors.request.use(function (config) {
  return config;
}, function (err) {
  console.log('request errod', err);
  return Promise.reject(err)
})

//响应结果处理
axios.interceptors.response.use(function (res) {
  res = res.data;
  return res;
}, function (err) {
  console.log('response error', err);
  return Promise.reject(err);
})

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
