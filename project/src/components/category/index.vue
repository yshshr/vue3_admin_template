<template>
    <div> 
        <el-card>
            <el-form inline="true">
                <el-form-item label="一级分类" style="width:300px">
                    <el-select v-model="categoryStore.c1value"  @change="handler">
                    <el-option v-for="c1item in categoryStore.c1Arr" :label="c1item.name" :key="c1item.id" :value="c1item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类" style="width:300px">
                    <el-select v-model="categoryStore.c2value" @change="handlerc2">
                    <el-option v-for="c2item in categoryStore.c2Arr" :label="c2item.name" :key="c2item.id" :value="c2item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类" style="width:300px">
                    <el-select v-model="categoryStore.c3value">
                    <el-option  v-for="c3item in categoryStore.c3Arr" :label="c3item.name" :key="c3item.id" :value="c3item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div> 
</template>

<script setup lang=ts>
    import { onMounted } from 'vue';
    import useCategoryStore from '@/store/modules/category'

    let categoryStore = useCategoryStore();

    onMounted(()=>{
        getC1();
    })
    
    const handler = ()=>{
        categoryStore.c2value=null;
        categoryStore.c3Arr=[];
        categoryStore.c3value=null;
        getC2()
    }

    const handlerc2 = ()=>{
        categoryStore.c3value=null;
        getC3()
    }

    const getC1= async ()=>{
        try{
            await categoryStore.getC1();
        }catch(error){
        }
    }

    const getC2= async ()=>{
        try{
            await categoryStore.getC2();
        }catch(error){
        }
    }

    const getC3= async ()=>{
        try{
            await categoryStore.getC3();
        }catch(error){
        }
    }

</script>

<style scoped>

</style>