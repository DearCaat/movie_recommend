<template>
<div>
<el-container>
  <el-header>
    <el-col :span="12">
      <div class="headAdmin"><h2>管理员界面</h2></div>
    </el-col>
<el-col :span="12">
<el-button type="primary" icon="el-icon-user-solid" @click="Logout()" class="LogoutAdmin" style="float:right">退出登录</el-button> 
</el-col>
  </el-header>
  <el-main>
    <el-button @click="get_all_movie()">管理电影</el-button>
    <el-button>管理用户</el-button>
<el-table
    :data="tableData"
    style="width: 100%"
    max-height="700">
    <el-table-column
      fixed
      prop="name"
      label="电影名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      label="电影发布日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="director"
      label="导演"
      width="120">
    </el-table-column>
    <el-table-column
      prop="actors"
      label="演员"
      width="120">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="country"
      label="国家"
      width="120">
    </el-table-column>
    <el-table-column
      prop="during"
      label="时长"
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
        <el-button type="text" size="small" @click="EditInfo(scope.$index)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
 <el-button icon="el-icon-plus" style="float:right"  @click="dialogFormVisible = true" circle ></el-button>

<el-dialog title="增加电影信息" :visible.sync="dialogFormVisible">
  <el-form :model="submitform" ref="Form">
    <el-form-item label="电影名称" :label-width="formLabelWidth">
      <el-input v-model="submitform.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影发布日期" :label-width="formLabelWidth">
      <el-input v-model="submitform.date" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="导演" :label-width="formLabelWidth">
      <el-input v-model="submitform.director" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="演员" :label-width="formLabelWidth">
      <el-input v-model="submitform.actors" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型" :label-width="formLabelWidth">
      <el-input v-model="submitform.type" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="国家" :label-width="formLabelWidth">
      <el-input v-model="submitform.country" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="语言" :label-width="formLabelWidth">
      <el-input v-model="submitform.language" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="时长" :label-width="formLabelWidth">
      <el-input v-model="submitform.during" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
     <el-button type="primary" @click="submitForm('Form')" class="CreateUser">新 建</el-button>
  </div>
</el-dialog>

<el-dialog title="修改电影信息" :visible.sync="EditDialogVisible">
  <el-form :model="submitform" ref="EditForm">
    <el-form-item label="电影名称" :label-width="formLabelWidth">
      <el-input v-model="submitform.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影发布日期" :label-width="formLabelWidth">
      <el-input v-model="submitform.date" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="导演" :label-width="formLabelWidth">
      <el-input v-model="submitform.director" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="演员" :label-width="formLabelWidth">
      <el-input v-model="submitform.actors" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型" :label-width="formLabelWidth">
      <el-input v-model="submitform.type" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="国家" :label-width="formLabelWidth">
      <el-input v-model="submitform.country" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="语言" :label-width="formLabelWidth">
      <el-input v-model="submitform.language" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="时长" :label-width="formLabelWidth">
      <el-input v-model="submitform.during" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="EditDialogVisible = false">取 消</el-button>
     <el-button type="primary" @click="EditForm('EditForm')" class="CreateUser">修 改</el-button>
  </div>
</el-dialog>


  </el-main>
</el-container>
</div>
</template>



<script>
export default {
    name:"AdminCenter",
    
     data() {
      return {
       tableData: [],
        dialogFormVisible: false,
        EditDialogVisible:false,
        submitform: {
          name: '名称1',
          date: '2020-01-1',
          director:'导演1',
          actors:'演员1',
          type: '剧情',
          country:'中国',
          language:"汉语",
          during:"120",
        },
           formLabelWidth: '120px'
      };
    },
    
    methods: {
      EditInfo(index){
        var _this = this
        console.log(_this.tableData[index])
        _this.submitform = _this.tableData[index]
        _this.EditDialogVisible = true
      },
      Logout()//登出操作
      {
        window.location.href="/";
      },
       deleteRow(index, rows) {   //删除操作
       if(confirm("是否删除该电影")){
         var _this = this
         var formData = new FormData();
         formData.append( 'id',_this.tableData[index].mid)
         console.log(formData)
        _this.$axios
          .post(_this.GLOBAL.baseURL+'M_DeleteMovies',formData)
          .then(function (response){
            if(response.data == 1){
              rows.splice(index, 1);
            }
          })
       }
        
      }, 
      EditForm(formName){
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios
              .post(_this.GLOBAL.baseURL+'M_UpdateMovies',_this.submitform)
              .then(function (response){ 
                console.log(response)
                if(response.data == 1){
                  _this.EditDialogVisible = false
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm(formName) {
        var _this = this
        var data = {
          name:_this.submitform.name,
          date:_this.submitform.date,
          director:_this.submitform.director,
          type:_this.submitform.type,
          during:_this.submitform.during,
          actors:_this.submitform.actors,
          country:_this.submitform.country,
          language:_this.submitform.language
        }
        console.log(data)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios
              .post(_this.GLOBAL.baseURL+'M_InsertMovie',data)
              .then(function (response){ 
                if(response.data == 1){
                  _this.tableData.push(_this.submitform)
                  _this.dialogFormVisible = false
                }
              }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      get_all_movie(){
        var _this = this
        _this.$axios
          .get(_this.GLOBAL.baseURL+'M_FindAllMovies')
          .then(function (response){
            _this.tableData = response.data
          }) 
      },
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