<template>
    <el-card style="width: 100%">
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
      <el-table :data="tabledata" style="margin:10px 0px" border>
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column prop="tmName" label="品牌名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品牌LOGO" width="180" >
          <template #="{ row , $index}">
            <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;" />
          </template>
        </el-table-column>
        <el-table-column prop="op" label="品牌操作" width="180">
          <template #="{ row , $index}">
            <el-button type="primary" size="small" icon="Edit" >修改</el-button>
            <el-button type="danger" size="small" icon="Delete" >删除</el-button>

          </template>
        </el-table-column>
      </el-table>    
      <el-pagination
      @current-change	="getTradeMark"
      @size-change ="sizeChange"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[4, 8, 16, 32]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
    </el-card>
</template>

<script setup lang=ts>
import { ref ,onMounted} from 'vue';
import {reqGetTradeMark} from '@/api/product/trademark'
import type {record,GetTradeMarkResponseData} from '@/api/product/trademark/type.ts'


const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const tabledata = ref<record[]>()


const getTradeMark = async(pager=1)=> {
  console.log(pager)
  pageNo.value = pager;
  let result:GetTradeMarkResponseData = await reqGetTradeMark(pageNo.value,limit.value);
  if(result.code==200){
    total.value = result.data.total;
    tabledata.value = result.data.records;
  }
}

onMounted(()=>{
  getTradeMark();
})

const sizeChange=()=>{
  getTradeMark();
}

</script>

<style scoped>

</style>
