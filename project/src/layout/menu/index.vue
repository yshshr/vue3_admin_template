<template>
  <!-- <h1>{{menuList}}</h1> -->
  <template v-for="(item) in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.ishidden" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
      <template #title>
        {{ item.meta.title }}
      </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length==1">
      <el-menu-item :index="item.path" v-if="!item.meta.ishidden" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          {{ item.meta.title }}
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length>1">
      <el-sub-menu :index="item.path" v-if="!item.meta.ishidden" >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </template>
        <Menu :menuList=item.children></Menu>
      </el-sub-menu>
    </template>
  </template>
  
</template>

<script setup lang="ts">
import Menu from '@/layout/menu/index.vue'
import { useRouter } from 'vue-router';

let $router = useRouter();

defineProps(
['menuList']  
)

const goRoute = (vc:any)=>{
  $router.push(vc.index);
}

</script>

<!-- <script lang="ts">
export default{
  name:'Menu'
}
</script> -->

<style scoped>

</style>