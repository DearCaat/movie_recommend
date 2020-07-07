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
  <el-main class="warpper">
    <el-row>
      <el-col :span="24">
         
         <div style="margin-top: 20px" class="sortradiogroup"> 
           <span>电影类型  </span>
      <el-radio-group v-model="tagradio" size="small">
        <el-radio-button label="全部类型"></el-radio-button>
      <el-radio-button label="动作"></el-radio-button>
      <el-radio-button label="喜剧"></el-radio-button>
      <el-radio-button label="爱情"></el-radio-button>
      <el-radio-button label="科幻"></el-radio-button>
      <el-radio-button label="动画"></el-radio-button>
      <el-radio-button label="悬疑"></el-radio-button>
      <el-radio-button label="惊悚"></el-radio-button>
      <el-radio-button label="恐怖"></el-radio-button>
      <el-radio-button label="犯罪"></el-radio-button>
      <el-radio-button label="历史"></el-radio-button>
      <el-radio-button label="战争"></el-radio-button>
      <el-radio-button label="西部"></el-radio-button>
       <el-radio-button label="其他"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px" class="sortradiogroup">
           <span>电影地区  </span>
      <el-radio-group v-model="countryradio" size="small">
        <el-radio-button label="全部地区"></el-radio-button>
      <el-radio-button label="中国大陆"></el-radio-button>
      <el-radio-button label="中国香港"></el-radio-button>
      <el-radio-button label="中国台湾"></el-radio-button>
      <el-radio-button label="美国"></el-radio-button>
      <el-radio-button label="日本"></el-radio-button>
      <el-radio-button label="韩国"></el-radio-button>
      <el-radio-button label="英国"></el-radio-button>
      <el-radio-button label="意大利"></el-radio-button>
      <el-radio-button label="印度"></el-radio-button>
      <el-radio-button label="法国"></el-radio-button>
      <el-radio-button label="德国"></el-radio-button>
      <el-radio-button label="俄罗斯"></el-radio-button>
      <el-radio-button label="西班牙"></el-radio-button>
      <el-radio-button label="其他"></el-radio-button>
    </el-radio-group>
  </div>
   <div style="margin-top: 20px" class="sortradiogroup">
           <span>电影年代  </span>
      <el-radio-group v-model="dateradio" size="small">
        <el-radio-button label="全部年代"></el-radio-button>
        <el-radio-button label="2020"></el-radio-button>
      <el-radio-button label="2019"></el-radio-button>
      <el-radio-button label="2018"></el-radio-button>
      <el-radio-button label="2017"></el-radio-button>
      <el-radio-button label="2010年代"></el-radio-button>
      <el-radio-button label="2000年代"></el-radio-button>
      <el-radio-button label="90年代"></el-radio-button>
      <el-radio-button label="80年代"></el-radio-button>
      <el-radio-button label="70年代"></el-radio-button>
      <el-radio-button label="60年代"></el-radio-button>
      <el-radio-button label="更早"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px" class="sortradiogroup">
           
      <el-radio-group v-model="sortradio" size="small">
        <el-radio-button label="近期热门"></el-radio-button>
        <el-radio-button label="评分最高"></el-radio-button>
        <el-radio-button label="近期上映"></el-radio-button>
    </el-radio-group>
  </div>
      </el-col>
      
    </el-row>
  <el-row gutter="10"> 
    <el-divider></el-divider>           
    <el-col :span="4" v-for="o in 10  " :key="o" >
    <el-card :body-style="{padding: '0px'}" shadow="never" class="movie-card">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>电影名</span>
        <span style="padding:10px;"> 评分</span>
      </div>
    </el-card>
    
  </el-col>
		</el-row>      
<el-row>
   <el-divider></el-divider>       
  <el-pagination
  style="text-align:center;"
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</el-row>
  </el-main>
</el-container>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
    name:"Recommand",
    components:{
      NavBar
    },
     data() {
      return {
         tagradio:'全部类型',
         countryradio:'全部地区',
         dateradio:'全部年代',
         sortradio:'近期热门',
         movies:[],
         movie_type:['全部类型','动作','喜剧']
	
      };
    },
    methods: {
      }
 
}
</script>


<style scoped>
.movie-card{
  max-width: 186px;
  max-height: 250px;
  border: none !important;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
}
.warpper{
  width:1400px;
  margin: 0 auto;
}

.sortradiogroup{
    margin:0 20px;
}
.el-menu{
    padding:0 100px;
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

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>