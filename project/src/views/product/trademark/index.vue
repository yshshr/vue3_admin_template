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
            <el-button type="primary" size="small" icon="Edit" @click="editTradeMark">修改</el-button>
            <el-button type="danger" size="small" icon="Delete" >删除</el-button>

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
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="500">
      <el-form style="width:80%" >
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="dialogFormParams.tmName" placeholder="请输入品牌名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
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
import { ref ,onMounted,reactive} from 'vue';
import {reqGetTradeMark,reqAddOrUpdateTradeMark} from '@/api/product/trademark'
import type {record,GetTradeMarkResponseData} from '@/api/product/trademark/type.ts'
import { UploadProps,ElMessage } from 'element-plus'


const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const tabledata = ref<record[]>()
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
  console.log(pager)
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
  dialogFormParams.tmName='';
  dialogFormParams.logoUrl='';
  dialogFormVisible.value=true;
}

const editTradeMark=()=>{
  dialogFormVisible.value=true;
}

const cancel=()=>{
  dialogFormVisible.value=false;
}

const confirm = async ()=>{
  let result : any = await reqAddOrUpdateTradeMark(dialogFormParams);
  console.log(result);
  if(result.code==200){
    dialogFormVisible.value=false;
    ElMessage({
        type:'success',
        message:"添加品牌成功"
    });
    getTradeMark();
  }else{
    ElMessage({
        type:'error',
        message:"添加品牌失败"
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
    }
    
  } else{
    ElMessage({
        type:'error',
        message:"文件格式必须是JPG、PNG、GIF"
    });
  }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  dialogFormParams.logoUrl = response.data;
}

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
