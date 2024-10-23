<script setup>
import { ref, onBeforeMount } from 'vue';
</script>

<template>
  <div>
    <iframe class="terriaMap" src="http://localhost:3001" ></iframe>
  </div>
</template>

<style scoped lang="scss">
.terriaMap {
    width: 100%;
    height:100vh;
}
.common-main {
    padding: 0px;
}
</style>
