<template>
    <el-card style="width: 100%">
      <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">添加品牌</el-button>
      <el-table :data="tabledata" style="margin:10px 0px" border>
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column prop="tmName" label="品牌名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品牌LOGO" width="180" >
          <template #="{ row , $index}">
            <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;" />
          </template>
        </el-table-column>
        <el-table-column prop="op" label="品牌操作" width="180">
          <template #="{ row , $index}">
            <el-button type="primary" size="small" icon="Edit" @click="editTradeMark(row)">修改</el-button>
            <el-popconfirm :title="`您确定删除${row.tmName}吗?`" width="250px" @confirm="deleteTrademark(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>    
      <el-pagination
      @current-change	="getTradeMark"
      @size-change ="sizeChange"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[4, 8, 16, 32]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="dialogFormParams.id?'修改品牌':'添加品牌'" width="500">
        <el-form style="width:80%" :model="dialogFormParams" :rules="rules" ref="formRef">
        <el-form-item prop="tmName" label="品牌名称" label-width="100px">
          <el-input v-model="dialogFormParams.tmName" placeholder="请输入品牌名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="dialogFormParams.logoUrl" :src="dialogFormParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
</template>

<script setup lang=ts>
import { ref ,onMounted,reactive, nextTick} from 'vue';
import {reqGetTradeMark,reqAddOrUpdateTradeMark,reqDeleteTradeMark} from '@/api/product/trademark'
import type {record,GetTradeMarkResponseData} from '@/api/product/trademark/type.ts'
import { UploadProps,ElMessage,FormRules,FormInstance} from 'element-plus'

let formRef=ref<FormInstance>();


const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const tabledata = ref<record[]>([])
const dialogFormVisible = ref<boolean>(false)
const dialogFormParams = reactive<record>(
  {
  tmName:'',
  logoUrl:'',
  id:0,
  createTime: '',
  updateTime: ''
})

const getTradeMark = async(pager=1)=> {
  pageNo.value = pager;
  let result:GetTradeMarkResponseData = await reqGetTradeMark(pageNo.value,limit.value);
  if(result.code==200){
    total.value = result.data.total;
    tabledata.value = result.data.records;
  }
}

onMounted(()=>{
  getTradeMark();
})

const sizeChange=()=>{
  getTradeMark();
}

const addTradeMark=()=>{
  dialogFormParams.id=null;
  dialogFormParams.tmName='';
  dialogFormParams.logoUrl='';
  dialogFormVisible.value=true;
  nextTick(()=>{
    formRef.value?.clearValidate("tmName");
    formRef.value?.clearValidate("logoUrl");
  })
}

const editTradeMark=(row:record)=>{
  dialogFormVisible.value=true;
  Object.assign(dialogFormParams,row);
  nextTick(()=>{
    formRef.value?.clearValidate("tmName");
    formRef.value?.clearValidate("logoUrl");
    formRef.value?.clearValidate("logoUrl");
  })
}

const deleteTrademark= async(id:number)=>{
  let result : any = await reqDeleteTradeMark(id);
  if(result.code==200){
    ElMessage({
        type:'success',
        message:"删除品牌成功"
    });
    getTradeMark(tabledata.value.length>1?pageNo.value:pageNo.value-1);
  }else{
    ElMessage({
        type:'error',
        message:"删除品牌失败"
    });
  }

}

const cancel=()=>{
  dialogFormVisible.value=false;
}

const confirm = async ()=>{
  await formRef.value?.validate();
  let result : any = await reqAddOrUpdateTradeMark(dialogFormParams);
  if(result.code==200){
    dialogFormVisible.value=false;
    ElMessage({
        type:'success',
        message:dialogFormParams.id?"修改品牌成功":"添加品牌成功"
    });
    getTradeMark(dialogFormParams.id?pageNo.value:1);
  }else{
    ElMessage({
        type:'error',
        message:dialogFormParams.id?"修改品牌失败":"添加品牌失败"
    });
    dialogFormVisible.value=false;
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage({
        type:'error',
        message:"图片大小不能超过2M"
      });
      return false;
    }
    
  } else{
    ElMessage({
        type:'error',
        message:"文件格式必须是JPG、PNG、GIF"
    });
    return false;
  }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  dialogFormParams.logoUrl = response.data;
  formRef.value?.clearValidate("logoUrl");
}

const validateTmName = (_rule:any,value:any,callback:any)=>{
  console.log("value:"+value,_rule)
  if(value.length >= 2){
    callback();
  }else{
    callback(new Error('tmName至少2位'));
  }
}

const validatelogoUrl = (_rule:any,value:any,callback:any)=>{
  console.log("value:"+value,_rule)
  if(value){
    callback();
  }else{
    callback(new Error('必须上传图片'));
  }
}


let rules = reactive<FormRules<record>>({
  tmName:[
    // {required:true,min:5,max:10,message:'username should be 5 to 10',trigger:'blur'}
    {required:true,validator:validateTmName,trigger:'blur'}
  ],
  logoUrl:[
    // {required:true,min:5,max:10,message:'username should be 5 to 10',trigger:'blur'}
    {required:true,validator:validatelogoUrl}
  ]
});


</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
