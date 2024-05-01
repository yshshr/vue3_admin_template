<template>
  <div> 
    <svg :style="{ width: width,height:height }" >
      <use :xlink:href="prefix + iconname" :fill="color"></use>
    </svg>
  </div> 
</template>

<script setup lang=ts>

defineProps({
  prefix:{
    type:String,
    default: '#icon-'
  },
  iconname:String,
  color:String,
  width:String,
  height:String,
})
</script>

<style scoped>

</style>