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
  <NavBar :isSearch=true></NavBar>
  <el-main>
    <div>
      <el-upload
            class="avatar-uploader"
            action="javascript:;"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="imgPreview">
            <img v-if="p_url" :src="p_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">    
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
            <el-input v-model.number="ruleForm.age" ></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" maxlength="100"
          show-word-limit ></el-input>
          </el-form-item>
          <el-form-item label="喜爱电影标签" prop="tag">
            <el-checkbox-group v-model="ruleForm.tag">
              <el-checkbox v-for="(type,index) in types" :key="index" :label="type" name="tag"></el-checkbox> 
              <!-- <el-checkbox label="惊悚" name="tag"></el-checkbox>
              <el-checkbox label="悬疑" name="tag"></el-checkbox>
              <el-checkbox label="战争" name="tag"></el-checkbox>
              <el-checkbox label="恐怖" name="tag"></el-checkbox>
              <el-checkbox label="奇幻" name="tag"></el-checkbox>
              <el-checkbox label="喜剧" name="tag"></el-checkbox>
              <el-checkbox label="科幻" name="tag"></el-checkbox> -->
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
      user_pic:'',
      p_url:'',
      types:['剧情','喜剧','动作','爱情','科幻','动画','悬疑','惊悚','恐怖','犯罪','同性','音乐','歌舞','传记','历史','战争','西部','奇幻','冒险','灾难','武侠','情色'],
      ruleForm: {
        tag:[]
      },
      rules: {
        name: [
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        pwdconfirm: [
          {validator:(rule,value,callback)=>{
            if(value!=this.ruleForm.password){
              callback(new Error('两次输入密码不一致'))
            }else{
              callback()
            }
          },
          trigger:'blur'
            }],
        age: [
          {  type:'number', message: '请输入数字', trigger: 'blur' }
        ]
      }  
    };
  },
  methods:{
    beforeAvatarUpload(file) {          
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
    submitForm(formName) {          //上传添加的表单
      
      var _this = this
      if(typeof(_this.user_pic) != "undefined" && _this.user_pic !=""){
        let new_p_name = this.ruleForm.uid + '.' +_this.user_pic.name.split(".")[1]
        _this.user_pic = new File([_this.user_pic],new_p_name,{type:_this.user_pictype})
        this.ruleForm.u_pic = new_p_name
      }
      var user_data = JSON.parse(JSON.stringify(_this.ruleForm))
      user_data.tag = _this.listToString(user_data.tag)
      var data = new FormData()
      data.append('pic',_this.user_pic)
      console.log(user_data)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          _this.$axios({
            method:'post',
            url:_this.GLOBAL.baseURL+'u_update',
            data:user_data,
          })
            .then(function (response){ 
              if(data.get('pic') == ""){
                _this.$router.back(-1)
              }
            })
          if(data.get('pic') != ""){
            _this.$axios({
              method:'post',
              url:_this.GLOBAL.baseURL+'u_uploadPic',
              data:data,
            })
              .then(function (response){ 
                _this.$router.back(-1)
              })
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      }) 
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    imgPreview (file, fileList) {
      if(this.beforeAvatarUpload(file.raw)){
        this.p_url = URL.createObjectURL(file.raw);
        this.user_pic = file.raw
      }
    },
  },
  mounted(){
    if(typeof(this.$route.params.user) != "undefined"){
      this.ruleForm = this.$route.params.user
      this.ruleForm.age = parseInt(this.ruleForm.age)
      this.ruleForm.password = ""
      this.ruleForm.pwdconfirm = ""
    }
  }
 
}
</script>

<style>
.avatar-uploader{
  margin-left: 100px;
  max-height:100% ;
}
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