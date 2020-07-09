<template>
  <el-container direction="vertical">
    <NavBar :isSearch=true></NavBar>
      <el-main class="wrapper">
        <el-row :gutter="10">
          <el-col :span="16">
            <div class="movinfo">
              <div  class="text item" style="font-size:30px; margin-bottom:1rem">
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
            <img :src="MovieInfoForm.related_pic" class="cover">
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
              {{actor_str}}
              </span>
              <span v-show="isActorTooLong">
                ...
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
              {{MovieInfoForm.country}}
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
                {{MovieInfoForm.vote+"人评价"}}
              </div>
            </div>
            <div class="block2">
              <span class="demonstration2" style="color:rgb(155,155,155);">您的评价</span>
              <el-rate v-model="new_comment.score" class="yourrate" style="padding:10px;" @change="vote"></el-rate>
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
              <div class="card-warrper">
                <el-card :body-style="{ padding: '0px' }" shadow="never">
                  <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
                  <img :src="movie.related_pic" class="image">
                  <div  class="text item" style="max-width:135px">
                    {{movie.name}}
                  </div>
                  </router-link>
                </el-card>
              </div>
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
            <div class="card-warrper">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img :src="actor.a_pic" class="image">
                <div  class="text item" style="text-align: center; padding-right:20px">
                  {{actor.a_name}}
                </div>
                <div  class="text item" style=" text-align: center; color:rgb(150,150,150);padding-right:20px">
                  {{actor.profession}}
                </div>
              </el-card>
            </div>
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
              v-model="new_comment.text">
          </el-input>
          <div style="margin: 20px 0;"></div> 
          <el-button type="primary" @click="comment">评论</el-button>
          <div style="margin: 20px 0;"></div> 
          <el-row :gutter="10"> 
            <el-divider></el-divider>           
            <el-col :span="24" v-for="(comment,index) in comments  " :key="index" >
              <div class="comment-card-warrper">
                <el-card :body-style="{padding: '0px'}" shadow="never" >
                  <el-row>
                  <el-col :span="3">
                    <div class="comment-img-warrper">
                    <div :style="'background-image:url('+GLOBAL.baseURL+'images/'+ comment.u_pic+')'" class="comment-img"></div>
                      <!-- <img :src="GLOBAL.baseURL+'images/'+ comment.u_pic" class="comment-img"> -->
                    </div>
                  </el-col>
                    <el-col :span="16">
                      <div class="comment">
                        <div  class="text item" style="padding: 0px;font-size:100%; margin-bottom:0.8rem">
                          {{comment.name}}
                        </div>
                        <div class="movdescription">
                          <div class="text item">
                              {{comment.text}}
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
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
      isActorTooLong:false,
      actor_str:'',
      new_comment:{
        score:null,
        text:""
      },
      comments:[
      ],
      MovieInfoForm: "",
      RecommandMovForm:[
      ],
      actors:[
      ],
    value:3.25,        //电影评分
    };
  },
  methods: {
      errorHandler() {     //图片加载错误fallback
        return true
      },
      getMovieInfo(mid){
        var _this = this
        var data = new FormData()
        data.append('mid',mid)
        data.append('start',0)
        data.append('length',10)
        _this.$axios
          .post(_this.GLOBAL.baseURL+'getMovieById',data)
          .then(function (response){
            _this.comments = response.data[response.data.length-2]
            _this.actors = response.data[response.data.length-1].slice(0,6)
            for(let m =0;m<_this.actors.length;m++){
              if(m==0){
                _this.actors[m].profession = "导演"
              }else{
                _this.actors[m].profession = "演员"
              }
              
            }
            let current_user_index = _this.comments.findIndex(function(elem){return elem.uid==_this.$cookieStore.getCookie( 'uid')})
            if(current_user_index != -1){
              let current_comment = _this.comments.splice(current_user_index,1)
              _this.comments.unshift(current_comment[0])
              _this.new_comment.score = current_comment[0].score / 2
              console.log(current_comment[0])
            }
            _this.MovieInfoForm = response.data[response.data.length-3]
            _this.value = _this.MovieInfoForm.score / 2
            if(_this.MovieInfoForm.actors.length > 35){
              _this.actor_str = _this.MovieInfoForm.actors.slice(0,35)
              _this.isActorTooLong = true
            }else{
              _this.actor_str = _this.MovieInfoForm.actors.slice(0)
            }
            let actor_name_list = _this.strToList(_this.MovieInfoForm.actors)
            /* for(var i =0;i<actor_name_list.length;i++){
              if(i>5){
                break
              }
              _this.actors.push({name:actor_name_list[i],
              a_pic:'https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503970340.15.webp'})
            } */
            if(response.data.length > 1){
              _this.RecommandMovForm = response.data.slice(0,response.data.length-7)
            }
          })
      },
      vote(score){
        var _this = this
        var time = new Date()
        var data = {
          mid :this.mid,
          uid:this.$cookieStore.getCookie( 'uid'),
          date:time.toLocaleDateString(),
          score:this.new_comment.score*2,
          text:typeof(this.comments[0]) == "undefined"?"":this.comments[0].text,
        }
        _this.$axios
          .post(_this.GLOBAL.baseURL+'giveComment',data)
          .then(function (response){
            if(response.data){
              alert("评分成功")
            }
          }) 
        
      },
      comment(){
        var _this = this
        var time = new Date()
        var data = {
          mid :this.mid,
          uid:this.$cookieStore.getCookie( 'uid'),
          date:time.toLocaleDateString(),
          score:typeof(this.comments[0]) == "undefined"?this.new_comment.score*2:this.comments[0].score,
          text:this.new_comment.text,
        }
        _this.$axios
          .post(_this.GLOBAL.baseURL+'giveComment',data)
          .then(function (response){
            console.log(response)
            if(response.data){
              data.u_pic = response.data.u_pic
              data.name = response.data.name
              let current_user_index = _this.comments.findIndex(function(elem){return elem.uid==_this.$cookieStore.getCookie( 'uid')})
              if(current_user_index != -1){
                _this.comments[current_user_index].text = data.text
              }else{
                _this.comments.unshift(data)
              }
              _this.new_comment.text = ""
              alert("评论成功")
            }
          })
      }
  },
  mounted(){
    this.mid = this.$route.query.mid
    this.getMovieInfo(this.mid)
  },
  watch: {
    '$route' (to, from) {
        this.$router.go(0);
    }
},
 
}
</script>

<style >
/* .el-card{
  border:none !important;
  margin-bottom: 0.5rem;
  padding-bottom: 1.5rem;
  max-height: 228px !important;
} */
.image{
  width: 100%;
  max-width: 135px !important;
  height: 202px !important;
  overflow: hidden;
}
.el-rate__text{
  font-size: 26px !important;
}
.card-warrper .el-card{
  border:  none !important;
}
.comment-card-warrper .el-card{
  border: none !important;
}
</style>
<style scoped>
.comment-img{
  position: relative; 
  width: 100%; 
  height: 0; 
  overflow: hidden; 
  margin: 0; 
  padding-bottom: 100%; /* 关键就在这里 */ 
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover; 
  border-radius: 10px;
}
.comment-img-warrper{
  width: 100px;
}
.card-warrper{
  border:none !important;
  margin-bottom: 0.5rem;
  padding-bottom: 1.5rem;
  max-height: 228px !important;
}
.comment-card-warrper{
  border: none;
}

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