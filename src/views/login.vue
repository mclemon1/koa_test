
<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录 
      </span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="账号"
          type="text">
        </el-input>
        <el-input 
          v-model="password" 
          placeholder="密码"
          type="password" @keyup.enter.native="login">
        </el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </el-col>
    <!-- <canvas id="live2dcanvas" width="300" height="600" class="live2d"></canvas> -->
    <!-- <div v-html='live2d("live2dcanvas")'>{{live2d("live2dcanvas")}}</div> -->
    <!-- <%- live2d("live2dcanvas") %> -->
  </el-row>
</template>

<script>
import config from '@/config'
export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  mounted(){
    // this.$axios.get("http://127.0.0.1:8889/auth/user/1").then(res => {
    //   console.log(res,"res");
    // });
    // const wxParams = {
    //   "appId":"wxea9d7eb705e40245",
    //   "appsecret":"3197ab0affe0835bc64f167129c7bcef",
    //   // "cbUrl":"http://10.0.10.216:3003/"
    //   "cbUrl":"https://www.baidu.com/"
    //   // "cbUrl":"https://op.huishoubao.com/index.html#/?login_token=2c31a0fdd4dd43c6147ddc73a7e7f92c&user_id=1540"
    // }
    // console.log(encodeURIComponent(wxParams.cbUrl));
    // const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxParams.appId}&redirect_uri=${encodeURIComponent(wxParams.cbUrl)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    // console.log(this.$router);
    // // window.location.href = url;

    // const getUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxParams.appId}&secret=${wxParams.appsecret}&code=0112eJlI0RXBhg2lLciI0GEplI02eJl5&grant_type=authorization_code`
    // this.$axios.post(getUrl).then(res => {
    //   console.log(res,"res");
    // });
  },
  methods:{
    login(){
      const vm = this;
      const params = {
        name:vm.account,
        password:vm.password
      }
      this.$axios.post(config.hostUrl + "/auth/user",params).then(res => {
        if(res.success){ // 如果成功
          sessionStorage.setItem('demo-token',res.token); // 用sessionStorage把token存下来
          this.$message({ // 登录成功，显示提示语
            type: 'success',
            message: '登录成功！'
          }); 
          this.$router.push('/list') // 进入todolist页面，登录成功
        }else{
          this.$message.error(res.info); // 登录失败，显示提示语
          sessionStorage.setItem('demo-token',null); // 将token清空
        }
      },(err) => {
        this.$message.error('请求错误！')
        sessionStorage.setItem('demo-token',null); // 将token清空
      });
    }
  }
};
</script>

<style scoped>
.el-row.content{padding:16px;}
.title{font-size:28px;}
.el-input{margin:12px 0;}
.el-button{width:100%;margin-top:12px;}
</style>