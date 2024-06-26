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
      <el-button type="primary" @click="addUser">添加用户</el-button>
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
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="User">分类角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete">删除</el-button>
          </template>
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
    <el-drawer v-model="drawer">
    <template #header>
      <h4>添加用户</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户名字">
          <el-input placeholder="请输入用户名字"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input placeholder="请输入用密码"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button >取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang=ts>
import { ref,onMounted } from 'vue';
import {reqGetUserList} from '@/api/acl/user'
import type {UserData,GetUserResponseData} from '@/api/acl/user/type'

let curPage = ref<number>(1);
let pageSize = ref<number>(10);
let total =ref<number>(0);
let userArr = ref<UserData[]>([])
let drawer = ref<boolean>(false);


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

const addUser = ()=>{
  drawer.value = true;
}

const editUser = (row: UserData)=>{
  drawer.value = true;
}

</script>

<style scoped>
.user_form{
  display: flex;
  justify-content: space-between;
}
</style>