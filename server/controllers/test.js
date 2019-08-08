const api = require('../api');
const superagent = require('superagent');
const axios = require('axios');

const postUrl = async (ctx, next) =>{
    // var http = require("http");
  
    var data = {"_head":{"_version":"0.01","_msgType":"request","_timestamps":"1547459865","_interface":"profit.getProfitListConfig","_remark":""},"_param":{"profitBeginTime":"","profitEndTime":"","couponName":"","timeType":"","couponType":"1","page":1,"pageSize":10,"user_id":"1540","login_token":"16e50b2728454f4365b8a5a886eb5370"}};
    data = JSON.stringify(data);
    
    // var opt = {
    //     hostName:'https://op.huishoubao.com/index/index',
    //     // port:'8080',
    //     method:'POST',
    //     path:'/index/index',
    //     headers:{
    //         "Content-Type": 'application/json',
    //         "Content-Length": data.length
    //     }
    // }
    
    // var body = '';
    // var req = http.request(opt, function(res) {
    //     console.log("response: " + res.statusCode);
    //     res.setEncoding('utf8');
    //     res.on('data',function(data){
    //         console.log(`BODY: ${chunk}`);
    //         body += data;
    //     }).on('end', function(){
    //         console.log(body)
    //     });
    // }).on('error', function(e) {
    //     console.log("error: " + e.message);
    // })
    // req.write(data);

    let res = await axios.post("https://op.huishoubao.com/index/index",data);
    // let res = await axios.post("119.29.8.123",data);
    // let res = await api.doRequest("/", "POST",{},{userId:"604337006"});
    // console.log("req: " + req);
    // const params = {"_head":{"_version":"0.01","_msgType":"request","_timestamps":"1548991263","_interface":"profit.getProfitListConfig","_remark":""},"_param":{"profitBeginTime":"","profitEndTime":"","couponName":"","timeType":"","couponType":"2","page":1,"pageSize":10,"user_id":"1540","login_token":"fe36bdf0ecc8a53b19cf1729b361a03f"}};
    // let res = await api.doRequest("/index/index", "POST",{},params);    
    console.log('res:',res.data);
    ctx.body = {
        data:res.data,
        success: true
    }
    // const params = {"_head":{"_version":"0.01","_msgType":"request","_timestamps":"1548991263","_interface":"PlatProfit.Admin.Activity.GetActivityList","_remark":""},"_param":{"beginDate":"","endDate":"","activityName":"","channelId":"","activityStatus":"","pageIndex":1,"pageSize":10,"channelFlag":"","user_id":"1540","login_token":"fe36bdf0ecc8a53b19cf1729b361a03f"}};
    // let res = await api.doRequest("/index/index", "POST",{},params);
    // ctx.body = res.data;
}

module.exports = {
    postUrl
}