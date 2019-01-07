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

router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path == '/login'){ // 如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/list') // 如果有token就转向list不返回登录页
    }
    next(); // 否则跳转回登录页
  }else{
    if(token != 'null' && token != null){
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      next() // 如果有token就正常转向
    }else{
      next('/login') // 否则跳转回登录页
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
