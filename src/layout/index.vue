<script setup lang="ts">
import Header from '../components/Header.vue';
import MiddleLayout from './Main.vue';
</script>

<template>
    <div class="common-layout">
      <el-container class="common-container">
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
.common-layout {
    height: 100%;
}
.common-container {
    height: 100%;
}
.common-header {
    /* background: black; */
    /* color: #E91E63; */
    padding: 0px;
    background-image: none;
}

.common-main {
    height: calc(100% - 64px);
    padding: 0;
    box-sizing: border-box;
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    /* padding: var(--el-main-padding); */
}

.common-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
  