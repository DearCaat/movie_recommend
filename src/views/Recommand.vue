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
      <el-radio-group v-model="tagradio" size="small" @change="query()">
         
        <el-radio-button v-for="(type,index) in movie_type" :key="index" :label=type @></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px" class="sortradiogroup">
      <el-radio-group v-model="countryradio" size="small" @change="query()">
        <el-radio-button v-for="(country,index) in movie_country" :key="index" :label=country  ></el-radio-button>
    </el-radio-group>
  </div>
   <div style="margin-top: 20px" class="sortradiogroup">
      <el-radio-group v-model="dateradio" size="small" @change="query()">
        <el-radio-button v-for="(year,index) in movie_year" :key="index" :label=year ></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px" class="sortradiogroup">
           
      <el-radio-group v-model="sortradio" size="small" @change="query()">
        <el-radio-button v-for="(sort,index) in movie_sort" :key="index" :label=sort ></el-radio-button>
    </el-radio-group>
  </div>
      </el-col>
      
    </el-row>
  <el-row :gutter="10"> 
    <el-divider></el-divider>       
      <el-col :span="3" v-for="(movie,index) in movies " :key="index"  style="height:250px; max-height:250px; overflow:hidden;">
        <el-card :body-style="{padding: '0px'}" shadow="never" >
          <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
          
          <img :src="movie.related_pic" class="image">

          <div style="padding: 0px;" >
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
  :total="total_num"
  :page-size="16"
  @current-change="query_page"
  :current-page.sync="current_page"
  >
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
        total_num:10,
        current_page:1,
         tagradio:'全部类型',
         countryradio:'全部地区',
         dateradio:'全部年代',
         sortradio:'评分最高',
         movies:[],
         movie_type:['全部类型','剧情','喜剧','动作','爱情','科幻','动画','悬疑','惊悚','恐怖','犯罪','同性','音乐','歌舞','传记','历史','战争','西部','奇幻','冒险','灾难','武侠','情色'],
         movie_country:['全部地区','中国大陆','美国','中国香港','日本','韩国','英国','法国','德国','意大利','西班牙','印度','泰国','俄罗斯','伊朗','加拿大','澳大利亚','爱尔兰','瑞典','巴西','丹麦'],
         movie_year:['全部年代','2019','2010年代','2000年代','90年代','80年代','70年代','60年代','更早'],
         movie_year_list:[['1800/1/1','3000/12/31'],['2019/1/1','2019/12/31'],['2010/1/1','2018/12/31'],['2000/1/1','2009/12/31'],['1990/1/1','1999/12/31'],['1980/1/1','1989/12/31'],['1970/1/1','1979/12/31'],['1960/1/1','1969/12/31'],['1800/1/1','1959/12/31']],
         movie_sort:['评分最高','近期上映'],
	
      };
    },
    methods: {
      query(){
        var data = new FormData()
        var _this = this
        let y_index = _this.movie_year.findIndex(function(elem){return elem==_this.dateradio;})
        data.append('type',_this.tagradio == '全部类型'?'':_this.tagradio)
        data.append('country',_this.countryradio == '全部地区'?'':_this.countryradio)
        data.append('min_year',_this.movie_year_list[y_index][0])
        data.append('max_year',_this.movie_year_list[y_index][1])
        data.append('sort',_this.sortradio=='评分最高'?'S':'D')
        data.append('needTotal','true')
        data.append('start',0)
        data.append('length',16)
        _this.$axios
          .post(_this.GLOBAL.baseURL+'queryMovie',data)
          .then(function (response){
            let index = response.data.length-1 
            _this.movies = response.data.slice(0,index)
            _this.total_num = parseInt(response.data[index].slice(6))
            _this.current_page = 1
          }) 
      },
      query_page(value){
        var data = new FormData()
        var _this = this
        let y_index = _this.movie_year.findIndex(function(elem){return elem==_this.dateradio;})
        data.append('type',_this.tagradio == '全部类型'?'':_this.tagradio)
        data.append('country',_this.countryradio == '全部地区'?'':_this.countryradio)
        data.append('min_year',_this.movie_year_list[y_index][0])
        data.append('max_year',_this.movie_year_list[y_index][1])
        data.append('sort',_this.sortradio=='评分最高'?'S':'D')
        data.append('needTotal','false')
        data.append('start',(value-1)*16)
        data.append('length',16)
        _this.$axios
          .post(_this.GLOBAL.baseURL+'queryMovie',data)
          .then(function (response){
            let index = response.data.length
            _this.movies = response.data.slice(0,index)
          }) 
      },
      },
      mounted(){
        this.query()
      }
 
}
</script>


<style >
.router-link-text{
  color: rgb(96,98,102) !important;
  text-decoration: none;
  padding:0 !important;
}
.el-radio-button__inner{
  font-size: 14px !important;
  border:none !important;

}
.el-card{
  font-size:12px !important;
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
    max-width: 135px !important;
    height: 202px !important;
    overflow: hidden;
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
