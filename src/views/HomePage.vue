<template>
<el-container  direction="vertical">
<!--   <el-header>
    <el-col :span="12">                 
  <el-menu :default-active="this.$route.path"  mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" @click="route(i)">   
        {{ item.navItem }}
    </el-menu-item>
  </el-menu>
  </el-col>
  <el-col :span="12">
    <el-select                       
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">               
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 <el-button type="primary" icon="el-icon-search">搜索</el-button>    
 <el-button type="primary" icon="el-icon-user-solid" @click="ChangePersonalInfo()">修改个人信息</el-button> 
 <el-button type="primary" icon="el-icon-user-solid" @click="Logout()" class="LogoutAdmin">退出登录</el-button> 
  </el-col>
   </el-header> -->
  
   <NavBar></NavBar> 
  <el-main>
    <el-carousel :interval="4000" type="card" height="370px">
      <el-carousel-item v-for="item in imagebox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>>
    <el-row>
      <el-col :span="12" class="col1">
        <el-card class="box-card1">
        <div slot="header" class="clearfix1">
        <span>个性推荐</span>
        </div>
          <div v-for="(item,o) in RecommandList" :key="o" :index="item.Name" class="text item">  
         {{ o +'item.RecommandList'}}
        </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="col2">
        <el-card class="box-card2">
        <div slot="header" class="clearfix2">
        <span>评分排行榜</span>
        </div>
        <div v-for="(item,p) in RatingList" :key="p" :index="item.Name" class="text item">  
         {{ p +'item.RatingList'}}
        </div>
        </el-card>
      </el-col>
    </el-row>
</el-main>
</el-container>
</template>


<script>
import NavBar from '@/components/NavBar'
export default {
    name:"HomePage",
    components:{
      NavBar
    },
     data() {
      return {
        uid:-1,
        RecommandList:[],      /*主页推荐列表存在这,电影名为Name*/
        RatingList:[],             /*主页评分排行榜,电影名为Name*/

        imagebox:[{id:0,idView:''},
        {id:1,idView:''},
        {id:2,idView:''}
        //imagebox是assets下一个放图片的文件夹
        ],
        zmdHeight :700,
        // 浏览器宽度
        screenWidth :0

      };
    },
    methods: {
      
      setSize:function () {
          // 通过浏览器宽度(图片宽度)计算高度
          this.bannerHeight = 400 / 1920 * this.screenWidth;   //图片轮播自适应函数
        },
      ChangePersonalInfo()
      {
        window.location.href="/UserChangeInfo";
      },
        Logout()
        {
          window.location.href="/";
        }
    },
    mounted() {
      this.uid = this.$route.params.uid
      // 首次加载时,需要调用一次
      this.screenWidth =  window.innerWidth;
      this.setSize();
      // 窗口大小发生改变时,调用一次
      window.onresize = () =>{
      this.screenWidth =  window.innerWidth;
      this.setSize();
      }
    },
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
.item{
    word-break: break-all;
}
  .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
   .el-container /deep/ .text {
    font-size: 14px;
  }

  .el-container /deep/ .item {
    margin-bottom: 18px;
  }
.el-row{
  overflow-y: hidden
}
  .el-container /deep/ .clearfix1:before,
  .el-container /deep/ .clearfix1:after {
    display: table;
    content: "";
  }
  .el-container /deep/ .clearfix1:after {
    clear: both
  }

  .el-container /deep/ .box-card1  {
    width: 480px;
    margin: 200px auto;
  }
    .el-container /deep/ .clearfix2:before,
  .el-container /deep/ .clearfix2:after {
    display: table;
    content: "";
  }
  .el-container /deep/ .clearfix2:after {
    clear: both
  }

  .el-container /deep/ .box-card2 {
    width: 480px;
    margin: 200px auto;
  }
.el-col {
  height: 600px;
}
.col1 {
  background-color: #fff;
}
.col2 {
  background-color: #fff;
}
  
img{
     /*设置图片宽度和浏览器宽度一致*/
      width:100%;
      height:inherit;
    }

</style>