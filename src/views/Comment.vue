<template>
<div  class="note" style="note">
<el-container>
  <el-header>
  <el-menu :default-active="this.$route.path" router mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
    </el-menu-item>
</el-menu>
  </el-header>
  <el-main>Main</el-main>
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
            {name:'/Recommand',navItem:'个性化推荐'},
            {name:'/Comment',navItem:'电影评价'}
        ]
      };
    },
    methods: {
      
      }
 
}
</script>


<style scoped>
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
.el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {

    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
.el-menu{
    padding:0 100px;
}


</style>