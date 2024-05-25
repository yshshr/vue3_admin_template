<template>
    <el-card>
      <el-form inline="true">
        <el-form-item label="一级分类" style="width:300px">
            <el-select >
              <el-option label="抽烟"></el-option>
              <el-option label="喝酒"></el-option>
              <el-option label="烫头"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类" style="width:300px">
            <el-select>
              <el-option label="抽烟"></el-option>
              <el-option label="喝酒"></el-option>
              <el-option label="烫头"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类" style="width:300px">
            <el-select>
              <el-option label="抽烟"></el-option>
              <el-option label="喝酒"></el-option>
              <el-option label="烫头"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px 0px ;">
      <el-button type="primary" size="default" icon="Plus" >添加平台属性</el-button>

    </el-card>

</template>

<script setup lang=ts>

</script>

<style scoped>

</style>
