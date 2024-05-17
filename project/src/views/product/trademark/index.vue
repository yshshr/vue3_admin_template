<template>
    <el-card style="width: 100%">
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
      <el-table  style="margin:10px 0px" border>
        <el-table-column prop="date" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="品牌名称" width="180" align="center"/>
        <el-table-column prop="address" label="品牌LOGO" width="180" />
        <el-table-column prop="op" label="品牌操作" width="180"/>
      </el-table>    
      <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[4, 8, 16, 32]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="400"
    />
    </el-card>
</template>

<script setup lang=ts>
import { ref } from 'vue';

const pageNo = ref<number>(1)
const limit = ref<number>(3)
</script>

<style scoped>

</style>
