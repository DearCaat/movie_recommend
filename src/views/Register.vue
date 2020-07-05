<template>
<div class="note" style="note">

<div>
<el-card class="box-card" body-style="background-color:	#F0FFF0;">
  <div slot="header" class="clearfix">
    注册
  </div>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-right:50px;"> 
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pwdconfirm">
        <el-input type="password" v-model="ruleForm.pwdconfirm"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="Male">男</el-radio>
          <el-radio label="Female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="text" v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="是否管理员" prop="IsAdmin">
        <el-radio-group v-model="ruleForm.IsAdmin">
          <el-radio label="True">是</el-radio>
          <el-radio label="False">否</el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="标签" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="惊悚" name="type"></el-checkbox>
          <el-checkbox label="悬疑" name="type"></el-checkbox>
          <el-checkbox label="战争" name="type"></el-checkbox>
          <el-checkbox label="恐怖" name="type"></el-checkbox>
          <el-checkbox label="奇幻" name="type"></el-checkbox>
          <el-checkbox label="喜剧" name="type"></el-checkbox>
          <el-checkbox label="科幻" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item >
        <el-button  style="width:100%" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>

<el-link type="primary" id="goregister" href="/">已经有有账号?去登录</el-link>
</el-card>
</div>

</div>
</template>

<script>
  export default {
    name:"Register",
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          pwdconfirm:'',
          sex: '',
          age:'',
          IsAdmin:'',
          type:[],
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
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change ' }
          ],
          age: [
            { required: true, message: '请填写年龄', trigger: 'blur' }
          ],
          IsAdmin: [
            { required: true, message: '请选择用户类型', trigger: 'change ' }
          ],
           type: [
            { type: 'array', required: true, message: '请至少选择一个喜欢的电影类型', trigger: 'change' }
          ]
        }

      };
    },
     methods: {
      submitForm(formName) {
        var _this = this
        var data = {
          name : "默认用户名",
          sex : _this.ruleForm.sex,
          age : _this.ruleForm.age,
          account: _this.ruleForm.username,
          password:_this.ruleForm.password,
          type: _this.ruleForm.IsAdmin == "True"?"Admin":"Normal",
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(_this.ruleForm)
            /* _this.$axios
              .post(_this.GLOBAL.baseURL+'register',_this.ruleForm)
              .then(function (response){
                console.log(response)
              })  */

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
.el-form-item__content{
  margin-left:0 !important;
}
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
