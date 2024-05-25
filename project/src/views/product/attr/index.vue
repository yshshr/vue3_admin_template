<template>
    <div>
      <Category/>
    </div>
    <el-card style="margin:10px 0px ;">
      <el-button type="primary" size="default" icon="Plus" >添加平台属性</el-button>
      <el-table style="margin:10px 0px" border>
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column label="属性名称" width="123" align="center"/>
        <el-table-column label="属性值名称" align="center"/>
        <el-table-column label="操作" width="123" align="center"/>
      </el-table>    

    </el-card>

</template>

<script setup lang=ts>

</script>

<style scoped>

</style>
