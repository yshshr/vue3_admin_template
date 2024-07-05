<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请您输入职位搜索关键字" v-model="searchRoleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="searchRoleName?false:true">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card> 

  <el-card style="margin:10px 0px">
    <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table style="margin:10px 0px" border :data="roleArr">
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="User">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getRole"
    />
  </el-card> 
  <el-dialog v-model="dialogFormVisible" :title="roleParams.id? '修改':'添加'" width="800px"  @close="closeDialog">
    <el-form :model="roleParams" :rules="rules" ref="roleRef">
      <el-form-item label="角色名称" prop="roleName">
        <el-input placeholder="请填写角色名称" v-model="roleParams.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang=ts>
import { ref,onMounted, reactive } from 'vue';
import {reqGetRole,reqSaveOrUpdateRole} from '@/api/acl/role'
import type{RoleData} from '@/api/acl/role/type'
import useLayOutSettingStore from '@/store/modules/setting';
import{ ElMessage,FormRules } from 'element-plus';

let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let searchRoleName = ref<string>('');
let roleArr = ref<RoleData[]>([]);
let layOutSettingStore = useLayOutSettingStore();
let dialogFormVisible = ref<boolean>(false);
let roleParams = reactive<RoleData>({  
    roleName:''
});
let roleRef = ref<any>();

onMounted(()=>{
  getRole();
})

const getRole =async(pager=1)=>{
  currentPage.value=pager;
  let result = await reqGetRole(currentPage.value,pageSize.value,searchRoleName.value);
  if(result.code==200){
    total.value = result.data.total;
    roleArr.value = result.data.records;
  }
}

const handleSizeChange = ()=>{
  getRole();
}

const search = ()=>{
  getRole();
  searchRoleName.value='';
}

const reset =()=>{
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
}

const addRole =()=>{
  Object.assign(roleParams,{  
    roleName:'',
    id:0
  })
  dialogFormVisible.value = true;
}

const updateRole=(row:RoleData)=>{
  Object.assign(roleParams,row);
  dialogFormVisible.value = true;
}

const validateRoleName =(rule: any, value: any, callback: any)=>{
  if(value.length<2){
    callback(new Error('角色名称至少2位'))
  }else{
    callback();
  }
}

const rules = reactive<FormRules<RoleData>>({
  roleName: [
    { required: true,trigger: 'blur',validator: validateRoleName }
  ]
}); 

const confirmRole = async()=>{
  await roleRef.value.validate();
  let result = await reqSaveOrUpdateRole(roleParams);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:roleParams.id?'更新角色成功':'保存角色成功'
    })
    dialogFormVisible.value=false;
    if(roleParams.id){
      getRole(currentPage.value);
    }else{
      getRole();
    }
  }
}

const closeDialog = ()=>{
  roleRef.value.resetFields();
}
</script>

<style scoped>
.form{
  display: flex;
  justify-content: space-between;
}
</style>