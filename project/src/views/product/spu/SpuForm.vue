<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>  
        <el-form-item label="SPU品牌">
            <el-select v-model="spuParams.tmId">
                <el-option v-for="tradeMark in allTradeMark" :key="tradeMark.id" :label="tradeMark.tmName" :value="tradeMark.id"></el-option>
            </el-select>
        </el-form-item>  
        <el-form-item label="SPU描述">
            <el-input type="textarea" v-model="spuParams.description"></el-input>
        </el-form-item>      
        <el-form-item label="SPU图标">
            <el-upload
                v-model:file-list="fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>         
        <el-form-item label="SPU销售属性">
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="oppo"></el-option>
                <el-option label="vivo"></el-option>
            </el-select>
            <el-button type="primary" style="margin-top:10px">添加属性值</el-button>
            <el-table style="margin:10px 0px" border>
                <el-table-column label="序号" type="index" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" ></el-table-column>
                <el-table-column label="销售属性值" ></el-table-column>
                <el-table-column label="操作" ></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" >保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>           
    </el-form> 
</template>

<script setup lang=ts>
import type {AllTradeMarkData,SpuImageData,SpuSaleAttrData,AllSaleAttrData,SpuData} from '@/api/product/spu/type'
import {reqGetAllTradeMark,reqGetSpuImageList,reqGetSpuSaleAttrList,reqGetAllSaleAttrList} from '@/api/product/spu'
import { ref } from 'vue';

let $emit = defineEmits(['changeScene'])
let allTradeMark = ref<AllTradeMarkData[]>([]);
let spuImageArr = ref<SpuImageData[]>([]);
let spuSaleAttrArr = ref<SpuSaleAttrData[]>([]);
let allSaleAttrArr = ref<AllSaleAttrData[]>([]);

let spuParams = ref<SpuData>({
    spuName: '',
    description: '',
    category3Id: null,
    tmId: null,
    spuSaleAttrList: [],
    spuImageList: [],
    spuPosterList: null
});

const cancel =()=>{
    $emit('changeScene',0);
}

const initGetSpuDta= async(row:SpuData)=>{
    spuParams.value = row;
    let result = await reqGetAllTradeMark();
    let result1 = await reqGetSpuImageList(row.id);
    let result2 = await reqGetSpuSaleAttrList(row.id);
    let result3 = await reqGetAllSaleAttrList();
    allTradeMark.value = result.data;
    spuImageArr.value = result1.data;
    spuSaleAttrArr.value = result2.data;
    allSaleAttrArr.value = result3.data;
}

defineExpose({initGetSpuDta})

</script>

<style scoped>

</style>