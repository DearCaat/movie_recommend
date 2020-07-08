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
  <el-main class="wrapper">
     <el-row :gutter="10">
       <el-col :span="2"></el-col>
       <el-col :span="4" style="vertical-align: middle;">
           <div class="avatar" style="height:100%;">
              <img
                :src="GLOBAL.baseURL+'images/'+ruleForm.u_pic"
                class="image-avater"/>
           </div>
       </el-col>
      <el-col :span="1"><span></span></el-col>
          <el-col :span="16">
            <div class="movinfo">
              <div
                class="text item"
                style="font-size:250%;font-family:Microsoft YaHei;color:rgb(96,98,102)"
              >
                {{ ruleForm.name }}
              </div>
              <el-card class="box-card1" shadow="never">
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
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-divider></el-divider>
          <div class="movinfo">
              <div
                class="text item"
                style="font-size:24px;font-family:Microsoft YaHei;color:rgb(96,98,102);margin-bottom:1.5rem"
              >
                {{'喜爱的电影' }}
              </div>
              <el-col :span="4" v-for="o in 6" :key="o"  >
            <el-card :body-style="{ padding: '0px' }" shadow="never">
              <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
              <div class="text item" style="padding:0 20px;">
                {{ "电影:" + movieform.moviename }}
              </div>
              </router-link>
            </el-card>
            <el-divider></el-divider>
          </el-col>
          </div>
        </el-row>
        <!-- <el-row>
            <el-divider></el-divider>
            <div
                class="text item"
                style="font-size:150%;font-family:Microsoft YaHei;color:rgb(96,98,102)"
              >
                {{'浏览历史' }}
              </div>
              <div  v-for="o in 5"  :key="o" class="text item">
           {{o+':   '+ history}}
        </div>
        </el-row> -->
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
        u_pic:"",
      },
      movieform:{         //电影
      moviename:[]
      },
 
      history:[]       //浏览历史
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
    data.append('uid',parseInt(_this.GLOBAL.uid))
    console.log(data.get('uid'))
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
.router-link-text{
  color: rgb(96,98,102) !important;
  text-decoration: none;
}
.el-radio-button__inner{
  font-size: 14px !important;
  border:none !important;

}

.avatear{
  padding:10px;
}
 
.el-menu{
    padding:0 100px;
}
.el-col {

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
    clear: both;
    
  }

  .box-card1 {
    width: 480px;
    margin:0px 0px;
  }
  .box-card2 {
    width: 480px;
    height: 318px;
    margin:200px 200px;
  }
   .clearfix2:before,
  .clearfix2:after {
    display: table;
    content: "";
  }
  .clearfix2:after {
    clear: both
  }
.wrapper {
  width: 1400px;
  margin: 0 auto;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.movie-card {
  max-height: 250px;
  max-width: 1200px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
}
.image-avater{
  width: 100%;
  overflow: hidden;
  max-height: 500px;
  vertical-align: middle;
}
img{

      width:100%;
      height:inherit;
    }
</style>