<template>
<div>
<el-container>
  <el-header>
    <el-col :span="12">
      <div class="headAdmin">管理员界面</div>
    </el-col>
<el-col :span="12">
<el-button type="primary" icon="el-icon-user-solid" @click="Logout()" class="LogoutAdmin" style="float:right">退出登录</el-button> 
</el-col>
  </el-header>
  <el-main>
<el-table
    :data="tableData"
    style="width: 100%"
    max-height="700">
    <el-table-column
      fixed
      prop="Name"
      label="电影名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Date"
      label="电影发布日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Director"
      label="导演"
      width="120">
    </el-table-column>
    <el-table-column
      prop="scriptwriter"
      label="编剧"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Type"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Country"
      label="国家"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  </el-main>
</el-container>
</div>
</template>



<script>
export default {
    name:"AdminCenter",
    
     data() {
      return {
       tableData: [{
          Name: 'Re:0',
          Date: '2020',
          Director: '忘了是谁',
          scriptwriter: '更不知道',
          Type: '动漫',
          Country:'日本'
        }]
      };
    },
    
    methods: {
      Logout()
      {
        window.location.href="/";
      },
       deleteRow(index, rows) {
        rows.splice(index, 1);
      }
      }
 
}
</script>


<style scoped>

.el-header {
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

.LogoutAdmin{
  text-align: left;
}
.headAdmin{
  text-align: left;
 
}
</style>