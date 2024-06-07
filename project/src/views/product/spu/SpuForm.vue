<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称"></el-input>
        </el-form-item>  
        <el-form-item label="SPU品牌">
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="oppo"></el-option>
                <el-option label="vivo"></el-option>
            </el-select>
        </el-form-item>  
        <el-form-item label="SPU描述">
            <el-input type="textarea"></el-input>
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

let $emit = defineEmits(['changeScene'])

const cancel =()=>{
    $emit('changeScene',0);
}
</script>

<style scoped>

</style>