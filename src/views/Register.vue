<template>
<div class="note" style="note">

<div>
<el-card class="box-card" body-style="background-color:	#F0FFF0;">
  <div slot="header" class="clearfix">
    用户注册
  </div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
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
    <el-input  v-model="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item label="是否管理员" prop="IsAdmin">
    <el-radio-group v-model="ruleForm.IsAdmin">
      <el-radio label=True>是</el-radio>
      <el-radio label=False>否</el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="喜爱电影标签" prop="tag">
    <el-checkbox-group v-model="ruleForm.tag">
      <el-checkbox label="惊悚" name="type"></el-checkbox>
      <el-checkbox label="悬疑" name="type"></el-checkbox>
      <el-checkbox label="战争" name="type"></el-checkbox>
      <el-checkbox label="恐怖" name="type"></el-checkbox>
      <el-checkbox label="奇幻" name="type"></el-checkbox>
      <el-checkbox label="喜剧" name="type"></el-checkbox>
      <el-checkbox label="科幻" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

  <el-form-item>
    <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')" class="CreateUser">立即创建</el-button>
  </el-form-item>
</el-form>
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
          name:"默认用户名",
          username: '',
          password: '',
          pwdconfirm:'',
          sex: '',
          age:'',
          tag:[],
          IsAdmin:false,
        },
        rules:{
         name:[
           {message:'请输入昵称',trigger:'blur'}
         ],
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
            { required: true, message: '请填写年龄', trigger: 'blur' },
            {type: 'number', message:'请输入数字',transform: (value) => Number(value)}
          ],
           tag: [
            { type: 'array', required: true, message: '请至少选择一个喜欢的电影类型', trigger: 'change' }
          ]
        }

      };
    },
     methods: {
      listToString(list){
        var list_str = ""
        for(var i=0;i<list.length;i++){
          if(i == list.length-1){
            list_str = list_str + list[i].toString()
          }else{
            list_str = list_str + list[i].toString() + "/"
          }
          
        }
        return list_str
      },
      submitForm(formName) {
        var _this = this
        var time = new Date()
        var data = {
          name : _this.ruleForm.name,
          sex : _this.ruleForm.sex,
          age : _this.ruleForm.age,
          account: _this.ruleForm.username,
          password:_this.ruleForm.password,
          type: _this.ruleForm.IsAdmin?"Admin":"Normal",
          login_date: time.toLocaleDateString(),
          tag: _this.listToString(_this.ruleForm.tag)
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios
              .post(_this.GLOBAL.baseURL+'register',data)
              .then(function (response){
                if(response.data == '该账号已注册过'){
                 alert("账户已存在")
                 _this.ruleForm.username = ""
                }else if (response.data == '注册失败'){
                  alert("网络错误")
                }
                else {
                  console.log("success")
                  _this.$router.push({ name: 'HomePage', params: { uid: response.data }})
                }
                
                console.log(response)
              }) 
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