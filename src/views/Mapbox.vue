<template>
    <div class="map-container">
        <div id="map"></div>
        <div class="left-tabs">
            <el-tabs v-model="activeName" tab-position="left" class="custom-tabs" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon">
                                <el-badge :value="6" class="item">
                                    <el-icon><calendar /></el-icon>
                                </el-badge>
                            </div>
                            <div class="tab-text">森林变化</div>
                        </div>
                    </template> 
                    <div class="tab-content">
                        <h5>森林砍伐警报</h5>
                        <div class="content-section">
                            <el-switch v-model="forestSwitch" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="handleForestSwitchChange" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">整合的森林砍伐警报</span>
                            <p class="description">GLAD-L/GLAD-S2/RADD 的整合层。数据来自 UMD 和 WUR。GLAD-L 警报重新采样，从 30 m 到 10 m。</p>
                        </div>
                        <el-space />
                        <div class="content-section">
                            <el-switch v-model="forestSwitch" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="handleForestSwitchChange" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">需要观察的地方</span>
                            <p class="description">需要观察的地方</p>
                        </div>
                    </div>                                  
                </el-tab-pane>
                <el-tab-pane name="second">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon"><el-icon><calendar /></el-icon></div>
                            <div class="tab-text">土地覆盖</div>
                        </div>
                    </template>
                    <div class="tab-content">
                        土地覆盖
                    </div>                     
                </el-tab-pane>
                <el-tab-pane name="third">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon"><el-icon><calendar /></el-icon></div>
                            <div class="tab-text">土地使用</div>
                        </div>
                    </template>
                    <div class="tab-content">
                        土地使用
                    </div>
                    
                </el-tab-pane>
                <el-tab-pane name="fourth">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon"><el-icon><calendar /></el-icon></div>
                            <div class="tab-text">气候</div>
                        </div>
                    </template>
                    <div class="tab-content">
                        气候
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
        </div>      
    </div>  
  </template>
  
  <script lang="ts">
  export default {
    name: 'Mapbox'
  };
  </script>
  
  <script setup lang="ts">
  import mapboxgl from 'mapbox-gl';
  import { onMounted, computed, ref } from 'vue';
  import { ElTabs, ElTabPane, ElSpace } from 'element-plus';
  
  onMounted(() => {

    mapboxgl.accessToken =
      'pk.eyJ1IjoibWFya3VzZmVuZyIsImEiOiJjbTJrMjd3ZmMwOWZ6MmlxM2lvczNlOWptIn0.FzDoEjV7qQn8njQZ3YvOUw';
    //  地图基本配置
    const map = new mapboxgl.Map({
      container: 'map', // div 名称
      style: 'mapbox://styles/mapbox/streets-v11', // 底图Url
      center: [-74.5, 40], // 地图初始化后的定位位置
      zoom: 9 // 初始化后地图缩放等级
    });
    //指北针控件
    const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
        showZoom: true,
    });
    map.addControl(nav, 'top-right');
    //比例尺控件
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
    });
    map.addControl(scale, 'bottom-right');
  });
  
  const activeName = ref('');
  const handleClick = (tab, event) => {
    const { paneName } = tab;
    if(paneName === activeName.value) {
        activeName.value = '';
    } 
  };

  const forestSwitch=ref(false);
  const handleForestSwitchChange = (value) => {
      
  }
  
  </script>
  
  <style lang="less" scoped>
  .map-container {
    position: relative;
    height: 100%;
    width: 100%;
  }
  #map {
    height: 100%;
    width: 100%;
  }
  .left-tabs {
    position: absolute;
    // height: calc(100% - 160px);
    background: #f2f2f2;
    top: 0;
    bottom: 0;
  }
  ::v-deep .el-tabs__item {
    background: #f2f2f2;
    margin: 24px 0px;
  }
  :deep(.el-tab__pane) {
    background: #f2f2f2;
  }
  :deep(.el-tab__nav-wrap) {
    z-index: 1000;
  }
  :deep(.el-tabs__nav-scroll) {
    background: #f2f2f2;
  }
  :deep(.el-tabs--left) {
    .el-tabs__item.is-left {
      text-align: center;
    }
    .el-tabs__item.is-left {
        justify-content: center;
    }
    .el-tabs__header.is-left {
        margin-right: 0px;
    }
  }
.custom-tabs {
    .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }
    .custom-tabs-label .tab-icon {
        font-size: 24px;
        text-align: center;
        vertical-align: middle;
    }
    .custom-tabs-label .tab-text {
        font-size: 14px;
        vertical-align: middle;
        margin-left: 4px;
    }
    .tab-content {
        padding: 16px 32px;
        width: 320px;
        .content-section {
            margin: 24px 0px;;
        }
        .description {
            font-size: 12px;
            letter-spacing: -.3px;
            color: #9e9e9e;
        }
    }
    
}
</style>