<script setup lang="ts">
import Header from '@/components/Header.vue'
import MiddleLayout from './Main.vue';
</script>

<template>
    <div class="common-layout">
      <el-container>
        <el-header class="common-header">
            <Header />
        </el-header>
        <el-main class="common-main">
            <MiddleLayout />
        </el-main>
        <el-footer class="common-footer"></el-footer>
      </el-container>
    </div>
  </template>

<style scoped>
.common-header {
    background: #f3f6f8;
    background-image: none;
}

.common-main {
    padding: 0;
    box-sizing: border-box;
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    padding: var(--el-main-padding);
}

.common-footer {
}
</style>
  