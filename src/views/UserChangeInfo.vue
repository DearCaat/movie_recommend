<template>
<div>
<el-container direction="vertical">
  <!-- <el-header>
  <el-menu :default-active="this.$route.path" router mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
    </el-menu-item>
</el-menu>
  </el-header> -->
  <NavBar></NavBar>
  <el-main>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="">
          <el-upload
            class="avatar-uploader"
            action="javascript:;"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            :on-change="imgPreview">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        
  <el-form-item label="昵称" prop="name">
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
    <el-input type="text" v-model.number="ruleForm.age" ></el-input>
  </el-form-item>
  <el-form-item label="个性签名" prop="sign">
     <el-input v-model="ruleForm.sign" type="textarea" maxlength="100"
  show-word-limit ></el-input>
  </el-form-item>
   <el-form-item label="喜爱电影标签" prop="tag">
    <el-checkbox-group v-model="ruleForm.tag">
      <el-checkbox label="惊悚" name="tag"></el-checkbox>
      <el-checkbox label="悬疑" name="tag"></el-checkbox>
      <el-checkbox label="战争" name="tag"></el-checkbox>
      <el-checkbox label="恐怖" name="tag"></el-checkbox>
      <el-checkbox label="奇幻" name="tag"></el-checkbox>
      <el-checkbox label="喜剧" name="tag"></el-checkbox>
      <el-checkbox label="科幻" name="tag"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
  </el-main>
</el-container>
</div>
</template>





<script>
import NavBar from '@/components/NavBar'
export default {
  components:{
    NavBar
  },
  name:"UserChangeInfo",
    data() {
    return {
        imageUrl: "",
      navList:[
          {name:'/HomePage',navItem:'首页'},
          {name:'/HomePage/UserCenter',navItem:'个人中心'},
          {name:'/Recommand',navItem:'个性化推荐'},
          {name:'/Comment',navItem:'电影评价'}
      ],
        ruleForm: {
          name: '',
          password: '',
          sex: '',
          age:'',
          description:'',
          tag: [],
          p_url:'',
        },
      rules: {
        username: [
          {  message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          {  message: '请输入密码', trigger: 'change' }
        ],
        pwdconfirm: [
          {  message: '请确认密码', trigger: 'blur' }
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
            }],
        tag: [
          { type: 'array',  message: '请选择喜爱标签', trigger: 'change' }
        ],
          sex:[   {  message: '请选择性别', trigger: 'change ' }
        ],
          sign: [
          {  min: 0, max: 50, message: '签名不得超过50个字符', trigger: 'blur' }
        ],
        age: [
          {  type:'number', message: '请输入数字', trigger: 'blur' }
          
        ]
      }  
    };
  },
  methods: {
      onSubmit() {
      console.log('submit!');
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {          
      console.log(file)
      const isJPG = file.type === ('image/png') || file.type === ('image/jpeg');                //限制图像格式
      const isLt2M = file.size / 1024 / 1024 < 2;            //限制图像大小

      if (!isJPG) {
        this.$message.error('上传头像图片只能是普通图像格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
      submitForm(formName) {           //上传添加的表单
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
    },
    imgPreview (file, fileList) {
      console.log('11111')
      if(this.beforeAvatarUpload(file.raw)){
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
  },
  mounted(){
    this.ruleForm = this.$route.params.user
      console.log(this.ruleForm)
  }
 
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
    border-color: #409EFF !important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: auto;
    height: auto;
    max-width: 178px;
    max-height: 178px;
    display: block;
  }
</style>
<style scoped>
.el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {

    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
.el-menu{
    padding:0 100px;
}
.demo-ruleForm{
  max-width: 500px;
margin:0 auto;
}
</style>