<template>

<div class="note" style="note">
<div class="headicotxt">
  <img src="" />
</div>
<div class="headicotxt" style="font-size:150%;font-family:Microsoft YaHei;">
  <span>辣番茄电影推荐系统</span>
</div>
<el-card class="box-card" shadow="never">
  <div slot="header" class="clearfix">
    登录
  </div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item> 
<el-form-item  label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item> 
  <el-form-item>
    <el-button style="width:100%;" type="success" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
  <el-link type="primary" id="goregister" href="/Register" >还没有账号?去注册</el-link>
   <br>
</el-form>
</el-card>
</div>
</template>

<script>
  export default {
     name:'Start',
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:1,max:15,message:"长度在1到15个字符",trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'change '}
          ]
        }

      };
    },
    methods: {
      submitForm(formName) {
        var _this = this
        var data = {
          account : _this.ruleForm.username,
          password: _this.ruleForm.password
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios
              .post(_this.GLOBAL.baseURL+'login',data)
              .then(function (response){
                if(response.data == 'null_user'){
                  alert("用户不存在")
                  _this.ruleForm.username = ""
                  _this.ruleForm.password = ""
                }else if(response.data == 'password_error'){
                  _this.ruleForm.password = ""
                  alert("密码错误")
                }else{
                  _this.$router.push({ name: 'HomePage', params: { uid: response.data }})
                  _this.GLOBAL.uid = response.data
                }
              }) 


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     cimsInputClick () {
      this.$router.push({ name: 'Register'})
    }
    }
  }
</script>
<style scoped>
.note::before{
 			content:"";
 			/*-webkit-filter: opacity(50%);  
    		filter: opacity(50%); */
    		background-color:rgb(248, 246, 227);
    		opacity:0.3;
 			z-index:-1;
 			background-size:100%, 100%;
 			width:100%; 
 			height:100%;
 			position:absolute;
 		}
 		.note{
 			position:fixed;
 				width:100%; 
 			height:100%;

 		}
     .headicotxt{
       text-align: center;
     }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    opacity: 1;
    text-align: center;
    margin: 50px auto;
  }
  .demo-ruleForm{
    text-align: center;
  }

</style>