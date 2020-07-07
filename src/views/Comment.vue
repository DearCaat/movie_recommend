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
    <el-main class="wrapper">
    <el-row gutter="10px">
      <el-col :span="16">
        <div class="movinfo">
           <div  class="text item" style="font-size:250%;font-family:SimHei;">
             {{'电影名称'+':   '+ MovieInfoForm.Name}}
           </div>
        </div>
      </el-col>
      <el-col>
       <el-divider direction="vertical"></el-divider>
      </el-col>
      
    </el-row>
    <el-row class="movinfo">
      <el-col :span="7">
         <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      </el-col >
      <el-col :span="6" style="font-family:SimSun">
          <div  class="text item">
             {{'发布日期'+':   '+ MovieInfoForm.Date}}
        </div>
        <div  class="text item">
             {{'导演'+':   '+ MovieInfoForm.Director}}
        </div>
        <div  class="text item">
             {{'编剧'+':   '+ MovieInfoForm.scriptwriter}}
        </div>
        <div  class="text item">
             {{'主要演员'+':   '+ MovieInfoForm.main_actor}}
        </div>
        <div  class="text item">
             {{'类型'+':   '+ MovieInfoForm.Type}}
        </div>
        <div  class="text item">
             {{'国家'+':   '+ MovieInfoForm.Country}}
        </div>  
        </el-col>
        <el-divider direction="vertical"></el-divider>
        <el-col :span="8">
          <div class="block1">
          <span 
            class="demonstration1"
            style="font-size:150%;"
            >电影评分</span>
       <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            style="padding: 20px 30px;"
            score-template="{value}"
            >
        </el-rate>
</div>
<div class="block2">
               <span class="demonstration2">您的评价</span>
               <el-rate v-model="rate" class="yourrate" style="padding:10px;"></el-rate>
           </div>
        </el-col>
    </el-row>
    <el-row><!--昨天写到了这里-->
<el-divider></el-divider>
<el-col :span="16">
  <div class="movdescription">
           <div  class="text item" style="font-size:150%;font-family:SimHei;">
             {{'电影简介'}}
           </div>
           <div class="text item">
              {{MovieInfoForm.description}}
           </div>
        </div>
</el-col>
</el-row>
<el-row>
  <el-divider></el-divider> 
    <div  class="text item" style="font-size:150%;font-family:SimHei;">
             {{'喜欢该电影的人也喜欢'}}
    </div>
      <el-col :span="5" v-for="o in 6  " :key="o" offset="1">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
     <div  class="text item" style="padding:0 20px;">
             {{'电影名:'+RecommandMovForm.Name}}
      
             {{'评分:'+RecommandMovForm.rate}}
        </div>
    </el-card>
    <el-divider></el-divider> 
  </el-col>
</el-row>
<el-row>                    <!--演员-->
  <el-divider></el-divider> 
 <div  class="text item" style="font-size:150%;font-family:SimHei;">
             {{'电影演职人员'}}
             
    </div>
     <el-col :span="5" v-for="o in 6  " :key="o" offset="1">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
     <div  class="text item" style="padding:0 20px;">
             {{'演员:'+MovieInfoForm.main_actor}}
        </div>
    </el-card>
    <el-divider></el-divider> 
  </el-col>
</el-row>
      <el-row>
             <el-divider></el-divider>
             <div  class="text item" style="font-size:150%;font-family:SimHei;">
             {{'评论区'}}
              </div>
              <el-input
                 type="textarea"
                 :autosize="{ minRows: 2, maxRows: 4}"
                 placeholder="请输入内容"
                 v-model="userform.usercomment">
              </el-input>
              <div style="margin: 20px 0;"></div> 
              <el-button type="primary">评论</el-button>
              <div style="margin: 20px 0;"></div> 
              <el-row gutter="10"> 
    <el-divider></el-divider>           
    <el-col :span="24" v-for="o in 10  " :key="o" >
    <el-card :body-style="{padding: '0px'}"  class="movie-card">
        
    <el-col :span="4">
        <el-avatar :size="60" :src="GLOBAL.baseURL+'images/'+ userform.u_pic" @error="errorHandler">      <!--用户头像显示-->
    </el-avatar>
    </el-col>
    <el-row>
        <el-col :span="16">
          <div class="comment">
           <div  class="text item" style="padding: 0px;font-size:100%;font-family:SimHei;">
             {{userform.username}}
           </div>
               <div class="movdescription">
           <div class="text item">
              {{userform.usercomment}}
           </div>
        </div>
        </div>
        </el-col>
    </el-row>
    </el-card>
    </el-col>
		</el-row>      
              
      </el-row>
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
  name:"Comment",
    data() {
    return {
        userform:{
           u_pic:'',
           username:'2131321321',
           usercomment: '12313311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513'
        },
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
        RecommandMovForm:{
          Name: '32323131 1',
          rate:'1'
        },
      rate: null,     //用户打的分
      value:3.8,        //电影评分
      
    };
  },
  methods: {
       errorHandler() {     //图片加载错误fallback
      return true
    }
      }
 
}
</script>


<style scoped>

  .block1{
    text-align: center;

  }
.block2{
  text-align: center;

}

.el-menu{
    padding:0 100px;
}

.col1{
  background-color: rgb(198, 199, 255);
}
.col2{
  background-color:#fff;
}
.col3{
  background-color:cornsilk;
}
.col4{
  background-color:rgb(255, 233, 199);
}
  .item {
    margin-bottom: 18px;
    
  word-break: break-all;
  }

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

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  img{
      max-width: 200px;
  }
  .wrapper{
    width:1040px;
    margin: 0 auto;
  }
</style>