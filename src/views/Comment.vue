<template>
<div>
<el-container>
  <el-header>
  <el-menu :default-active="this.$route.path" router mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}        
    </el-menu-item>
</el-menu>
  </el-header>
    <el-main>
    <el-row class="row1">
      <el-col span="16" class="col1">
        <div class="movieinfo">
           <el-card class="box-card1">
           <div slot="header" class="clearfix1">
             <span>电影信息</span>
           </div>
        <div  class="text item" style="font-size:150%">
             {{'电影名称'+':   '+ MovieInfoForm.Name}}
        </div>
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
            </el-card>
        </div>
        
      </el-col>

      <el-col span="8" class="col2">
        <div class="block1">
          <span 
            class="demonstration1"
            style="margin:50px 50px;font-size:150%;"
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
    <el-row class="row2">
      <el-col span="16" class="col3">
         
      </el-col>
      <el-col span="8" class="col4">
        
        
      </el-col>
    </el-row>


     </el-main>
</el-container>
</div>
</template>

<script>
export default {
    name:"Comment",
     data() {
      return {
        navList:[
            {name:'/HomePage',navItem:'首页'},
            {name:'/HomePage/UserCenter',navItem:'个人中心'},
            {name:'/Recommand',navItem:'分类查询'},
            {name:'/Comment',navItem:'电影评价'}
        ],
         MovieInfoForm: {
          Name: '',
          Date: '',
          Director:'',
          scriptwriter:'',
          main_actor:[],
          Type: '',
          Country:''
          },
        rate: null,     //用户打的分
        value:3.8,        //电影评分
         currentDate: new Date()
      };
    },
    methods: {
      
      }
 
}
</script>


<style scoped>

.el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .block1{
    text-align: center;
  margin:100px;
  }
.block2{
  text-align: center;
  margin:100px;
}

.el-menu{
    padding:0 100px;
}
.el-col{
  height: 600px;
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
    margin:100px 325px;
  }
  
</style>