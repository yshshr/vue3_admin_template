<template>
    <el-card>
      <el-form inline="true" class="user_form">
        <el-form-item label="用户名:">
          <el-input placeholder="请你输入搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px 0px">
      <el-button type="primary">添加用户</el-button>
      <el-button type="primary">批量删除</el-button>
      <el-table style="margin:10px 0px" border :data="userArr">
        <el-table-column type="selection" align="center">
        </el-table-column>
        <el-table-column label="#" type="index" align="center">
        </el-table-column>
        <el-table-column label="ID" align="center" prop="id">
        </el-table-column>
        <el-table-column label="用户名字" align="center" prop="username">
        </el-table-column>
        <el-table-column label="用户名称" align="center" prop="name">
        </el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleName">
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <el-button type="primary" size="small" icon="User">分类角色</el-button>
          <el-button type="primary" size="small" icon="Edit">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
      v-model:current-page="curPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handler"
      @current-change="getUserList"
    />
    </el-card>
</template>

<script setup lang=ts>
import { ref,onMounted } from 'vue';
import {reqGetUserList} from '@/api/acl/user'
import type {UserData,GetUserResponseData} from '@/api/acl/user/type'

let curPage = ref<number>(1);
let pageSize = ref<number>(10);
let total =ref<number>(0);
let userArr = ref<UserData[]>([])

onMounted(()=>{
  getUserList()
})

const getUserList =async(pager=1)=>{
  curPage.value = pager;
  let result:GetUserResponseData = await reqGetUserList(curPage.value,pageSize.value);
  if(result.code==200){
    userArr.value = result.data.records;
    total.value = result.data.total;
  }
}

const handler = ()=>{
  getUserList();
}

</script>

<style scoped>
.user_form{
  display: flex;
  justify-content: space-between;
}
</style>