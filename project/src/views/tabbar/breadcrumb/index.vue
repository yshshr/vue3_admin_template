<template>
  <el-icon style="margin-right: 10px" @click="changeFold">
            <component :is="layOutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
        </el-breadcrumb-item>
        
    </el-breadcrumb>
</template>

<script setup lang=ts>
// import { ref } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting'
import {useRoute} from 'vue-router'

let layOutSettingStore = useLayOutSettingStore();
// let isFold = ref(true);
let $route = useRoute();
console.log($route.matched);

const changeFold=()=>{
    layOutSettingStore.fold=!layOutSettingStore.fold;
}
</script>

<style scoped>

</style>