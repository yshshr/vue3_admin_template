<template>
  <div> 
    <Category :scene="scene"></Category>
  </div> 
  
  <el-card style="margin:10px 0px;">
    <div v-show="scene==0">
      <el-button type="primary" icon="Plus" :disabled="categoryStore.c3value?false:true" @click="addSpu">添加SPU</el-button>
      <el-table style="margin:10px 0px;" border :data="spuRecords" show-overflow-tooltip="true">
        <el-table-column label="序号" width="80px" type="index"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName" ></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="SPU操作">
          <template  #="{row,$index}">
            <el-button type="primary" size="small" icon="Plus" title="新增SKU"></el-button>
            <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="editSpu(row)"></el-button>
            <el-button type="primary" size="small" icon="View" title="查看SPU"></el-button>
            <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change	="getSpu"
        @size-change ="sizeChange"
      />
    </div>
    <div v-show="scene==1">
      <SpuForm @change-scene="changeScene" ref="spu"></SpuForm>
    </div>
    <div v-show="scene==2">
      <SkuForm></SkuForm>
    </div>
  </el-card>
  
</template>

<script setup lang=ts>
  import { ref,watch } from 'vue';
  import useCategoryStore from '@/store/modules/category';

  import type{GetSpuResponseData,SpuData} from '@/api/product/spu/type'
  import {reqGetSpu} from '@/api/product/spu'
  import SpuForm from './SpuForm.vue'
  import SkuForm from './SkuForm.vue'

  let categoryStore = useCategoryStore();

  let scene = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(3);
  let spuRecords = ref<SpuData[]>([]);
  let total = ref(0);
  let spu = ref();


  watch(()=>categoryStore.c3value,()=>{
    if(categoryStore.c3value){
      getSpu();
    }
  })

  const getSpu= async(pager=1)=>{
    currentPage.value = pager;
    let result:GetSpuResponseData = await reqGetSpu(currentPage.value,pageSize.value,categoryStore.c3value);
    if(result.code==200){
      spuRecords.value = result.data.records;
      total.value = result.data.total;
    }
  }

  const sizeChange=()=>{
    getSpu();
  }

  const addSpu=()=>{
    scene.value=1;
    spu.value.initAddSpu(categoryStore.c3value);
  }

  const editSpu=(row:SpuData)=>{
    scene.value=1;
    spu.value.initGetSpuDta(row);
  }
  
  const changeScene=(obj:any)=>{
    scene.value = obj.num;
    if(obj.page=='first'){
      getSpu();
    }else{
      getSpu(currentPage.value);
    }
    
  }
  
</script>

<style scoped>

</style>
