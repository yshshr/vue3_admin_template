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
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown> 
</template>

<script setup lang=ts>
import { useRouter,useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';

let layOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

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

const logout=()=>{
    userStore.userlogout();
    $router.push({path:'/login',query:{redirect:$route.path}});
}

</script>

<style scoped>

</style>