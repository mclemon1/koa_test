
<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <el-row>
        <el-input 
          v-model="text" 
          placeholder="请输入"
          type="text">
        </el-input>
        <el-button type="primary" @click="submit">记录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    };
  },
  mounted(){
    // this.$axios.get("http://127.0.0.1:8889/auth/user/1").then(res => {
    //   console.log(res,"res");
    // });
  },
  methods:{
    submit(){
      const vm = this;
      const params = {
        name:vm.account,
        password:vm.password
      }
      this.$axios.post("http://127.0.0.1:8889/auth/user",params).then(res => {
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