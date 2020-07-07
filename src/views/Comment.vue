<template>
  <el-container direction="vertical">
    <NavBar :isSearch=true></NavBar>
      <el-main class="wrapper">
        <el-row :gutter="10">
          <el-col :span="16">
            <div class="movinfo">
              <div  class="text item" style="font-size:30px;">
                <span>
                  {{MovieInfoForm.name }}
                </span>
                <span style="color: #888;">
                  {{'(' + MovieInfoForm.date.slice(0,4) + ')'}}
                </span>
              </div>
            </div>
          </el-col>
          <!-- <el-col>
            <el-divider direction="vertical"></el-divider>
          </el-col> -->
        </el-row>
        <el-row class="movinfo">
          <el-col :span="4" >
            <img :src="MovieInfoForm.u_pic" class="cover">
          </el-col >
          <el-col :span="6" >
            <div class="text item">
              <span class="movie-info-key">
                导演:
              </span>
              <span>
              {{MovieInfoForm.director}}
              </span>
            </div>
            <div class="text item">
              <span class="movie-info-key">
                主演:
              </span>
              <span>
              {{MovieInfoForm.actors}}
              </span>
            </div>
            <div class="text item">
              <span class="movie-info-key">
                类型:
              </span>
              <span>
              {{MovieInfoForm.type}}
              </span>
            </div>
            <div class="text item">
              <span class="movie-info-key">
                制片国家/地区:
              </span>
              <span>
              {{MovieInfoForm.type}}
              </span>
            </div> 
            <div class="text item">
              <span class="movie-info-key">
                时长:
              </span>
              <span>
              {{MovieInfoForm.during}}
              </span>
            </div>
            <div  class="text item">
              <span class="movie-info-key">
                发布日期:
              </span>
              <span>
              {{MovieInfoForm.date}}
              </span>
            </div>
            <div class="text item">
              <span class="movie-info-key">
                标签:
              </span>
              <span>
              {{MovieInfoForm.tag}}
              </span>
            </div> 
          </el-col>
          <el-divider direction="vertical"></el-divider>
          <el-col :span="8" :offset="5">
            <div class="block1">
              <span class="demonstration1" style="color:rgb(155,155,155);">豆瓣评分</span>
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  :max="5"
                  style="padding: 20px 30px;"
                  :score-template="MovieInfoForm.score"
                  >
              </el-rate>
              <div style=" margin-top:-18px;margin-bottom:20px; color:rgb(155,155,155);font-size:12px">
                {{MovieInfoForm.votes+"人评价"}}
              </div>
            </div>
            <div class="block2">
              <span class="demonstration2" style="color:rgb(155,155,155);">您的评价</span>
              <el-rate v-model="rate" class="yourrate" style="padding:10px;"></el-rate>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-divider></el-divider>
          <el-col :span="24">
            <div class="movdescription">
              <div  class="text item" style="font-size:22px; margin-bottom: 1rem">
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
            <div  class="text item" style="font-size:22px; margin-bottom: 1.5rem">
                    {{'喜欢该电影的人也喜欢'}}
            </div>
            <el-col :span="4" v-for="(movie,index) in RecommandMovForm  " :key="index" >
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
                <img :src="movie.u_pic" class="image">
                <div  class="text item" style="padding:0 50px;">
                  {{movie.name}}
                </div>
                </router-link>
              </el-card>
          </el-col>
        </el-row>
        <el-row>                   
          <el-divider></el-divider> 
          <div  class="text item" style="font-size:22px; margin-bottom: 1.5rem">
            {{'电影主要演职人员'}}
            <span style="color:rgb(155,155,155);font-size:14px; margin-left:600px">
              {{'('+"全部"+actors.length+")"}}
            </span>
          </div>
          <el-col :span="4" v-for="(actor,index) in actors.slice(0,6)  " :key="index" >
            <el-card :body-style="{ padding: '0px' }" shadow="never">
              <img :src="actor.p_url" class="image">
              <div  class="text item" style="padding:0 50px;">
                {{actor.name}}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-divider></el-divider>
          <div  class="text item" style="font-size:22px; margin-bottom: 1.5rem">
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
          <el-row :gutter="10"> 
            <el-divider></el-divider>           
            <el-col :span="24" v-for="(comment,index) in userform  " :key="index" >
              <el-card :body-style="{padding: '0px'}" shadow="never" >
                <el-row>
                <el-col :span="3">
                  <el-avatar :size="80" :src="GLOBAL.baseURL+'images/'+ comment.u_pic" @error="errorHandler">      <!--用户头像显示-->
                  </el-avatar>
                </el-col>
                  <el-col :span="16">
                    <div class="comment">
                      <div  class="text item" style="padding: 0px;font-size:100%; margin-bottom:0.8rem">
                        {{comment.name}}
                      </div>
                      <div class="movdescription">
                        <div class="text item">
                            {{comment.usercomment}}
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
        userform:[
          {
           u_pic:'',
           name:'用户1',
           usercomment: '用户评论'
          },
          {
           u_pic:'',
           name:'用户1',
           usercomment: '用户评论'
          },
          {
           u_pic:'',
           name:'用户1',
           usercomment: '用户评论'
          },
        ],
        MovieInfoForm: {
          name: '1',
          date: '2020/12/1',
          u_pic:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p725839995.webp',
          director:'Alen Bob',
          during:120,
          actors:"abcd/jdiwa/lklcz/dsad/dadwadw/cxzczcsada/aa",
          type: '1',
          country:'1',
          description:'12313311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513311531312312532132113153121552131521321513521121531513',
          tag:"剧情/爱情/喜剧",
          score:"6.5",
          votes:12423,
        },
        RecommandMovForm:[{
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
          },
         {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
          },
          {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
         },
         {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
         },
         {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
         },
         {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
         },
         {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
         },
         {
          name: '杀手',
          score:'2',
          u_pic:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505143522.webp',
          mid:1,
         },
        ],
        actors:[
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
          {
            name:"dwakl",
            p_url:"https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8544.webp",
            profession:"导演"
          },
        ],
      rate: null,     //用户打的分
      value:3.25,        //电影评分
      
    };
  },
  methods: {
      errorHandler() {     //图片加载错误fallback
        return true
      }
  },
  mounted(){
    console.log(this.$route.query.mid)
  }
 
}
</script>

<style >
.el-card{
  border:none !important;
  margin-bottom: 1rem;
}
.image{
  max-width: 135px !important;
  max-height: 202px !important;
  overflow: hidden;
}
.el-rate__text{
  font-size: 26px !important;
}
</style>
<style scoped>
.router-link-text{
  color: rgb(96,98,102) !important;
  text-decoration: none;
  
}
.cover{
  max-width: 135px;
  max-height: 202px;
}
.movie-info-key{
  font: 12px Arial, Helvetica, sans-serif;
  line-height: 150%;
  color: #666666;
}
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
  margin-bottom: 4px;
  font-size: 14px;
  word-break: break-all;
}

  .leftcolumn{
    text-align: center;
}
.row1{
    text-align: center;
}
.movie-card{
  border: none !important;
  max-width: 150px;
  max-height: 250px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
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