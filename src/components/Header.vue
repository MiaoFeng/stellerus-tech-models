<script setup lang="ts">
import { ElMenu, ElButton } from 'element-plus';
import { User, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';

const activeIndex = ref('2')

const handleSelect = (key: string, keyPath: string[]) => {
    
}

</script>

<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item class="logo" index="0" disabled>
            <img
                style="width: 90px"
                src="../assets/image/stellerus.jpg"
                alt="Stellerus-Tech"
            />
            <span style="font-size: 20px">Stellerus</span>
            <!-- <span>Accurate ClimaTech Lead</span> -->
        </el-menu-item>
        <el-menu-item index="1" class="slogan"><el-button type="primary" :icon="User" circle /></el-menu-item>
        <!-- <el-menu-item index="1">Map</el-menu-item> -->
        <!-- <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item> 
        </el-sub-menu> -->        
    </el-menu>
</template>

<style lang="scss" scoped>
.main-container {
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu--horizontal > .el-menu-item.logo {
  color: black;
}
.el-menu-item.logo.is-disabled{
    opacity: 1;
}
:deep(.el-menu-item.slogan button .el-icon){
    margin-right: 0px;
}
.el-menu-item.slogan.is-disabled{
    opacity: 1;
}
</style>
