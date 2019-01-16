/**
 * FileName：RequestConfig
 * Created By No.3 On 2017/07/18 10:51
 * e-mail：woyzb@vip.qq.com
 */
// import Qs from 'qs';
// import {BASE_URL, ACCESS_TOKEN, TENANT_ID} from "../config/env";
const BASE_URL = "https://op.huishoubao.com";
module.exports = {
  config: {
    url: "/",
    method: "get",
    baseURL: BASE_URL,
    transformRequest: [function(data) {
      const serializeData = JSON.stringify(data);
      return serializeData;
    }],
    transformResponse: [function(data) {
      // let objData = JSON.parse(data);
      return data;
    }],
    // headers: {"Content-Type": "application/json","HSB-OPENAPI-CALLERSERVICEID":"110001"},
    headers: {"Content-Type": "text/plain; application/json; charset=utf-8"},
    // body类数据，只能在post、put的时候调用
    data: {},
    // 地址栏的参数 query
    params: {},
    timeout: 1000 * 50, // 默认超时时间是30s
    responseType: "json"
  }
};
