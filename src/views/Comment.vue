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
  <NavBar></NavBar>
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
      navList:[
          {name:'/HomePage',navItem:'首页'},
          {name:'/UserCenter',navItem:'个人中心'},
          {name:'/Recommand',navItem:'个性化推荐'}
      ],
        MovieInfoForm: {
        Name: '1',
        Date: '1  ',
        Director:'133115313123125321321131531215521315213215135211215315  ',
        scriptwriter:'1',
        main_actor:[1],
        Type: '1',
        Country:'1'
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

  .movinfo{
    
  }
  .wrapper{
    width:1040px;
    margin: 0 auto;
  }
</style>