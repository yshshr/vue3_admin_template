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
          <el-form-item label="内存" style="width:200px">
            <el-select placeholder="请选择">
            </el-select>
          </el-form-item>
          <el-form-item label="内存" style="width:200px">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="内存" style="width:200px">
            <el-select></el-select>
          </el-form-item>
        </el-form>
    </el-form-item>  
    <el-form-item label="销售属性">
        <el-form inline="true">
          <el-form-item label="内存" style="width:200px">
            <el-select placeholder="请选择">
            </el-select>
          </el-form-item>
          <el-form-item label="内存" style="width:200px">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="内存" style="width:200px">
            <el-select></el-select>
          </el-form-item>
        </el-form>
    </el-form-item>  
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" width="80px">
        </el-table-column>
        <el-table-column label="图片">
        </el-table-column>
        <el-table-column label="名称">
        </el-table-column>
        <el-table-column label="操作">
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
  import type {SpuData} from '@/api/product/spu/type'
  import type {GetAttrInfoListResponseData} from '@/api/product/attr/type'

  let $emit = defineEmits(['changeScene'])

  const cancel =()=>{
      $emit('changeScene',{num:0,page:"current"});
  }

  const initSkuData =async(c1value:number,c2value:number,row:SpuData)=>{
    let result: GetAttrInfoListResponseData = await reqAttrInfoList(c1value,c2value,row.category3Id);
    console.log(result);

  }

  defineExpose({initSkuData})

</script>

<style scoped>

</style>