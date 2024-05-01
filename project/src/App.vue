<template>
  <div>
    <h1>我是app</h1>
    <el-button type="primary" :icon="Plus">主要按钮</el-button>
    <el-button type="success" :icon="Check">成功按钮</el-button>
    <svg-icon iconname="phone" color="green" width="50px" height="50px"></svg-icon>
    <scsstcase ></scsstcase>
  </div>
</template>

<script setup lang="ts">
  import {Plus,Check} from '@element-plus/icons-vue'
  //import Test from '@/components/Test.vue'
  // import svgIcon from '@/components/svgIcon/index.vue'
  import scsstcase from '@/components/scsscase.vue'
  import request  from './utils/request';
  import { onMounted } from 'vue';

  onMounted(() => {
    request({
      url:'/user/login',
      method:'post',
      data:{
        "username":"admin",
	      "password":"111111"
      }
    }).then(res=>{
      console.log(res);
    })
  })

  console.log(import.meta.env)
</script>

<style scoped></style>
