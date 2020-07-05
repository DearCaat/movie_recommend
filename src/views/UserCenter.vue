<template>
<div >
<el-container>
  <el-header>
  <el-menu :default-active="this.$route.path" router mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
    </el-menu-item>
</el-menu>
  </el-header>
  <el-main>
     <el-col span="16" class="leftcol">
        <div class="demo-type">
    <el-avatar :size="120" src="https://empty" @error="errorHandler">      <!--用户头像显示-->
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
    </el-avatar>
  </div>
<el-card class="box-card1">
  <div slot="header" class="clearfix1">
    <span>个人信息</span>
  </div>
  <div  class="text item">
    {{'用户名'+':   '+ ruleForm.username}}
  </div>
  <div  class="text item">
    {{'性别'+':   '+ ruleForm.sex}}
  </div>
  <div  class="text item">
    {{'年龄'+':   '+ ruleForm.age}}
  </div>
  <div  class="text item">
    {{'个性签名'+':   '+ ruleForm.sign}}
  </div>
  <div  class="text item">
    {{'喜爱类型'+':   '+ ruleForm.tag}}
  </div>
</el-card>

     </el-col>
      <el-col span="8" class="rightcol">
        <el-card class="box-card2">
        <div slot="header" class="clearfix2">
        <span>留言板</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动形式">
        <el-input type="textarea" :rows="5" placeholder="请在此留言" v-model="MessageBoard.description"></el-input>
        </el-form-item>
  <el-form-item>
    <el-button type="primary" size="small" @click="onSubmit">留言</el-button>
  </el-form-item>
</el-form></div>
</el-card>
      </el-col>
  </el-main>
</el-container>
</div>
</template>

<script>
export default {
    name:"UserCenter",
     data() {
      return {
        navList:[
            {name:'/HomePage',navItem:'首页'},
            {name:'/HomePage/UserCenter',navItem:'个人中心'},
            {name:'/Recommand',navItem:'个性化推荐'},
            {name:'/Comment',navItem:'电影评价'}
        ],
        ruleForm: {
            username: '亚索',
            sex: '男',
            age:'21',
            sign:'死亡如风，常伴吾身',
            tag: ["孤儿","托儿索","无E烦"]
          },
          MessageBoard:{
            description:''          //留言板
          }
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

 
.el-menu{
    padding:0 100px;
}
.el-col {
  height: 790px;
  overflow-y: hidden
}
.rightcol{
  background-color: rgb(255, 166, 0);
}
.leftcol{
 background-color: teal;
}
.text {
    font-size: 14px;
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
    margin:150px 325px;
  }
   .clearfix2:before,
  .clearfix2:after {
    display: table;
    content: "";
  }
  .clearfix2:after {
    clear: both
  }

  .box-card2 {
   width: 300px;
   margin: 270px auto;  
  }
</style>