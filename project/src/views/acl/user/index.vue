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
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
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
    <el-drawer v-model="drawer" @close="closeDrawer">
    <template #header>
      <h4>{{userParams.id?'修改用户':'添加用户'}}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item prop="username" label="用户名字">
          <el-input placeholder="请输入用户名字" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item  prop="name"label="用户名称">
          <el-input placeholder="请输入用户名称" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="用户密码" v-if="!userParams.id">
          <el-input placeholder="请输入用密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveUser">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="roleDrawer">
    <template #header>
      <h4>分配角色(职位)</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedRolesChange">
              <el-checkbox v-for="(role,index) in allRole" :key="role" :label="role" :value="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
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
import { ref,onMounted, reactive } from 'vue';
import {reqGetUserList,reqAddOrUpdateUser,reqGetAllUserRole} from '@/api/acl/user'
import type {UserData,GetUserResponseData,GetUserRoleResponseData,UserRoleData} from '@/api/acl/user/type'
import { ElMessage,FormRules } from 'element-plus';

let curPage = ref<number>(1);
let pageSize = ref<number>(10);
let total =ref<number>(0);
let userArr = ref<UserData[]>([])
let drawer = ref<boolean>(false);
let userParams = reactive<UserData>({
  username : '',
  password : '',
  name : '',
});
let formRef = ref<any>();
let roleDrawer = ref<boolean>(false);
let allRole = ref<UserRoleData[]>([]);
let checkAll = ref<boolean>(false);
let isIndeterminate = ref<boolean>(false);
let checkedRoles = ref<UserRoleData[]>([]);
let userRole = ref<UserRoleData[]>([]);
  

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
  Object.assign(userParams,{
    id:null,
    username : '',
    password : '',
    name : '',
  });
}

const editUser = (row: UserData)=>{
  Object.assign(userParams,row);
  drawer.value = true;
}

const saveUser =async()=>{
  await formRef.value.validate();
  let result = await reqAddOrUpdateUser(userParams);
  if(result.code==200){
    drawer.value = false;
    ElMessage({
      type:'success',
      message : userParams.id? '更新用户成功' : '添加用户成功'
    })
    getUserList(userParams.id?curPage.value:1);
    window.location.reload();
  }else{
    drawer.value = false;
    ElMessage({
      type:'error',
      message : userParams.id? '更新用户失败' : '添加用户失败'
    })
  }
}

const cancel = ()=>{
  drawer.value = false;
}

const validateUsername = (_rule:any,value:any,callback:any)=>{
  if(value.length>=3){
    callback();
  }else{
    callback(new Error('用户名字至少3位!'));
  }
}

const validateName = (_rule:any,value:any,callback:any)=>{
  if(value.length>=3){
    callback();
  }else{
    callback(new Error('用户名称至少3位!'));
  }
}

const validatePassword = (_rule:any,value:any,callback:any)=>{
  if(value.length>=6){
    callback();
  }else{
    callback(new Error('用户密码至少6位!'));
  }
}

const rules = reactive<FormRules<UserData>>({
  username:[
    {required:true,validator:validateUsername,trigger:'blur'}
  ],
  name:[
    {required:true,validator:validateName,trigger:'blur'}
  ],
  password:[
    {required:true,validator:validatePassword,trigger:'blur'}
  ]
})

const closeDrawer =()=>{
  formRef.value.resetFields();
}

const setRole = async(row:UserData)=>{
  Object.assign(userParams,row);
  let result:GetUserRoleResponseData = await reqGetAllUserRole(row.id as number);
  if(result.code==200){
    roleDrawer.value = true;
    userRole.value = result.data.assignRoles;
    allRole.value = result.data.allRolesList;
    checkedRoles.value =  result.data.assignRoles;
    let checkedCount = checkedRoles.value.length;
    checkAll.value = allRole.value.length === checkedCount;
    isIndeterminate.value = checkedCount>0 && checkedCount <allRole.value.length;
  }
}

const handleCheckAllChange =(val: boolean)=>{
  checkedRoles.value = val? allRole.value : [];
  isIndeterminate.value = false;
}

const handleCheckedRolesChange =(value: UserRoleData[])=>{
  let checkedCount = value.length;
  checkAll.value = allRole.value.length === checkedCount;
  isIndeterminate.value = checkedCount>0 && checkedCount <allRole.value.length;
}

</script>

<style scoped>
.user_form{
  display: flex;
  justify-content: space-between;
}
</style>