<template>
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
      width="360">
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

 <el-pagination
 :show="total_num"
  style="text-align:center;"
  background
  layout="prev, pager, next"
  :total="total_num"
  :page-size="10"
  @current-change="get_all_movie('no_need')"
  :current-page.sync="current_page"
  >
</el-pagination>

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
</template>



<script>
import NavBar from '@/components/NavBar'
export default {
    name:"AdminCenter",
    components:{
      NavBar
    },
     data() {
      return {
        current_page:null,
        total_num:null,
        tableData: [],
        dialogFormVisible: false,
        EditDialogVisible:false,
        submitform: {
        },
           formLabelWidth: '120px'
      };
    },
    
    methods: {
      Logout(){
        this.$cookieStore.delCookie( 'uid')
        this.$router.push({name: 'Start'} )

      },
      EditInfo(index){
        var _this = this
        console.log(_this.tableData[index])
        _this.submitform = _this.tableData[index]
        _this.EditDialogVisible = true
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
              alert("删除成功")
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
                  _this.submitform = {}
                  alert("修改成功")
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
                  _this.submitform = {}
                  alert("添加成功")
                }
              }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      get_all_movie(need_str){
        var _this = this
        let data = new FormData()
        if(need_str!='no_need'){
          data.append('needTotal','true')
          data.append('start',0)
        }else{
          data.append('needTotal','false')
          data.append('start',(_this.current_page-1)*10)
        }
        
        data.append('length',10)
        _this.$axios
          .post(_this.GLOBAL.baseURL+'M_FindAllMovies',data)
          .then(function (response){
            if(typeof(response.data[response.data.length-1]) == "number"){
              _this.tableData = response.data.slice(0,response.data.length-1)
              _this.total_num = response.data[response.data.length-1]
            }else{
              _this.tableData = response.data
            }
            
            
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