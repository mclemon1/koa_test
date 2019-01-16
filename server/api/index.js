/**
 * FileName：api
 * Created By No.3 On 2017/7/28 0028 8:37
 * e-mail：woyzb@vip.qq.com
 */
const $http  = require ("axios");
const axiosConfig  = require ("./RequestConfig");
const utility = require('utility');

// 请求前
$http.interceptors.request.use((config) => {  
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

//响应后
$http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

function handleData(url, method = "get", params = {}, data = {}) {
  const config = Object.assign({}, axiosConfig.config);
  config.url = url;
  config.method = method.toLowerCase();
  config.params = params;
  config.params = data;
  config.data = data;
  // config.headers["HSB-OPENAPI-SIGNATURE"] = utility.md5(`${data}_090a2a8379414357eb6c808717249992`);
  return config;
  
  let httpParams = {
    _head: {
      _version: "0.01",
      _msgType: "request",
      _timestamps: "",
      _interface: "",
      _remark: ""
    },
    _param: {

    }
  }
  
  let requestParams = JSON.parse(JSON.stringify(httpParams)),
    user_id = 1540,
    token = "16e50b2728454f4365b8a5a886eb5370";
  requestParams._head._interface = "profit.getMyProfitList";
  requestParams._head._timestamps = new Date().getTime().toString().substr(0, 10);
  params.user_id = user_id || params.user_id;
  params.login_token = token || params.login_token;
  requestParams._param = data;
  config.data = requestParams;
  return config;
}

module.exports = {
  /**
   * @param url
   * @param method
   * @param params query参数
   * @param data body 参数 只限于POST与PUT
   * @returns {Promise}
   */
  doRequest(url = "", method, params = {}, data = {}) {
    return new Promise((resolve, reject) => {
      const config = handleData(url, method, params, data);
      console.log("config:",config);
      $http.request(config).then(res => {
        resolve(res);
        console.log("res:",res);
      }).catch(error => {
        console.log("catchError:", error);
        reject(error);
      });
    });
  }
};
