<template>
  <el-card>
    <el-table border style="margin: 10px 0px;" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px">
      </el-table-column>
      <el-table-column label="名称" show-overflow-tooltip="true" width="150px" prop="skuName">
      </el-table-column>
      <el-table-column label="描述" show-overflow-tooltip="true" width="150px" prop="skuDesc">
      </el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height: 100px;" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight">
      </el-table-column>
      <el-table-column label="价格" width="150px" prop="price">
      </el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{row,$index}">
          <el-button type="primary" size="small" :icon="row.isSale==1?'Top':'Bottom'" @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>      
    </el-table>
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="true"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change	="getSkuList"
        @size-change ="handler"
      />
  </el-card>
</template>

<script setup lang=ts>
  import { ref,onMounted } from 'vue';
  import {reqSkuList,reqSkuCancelSale,reqSkuSale} from '@/api/product/sku'
  import type {GetSkuListResponseData,SkuData} from '@/api/product/sku/type'
  import { ElMessage } from 'element-plus';


  let currentPage = ref<number>(1);
  let pageSize = ref<number>(10);
  let total = ref<number>(100);
  let skuArr = ref<SkuData[]>([]);

  onMounted(()=>{
    getSkuList()
  })

const getSkuList = async(pager=1)=>{
  currentPage.value = pager;
  let result:GetSkuListResponseData = await reqSkuList(currentPage.value,pageSize.value);
    if(result.code==200){
      total.value=result.data.total;
      skuArr.value = result.data.records;
    }
}

const handler = ()=>{
  getSkuList();
}

const updateSale = async(row:SkuData)=>{
    if(row.isSale==1){
      await reqSkuCancelSale(row.id);
      ElMessage({
        type:'success',
        message:'SKU下架成功'
      })
    }else{
      await reqSkuSale(row.id);
      ElMessage({
        type:'success',
        message:'SKU上架成功'
      })
    }
    getSkuList(currentPage.value);
  }


const updateSku = ()=>{
  ElMessage({
    type:'success',
    message:'功能研发中，敬请期待！'
  }) 
}
</script>

<style scoped>

</style>
