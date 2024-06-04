<template>
  <div>
    <Category :scene="scene" />
  </div>
  <el-card style="margin:10px 0px ;">
    <div v-show="scene==0">
      <el-button type="primary" size="default" icon="Plus"
        :disabled="categoryStore.c3value ? false : true" @click="addAttr">添加平台属性</el-button>
      <el-table style="margin:10px 0px" border :data="attrArr">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column prop="attrName" label="属性名称" width="120px" align="center" />
        <el-table-column label="属性值名称" align="center">
          <template #="{ row, $index }">
            <el-tag v-for="attrvalue in row.attrValueList" :key="attrvalue.id" style="margin:5px">
              {{ attrvalue.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)">修改</el-button>
            <el-popconfirm :title="`您确定删除${row.attrName}吗?`" width="250px" @confirm="removeAttr(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene==1">
      <el-form inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="Plus" :disabled="attrParams.attrName?false:true" @click="addAttrValue">添加属性值</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin:10px 0px" :data="attrParams.attrValueList">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column label="属性值名称" align="center" >
          <template #="{row,$index}">
            <el-input placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.isLook==false" @blur="$event=>toLook(row,$index)" ref="form_name"></el-input>
            <div v-else @click="$event=>toEdit(row)">{{row.valueName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作" align="center">
          <template #="{row,$index}">
            <el-button type="danger" size="small" icon="Delete" @click="attrParams.attrValueList.splice($index,1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length==0">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>

</template>

<script setup lang=ts>
import useCategoryStore from '@/store/modules/category';
import { watch, ref,reactive,nextTick,onBeforeUnmount } from 'vue';
import { reqAttrInfoList,reqSaveOrUpdateAttrInfo,reqDeleteAttr } from '@/api/product/attr'
import type { GetAttrInfoListResponseData, AttrInfo,attrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';

let categoryStore = useCategoryStore();
let attrArr = ref<AttrInfo[]>([]);
let scene = ref(0);
let form_name = ref();



let attrParams = reactive<AttrInfo>({
    id: null,
    attrName: '',
    categoryId: null,
    categoryLevel:3,
    attrValueList: [],
    updateTime: '',
    createTime: '',
})

watch(() => categoryStore.c3value, () => {
  attrArr.value = [];
  if (categoryStore.c3value) {
    getAttr();
  }
})

const getAttr = async () => {
  const { c1value, c2value, c3value } = categoryStore;
  let result: GetAttrInfoListResponseData = await reqAttrInfoList(c1value, c2value, c3value);
  attrArr.value = result.data;
}

const addAttr = ()=>{
  Object.assign(attrParams,{
    id: null,
    attrName: '',
    categoryId: categoryStore.c3value,
    categoryLevel:3,
    attrValueList: [],
    updateTime: '',
    createTime: '',
  });
  scene.value=1;
}

const updateAttr = (row:AttrInfo)=>{
  scene.value=1;
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)));
}

const removeAttr = async(attrId:number)=>{
  let result: any = await reqDeleteAttr(attrId);
  if(result.code==200){
    ElMessage({
        type:'success',
        message: "删除属性值成功"
    });
    getAttr();
  }else{
    ElMessage({
        type:'error',
        message: "删除属性值失败"
    });
  }
}

const cancel = ()=>{
  scene.value=0;
}

const addAttrValue = ()=>{
  attrParams.attrValueList.push({
    valueName:'',
    attrId:null,
    id:null,
    createTime:'',
    updateTime:'',
    isLook:false
  })
  nextTick(()=>{
    form_name.value.focus();
  })
}

const save = async()=>{
  let result = await reqSaveOrUpdateAttrInfo(attrParams);
  if(result.code==200){
    ElMessage({
        type:'success',
        message:attrParams.id? "保存属性值成功":"添加属性值成功"
    });
    scene.value=0;
    getAttr();
  }else{
    ElMessage({
        type:'error',
        message:attrParams.id? "保存属性值失败":"添加属性值失败"
    });
  }

  
}

const toEdit =(row:attrValue)=>{
  row.isLook = false;
  nextTick(()=>{
    form_name.value.focus();
  })
}

const toLook =(row:attrValue,index:number) =>{
  if(row.valueName.trim()===''){
    ElMessage({
        type:'error',
        message:"属性值名称不能为空"
    });
    attrParams.attrValueList.splice(index,1);
    return;
  }

  let repeatItem = attrParams.attrValueList.find((item)=>{
    return item!=row && item.valueName==row.valueName 
  });
  if(repeatItem){
    ElMessage({
        type:'error',
        message:"属性值名称不能重复"
    });
    attrParams.attrValueList.splice(index,1);
    return;
  }

  row.isLook = true;
}

onBeforeUnmount(()=>{
  categoryStore.$reset();
})

</script>

<style scoped></style>
