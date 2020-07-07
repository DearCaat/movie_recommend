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
      <el-radio-group v-model="tagradio" size="small">
         
        <el-radio-button v-for="(type,index) in movie_type" :key="index" :label=type></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px" class="sortradiogroup">
      <el-radio-group v-model="countryradio" size="small">
        <el-radio-button v-for="(country,index) in movie_country" :key="index" :label=country></el-radio-button>
    </el-radio-group>
  </div>
   <div style="margin-top: 20px" class="sortradiogroup">
      <el-radio-group v-model="dateradio" size="small">
        <el-radio-button v-for="(year,index) in movie_year" :key="index" :label=year></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px" class="sortradiogroup">
           
      <el-radio-group v-model="sortradio" size="small">
        <el-radio-button v-for="(sort,index) in movie_sort" :key="index" :label=sort></el-radio-button>
    </el-radio-group>
  </div>
      </el-col>
      
    </el-row>
  <el-row gutter="10"> 
    <el-divider></el-divider>           
    <el-col :span="4" v-for="(movie,index) in movies " :key="index" >
    <el-card :body-style="{padding: '0px'}" shadow="never" class="movie-card">
      <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
      
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">

      <div style="padding: 14px;">
        <span>{{movie.name}}</span>
        <span style="padding:10px;"> {{movie.score}}</span>
      </div>
      </router-link>
    </el-card>
    
  </el-col>
		</el-row>      
<el-row>
   <el-divider></el-divider>       
  <el-pagination
  style="text-align:center;"
  background
  layout="prev, pager, next"
  :total="movies.length">
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
         sortradio:'评分最高',
         movies:[{
           mid:0,
           name:'电影1',
           score: 8.0
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0
           },
         ],
         movie_type:['全部类型','剧情','喜剧','动作','爱情','科幻','动画','悬疑','惊悚','恐怖','犯罪','同性','音乐','歌舞','传记','历史','战争','西部','奇幻','冒险','灾难','武侠','情色'],
         movie_country:['全部地区','中国大陆','美国','中国香港','日本','韩国','英国','法国','德国','意大利','西班牙','印度','泰国','俄罗斯','伊朗','加拿大','澳大利亚','爱尔兰','瑞典','巴西','丹麦'],
         movie_year:['全部年代','2019','2010年代','2000年代','90年代','80年代','70年代','60年代','更早'],
         movie_year_list:[[],[2019,2019],[2010,2018],[2000,2009],[1990,1999],[1980,1989],[1970,1979],[1960,1969],[0,1959]],
         movie_sort:['评分最高','近期上映'],
	
      };
    },
    methods: {
      query(){
        var data = new FormData()
        var _this = this
        movie_year.find(function(elem){
          return elem==_this.dateradio;
        })
        data.append('type',tagradio)
        data.append('country',countryradio)
        data.append('min_year')
      },
      }
 
}
</script>


<style >
.router-link-text{
  color: rgb(96,98,102) !important;
  text-decoration: none;
}
.el-radio-button__inner{
  font-size: 14px !important;
  border:none !important;

}

</style>

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
  width:1300px;
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
