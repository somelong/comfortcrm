<template>
  <div>
    <!--------------------------第一栏---------------------------------->
    <div class="two">
      <div class="cicle"></div>
      <span class="font orange">商品检索</span>
    </div>
    <!--------------------------第二栏---------------------------------->
    <div class="two">
      <el-select v-model="value" placeholder="请选择" class="juzhong search_l">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="请选择" class="juzhong search_r">
        <el-option
          v-for="item in options2"
          :key="item.value2"
          :label="item.label2"
          :value="item.value2">
        </el-option>
      </el-select>
    </div>
    <!--------------------------第三栏---------------------------------->
    <div class="two">
      <div class="cicle"></div>
      <span class="font blue">商品列表</span>
      <div class="demo-input-suffix search">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2">
        </el-input>
      </div>
      <el-button type="primary" class="add" @click="addFrom = true">新增</el-button>
    </div>
    <!-----------------------新增模态框---------------------------------->
    <el-dialog title="添加商品" :visible.sync="addFrom" center="" width="60%">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-position="right"
               size="mini" label-width="120">
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-form-item label="商品中名">
                  <el-input v-model="form.cname" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="商品英名">
                  <el-input v-model="form.ename" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="商品类型">
                  <el-select v-model="form.style" class="styleinput">
                    <el-option label="沙发" value="sofa"></el-option>
                    <el-option label="桌几" value="table"></el-option>
                    <el-option label="椅凳" value="chair"></el-option>
                    <el-option label="灯具" value="deng"></el-option>
                    <el-option label="床·床品" value="bed"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="商品重量">
                  <el-input v-model="form.weight" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
 <!----------------------------------上传---------------------------------->
            <el-upload
              action="/sjw/bigmorepicupdate/"
              list-type="picture-card"
              :on-preview="bigPictureCardPreview"
              :on-remove="bigRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-row>
<!---------------------------添加商品价格栏---------------------------------------->
        <el-row>
          <el-col :span="1">
          </el-col>
          <el-col :span="22">
            <el-row class="gery">
              <el-col class="pad" :span="3">颜色</el-col>
              <el-col class="pad" :span="3">款式</el-col>
              <el-col class="pad" :span="3">进价</el-col>
              <el-col class="pad" :span="3">售价</el-col>
              <el-col class="pad" :span="3">库存</el-col>
              <el-col class="pad" :span="4">图片</el-col>
              <el-col class="pad" :span="2"></el-col>
            </el-row>
<!---------------------------添加商品价格每一栏---------------------------------------->
            <el-row class="geryson"
                    v-for="(domain, index) in dateForm.domains"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
            >
              <el-col :span="3">
                <el-select class="s80" v-model="domain.color">
                  <el-option label="原谅绿" value="green"></el-option>
                  <el-option label="火烧红" value="red"></el-option>
                  <el-option label="天空蓝" value="blue"></el-option>
                  <el-option label="肉桂棕" value="brown"></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select class="s80" v-model="domain.kuanshi">
                  <el-option label="全幅版三人座" value="1"></el-option>
                  <el-option label="全幅版单人座" value="2"></el-option>
                  <el-option label="全幅版脚墩" value="3"></el-option>
                  <el-option label="精致版三人座" value="4"></el-option>
                  <el-option label="精致版单人座" value="5"></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-input class="s80" v-model="domain.fprice" auto-complete="off"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input class="s80" v-model="domain.lprice" auto-complete="off"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input class="s80" v-model="domain.knum" auto-complete="off"></el-input>
              </el-col>
              <el-col :span="5">
<!-----------------------------价格栏上传---------------------------------->
                <el-upload
                  class="upload-demo"
                  action="https://"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button class="one" size="small" type="primary">上传</el-button>
                </el-upload>
              </el-col>
              <el-col :span="1">
                <el-button size="mini" type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
              </el-col>
            </el-row>
<!------------------添加价格栏按钮------------------------->
            <el-row class="geryson">
              <el-button style="margin-left: -100px" @click="addDomain">新增</el-button>
            </el-row>
          </el-col>
          <el-col :span="1">
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFrom = false">取 消</el-button>
        <el-button type="primary" @click="addFrom = false;addadd()">确 定</el-button>
      </div>
    </el-dialog>
