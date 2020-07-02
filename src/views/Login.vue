<template>

<div class="note" style="note">
<div><span class="decoration">123</span></div>  

<el-card class="box-card" body-style="background-color:	#F0FFF0;">
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
    <el-button style="width:100%;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
  <el-link type="primary" id="goregister" href="/Register">还没有账号?去注册</el-link>
</el-form>
</el-card>
</div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:3,max:15,message:"长度在3到15个字符",trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'change '}
          ]
        }

      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     cimsInputClick () {
      window.location.href = '/Register'
    }
    }
  }
</script>
<style>
.note::before{
 			content:"";
 			/*-webkit-filter: opacity(50%);  
    		filter: opacity(50%); */
    		background-image:url("../assets/images/bkg.jpg");
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
    margin: 200px auto;
  }
  .demo-ruleForm{
    text-align: center;
  }

</style>