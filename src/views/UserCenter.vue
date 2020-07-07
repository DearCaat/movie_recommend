<template>
<div >
<el-container direction="vertical"> 
  <!-- <el-header>
  <el-menu :default-active="this.$route.path" router mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
    </el-menu-item>
</el-menu>
  </el-header> -->
  <NavBar :uid = uid :isSearch=true></NavBar>
  <el-main>
     <el-col span="24" class="leftcol">
        <div class="demo-type">
    <el-avatar :size="120" :src="GLOBAL.baseURL+'images/'+ ruleForm.u_pic" @error="errorHandler">      <!--用户头像显示-->
    </el-avatar>
  </div>
<el-card class="box-card1">
  <div slot="header" class="clearfix1">
    <span>个人信息</span>
  </div>
  
  <div  class="text item">
    {{'用户昵称'+':   '+ ruleForm.name}}
  </div>
  <div  class="text item">
    {{'性别'+':   '+ ruleForm.sex}}
  </div>
  <div  class="text item">
    {{'年龄'+':   '+ ruleForm.age}}
  </div>
  <div  class="text item">
    {{'个性签名'+':   '+ ruleForm.description}}
  </div>
  <div  class="text item">
    {{'喜爱类型'+':   '+ ruleForm.tag}}
  </div>
  <el-button @click="changeInfo()"> 修改个人信息
  </el-button>
</el-card>

     </el-col>
    <!--  <el-col span="8" class="rightcol">
        <el-card class="box-card2">
        <div slot="header" class="clearfix2">
        <span>留言板</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动形式">
        <el-input type="textarea" :rows="5" placeholder="请在此留言" v-model="MessageBoard.description"></el-input>
        </el-form-item>
  <el-form-item>
    <el-button type="primary" size="small" @click="onSubmit">留言</el-button>
  </el-form-item>
</el-form></div>
</el-card>
      </el-col>-->
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
  name:"UserCenter",
  data() {
    return {
      uid:this.$route.params.uid,
      ruleForm: {
        username: '亚索',
        sex: 'Male',
        age:'21',
        sign:'死亡如风，常伴吾身',
        tag: ["悬疑","恐怖","喜剧"],
        u_pic:""
      },
      MessageBoard:{
        description:''          //留言板
      }
    };
  },
  methods: {
    errorHandler() {     //图片加载错误fallback
      return true
    },
    changeInfo(){
      this.$router.push({ name: 'UserChangeInfo',params: { user: this.ruleForm }})
    },
  },
  mounted(){
    var _this = this
    var data = new FormData()
    data.append('uid',parseInt(_this.$route.params.uid))
    console.log(data)
    _this.$axios
      .post(_this.GLOBAL.baseURL+'u_getById',data)
      .then(function (response){ 
        _this.ruleForm = response.data
        console.log(response)
        for(var attr in _this.ruleForm) {
          if(!_this.ruleForm[attr]){
            _this.ruleForm[attr] = ""
          }
          if(attr == "tag"){
            _this.ruleForm[attr] = _this.strToList(_this.ruleForm[attr])
          }
        }
      })
  }
 
}
</script>


<style scoped>

 
.el-menu{
    padding:0 100px;
}
.el-col {
  height: 790px;
  overflow-y: hidden
}

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
      word-break: break-all;
  }

  .clearfix1:before,
  .clearfix1:after {
    display: table;
    content: "";
  }
  .clearfix1:after {
    clear: both
  }

  .box-card1 {
    width: 480px;
    margin:75px 325px;
  }
   .clearfix2:before,
  .clearfix2:after {
    display: table;
    content: "";
  }
  .clearfix2:after {
    clear: both
  }

  .box-card2 {
   width: 300px;
   margin: 270px auto;  
  }
</style>