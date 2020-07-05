<template>
<div class="note" style="note">

<div>
<el-card class="box-card" body-style="background-color:	#F0FFF0;">
  <div slot="header" class="clearfix">
    管理员注册
  </div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="pwdconfirm">
    <el-input type="password" v-model="ruleForm.pwdconfirm"></el-input>
  </el-form-item>

  <!-- <el-form-item label="是否管理员" prop="IsAdmin">
    <el-radio-group v-model="ruleForm.IsAdmin">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>-->

  <el-form-item>
    <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')" class="CreateAdmin">立即创建</el-button>
  </el-form-item>
</el-form>
<el-link type="primary" id="goregister" href="/">已经有有账号?去登录</el-link>
</el-card>
</div>

</div>
</template>

<script>
  export default {
    name:"AdminRegister",
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          pwdconfirm:''
        },
        rules:{
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 15, message: '用户名应在1-15个字符内', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          pwdconfirm: [
            { required: true, message: '请确认密码', trigger: 'blur' }
            ,{validator:(rule,value,callback)=>{
            if(value==''){
            callback(new Error('请再次输入密码'))
            }else if(value!==this.ruleForm.password){
            callback(new Error('两次输入密码不一致'))
            }else{
            callback( )
            }
            },
            trigger:'blur'
             }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    }
  }
</script>
<style scoped>
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


  .box-card {
    width: 480px;
    opacity: 1;
    text-align: center;
    margin: 70px auto;
  }


</style>