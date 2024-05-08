<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" style="width:24px; height:24px;margin:0px 10px;border-radius: 50%;"/>
    <el-dropdown>
        <span class="el-dropdown-link">
        {{userStore.username}}
        <el-icon class="el-icon--right">
            <arrow-down />
        </el-icon>
        </span>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown> 
</template>

<script setup lang=ts>
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';

let layOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();

const updateRefresh=()=>{
    layOutSettingStore.refresh=!layOutSettingStore.refresh;
}

const fullScreen=()=>{
    let full = document.fullscreenElement;
    if(full){
        document.exitFullscreen();
    }else{
        document.documentElement.requestFullscreen();
    }
    
}

</script>

<style scoped>

</style>