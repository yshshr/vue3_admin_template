<template>
  <el-table border :data="permissionArr" row-key="id">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{row,index}">
        <el-button type="primary" size="small" :disabled="row.level==4?true:false" @click="add(row)">添加菜单</el-button>
        <el-button type="primary" size="small" :disabled="row.level==1?true:false" @click="edit(row)">编辑</el-button>
        <el-popconfirm :title="`确定要删除${row.name}吗?`" @confirm="deletePermission(row)">
          <template #reference>
            <el-button type="primary" size="small" :disabled="row.level==1?true:false">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog  v-model="dialogFormVisible" :title="permissionParams.id?'修改菜单':'添加菜单'" @close="closeDialog">
    <el-form >
      <el-form-item label="名称">
        <el-input placeholder="请您输入菜单名称" v-model="permissionParams.name">
        </el-input>
      </el-form-item >
      <el-form-item label="权限" >
        <el-input placeholder="请您输入权限值" v-model="permissionParams.code">
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="savePermission">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog >
</template>

<script setup lang=ts>
import { ref,onMounted, reactive } from 'vue';
import type{PermissionData,SavePermissionBody} from '@/api/acl/menu/type'
import {reqGetAllPermission,reqSaveOrUpdatePermission,reqRemovePermission} from '@/api/acl/menu'
import { ElMessage } from 'element-plus';

let permissionArr = ref<PermissionData[]>([]);

let dialogFormVisible = ref<boolean>(false);

let permissionParams = reactive<SavePermissionBody>({
    pid: 0,
    name: '',
    code: '',
    level: 0
});



onMounted(()=>{
  getAllPermission();
})


const getAllPermission=async()=>{
  let result = await reqGetAllPermission();
  if(result.code==200){
    permissionArr.value = result.data;
  }
}

const add = (row:PermissionData)=>{
  dialogFormVisible.value=true;
  permissionParams.pid=row.id;
  permissionParams.level=row.level+1;
}

const edit = (row:PermissionData)=>{
  dialogFormVisible.value=true;
  Object.assign(permissionParams,row);
}

const savePermission = async()=>{
  let result = await reqSaveOrUpdatePermission(permissionParams);
  if(result.code==200){
    ElMessage({type:'success',message:permissionParams.id?'修改菜单成功':'新增菜单成功'});
    dialogFormVisible.value=false;
    getAllPermission();
  }
}

const closeDialog = () => {
  Object.assign(permissionParams,{
    id:null,
    pid: 0,
    name: '',
    code: '',
    level: 0
  });
}

const deletePermission=async(row:PermissionData)=>{
  let result = await reqRemovePermission(row.id);
  if(result.code==200){
    ElMessage({type:'success',message:'删除菜单成功'});
    getAllPermission();
  }
}

</script>

<style scoped>

</style>