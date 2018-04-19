<template>
  <div class="bgc">
    <div id="btnCenter">
     <router-link to="/sented">
       <el-button type="info"  :class="{active:qiehuan==1}" @click="longS(1)">已发布</el-button>
     </router-link>
      <router-link to="/unsent">
        <el-button type="info" :class="{active:qiehuan==2}" @click="longS(2)"  >未发布</el-button>
      </router-link>
      <span class="search_new_right">
         <el-input  class="el_search" placeholder="请输入内容"   id="SearchValues" style="">
            <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
         </el-input>
         <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-plus">新增</i></el-button>
    </span>
     <!--新增模态框-->
      <el-dialog title="活动新增" :visible.sync="dialogFormVisible" class="btCenter">
        <el-form :model="form">
          <el-form-item label="主题" :label-width="formLabelWidth">
            <el-input v-model="form.ac_zt" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.ac_ft">
            </el-input>
          </el-form-item>
          <el-form-item label="活动类型" :label-width="formLabelWidth"  style="padding-top: 10px;display: inline-block;float:left">
            <el-select v-model="form.ac_type" placeholder="请选择活动类型">
              <el-option label="公共商业空间" value="公共商业空间"></el-option>
              <el-option label="品牌跨界空间" value="品牌跨界空间"></el-option>
            </el-select>
            <div class="block" style="display: inline-block;margin-left:200px ">
              <span class="demonstration">日期</span>
              <el-date-picker
                v-model="form.ac_date"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="更多连接" :label-width="formLabelWidth" style="clear: both">
            <el-input v-model="form.ac_morelink" auto-complete="off"></el-input>
          </el-form-item>
          <el-upload
            class="avatar-uploader hlrStyleImg"
            action="/api/uploadImg.do"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="myUpLoad"
            multiple
            :on-change="updateImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAc();dialogFormVisible = false">确 定</el-button>
        </div>

      </el-dialog>

    </div>
   <el-main v-show="listMe" style="overflow: hidden">  <!--控制主导航的显示（即模块的切换）-->
     <transition mode="out-in"
                 enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
       <keep-alive>
         <router-view></router-view>
       </keep-alive>
     </transition>
   </el-main>
  </div>
</template>

<script>
  var MyImg;
    export default {
      data(){
        return{
          input2: '',
          bool:'true', // 控制发布与未发布的显示赢藏
          listMe:true, //  默认显示拦截组件的显示
          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            ac_id: '',
            ac_zt: '',
            ac_ft: '',
            ac_img:'',
            ac_state: false,
            ac_type: [],
            ac_morelink: '',
            ac_date:"",
          },
          formLabelWidth: '120px',
          imageUrl:'',
          dialogImageUrl: '',
          dialogVisible: false,
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
          MyImg:'',
        //  给发送和未发送设置开关
          closesent1:1,
          qiehuan:1

        }

      },
      methods:{
        Search(val){
         let SValues= $("#SearchValues").val();
         this.$refs.sents.$emit("bridge",SValues)  // 父元素调用子元素的自定义事件
        },
        showMs(){
          console.log("滑稽");
          this.bool='sent';
          console.log(this.bool == 'sent');
          this.listMe=false
        },
        showMu(){
          console.log("超滑稽");
          this.bool='unsent';
          this.listMe=false
        },
        listM(val){
          this.listMe=true;
          console.log("触发函数");
          this.bool='true';
          console.log(this.bool == 'sent');
          console.log(this.bool == 'unsent');
          console.log(this.listMe);

        },
        longS(val){
          this.qiehuan = val;
          console.log("btn1")
        },
        saveAc(){  //新建数据插入请求
          console.log(this.form);
          this.axios.get('/api/activityInsert.do',{
            params:{
              id:this.form.ac_id,
              zt:this.form.ac_zt,
              ft:this.form.ac_ft,
              type:this.form.ac_type,
              morelink:this.form.ac_morelink,
              state:this.form.ac_state,
              date:this.form.ac_date,
              img:this.MyImg,
            }
          }).then((data)=>{
            console.log("插入成功！")
          })

        },
      //  图片：
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);

        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        updateImg(file){
          this.imageUrl = file.url;
          this.form.ac_img=file.url;
          console.log(this.form.ac_img);
          this.MyImg="uploads/"+file.name;
          console.log(this.MyImg);
        },
      },
      components:{},
      mounted() {
        this.$on('bridge', (val) => {
          this.listM(val);
        });
      }
    }
</script>

<style>
  .bgc{
    background-color: rgba(169, 169, 169, 0.1);
  }
  #btnCenter{
    text-align: left;
    padding: 20px 20px;
    background-color: white;
  }
  .el_search{
    width: 300px;
  }
  .search_new_right{
    float: right;
  }
  /*hlr设置=============*/


  .el-main{   /*去掉标签左右的padding间距*/
    padding-left: 00px;
    padding-right: 00px;

  }
  .el-table td{  /*设置表格中列的padding*/
    padding: 2px;
  }
  /*====================*/
.showM{
  display: block;
}


  /*图片上传*/
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
    padding-top: 10px;
    padding-bottom: 0;
  }
  .el-form-item {
    margin-bottom: 00px;
  }
  .el-dialog__body{
    padding-bottom: 0;
  }
  .btCenter{
    text-align: center;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .active{
    background: #409EFF;
    border: none;
  }



</style>
