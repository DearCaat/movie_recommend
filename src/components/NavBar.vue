<template>
    <el-header class="nav-panel">
        <el-row class="nav-warpper">
            <el-col :span="4">
                <router-link :to="{path:'/HomePage',query:{uid:uid}}" class="router-link-text">
                    <p class="nav-title">辣番茄电影</p>
                </router-link>
            </el-col>
            <el-col :span="6" >                  
                <el-menu :default-active="this.$route.path"  mode="horizontal" style="background-color:rgb(240,243,245);">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" @click="route(i)">   
                        {{ item.navItem }}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="12" v-if="isSearch" style="text-align:left">
                <el-autocomplete
                    v-model="search_value"
                    :fetch-suggestions="search_option"
                    :trigger-on-focus="false"
                    placeholder="请输入内容"
                    @select="search"
                    ></el-autocomplete>
                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>    
                <div style="margin-right:100px;width:0px">
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-user-solid" @click="logout" class="LogoutAdmin">退出登录</el-button> 
            </el-col>
        </el-row>
        
   </el-header>
</template>

<script>
export default {
    name:'NavBar',
    props:[
        'uid',
        'isSearch',
    ],
    data(){
        return {
            search_value:"",
            loading:false,
            navList:[
                {name:'/HomePage',navItem:'首页',p_name:'HomePage'},
                {name:'/UserCenter',navItem:'个人中心',params:{uid:this.uid},p_name:'UserCenter'},
                {name:'/Recommand',navItem:'分类',params:{uid:this.uid},p_name:'Recommand'},
            ],
            movie_option:[],
        }
    },
    methods:{
        logout(){
            this.$cookieStore.delCookie( 'uid')
            this.$router.push({name:'Start'})
        },
        route(index){
            this.$router.push({name:this.navList[index].p_name,params:this.navList[index].params})
        },
        search(){
            this.$router.push({name:'Search',query:{searchValue:this.search_value}})
        },
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
              movies_option= response.data.slice(0,response.data.length-1)
            }
             
            for(let i=0;i<movies_option.length;i++){
              movies_option[i].value = movies_option[i].name;
            }
            cb(movies_option)
          })
      },
        
    }
}
</script>

<style >
.el-menu-item{
    font-size: 14px;
}
</style>

<style scoped>
.el-autocomplete{
  width: 400px;
}

.router-link-text{
  text-decoration: none;
}
.nav-title{
    font-size:25px;
    color: rgb(34,119,170);
    font-weight: 1000;
    padding-bottom: 3rem;
    margin: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-decoration-style: none !important;
}
.nav-panel{
    background-color: rgb(240,243,245);
    padding: 0 !important;
}
.nav-warpper{
    background-color: rgb(240,243,245) !important;
    width: 1400px;
    margin: 0 auto;
}
.el-header {
    overflow: hidden;
    color: #333;
    text-align: center;
    line-height: 60px;
    max-height: 60px;
    width: 100%;
}
  
</style>