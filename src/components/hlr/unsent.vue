<template>

  <div>
    <el-table
      :data="currentPageData"
      border
      stripe
      style="width: 100%">
      <!--=================expand:==============-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"  class="demo-table-expand">

            <el-form-item label="图片:">
              <span> <img :src="props.row.ac_img" alt="" class="imgSizeShow"></span>
            </el-form-item>
            <el-form-item label="描述:">
              <span class="expandLef">{{ props.row.ac_ft }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--====================================-->
      <!--border 表格有没有边框线-->
      <!--stripe 表格的斑马纹-->
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="编号"
        width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ac_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="主题"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ac_zt }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="主图"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.ac_img"  alt="" class="imgSize">
        </template>
      </el-table-column>

      <el-table-column
        label="活动描述"
        width="200">
        <template slot-scope="scope">
          <!--<span style="margin-left: 10px">{{ scope.row.ac_ft }}</span>-->
          <span class="textView"   ref="ft" style="margin-left: 10px">{{ scope.row.ac_ft }}</span>
          <span  @click="valuesFt"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ac_type }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="查看更多"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ac_morelink }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="handleSent(scope.$index, scope.row)">发送</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row);dialogFormVisible= true"  type="primary" plain>编辑</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="numPages"
        :page-size="num"
        layout="total, sizes, prev, pager, next, jumper"
        :total=tableData.length>
      </el-pagination>
    </div>
    <!--模态框-->
    <el-dialog title="编辑未发布活动" :visible.sync="dialogFormVisible " :data="dialogData" class="el-dialog__body">
      <el-form :model="form">
        <el-form-item label="编号" :label-width="formLabelWidth" class="hlrStyle">
          <el-input v-model="dialogData.ac_id" auto-complete="off"></el-input>
        </el-form-item>
        <!--日期-->


        <el-form-item label="主题" :label-width="formLabelWidth" class="hlrStyle" >
          <el-input v-model="dialogData.ac_zt" auto-complete="off"></el-input>
        </el-form-item>
        <!--文本域-->
      <el-form-item label="描述" :label-width="formLabelWidth" class="hlrStyle">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="dialogData.ac_ft">
        </el-input>
      </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth"  style="padding-top: 0" class="hlrStyle">
          <el-select v-model="dialogData.ac_type" placeholder="请选择活动板块" style="float: left; width: 270px">
            <el-option label="公共商业空间" value="公共商业空间"></el-option>
            <el-option label="品牌跨界空间" value="品牌跨界空间"></el-option>
          </el-select>
          <div class="block" style="padding-top: 0;margin-top: 0" >
            <span class="demonstration" style="padding-bottom: 10px">日期</span>
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <!--上传图片-->
        <el-upload
          class="avatar-uploader "
          action="/api/uploadImg.do"
          name="myUpLoad"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change="updateImg"
          :before-upload="beforeAvatarUpload" >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer" >

        <el-button @click="dialogFormVisible = false" >取 消</el-button>
        <el-button type="primary" @click="editSave();dialogFormVisible = false" >确 定</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as activity from '../../../communal/routerApi'
  // import Modal from './myModal'
  export default {
    name: "my-table",
    data() {
      return {
        tableData: [],
        currentPage: 1, //当前显示的页
        currentPageData:[], //定义有个当前页的数组
        currentPages:1, //获取当前页的页码
        ModalState:false,
        numPages:[4,5,6],
        num:4,
        //模态框编辑
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogData:[],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
      //  日期
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        imageUrl: '',
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogData=row;
        this.imageUrl=row.ac_img;
      },
      handleDelete(index, row) {
        // console.log(row);
        let _row = row;
        this.$confirm('此操作将永久删除数据库的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData(_row);
          this.dataOnLoad(index,_row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteData(row){
        // console.log("调用删除数据库数据的方法");
        // console.log(row+"拿到一行数据");
        // console.log(row.ac_id);
        this.axios.get('/api/deleteVueActivity.do',{
          params:{
            acId:row.ac_id
          }
        }).then((data)=>{
          console.log("id:"+data.data)
        });
      },
      dataOnLoad(index,row){
        // console.log("调用重新加载方法");
        this.currentPageData.splice(index,1);  //删除当前页的数据
        for(let i=0;i<this.tableData.length;i++){
          if(row.ac_id == this.tableData[i].ac_id){    //当前删除的id和总数据中的id比较，相等则删除
            this.tableData.splice(i,1)  //删除总数组中对应的数据
          }

          //下面是删除后重新的渲染
          this.currentPageData=[];
          // console.log( "chong:"+this.currentPages);
          for(let i=(this.currentPages-1)*4;i<this.currentPages*4;i++){      /*&&i<this.tableData.length*/
            if(i<this.tableData.length){
              this.currentPageData.push(this.tableData[i])
            }

          }
        }
      },
      handleSent(index,row){
        let _row = row;
        this.sented(row);
        this.dataOnLoad(index,_row);
        this.$notify({
          title: '发布成功',
          message: '这是条数据将会在前台显示！',
          type: 'success'
        });
      },
      valuesFt:function(){
        // const self=this;
        // console.log($($(".textView")[1]).innerText);
        let _num = $(".textView").length;
        for(let i = 0 ;i<_num ; i++){
          let getFTShow = $(".textView")[i].innerText;
          let substringShow = getFTShow.substring(0,10);
          // console.log(getFTShow);
          $(".textView")[i].innerText = substringShow + "...";
        }
        // console.log("qqq");
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.num=val;
        this.currentPageData=[];
        console.log(val);
        for(var i=( this.currentPage-1)*this.num;i< this.currentPage*this.num;i++){      /*&&i<this.tableData.length*/

          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }
        }
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        // console.log(`当前页: ${val}`);
        // this.myshu=val;
        this.currentPageData=[];
        console.log(val);
        for(var i=( this.currentPage-1)*this.num;i< this.currentPage*this.num;i++){      /*&&i<this.tableData.length*/

          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }

        }

      },
      //搜索方法
      searchV(val){
        // console.log(this.message);
        // console.log(val);
        this.axios.get('/api/searchVueActivity.do',{
          params:{
            SV:val
          }
        }).then((data)=> {
          console.log(data.data);
          this.currentPageData=[];
          this.tableData = data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].ac_img = activity.location + this.tableData[i].ac_img;
            // console.log(this.tableData[i].ac_img);
          }
          for (let j = 0; j < 4 && j < this.tableData.length; j++) {
            this.currentPageData.push(this.tableData[j])

          }
        })
      },
      //发送方法
      sented(row){   //发送成功
        // console.log("调用发送数据库数据的方法");
        this.axios.get('/api/sentVueActivity.do',{
          params:{
            acId:row.ac_id,

          }
        }).then((data)=>{
          console.log("id:"+data.data)
        });
      },
    //  上传图片
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log("111111111111");
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 200;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      editSave(){
        this.axios.get('/api/uploadHandleEditSave.do',{
          params:{
            acId:this.dialogData.ac_id,
            ac_ft:this.dialogData.ac_ft,
            ac_zt:this.dialogData.ac_zt,
            ac_img:this.dialogData.ac_img,
          }
        }).then((data)=>{
          console.log('修改成功！')

        });
      },
      updateImg(file){
        this.imageUrl = file.url;
      },
    },

    components: {
      // MyModal:Modal,
    },
    created() {
      this.axios.get('/api/getVueActivityUnsent.do').then((data) => {
        // console.log(data.data);
        this.tableData = data.data;
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].ac_img = activity.location + this.tableData[i].ac_img;
          // console.log(this.tableData[i].ac_img);
        }
        for(let j=0;j<4 && j<this.tableData.length;j++){
          this.currentPageData.push(this.tableData[j])
        }
      });
    },
    updated() {    /*修改之后更新的数据--查生命周期函数*/
      this.valuesFt();
    },
    mounted() {
      this.$on('bridge', (val) => {
        this.searchV(val);
      });
    }

  }
</script>

<style scoped>
  /*.redactBtn{*/
  /*padding: 10px 20px;*/
  /*}*/
  /*.deleteBtn{*/
  /*padding: 10px 20px;*/
  /*}*/
  *{
    padding: 10px;
  }
  .imgSize{
    width: 300px;
    float: left;
    padding-left: 0px;
    padding-right: 0px;
  }
.imgSizeShow{
  float: left;
  width: 150px;
}
  .expandLef{
    float: left;
  }
  *[data-v-068ac9cf]{
    padding:8px;
  }
/*.showModal{*/
  /*display: none;*/
/*}*/

  /*图片上传的样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item {
    margin-bottom: 00px;
  }
  .el-dialog__body{
    padding-bottom: 0;
    text-align: center;
  }
  .avatar{
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-form-item__label{
    padding: 12px 12px;
  }
  .el-dialog__footer{
    text-align: center;
  }

</style>

