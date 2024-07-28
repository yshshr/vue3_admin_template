<template>
  <div class="container">
    <div class="screen">
      <div class="top">顶部</div>
      <div class="bottom">
        <div class="left">左侧</div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script setup lang=ts>
    import { useRoute } from 'vue-router'
    import moment from 'moment'
    import { ref,onMounted,onBeforeUnmount } from 'vue'

    let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'));
    let timer = ref(0);

    onMounted(()=>{
      timer.value = setInterval(()=>{
        time.value=moment().format('YYYY年MM月DD日 hh:mm:ss');
      },1000)
    })

    onBeforeUnmount(()=>{
      clearInterval(timer.value);
    })

    let $route = useRoute();
    console.log($route.path);
</script>

<style scoped lang="scss">


</style>