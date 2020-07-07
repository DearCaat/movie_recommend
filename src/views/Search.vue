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
  <NavBar :isSearch=false></NavBar>
  <el-main class="warpper">
    <el-row class="row1">
      <el-col :span="24">
     <el-select                       
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">              
    </el-select>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>    
      </el-col>
    </el-row>
  <el-row gutter="10"> 
    <el-divider></el-divider>           
    <el-col :span="24" v-for="(movie,index) in movies  " :key="index" >
    <el-card :body-style="{padding: '0px'}"  shadow="none">
        
    <el-col :span="3">
      <img :src="movie.u_pic" class="image">  
    </el-col>
    <el-row>
        <el-col :span="16">
         <div class="movinfo">
           <div  class="text item" style="padding: 0px;font-size:250%;font-family:SimHei;">
             {{MovieInfoForm.Name}}
           </div>
               <div class="movdescription">
           <div class="text item">
              {{MovieInfoForm.description}}
           </div>
        </div>
        </div>
        </el-col>
        <el-col :span="4">
         <div class="leftcolumn">
             <el-rate
            v-model="score"
            disabled
            show-score
            text-color="#ff9900"
            style="padding: 20px 30px;"
            score-template="{value}"
            >
        </el-rate>
        <el-button type="primary">查看详情</el-button> 
        </div> 
        </el-col>
    </el-row>
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
        MovieInfoForm: {
        Name: '1',
        Date: '1  ',
        Director:'133115313123125321321131531215521315213215135211215315  ',
        scriptwriter:'1',
        main_actor:[1],
        Type: '1',
        Country:'1',
          description:'12313311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513'
        },
        movies:[{
           mid:0,
           name:'电影1',
           score: 8.0,
           u_pic:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p725839995.webp",
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0,
           u_pic:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p725839995.webp",
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0,
           u_pic:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p725839995.webp",
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0,
           u_pic:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p725839995.webp",
           },
           {
           mid:0,
           name:'电影1',
           score: 8.0,
           u_pic:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p725839995.webp",
           },
         ],
        rate: null,     //用户打的分
        score:3.5,        //电影评分
	
      };
    },
    methods: {
      }
 
}
</script>


<style scoped>
.leftcolumn{
    text-align: center;
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
    max-width: 135px !important;
    max-height: 202px !important;
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