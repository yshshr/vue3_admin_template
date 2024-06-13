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
                v-model:file-list="imageFileList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload = "beforeImageUpload"	
            >
                <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;"/>
            </el-dialog>
        </el-form-item>         
        <el-form-item label="SPU销售属性">
            <el-select v-model="selectedSaleAttr" style="width:200px" :placeholder="unSelectSaleAttrArr.length > 0 ? `还未选择${unSelectSaleAttrArr.length}个`:'请选择'">
                <el-option v-for="item in unSelectSaleAttrArr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button type="primary" style="margin:0px 10px" :disabled="selectedSaleAttr?false:true" @click="addSaleAttr">添加属性值</el-button>
            <el-table style="margin:10px 0px" border :data="spuSaleAttrArr">
                <el-table-column label="序号" type="index" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值" >
                    <template #="{ row, $index }">
                        <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.id" style="margin:5px">
                        {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-button type="primary" size="small" icon="Plus" >新增</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Delete" onclick="spuSaleAttrArr.splice($index,1)"></el-button>
                    </template>
                </el-table-column>
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
import { ref,computed } from 'vue';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene'])
let allTradeMark = ref<AllTradeMarkData[]>([]);
let spuImageArr = ref<SpuImageData[]>([]);
let spuSaleAttrArr = ref<SpuSaleAttrData[]>([]);
let allSaleAttrArr = ref<AllSaleAttrData[]>([]);
let imageFileList = ref<SpuImageData>([]);
let dialogVisible = ref<boolean>(false);
let dialogImageUrl = ref('')
let selectedSaleAttr = ref('')

let unSelectSaleAttrArr = computed(() => {
  return allSaleAttrArr.value.filter((item)=>{
    return spuSaleAttrArr.value.every((spuSaleAttrItem)=>{
        return spuSaleAttrItem.saleAttrName != item.name;
    })
  })
})


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
    imageFileList.value = result1.data.map((item)=>{
        return {
            name:item.imgName,
            url:item.imgUrl
        }
    });
    spuSaleAttrArr.value = result2.data;
    allSaleAttrArr.value = result3.data;
}

const handlePictureCardPreview = (file:any)=>{
    dialogVisible.value = true;
    dialogImageUrl.value = file.url;
}

const handleRemove = ()=>{
    
}

const beforeImageUpload = (rawFile:any)=>{
    if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
        if (rawFile.size / 1024 / 1024 > 3) {
            ElMessage({
                type:'error',
                message:"图片大小务必小于3M"
            });
            return false;
        }
    
    } else{
        ElMessage({
            type:'error',
            message:"文件格式必须是JPG、PNG、GIF"
        });
        return false;
    }
    return true
}

const addSaleAttr = ()=>{
    console.log(selectedSaleAttr.value);
    let [baseSaleAttrId,saleAttrName] = selectedSaleAttr.value.split(':');
    let newSaleAttr:SpuSaleAttrData = {
        baseSaleAttrId:parseInt(baseSaleAttrId),
        saleAttrName,
        spuSaleAttrValueList: []
    }

    spuSaleAttrArr.value.push(newSaleAttr);
    selectedSaleAttr.value = '';
}


defineExpose({initGetSpuDta})

</script>

<style scoped>

</style>