<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
    </el-form-item>  
    <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
        <el-input placeholder="重量(克)" type="number"></el-input>
    </el-form-item> 
    <el-form-item label="SKU描述">
        <el-input placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>  
    <el-form-item label="平台属性">
        <el-form inline="true">
          <el-form-item style="width:200px" v-for="(item,index) in attrArr" :key="item.id" :label="item.attrName">
            <el-select placeholder="请选择">
              <el-option v-for="(attrValue,index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
    </el-form-item>  
    <el-form-item label="销售属性">
        <el-form inline="true">
          <el-form-item style="width:200px" v-for="(item,index) in saleAttrArr" :key="item.id" :label="item.saleAttrName">
            <el-select placeholder="请选择">
              <el-option v-for="(saleAttrValue,index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
    </el-form-item>  
    <el-form-item label="图片名称">
      <el-table border :data="imageArr">
        <el-table-column type="selection" width="80px">
        </el-table-column>
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName">
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" >保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang=ts>
  import {reqAttrInfoList} from '@/api/product/attr'
  import {reqGetSpuSaleAttrList,reqGetSpuImageList} from '@/api/product/spu'

  import type {SpuData} from '@/api/product/spu/type'
  import { ref } from 'vue';

  let $emit = defineEmits(['changeScene'])

  let attrArr = ref<any>([]);
  let saleAttrArr = ref<any>([]);
  let imageArr = ref<any>([]);


  const cancel =()=>{
      $emit('changeScene',{num:0,page:"current"});
  }

  const initSkuData =async(c1value:number,c2value:number,row:SpuData)=>{
    let result: any = await reqAttrInfoList(c1value,c2value,row.category3Id);
    let result1: any = await reqGetSpuSaleAttrList(row.id);
    let result2: any = await reqGetSpuImageList(row.id);
    attrArr.value = result.data;
    saleAttrArr.value = result1.data;
    imageArr.value = result2.data;
  }

  defineExpose({initSkuData})

</script>

<style scoped>

</style>