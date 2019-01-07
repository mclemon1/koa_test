
<template>
  <el-row class="content">
    <p>{{userInfo.name}},请留下记录</p>
    <p v-for="(item,index) in list" :key="index" v-show="item.status">{{item.content}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="close" @click="deleteRow(item)">x</span></p>
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <el-row>
        <el-input v-model="text" placeholder="请输入" type="text" @keyup.enter.native="submit"></el-input>
        <el-button type="primary" @click="submit">记录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import jwt from 'jsonwebtoken';
export default {
  data () {
    return {
      text: '',
      userInfo:"",
      list:[],
    };
  },
  mounted(){
    const token = sessionStorage.getItem('demo-token');
    if(token != null && token != 'null'){
        let decode = jwt.decode(token); // 解析token
        this.userInfo = decode;  // decode解析出来实际上就是{name: XXX,id: XXX}
        this.getList();
    }
  },
  methods:{
    getList(){
        const vm = this;
        this.$axios.get("http://127.0.0.1:8889/api/list/"+this.userInfo.id).then(res => {
            if(res.success){
                vm.list = res.list;
            }else{
                this.$message.error(res.info);
            }
        },(err) => {
            this.$message.error('请求错误！')
        });
    },
    submit(){
      const vm = this;
      const params = {
        user_id: vm.userInfo.id, // 用户的id，用来确定给哪个用户创建
        content: vm.text,
        status: true
      }
      vm.$axios.post("http://127.0.0.1:8889/api/addlist",params).then(res => {
        if(res.success){ // 如果成功
          vm.$message({ // 登录成功，显示提示语
            type: 'success',
            message: '记录成功！'
          });
          vm.text = "";
          vm.getList();
        }else{
          vm.$message.error(res.info); // 登录失败，显示提示语
        }
      },(err) => {
        vm.$message.error('请求错误！')
      });
    },
    deleteRow(item){
        const vm = this;
        vm.$axios.delete("http://127.0.0.1:8889/api/list/"+item.id).then(res => {
            if(res.success){ // 如果成功
                vm.$message({ // 登录成功，显示提示语
                    type: 'success',
                    message: '删除成功！'
                });
                vm.getList();
            }else{
                vm.$message.error(res.info);
            }
        },(err) => {
            vm.$message.error('请求错误！')
        });
    },
    putRow(item){
        const vm = this;
        const params = {
            id:1,
            status:true
        }
        vm.$axios.put("http://127.0.0.1:8889/api/list/1",params).then(res => {
            if(res.success){ // 如果成功
                vm.$message({ // 登录成功，显示提示语
                    type: 'success',
                    message: '更新成功！'
                });
                vm.getList();
            }else{
                vm.$message.error(res.info);
            }
        },(err) => {
            vm.$message.error('请求错误！')
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
.close{cursor: pointer;}
</style>