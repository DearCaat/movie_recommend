<template>
<el-container  direction="vertical" >
   <NavBar :uid = this.GLOBAL.uid :isSearch=true></NavBar> 
   <div class="warrper">
    <el-main>
      <el-carousel :interval="8000" type="card" >
        <el-carousel-item v-for="item in imagebox" :key="item.id" >
          <router-link :to="{path:'/Comment',query:{mid:item.mid}}" class="router-link-text">
          <img :src="item.idView" class="carousel-img" >
          </router-link>
        </el-carousel-item>
      </el-carousel>
      <el-row>
        <el-col :span="18" >
          <div class="recommend-warrper">
            <el-card :body-style="{padding: '0px'}" shadow="never">
              <div  >
              <h2>个性推荐</h2>
              </div>
               <el-divider></el-divider>
              <el-row > 
                  <el-col :span="4" v-for="(movie,index) in RecommandList.slice(0,12) " :key="index"  style="height:250px; max-height:250px; overflow:hidden;">
                    <div class="card-warrper ">
                      <el-card :body-style="{padding: '0px'}" shadow="never" >
                        <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
                        
                        <img :src="movie.related_pic" class="image">

                        <div style="padding: 0px;" >
                          <span>{{movie.name}}</span>
                          <span style="padding:10px;"> {{movie.score}}</span>
                        </div>
                        </router-link>
                      </el-card>
                    </div>
                  </el-col>
                </el-row> 
            </el-card>
          </div>
        </el-col>
        <el-col :span="5" :offset="1">
          <div class="rank-panel">
            <div>
              <span style="font-size:18px;font-weight:700;">排行</span>
            </div>
            <div style="margin-top:1.5rem"></div>
            <el-divider></el-divider>
            <div style="margin-top:1rem">
            </div>
            <el-card   shadow="never" :body-style="{padding: '0px'}">
              <div v-for="(movie,p) in RatingList.slice(0,10)" :key="p"  class="text item">  
              <router-link :to="{path:'/Comment',query:{mid:movie.mid}}" class="router-link-text">
                  <div style="padding: 0px;" >
                    <span style="color:rgb(51, 119, 170);">{{p+1+' '+movie.name}}</span>
                  </div>
                  </router-link>
                  <el-divider></el-divider>
              </div>
              </el-card>
          </div>
        </el-col>
      </el-row>
  </el-main>
</div>
</el-container>
</template>


<script>
import NavBar from '@/components/NavBar'
export default {
    name:"HomePage",
    components:{
      NavBar
    },
     data() {
      return {
        RecommandList:[
        ],      
        RatingList:[
        ],            

        imagebox:[{id:0,idView:require('../assets/images/4.jpg'),mid:1291546},
        {id:1,idView:require('../assets/images/5.jpg'),mid:1295124},
        {id:2,idView:require('../assets/images/6.jpeg'),mid:1291561}
        //imagebox是assets下一个放图片的文件夹
        ],
        zmdHeight :700,
        // 浏览器宽度
        screenWidth :0

      };
    },
    methods: {
      
      setSize:function () {
          // 通过浏览器宽度(图片宽度)计算高度
          this.bannerHeight = 400 / 1920 * this.screenWidth;   //图片轮播自适应函数
        },
      getRecommend(){
        var _this = this
        let data  = new FormData()
        data.append('uid',this.$cookieStore.getCookie( 'uid'))
        _this.$axios
          .post(_this.GLOBAL.baseURL+'recommendToUser',data)
          .then(function (response){
            _this.RecommandList = response.data.slice(0,20)
            _this.RatingList = response.data.slice(20)
          }) 
      },
    },
    mounted() {
      this.getRecommend()
      // 首次加载时,需要调用一次
      this.screenWidth =  window.innerWidth;
      this.setSize();
      // 窗口大小发生改变时,调用一次
      window.onresize = () =>{
      this.screenWidth =  window.innerWidth;
      this.setSize();
      }
    },
}
</script>


<style>



.rank-panel .el-card{
  border: none ;
}
.rank-panel .el-divider--horizontal{
  margin:0 !important;
  margin-top: 0.5rem !important;
}

.recommend-warrper .el-card{
  border: none !important;
}

</style>


<style scoped>
.rank-panel{
  margin-top:1rem
}

.recommend-warrper{
  border:none;
}

.warrper{
  
  width:1300px;
  margin: 0 auto;
}
.note::before{
  content:"";
  /*-webkit-filter: opacity(50%);  
    filter: opacity(50%); */
  background-image:url("../assets/images/bkg.jpg");
  opacity:0.3;
  z-index:-1;
  background-size:100%, 100%;
  width:100%; 
  height:100%;
  position:absolute;
}
.note{
  position:fixed;
    width:100%; 
  height:100%;

}
.item{
    word-break: break-all;
}
  .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
   .el-container /deep/ .text {
    font-size: 14px;
  }

  .el-container /deep/ .item {
    margin-bottom: 18px;
  }
.el-row{
  overflow-y: hidden
}
  .el-container /deep/ .clearfix1:before,
  .el-container /deep/ .clearfix1:after {
    display: table;
    content: "";
  }
  .el-container /deep/ .clearfix1:after {
    clear: both
  }

    .el-container /deep/ .clearfix2:before,
  .el-container /deep/ .clearfix2:after {
    display: table;
    content: "";
  }
  .el-container /deep/ .clearfix2:after {
    clear: both
  }



  
/* img{
      width:100%;
      height:inherit;
    } */

.carousel-img{
  width: 100%;
}

</style>