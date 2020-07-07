<template>
    <el-header class="nav-panel">
        <el-row class="nav-warpper">
            <el-col :span="4">
                <router-link :to="{path:'/HomePage',query:{uid:uid}}" class="router-link-text">
                    <p class="nav-title">辣番茄电影</p>
                </router-link>
            </el-col>
            <el-col :span="10" >                  
                <el-menu :default-active="this.$route.path"  mode="horizontal" style="background-color:rgb(240,243,245);">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" @click="route(i)">   
                        {{ item.navItem }}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="8" v-if="isSearch">
                <el-select                       
                v-model="value"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">              
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>    
<!--                 <el-button type="primary" icon="el-icon-user-solid" @click="ChangePersonalInfo()">修改个人信息</el-button>  -->
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-user-solid" @click="Logout()" class="LogoutAdmin">退出登录</el-button> 
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
            navList:[
                {name:'/HomePage',navItem:'首页',p_name:'HomePage'},
                {name:'/UserCenter',navItem:'个人中心',params:{uid:this.uid},p_name:'UserCenter'},
                {name:'/Recommand',navItem:'分类',params:{uid:this.uid},p_name:'Recommand'},
            ],
        }
    },
    methods:{
        route(index){
            this.$router.push({name:this.navList[index].p_name,params:this.navList[index].params})
        },
        search(){
            this.$router.push({name:'Search'})
        }
        
    }
}
</script>

<style >
.el-menu-item{
    font-size: 14px;
}
</style>

<style scoped>
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
    width: 1200px;
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