<template>

<div class="note" style="note">
  <div class="warrper">
    <div class="headicotxt">
      <img :src="icon_url"  style="width:50px;height:50px">
    </div>
    <div style="text-align:center;">
      <h2 style="font-family:Segoe UI Light; font-size:24px; font-weight:300">Sign to Spicytomato</h2>
    </div>
    <div class="login-panel">
      <el-card class="box-card" shadow="never" :body-style="{'padding-bottom':'0px'}">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div style="text-align:left; font-size:14px; margin-bottom:0.55rem; color:rgb(36,41,46); font-weight:600;font-family:Segoe UI Light;">
              Username
          </div>
          <el-form-item  prop="username">
            <el-input v-model="ruleForm.username" ></el-input>
          </el-form-item>
          <div style="text-align:left;font-size:14px; margin-bottom:0.55rem; color:rgb(36,41,46); font-weight:600;font-family:Segoe UI Light;">
              Password
            </div> 
        <el-form-item   prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item> 
          <el-form-item>
            <el-button style="width:100%; background-color:rgb(46,164,79);font-weight:600;font-family:Segoe UI Light;" type="success" @click="submitForm('ruleForm')">Sign in</el-button>
          </el-form-item>
          <br>
        </el-form>
      </el-card>
    </div>
    
    <div style="width:300px; margin:0 auto;text-align: center;">
      <el-card shadow="never" :body-style="{'background-color':'rgb(249,249,249)'}">
        <el-link type="primary" id="goregister" href="/Register" >还没有账号?去注册</el-link>
      </el-card>
    </div>
  </div>
</div>
</template>

<script>
  export default {
     name:'Start',
    data() {
      return {
        icon_url:require('../assets/images/tomato.png'),
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
                  let res = response.data.split('/')
                  _this.$cookieStore.setCookie( 'uid' , res[0])
                  if(res[1]=='Admin'){
                    _this.$router.push({ name: 'AdminCenter', params: { uid: res[0] }})
                  }else if(res[1]=='Normal'){
                    _this.$router.push({ name: 'HomePage', params: { uid: res[0] }})
                  }
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
<style >
.login-panel .el-form-item{
  margin-bottom: 15px;
}
.el-form-item__content{
  margin-left:0px !important;
}
.login-panel .el-card{
  width: 300px;
  margin: 0 auto;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>

<style scoped>
.login-panel{
  border:none;
}

.warrper{
  width: 800px;
  margin: 0 auto;
  padding-top: 100px;
  
}
 	.note{
    background-color:rgb(249, 249, 249);
    height:100%;
    width: 100%;
    position:fixed;
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

  .demo-ruleForm{
    text-align: center;
  }

</style>