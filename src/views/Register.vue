<template>
<div class="note" style="note">

<div>
<el-card class="box-card" body-style="background-color:	#F0FFF0;">
  <div slot="header" class="clearfix">
    注册
  </div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="password">
    <el-input type="pwdconfirm" v-model="ruleForm.pwdconfirm"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex">
    <el-radio-group v-model="ruleForm.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input type="text" v-model="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
  </el-form-item>
</el-form>
</el-card>
</div>

</div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          pwdconfirm:'',
          sex: '',
          age:''
        },
        rules:{
         username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          pwdconfirm: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择活动资源', trigger: 'change ' }
          ],
          age: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
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
    margin: 100px auto;
  }
  .demo-ruleForm{
    text-align: center;
  }


</style>