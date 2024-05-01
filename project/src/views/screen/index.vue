<template>
  <div> 
    <h1>我是数据大屏一级路由{{$route.params}}</h1>
  </div> 
</template>

<script setup lang=ts>
    import { useRoute } from 'vue-router'
    let $route = useRoute();
    console.log($route.path);
</script>

<style scoped>

</style>