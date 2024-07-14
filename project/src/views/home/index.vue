<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar">
      <div class="title">
        <h1 class="maintitle">{{GET_TIME()}}好{{userStore.username}}</h1>
        <p class="subtitle">{{setting.title}}</p>
      </div>
    </div>
  </el-card>
  <div class="welcome">
    <svg style=" width: 600px;height: 300px;">
      <use xlink:href="#icon-welcome"></use>
    </svg>
  </div>
  
</template>

<script setup lang=ts>
import useUserStore from '@/store/modules/user';
import setting from '@/setting';
import {GET_TIME} from '@/utils/time.ts'

let userStore = useUserStore();

</script>

<style scoped>
.box{
  display:flex;
  .avatar{
    width:100px; 
    height:100px;
    margin:0px 10px;
    border-radius: 50%;
  }
  
  .title{
    margin-left: 20px;
    .maintitle{
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle{
      font-style: italic;
      color: grey;
    }
  }
}

.welcome{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

</style>