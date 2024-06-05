<template>
  <div> 
    <Category :scene="scene"></Category>
  </div> 
  <el-card style="margin:10px 0px;">
    <el-button type="primary" icon="Plus">添加SPU</el-button>
    <el-table style="margin:10px 0px;" border :data="spuRecords">
      <el-table-column label="序号" width="80px" type="index"></el-table-column>
      <el-table-column label="SPU名称" prop="spuName"></el-table-column>
      <el-table-column label="SPU描述" prop="description"></el-table-column>
      <el-table-column label="SPU操作"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="400"
    />
  </el-card>
</template>

<script setup lang=ts>
  import { ref,watch } from 'vue';
  import useCategoryStore from '@/store/modules/category';

  import type{GetSpuResponseData,SpuData} from '@/api/product/spu/type'
  import {reqGetSpu} from '@/api/product/spu'


  let categoryStore = useCategoryStore();

  let scene = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(3);
  let spuRecords = ref<SpuData[]>([]);


  watch(()=>categoryStore.c3value,()=>{
    if(categoryStore.c3value){
      getSpu();
    }
  })

  const getSpu= async()=>{
    let result:GetSpuResponseData = await reqGetSpu(currentPage.value,pageSize.value,categoryStore.c3value);
    if(result.code==200){
      spuRecords.value = result.data.records;
    }
  }

</script>

<style scoped>

</style>