<!------------------模态框结束------------------------->
<!------------------表格------------------------->
    <el-table :data="currentPageData" border style="width: 100%" @expand-change="toggleRowExpansion">
      <el-table-column type="expand">
        <!------------------点击展开行---------------------------->
        <template slot-scope="props">
          <el-form label-position="left"  class="demo-table-expand">
            <el-form-item label="商品别名">
              <span>{{ props.row.c_name }}</span>
            </el-form-item>
            <el-form-item label="商品展示" class="lunbo">
              <div class="block" style="text-align: center;">
                <el-carousel height="150px">
                  <el-carousel-item v-for="item in lunbo.length" :key="item">
                    <img :src=lunbo[item-1] class="picsize">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-form-item>
            <el-form-item class="mt160" label="商品类型">
              <span>沙发</span>
            </el-form-item>
            <el-form-item class="mt120" label="商品重量">
              <span>85kg</span>
            </el-form-item>
            <el-form-item class="mt80" label="商品样式">
              <span>{{ props.row.style }}</span>
            </el-form-item>
            <el-form-item class="mt40" label="商品颜色">
              <span>{{ props.row.color }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>描述</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-size: 10px">{{ scope.row.good_id }}</span><br>
          <span style="margin-left: 10px">{{ scope.row.e_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="主图" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <img :src="scope.row.p_src">
          </div>
        </template>
      </el-table-column>

      <el-table-column label="价格" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom">
            <p>进  价  :     {{scope.row.f_price}}</p>
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px" class="pricel">{{ scope.row.l_price}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="库存" width="220">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 10px">{{ scope.row.num }}</span>
          </div>
        </template>
      </el-table-column>
<!---------------------------按钮事件----------------------------------->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row);editForm = true">编辑</el-button>
<!--------------------------修改模态框-------------------------->
          <el-dialog title="修改商品" :visible.sync="editForm" center width="60%" :data="editdata">
            <el-form :inline="true" :model="editform" class="demo-form-inline" label-position="right"
                     size="mini" label-width="120">
              <el-row>
                <el-col :span="6">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="商品中名">
                        <el-input v-model="editdata.c_name" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="商品英名">
                        <el-input v-model="editdata.e_name" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="商品类型">
                        <el-select v-model="editform.style" class="styleinput">
                          <el-option label="沙发" value="sofa"></el-option>
                          <el-option label="桌几" value="table"></el-option>
                          <el-option label="椅凳" value="chair"></el-option>
                          <el-option label="灯具" value="deng"></el-option>
                          <el-option label="床·床品" value="bed"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="商品重量">
                        <el-input v-model="editform.weight" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="18">
<!-------------------------------编辑大上传------------------------------->
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="editupdatepreview222"
                    :on-remove="editremove222">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-col>
              </el-row>

              <el-row>
                <!--<el-col :span="2">-->
                  <!--<div>价格</div>-->
                <!--</el-col>-->
                <el-col :span="1">
                </el-col>
                <el-col :span="24">
                  <el-row class="gery">
                    <el-col class="pad" :span="3">颜色</el-col>
                    <el-col class="pad" :span="3">款式</el-col>
                    <el-col class="pad" :span="3">进价</el-col>
                    <el-col class="pad" :span="3">售价</el-col>
                    <el-col class="pad" :span="3">库存</el-col>
                    <el-col class="pad" :span="4">图片</el-col>
                    <el-col class="pad" :span="2"></el-col>
                  </el-row>

                  <el-row class="geryson">
                    <el-col :span="3">
                      <el-select class="s80" v-model="editdata.color">
                        <el-option label="原谅绿" value="green"></el-option>
                        <el-option label="火烧红" value="red"></el-option>
                        <el-option label="天空蓝" value="blue"></el-option>
                        <el-option label="肉桂棕" value="brown"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="3">
                      <el-select class="s80" v-model="editdata.style">
                        <el-option label="全幅版三人座" value="1"></el-option>
                        <el-option label="全幅版单人座" value="2"></el-option>
                        <el-option label="全幅版脚墩" value="3"></el-option>
                        <el-option label="精致版三人座" value="4"></el-option>
                        <el-option label="精致版单人座" value="5"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="3">
                      <el-input class="s80" v-model="editdata.f_price" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3">
                      <el-input class="s80" v-model="editdata.l_price" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3">
                      <el-input class="s80" v-model="editdata.num" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="5">
       <!------------------------------------编辑小上传---------------------------------->
                      <el-upload
                        class="upload-demo"
                        action="https://"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button class="one" size="small" type="primary">上传</el-button>
                      </el-upload>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="1">
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editForm = false">取 消</el-button>
              <el-button type="primary" @click="editedit();editForm = false">确 定</el-button>
            </div>

          </el-dialog>

          <!---->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesData"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tableData.length">
      </el-pagination>
    </div>
  </div>
</template>



<script>
  import * as activityjw from '../../../communal/routerApi'

  export default {
    name: "table-j-w",
    data() {
      return {
        /*循环条条使用*/
        dateForm: {
          domains: [{
            value: ''
          }]
        },
        /*-------------*/
        tableData: [],
        currentPageData: [],
        pageSizesData: [3, 4, 5, 6],
        pageSize: 5,
        currentPage: 1,
        sss: 1,
        input2: "",
        lunbo: [],
        lunbo1: [],
        lunbo2: [],
        /*价格上传*/
        fileList: [],
        /*big最大上传89*/
        dialogImageUrl: '',
        dialogVisible: false,
        /*模态框显示隐藏*/
        addFrom: false,
        editForm: false,
        form: {
          cname: '',
          ename: '',
          style: '',
          delivery: false
        },
        editform:{
          style: '沙发',
          weight: '85kg'
        },
        editdata:[],
        options: [{
          value: '选项1',
          label: '沙发'
        }, {
          value: '选项2',
          label: '桌几'
        }, {
          value: '选项3',
          label: '椅凳'
        }, {
          value: '选项4',
          label: '柜架'
        }, {
          value: '选项5',
          label: '灯具'
        }, {
          value: '选项6',
          label: '床·床品'
        }],
        value: '',
        options2: [{
          value2: '选项11',
          label2: '三人沙发'
        }, {
          value2: '选项22',
          label2: '双人沙发'
        },  {
          value2: '选项33',
          label2: '单人沙发'
        }, {
          value2: '选项44',
          label2: '四人沙发'
        }, {
          value2: '选项55',
          label2: '沙发墩'
        }],
        value2: ''
      }
    },
    methods: {
      /*---------添加----------------*/
      addadd(){
        console.log(this.form)
        console.log(this.dateForm.domains);
        // if(this.dateForm.domains.domain.color)
        this.axios.post('/sjw/addadd.do',{
          params:{
            forms:this.form,
            domainss:this.dateForm.domains
          }
        }).then((data)=>{
        /*----未解决-----*/

         })
      },
      /*------确定修改传参-------*/
      editedit(){
       // this.editForm = false
        console.log("queding"+this.editdata.e_name)
        this.axios.get("/sjw/xiugaidata.do",{
          params:{e_name:this.editdata.e_name}
        }).then((data)=>{
          /*----------------------*/
          this.currentPageData = []
          for (var i = (this.sss - 1) * this.pageSize; i < this.sss * this.pageSize && i < this.tableData.length; i++) {
            this.currentPageData.push(this.tableData[i])
          }
          /*----------------------*/
        })
      },
      /*110*/
      removeDomain(item) {
        // console.log(item)
        var index = this.dateForm.domains.indexOf(item)
        // console.log(index)
        if (index !== -1) {
          this.dateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      /*85 86 296 297 大上传自带方法*/
      bigRemove(file, fileList) {
        // console.log(file, fileList);
      },
      bigPictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      editremove222(file, fileList) {
        // console.log(file, fileList);
      },
      editupdatepreview222(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      /*--条数据末尾上传139--*/
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      /*编辑按钮删除按钮分页*/
      handleEdit(index, row) {
        // console.log(row);
        this.editdata=row
      },
      handleDelete(index, row) {
        // console.log(index);
        // console.log(row);
        this.axios.get("/sjw/delete.do", {
          params: {
            good_id: row.good_id,
            style: row.style,
            color: row.color
          }
        })
        for (var i = 0; i < this.tableData.length; i++) {
          if (row.good_id == this.tableData[i].good_id && row.style == this.tableData[i].style && row.color == this.tableData[i].color) {
            this.tableData.splice(i, 1)
          }
        }
        this.currentPageData = []
        for (var i = (this.sss - 1) * this.pageSize; i < this.sss * this.pageSize && i < this.tableData.length; i++) {
          this.currentPageData.push(this.tableData[i])
        }
      },
      handleSizeChange(val) {
        // console.log(val);
        this.pageSize = val;
        this.currentPageData = [];
        for (var i = (this.sss - 1) * this.pageSize; i < this.sss * this.pageSize && i < this.tableData.length; i++) {
          this.currentPageData.push(this.tableData[i])
        }
      },
      handleCurrentChange(val) {
        this.sss = val
        this.currentPageData = []
        for (var i = (this.sss - 1) * this.pageSize; i < this.sss * this.pageSize && i < this.tableData.length; i++) {
          this.currentPageData.push(this.tableData[i])
        }
      },
      /*展开行事件*/
      toggleRowExpansion(row, expanded) {
        // console.log(126461)
        // console.log(row.good_id)
        if (row.good_id == 1) {
          this.lunbo = this.lunbo1
        } else if (row.good_id == 2) {
          this.lunbo = this.lunbo2
        }
      }
    },
    components: {},
    created() {
      this.axios.get('/sjw/getGoodData.do').then((data) => {
        // console.log(data);
        // console.log(data.data);
        this.tableData = data.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].p_src = activityjw.locationjw + this.tableData[i].p_src;
        }
        for (var i = 0; i < this.pageSize; i++) {
          this.currentPageData.push(this.tableData[i])
        }
      })
      this.axios.get('/sjw/getGoodPic.do').then((data) => {
        var aa = data.data
        for (let i = 0; i < aa.length; i++) {
          this.lunbo1[i] = aa[i].pic_src
        }
        for (let i = 0; i < this.lunbo1.length; i++) {
          this.lunbo1[i] = activityjw.locationjw + this.lunbo1[i];
        }
      })
      this.axios.get('/sjw/getGoodPic2.do').then((data) => {
        var bb = data.data
        for (let i = 0; i < bb.length; i++) {
          this.lunbo2[i] = bb[i].pic_src
        }
        for (let i = 0; i < this.lunbo2.length; i++) {
          this.lunbo2[i] = activityjw.locationjw + this.lunbo2[i];
        }
      })
    }
  };
</script>
<!--样式约束-->
<style scoped>
  .demo-table-expand {
    font-size: 0;
    text-align:left;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;

  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    float: left;
  }
  .lunbo{
    height: 200px;
  }
  .pricel{
    color: #f56c6c;
  }
  .mt160{
    margin-top: -160px;
  }
  .mt120{
     margin-top: -120px;
   }
  .mt80{
    margin-top: -80px;
  }
  .mt40{
    margin-top: -40px;
  }

  .picsize{
    text-align: center;
    max-width: 100%;
    max-height: 100%;
  }
/*移入显示框*/
  .el-popover{
    background: #a7a7a7;
    color: white;
    border-radius:10px;
    /*text-align: center;*/
  }
  /*搜索栏*/
  .two{
    border: #f2f2f2 1px solid;
    height: 4em;
    position: relative;
    border-radius: 10px;
  }
  /*搜索框*/
  .search{
    width: 300px;
    position: absolute;
    right: 100px;
    top: 50%;
    margin-top: -20px;
  }
  /*新增*/
  .add{
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -20px;
  }
  /*圆*/
  .cicle{
    border: #464646 solid 1px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    margin-top: -21px;
    left: 10px;
  }
  /*字体sapn*/
  .font{
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 70px;
  }
  .blue{
    color: #409eff;
  }
  .orange{
    color: #ff994e;
  }
  /*右上角*/
  .juzhong{
    position: absolute;
    top:50%;
    margin-top: -20px;
  }
  .good_l{
    right: 108px;
  }
  .good_r{
    right: 10px;
    background-color: #828282;
    border: #828282 solid 1px;
  }
  /*第二栏*/
  .search_l{
    left: 10px;
  }
  .search_r{
    left: 230px;
  }
  /*轮播*/
.el-carousel__indicators{
  display: none;
}
  /*模态框*/
  .gery{
    background-color: #a9b1ba;
    color: white;
    margin-bottom: 20px;
    /*text-align: center;*/
  }
  .pad{
    padding-left: 10px;
  }
  .geryson{
    /*margin-top: 10px;*/
    padding: 10px 0px;
  }
  .s80{
    width: 80%;
  }
  .one{
    height: 28px;
  }
  .el-upload-list__item:first-child{
   margin-top: 0px;
  }
  /*所有输入框  未成功*/
  .s80 input{
    height: 28px;
    line-height: 28px;
  }

  .styleinput{
    width: 169px;
  }



  .el-col-18{
    /*width: 50%;*/
  }
  .el-col-22{
    display: inline-block;
    margin: 20px 5%;
  }
</style>
