<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请您输入职位搜索关键字" v-model="searchRoleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="searchRoleName ? false : true">搜索</el-button>
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
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User" @click="setPermission(row)">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-popconfirm :title="`您确定删除${row.roleName}吗?`" @confirm="deleteRole(row)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
      @size-change="handleSizeChange" @current-change="getRole" />
  </el-card>
  <el-dialog v-model="dialogFormVisible" :title="roleParams.id ? '修改' : '添加'" width="800px" @close="closeDialog">
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
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree style="max-width: 600px" :data="data" show-checkbox node-key="id" :default-expanded-keys="[1, 7]"
        :default-checked-keys="checkedRoleMenu" :props="defaultProps" ref="treeRef" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="confirmRoleMenu">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang=ts>
import { ref, onMounted, reactive } from 'vue';
import { reqGetRole, reqSaveOrUpdateRole, reqGetRoleMenu, reqSetRoleMenu, reqRemoveRole } from '@/api/acl/role'
import type { RoleData, RoleMenuData } from '@/api/acl/role/type'
import useLayOutSettingStore from '@/store/modules/setting';
import { ElMessage, FormRules } from 'element-plus';

let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let searchRoleName = ref<string>('');
let roleArr = ref<RoleData[]>([]);
let layOutSettingStore = useLayOutSettingStore();
let dialogFormVisible = ref<boolean>(false);
let roleParams = reactive<RoleData>({
  roleName: ''
});
let roleRef = ref<any>();
let drawer = ref<boolean>(false);
let checkedRoleMenu = ref<number[]>([]);
let treeRef = ref<any>();

const defaultProps = {
  children: 'children',
  label: 'name',
}
const data = ref<RoleMenuData[]>([]);

onMounted(() => {
  getRole();
})

const getRole = async (pager = 1) => {
  currentPage.value = pager;
  let result = await reqGetRole(currentPage.value, pageSize.value, searchRoleName.value);
  if (result.code == 200) {
    total.value = result.data.total;
    roleArr.value = result.data.records;
  }
}

const handleSizeChange = () => {
  getRole();
}

const search = () => {
  getRole();
  searchRoleName.value = '';
}

const reset = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
}

const addRole = () => {
  Object.assign(roleParams, {
    roleName: '',
    id: 0
  })
  dialogFormVisible.value = true;
}

const updateRole = (row: RoleData) => {
  Object.assign(roleParams, row);
  dialogFormVisible.value = true;
}

const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value.length < 2) {
    callback(new Error('角色名称至少2位'))
  } else {
    callback();
  }
}

const rules = reactive<FormRules<RoleData>>({
  roleName: [
    { required: true, trigger: 'blur', validator: validateRoleName }
  ]
});

const confirmRole = async () => {
  await roleRef.value.validate();
  let result = await reqSaveOrUpdateRole(roleParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新角色成功' : '保存角色成功'
    })
    dialogFormVisible.value = false;
    if (roleParams.id) {
      getRole(currentPage.value);
    } else {
      getRole();
    }
  }
}

const closeDialog = () => {
  roleRef.value.resetFields();
}

const setPermission = async (row: RoleData) => {
  checkedRoleMenu.value = [];
  Object.assign(roleParams, row);
  drawer.value = true;
  let result = await reqGetRoleMenu(roleParams.id as number);
  if (result.code == 200) {
    data.value = result.data;
    let initialArr = filterSelectedPermission(result.data, []);
    checkedRoleMenu.value = initialArr;
  }
}

const filterSelectedPermission = (roleMenuArr: RoleMenuData[], initialArr: number[]) => {
  roleMenuArr.forEach((item) => {
    if (item.children && item.children.length > 0) {
      initialArr = filterSelectedPermission(item.children, initialArr);
    } else {
      if (item.select) {
        initialArr.push(item.id);
      }
    }
  })
  return initialArr;
}

const confirmRoleMenu = async () => {
  let checkedKeys = treeRef.value.getCheckedKeys();
  let halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
  let permissionIdList = checkedKeys.concat(halfCheckedKeys);

  let reqSetRoleMenuBody = {
    roleId: roleParams.id as number,
    permissionIdList: permissionIdList
  }
  let result = await reqSetRoleMenu(reqSetRoleMenuBody);
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '分配权限成功' })
    drawer.value = true;
    window.location.reload();
  }
}

const deleteRole = async (row: RoleData) => {
  let result = await reqRemoveRole(row.id as number);
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除角色成功' });
    getRole(roleArr.value.length > 1 ? currentPage.value : currentPage.value - 1);
  }
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
}
</style>