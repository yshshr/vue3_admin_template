<template>
  <el-table border :data="permissionArr" row-key="id">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{row,index}">
        <el-button type="primary" size="small" :disabled="row.level==4?true:false">添加菜单</el-button>
        <el-button type="primary" size="small" :disabled="row.level==1?true:false">编辑</el-button>
        <el-button type="primary" size="small" :disabled="row.level==1?true:false">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang=ts>
import { ref,onMounted } from 'vue';
import type{PermissionData} from '@/api/acl/menu/type'
import {reqGetAllPermission} from '@/api/acl/menu'

let permissionArr = ref<PermissionData[]>([]);

onMounted(()=>{
  getAllPermission();
})


const getAllPermission=async()=>{
  let result = await reqGetAllPermission();
  if(result.code==200){
    permissionArr.value = result.data;
  }
}


</script>

<style scoped>

</style>