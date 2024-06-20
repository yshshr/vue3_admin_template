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
            <el-button type="primary" size="small" icon="Plus" title="新增SKU" @click="addSku(row)"></el-button>
            <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="editSpu(row)"></el-button>
            <el-button type="primary" size="small" icon="View" title="查看SKU" @click="findSku(row)"></el-button>
            <el-popconfirm :title="`您确定删除${row.spuName}吗?`" width="250px" @confirm="removeSpu(row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
              </template>
            </el-popconfirm>
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
      <SkuForm @change-scene="changeScene" ref="sku"></SkuForm>
    </div>
    <el-dialog v-model="showSku" title="SKU列表">
      <el-table border :data="skuArr">
        <el-table-column prop="skuName" label="SKU名字">
        </el-table-column>
        <el-table-column prop="price" label="SKU价格">
        </el-table-column>
        <el-table-column prop="weight" label="SKU重量">
        </el-table-column>
        <el-table-column label="SKU图片">
          <template #="{row,$index}">
            <img w-full :src="row.skuDefaultImg" alt="Preview Image" style="width:100px;height:100px;"/>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
  
</template>

<script setup lang=ts>
  import { ref,watch,onBeforeUnmount } from 'vue';
  import useCategoryStore from '@/store/modules/category';

  import type{GetSpuResponseData,SkuData,SpuData} from '@/api/product/spu/type'
  import {reqGetSpu,reqGetSkuList,reqDeleteSpu} from '@/api/product/spu'
  import SpuForm from './SpuForm.vue'
  import SkuForm from './SkuForm.vue'
  import { ElMessage } from 'element-plus';

  let categoryStore = useCategoryStore();

  let scene = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(3);
  let spuRecords = ref<SpuData[]>([]);
  let total = ref(0);
  let spu = ref();
  let sku = ref();
  let skuArr = ref<SkuData[]>([]);
  let showSku = ref(false);



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

  const addSku = (row:SpuData)=>{
    scene.value=2;
    sku.value.initSkuData(categoryStore.c1value,categoryStore.c2value,row);
  }
  
  const findSku = async(row:SpuData)=>{
    let result = await reqGetSkuList(row.id);
    if(result.code==200){
      skuArr.value = result.data;
    }
    showSku.value = true;
  }

  const removeSpu = async(row:SpuData)=>{
    let result = await reqDeleteSpu(row.id);
    if(result.code==200){
      ElMessage({
        type:'success',
        message:'删除SPU成功'
      })
      getSpu(spuRecords.value.length>1?currentPage.value:currentPage.value-1);
    }else{
      ElMessage({
        type:'error',
        message:'删除SPU失败'
      })
    }
  }

  onBeforeUnmount(()=>{
    categoryStore.$reset();
  })

</script>

<style scoped>

</style>
