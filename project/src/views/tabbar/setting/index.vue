<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>

    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker  @change="changeColor"  v-model="color" show-alpha :predefine="predefineColors" :teleported="false" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt active-icon="Sunny"
                    inactive-icon="MoonNight" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>


    <img :src="userStore.avatar" style="width:24px; height:24px;margin:0px 10px;border-radius: 50%;" />
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
import { ref } from 'vue';

let layOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const dark = ref<boolean>(false);

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

const logout = async ()=>{
    await userStore.userlogout();
    $router.push({path:'/login',query:{redirect:$route.path}});
}

const changeDark = ()=>{
    let html = document.documentElement;
    dark.value?html.className='dark':html.className='';
}

const changeColor = ()=>{
    let el = document.documentElement;
    el.style.setProperty('--el-color-primary', color.value)
}

</script>

<style scoped>

</style>