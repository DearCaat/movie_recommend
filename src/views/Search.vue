<template>
<div>
<el-container direction="vertical">
  <NavBar :isSearch=true></NavBar>
  <el-main class="warpper">
    <!-- <el-row>
      <el-col :span="24">
        <el-autocomplete
          v-model="search_value"
          :fetch-suggestions="search_option"
          :trigger-on-focus="false"
          placeholder="请输入内容"
          @select="push1"
        ></el-autocomplete>       
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>   
      </el-col>
    </el-row> -->
  <div style="margin-left:82px; margin-bottom:45px">
    <h1 style="font-size:25px;font-weight:700">{{'搜索   '+ searchValue}}</h1>
  </div>
  <el-row :gutter="10">           
    <el-col :span="24" v-for="(movie,index) in movies  " :key="index" >
      <div class="search-res-warrper">
        <el-card :body-style="{padding: '0px'}"  shadow="none">
          <el-col :span="3" :offset="2">
            <img :src="movie.related_pic" class="image">  
          </el-col>
          <el-row>
              <el-col :span="10">
                <div class="movinfo">
                  <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="my-a-text">
                    <div  class="text item" style="padding: 0px; font-size:20px">
                      {{movie.name+'('+movie.year+')'}}
                    </div>
                  </router-link>
                  <div class="movdescription" style="font-size:14px">
                    <div class="text item">
                        {{movie.country+'/'+movie.type+'/'+movie.during+'分钟'}}
                    </div>
                    <div class="text item">
                        {{movie.director+'/'+movie.actors}}
                    </div>
                  </div>
                  
                </div>
              </el-col>
              <el-col :span="4" :offset="4">
              <div class="leftcolumn">
                <el-rate
                v-model="movies[index].score_5"
                disabled
                show-score
                text-color="#ff9900"
                style=""
                :score-template="movie.score"
                >
            </el-rate>
            <div style=" margin-bottom:20px; color:rgb(155,155,155);font-size:12px">
                {{movie.vote+"人评价"}}
              </div>
              <!-- el-button type="primary">查看详情</el-button> --> 
              </div> 
              </el-col>
          </el-row>
        </el-card>
        <div style="margin-bottom:1rem">
        </div>
      </div>
    
    </el-col>
		</el-row>      
<el-row>
   <el-divider></el-divider>       
  <el-pagination
  style="text-align:center;"
  background
  layout="prev, pager, next"
  :total="total_num"
  @current-change="changePage"
  :current-page.sync="current_page">
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
        searchValue:"",
        loading:false,
        movies_option:[],
        search_value:"",
        total_num : null,
        current_page : null,
        movies:[
         ],
      };
    },
    methods: {
      search_option(value, cb){
        this.loading = true
        var _this = this
        let data = new FormData()
        data.append('start',0)
        data.append('length',6)
        data.append('name',value)
        data.append('needTotal','y')
       _this.$axios
          .post(_this.GLOBAL.baseURL+'SelectByName',data)
          .then(function (response){
            let movies_option
            if(response.data.length>6){
              movies_option= response.data.slice(0,6)
            }else if(response.data.length==1){
              movies_option=[]
            }else{
              movies_option= response.data.slice(0,response.data.length-2)
            }
             
            for(let i=0;i<movies_option.length;i++){
              movies_option[i].value = movies_option[i].name;
            }
            cb(movies_option)
          })
      },
      push1(){
        this.$router.push({name:'Search',query:{searchValue:this.search_value}})
      },
      getMovie(needTotal){
        var _this = this
        let data = new FormData()
        
        data.append('length',15)
        data.append('name',this.search_value)
        if(needTotal){
          data.append('needTotal','y')
          data.append('start',0)
        }else{
          data.append('needTotal','n')
          data.append('start',(this.current_page-1)*15)
        }
        let index=0
       _this.$axios
          .post(_this.GLOBAL.baseURL+'SelectByName',data)
          .then(function (response){
            if(needTotal){
              _this.total_num = parseInt(response.data[response.data.length-1].slice(6))
              index = response.data.length-1
            }else{
              index = response.data.length
            }
            
            _this.movies = response.data.slice(0,index)
            for(let i=0;i<_this.movies.length;i++){
              _this.movies[i].score_5 = parseFloat(_this.movies[i].score / 2) 
              if(_this.movies[i].actors.length>35){
                _this.movies[i].actors = _this.movies[i].actors.slice(0,35) + '...'
              }
            }
            _this.loading = false
          })
      },
      search(){
        this.getMovie(true)
      },
      changePage(){
        this.getMovie(false)
      },
    },
    mounted(){
      if(this.$route.query.searchValue){
        this.search_value = this.$route.query.searchValue
        this.searchValue = this.$route.query.searchValue
        this.search()
      }
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
      }
    },
}
</script>


<style >
.search-res-warrper .el-card{
  border: none;
  
}
.leftcolumn .el-rate__icon{
  font-size: 14px;
}
.leftcolumn .el-rate__text{
  font-size: 18px !important;
}
</style>

<style scoped>

.my-a-text{
  color:rgb(51, 119, 170);
  text-decoration:none;
}

.search-pane{
  border:none;
}

.leftcolumn{
    text-align: center;
    font-size: 8px !important;
}
.row1{
    text-align: center;
}
.movie-card{

  max-height: 250px;
   max-width: 1200px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
}
.warpper{
  width:1000px;
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
    max-width: 90px !important;
    height: 150px !important;
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
    .item {
    margin-bottom: 18px;
    
  word-break: break-all;
  }
  img{
      max-width: 200px;
  }
</style>