<template>
  <div class="layout_container"> 
    <div class="layout_slider" :class="{fold:layOutSettingStore.fold?false:true}">
        <Logo></Logo>
        <el-scrollbar  class="scrollbar">
            <!-- <p v-for="item in 2000" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
            <el-menu background-color="#001529" text-color="white"  active-text-color="yellowgreen" :default-active="$route.path" :collapse="layOutSettingStore.fold?false:true"	>
                <!-- <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">数据大屏</el-menu-item>
                <el-sub-menu index="3">
                    <template #title>
                        权限管理
                    </template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                    <el-menu-item index="2-3">item three</el-menu-item>
                </el-sub-menu> -->

                <Menu :menuList=useStore.menuRoutes></Menu>

            </el-menu>
        </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{fold:layOutSettingStore.fold?false:true}">
        <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{fold:layOutSettingStore.fold?false:true}">
        <!-- layout_main 
        <p style="height: 10000px;background-color: red;">111</p> -->
        <layoutMainComponent></layoutMainComponent>
        

    </div>
  </div> 
</template>

<script setup lang=ts>
    import Logo from '@/layout/logo/index.vue'
    import Menu from '@/layout/menu/index.vue'
    import useUserStore from '@/store/modules/user'
    import layoutMainComponent from '@/layout/main/index.vue'
    import { useRoute } from 'vue-router'
    import Tabbar from '@/views/tabbar/index.vue'
    import useLayOutSettingStore from '@/store/modules/setting'

    
    let useStore = useUserStore();
    let $route = useRoute();
    let layOutSettingStore = useLayOutSettingStore();

</script>

<style scoped lang="scss">
.layout_container{
    width: 100%;
    height: 100vh;
    //background: red;
    // color: white;
    .layout_slider{
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;
        .scrollbar{
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu{
                border-right: none;
            }
        }
        &.fold{
            width: $base-menu-min-width;
        }
    }
    .layout_tabbar{
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top:0px;
        left: $base-menu-width;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
    .layout_main{
        color: white;
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background: black;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>