<template>
    <div class="map-container">
        <div id="map"></div>
        <div class="left-tabs">
            <el-tabs v-model="activeName" tab-position="left" class="custom-tabs" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon">
                                <!-- <el-badge :value="0" class="item">
                                    <el-icon><calendar /></el-icon>
                                </el-badge> -->
                                <el-icon><Odometer /></el-icon>
                            </div>
                            <div class="tab-text">Carbon</div>
                        </div>
                    </template> 
                    <div class="tab-content wt-320">
                        <h4>Carbon Stock</h4>
                        <div class="content-section">
                            <el-switch v-model="junShanSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'junshan-layer', 'junshan-source', timeJunShan[sliderValueJunShan], timerJunShan, 112.8, 29.4, 10)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Junshan AGB biomass</span>
                            <p class="description">Monitoring data of wild terrestrial animals on Junshan Island, Yueyang, Hunan。</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!junShanSwitch1" :icon="isPlayJunShan ? VideoPause : VideoPlay" @click="(e) => handleVideoPlayJunShan('junshan-source', 'junshan-layer', 2000)" />
                                </el-button-group>
                                <el-slider :disabled="!junShanSwitch1" v-model="sliderValueJunShan" :max="sliderMaxJunShan" @change="(e) => handleSliderChange(sliderValueJunShan, 'junshan-source', 'junshan-layer', timeJunShan)" />
                            </div>

                            <div style="margin-top: 16px;"></div>

                            <el-switch v-model="gelephuSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'gelephu-layer', 'gelephu-source', timeGelephu[sliderValueGelephu], timerGelephu, 89.3, 27.3, 7)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Bhutan Gelephu AGB</span>
                            <p class="description">Monitoring data of forest in Gelephu, Bhutan。</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!gelephuSwitch1" :icon="isPlayGelephu ? VideoPause : VideoPlay" @click="(e) => handleVideoPlayGelephu('gelephu-source', 'gelephu-layer', 2000)" />
                                </el-button-group>
                                <el-slider :disabled="!gelephuSwitch1" v-model="sliderValueGelephu" :max="sliderMaxGelephu" @change="(e) => handleSliderChange(sliderValueGelephu, 'gelephu-source', 'gelephu-layer', timeGelephu)" />
                            </div>
                        </div>
                        
                        <h4>Carbon Sink</h4>
                        <div class="content-section">
                            <el-switch v-model="forestSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="handleForestSwitchChange" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">World forest coverageest</span>
                        </div>
                    </div>                                  
                </el-tab-pane>
                <el-tab-pane name="second">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon"><el-icon><DataAnalysis /></el-icon></div>
                            <div class="tab-text">Environment</div>
                        </div>
                    </template>  
                    <div class="tab-content wt-320">
                        <h4>Wildfire Monitoring</h4>
                        <div class="content-section">
                            <el-switch v-model="wildfireSwitch" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'wildfire-layer', 'wildfire-source', timeWildfire[sliderValueWildfire], timerWildfire, 96.5, 28.1, 1)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Global wildfire risk forecast</span>
                            <p class="description">Monitoring wild fire risk in the global。</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!wildfireSwitch" :icon="isPlayWildfire ? VideoPause : VideoPlay" @click="(e) => handleVideoPlayWildfire('wildfire-source', 'wildfire-layer', 5000)" />
                                </el-button-group>
                                <el-slider :disabled="!wildfireSwitch" v-model="sliderValueWildfire" :max="sliderMaxWildfire" @change="(e) => handleSliderChange(sliderValueWildfire, 'wildfire-source', 'wildfire-layer', timeWildfire)" />
                            </div>     
                        </div>
                    </div>                                   
                </el-tab-pane>
                <el-tab-pane name="third">
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon"><el-icon><Ship /></el-icon></div>
                            <div class="tab-text">Ocean</div>
                        </div>
                    </template>
                    <div class="tab-content wt-320">
                        <h4>HongKong</h4>
                        <div class="content-section">
                            <el-switch v-model="oceanSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'sphk-layer', 'sphk-source', timeSPHK[sliderValueSPHK], timerSPHK, 113.8, 22.3, 9)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Suspended particles in water</span>
                            <p class="description">One of the indicators to measure water pollution.</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!oceanSwitch1" :icon="isPlaySPHK ? VideoPause : VideoPlay" @click="(e) => handleVideoPlaySPHK('sphk-source', 'sphk-layer', 2000)" />
                                </el-button-group>
                                <el-slider :disabled="!oceanSwitch1" v-model="sliderValueSPHK" :max="sliderMaxSPHK" @change="(e) => handleSliderChange(sliderValueSPHK, 'sphk-source', 'sphk-layer', timeSPHK[sliderValueSPHK])"/>
                            </div>
                            
                            <div style="margin-top: 16px;"></div>

                            <el-switch v-model="chlaSwitch" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'chla-layer', 'chla-source', timeChla[sliderValueChla], timerChla, 113.8, 22.3, 9)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Chla</span>
                            <p class="description">Seawater Chlorophyll near HongKong.</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!chlaSwitch" :icon="isPlayChla ? VideoPause : VideoPlay" @click="(e) => handleVideoPlayChla('chla-source', 'chla-layer', 2000)" />
                                </el-button-group>
                                <el-slider :disabled="!chlaSwitch" v-model="sliderValueChla" :max="sliderMaxChla" @change="(e) => handleSliderChange(sliderValueChla, 'chla-source', 'chla-layer', timeChla[sliderValueChla])"/>
                            </div>
                        </div>                      
                    </div>                   
                </el-tab-pane>
                <el-tab-pane name="fourth" lazy>
                    <template #label>
                        <div class="custom-tabs-label">
                            <div class="tab-icon"><el-icon><Lightning /></el-icon></div>
                            <div class="tab-text">Climate</div>
                        </div>
                    </template>
                    <div class="tab-content wt-600">
                        <h4>Weather forcast</h4>
                        <el-space />
                        <el-space direction="vertical" alignment="start" :size="16">
                            <div class="position-row">
                                <el-input
                                    v-model="lngLat[0]"
                                    type="number"
                                    style="border-top-left-radius: 0px;"
                                    class="wt-120"
                                    >
                                </el-input>
                                <el-input
                                    v-model="lngLat[1]"
                                    type="number"
                                    class="wt-120"
                                />
                                <el-date-picker
                                    v-model="date"
                                    type="date"
                                    placeholder="Choose Date"
                                    value-format="YYYY-MM-DD"
                                    class="wt-120"
                                    style="width: 120px; margin-left: 16px"
                                    
                                />
                                <el-button type="primary" @click="query" class="query-button">Search</el-button>
                            </div>
                            <h5>Meteorological Elements</h5>
                            <el-radio-group v-model="radio" size="small">
                                <el-radio-button label="Temperature" value="t2m@C" />
                                <el-radio-button label="Wind Speed" value="ws10m" />
                                <el-radio-button label="Irradiation" value="dswrf" />
                                <el-radio-button label="Rainfall" value="tp" />
                                <el-radio-button label="Air Humidity" value="rh@%" />
                            </el-radio-group>
                            <h5>Meteorological Models</h5>
                            <el-checkbox-group v-model="modelList" size="small">
                                <el-checkbox
                                    v-for="{label, value} in modelOptions"
                                    :key="label"
                                    :label="label"
                                    :value="value"
                                />
                            </el-checkbox-group>
                        </el-space>
                        <el-empty v-if="!showChart" description="Please select position and models" />
                        <MultiLineChart v-else :data="chartData" ref="chart" height="300px"/>
                        <h4>Time Series Data</h4>
                        <div class="content-section" style="margin-top: 8px">
                            <el-switch v-model="windSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'wind-layer', 'wind-source', timeWind[sliderValueWind], timerWind, 105.5, 19.2, 5)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Wind Speed</span>
                            <p class="description">Show the wind speed with time series data.</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!windSwitch1" :icon="isPlayWind ? VideoPause : VideoPlay" @click="(e) => handleVideoPlayWind('wind-source', 'wind-layer', 1500)" />
                                </el-button-group>
                                <el-slider :disabled="!windSwitch1" v-model="sliderValueWind" :max="sliderMaxWind" @change="(e) => handleSliderChange(sliderValueWind, 'wind-source', 'wind-layer', timeWind[sliderValueWind])"/>
                            </div>
                        </div> 
                    </div>                   
                </el-tab-pane>
            </el-tabs>
            <div class="bottom-buttons">
                <div class="bottom-button">
                    <el-icon :size="24"><LocationFilled /></el-icon>
                    <span>Explore</span>
                </div>
            </div>           
        </div>      
    </div>  
  </template>
  
  <script setup>
  import mapboxgl from 'mapbox-gl';
  import { onMounted, computed, ref, reactive, onBeforeUnmount } from 'vue';
  import { get, post } from '@/apis/index.js';
  import { ElMessage } from 'element-plus';
  import { ElTabs, ElTabPane, ElSpace } from 'element-plus';
  import MultiLineChart from '@/components/MultiLineChart.vue';
  import { getImage, getImageAndJump, getImageWindTest } from '@/components/Mapbox/index.js';
  import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
  import * as GeoTIFF from 'geotiff';

  //天地图的token
    const tiandituToken = 'd12deb9576426df9aff82075b754790a';

    const mapInstance = ref();
  onMounted(() => {

    mapboxgl.accessToken =
      'pk.eyJ1IjoibWFya3VzZmVuZyIsImEiOiJjbTJrMjd3ZmMwOWZ6MmlxM2lvczNlOWptIn0.FzDoEjV7qQn8njQZ3YvOUw';
    //  地图基本配置
    const map = new mapboxgl.Map({
      container: 'map', // div 名称
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [100.08, 35.4],
    //   center: [107.744809, 30.180706], // 地图初始化后的定位位置
    minZoom: 1.4,
      zoom: 3, // 初始化后地图缩放等级
    maxZoom: 15
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

    mapInstance.value = map;
    map.on('click', (e) => {
        //获取点击处坐标
        const { lng, lat } = e.lngLat;
        lngLat.value = [lng, lat];
        //获取点击处图层
        // const features = map.queryRenderedFeatures(e.point, {
        //     layers: ["tiff-layer"],
        // });
    });
    return {
        mapInstance,
    }
  });

  // using local ArrayBuffer
    const setTiff = async (url, layer) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
        getImage(mapInstance.value, tiff, layer)
  }

  const setSourceAndJump = async (url, layer, zoom) => {
    const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
        getImageAndJump(mapInstance.value, tiff, layer, zoom);
        // getImageWindTest(mapInstance.value, tiff, layer);
  }
// using remote resource
//   GeoTIFF.fromUrl(url).then(tiff => {
//     console.log(tiff)
//     getImage(mapInstance.value, tiff)
//   });

  //面板部分
  
  const activeName = ref('');
  const handleClick = (tab, event) => {
    const { paneName } = tab;
    const lastActiveName = activeName.value;
    if(paneName === activeName.value) {
        activeName.value = '';
    }
    if(lastActiveName === 'first') {
        //junshan
        junShanSwitch1.value = false;
        sliderValueJunShan.value = 0;
        isPlayJunShan.value = false;
        clearInterval(timerJunShan); // 清除定时器
        const layer = 'junshan-layer';
        const source = 'junshan-source';
        if (mapInstance.value && mapInstance.value.getLayer(layer)) mapInstance.value.removeLayer(layer);
        if (mapInstance.value && mapInstance.value.getSource(source)) mapInstance.value.removeSource(source);
        //不丹
        gelephuSwitch1.value = false;
        sliderValueGelephu.value = 0;
        isPlayGelephu.value = false;
        clearInterval(timerGelephu); // 清除定时器
        if (mapInstance.value && mapInstance.value.getLayer('gelephu-layer')) mapInstance.value.removeLayer('gelephu-layer');
        if (mapInstance.value && mapInstance.value.getSource('gelephu-source')) mapInstance.value.removeSource('gelephu-source');
    }
    if(lastActiveName === 'second') {
        wildfireSwitch.value = false;
        sliderValueWildfire.value = 0;
        isPlayWildfire.value = false;
        clearInterval(timerWildfire); // 清除定时器
        const layer = 'wildfire-layer';
        const source = 'wildfire-source';
        if (mapInstance.value && mapInstance.value.getLayer(layer)) mapInstance.value.removeLayer(layer);
        if (mapInstance.value && mapInstance.value.getSource(source)) mapInstance.value.removeSource(source);
    }
    if(lastActiveName === 'third') {
        //香港海水悬浮物
        oceanSwitch1.value = false;
        sliderValueSPHK.value = 0;
        isPlaySPHK.value = false;
        clearInterval(timerSPHK); // 清除定时器
        const layer = 'sphk-layer';
        const source = 'sphk-source';
        if (mapInstance.value && mapInstance.value.getLayer(layer)) mapInstance.value.removeLayer(layer);
        if (mapInstance.value && mapInstance.value.getSource(source)) mapInstance.value.removeSource(source);
        //香港海水叶绿素
        chlaSwitch.value = false;
        sliderValueChla.value = 0;
        isPlayChla.value = false;
        clearInterval(timerChla); // 清除定时器
        if (mapInstance.value && mapInstance.value.getLayer('chla-layer')) mapInstance.value.removeLayer('chla-layer');
        if (mapInstance.value && mapInstance.value.getSource('chla-source')) mapInstance.value.removeSource('chla-source');
    }
    if(lastActiveName === 'fourth') {
        windSwitch1.value = false;
        sliderValueWind.value = 0;
        isPlayWind.value = false;
        clearInterval(timerWind); // 清除定时器
        const layer = 'wind-layer';
        const source = 'wind-source';
        if (mapInstance.value && mapInstance.value.getLayer(layer)) mapInstance.value.removeLayer(layer);
        if (mapInstance.value && mapInstance.value.getSource(source)) mapInstance.value.removeSource(source);
    }
  };

  const forestSwitch1=ref(false);
  const handleForestSwitchChange = (value) => {
    const status = value === true ? 'visible' : 'none';
    mapInstance.value.setLayoutProperty('polygon-layer', 'visibility', status);
  }
  const forestSwitch2=ref(false);

  const setUrl = (time, layerName, server='http://localhost:8080/geoserver/TimeSeries/wms') => {
      let url = `${server}?service=WMS&version=1.1.0&request=GetMap&layers=${layerName}&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&time=${time}&styles=&format=image/png&TRANSPARENT=true`;     
      console.log(url);  
      return url;
  }

    //时序切换，更换wms服务source里的tiles地址
  const handleWMSTimeChange = (layerName, time, sourceName, server='http://localhost:8080/geoserver/TimeSeries/wms') => {
    const layerPrefix = layerName.split('-')[0];
    const layer = urlLayers[layerPrefix];
    // http://localhost:8080/geoserver/test/wms?service=WMS&version=1.1.0&request=GetMap&layers=test:SS20181226&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&styles=&format=image/png&TRANSPARENT=true
    const url = `${server}?service=WMS&version=1.1.0&request=GetMap&layers=${layer}&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&time=${time}&styles=&format=image/png&TRANSPARENT=true`
    mapInstance.value.getSource(sourceName).setTiles([url]);
  }

  const urlLayers  = {
    'wind': 'TimeSeries:HKSS',
    'junshan': "TimeSeries:JunShanAGB",
    'wildfire': 'TimeSeries:HKSS',
    'sphk': 'TimeSeries:HKSS',
    'gelephu': "TimeSeries:GelephuAGB",
    'chla': 'TimeSeries:HKChla'
  }

  //碳汇部分
  //Junshan部分
  const junShanSwitch1 = ref(false);
  const sliderValueJunShan = ref(0);
  const isPlayJunShan = ref(false);
  let timerJunShan = null;
  const timeJunShan = [
    '2020-01-01',
    '2021-01-01',
    '2022-01-01',
  ]
  const sliderMaxJunShan = timeJunShan.length - 1; // 时序slider的间隔数量，和地图文件数量有关
  const handleVideoPlayJunShan = (source, layer, intervalTime = 1500) => {
    isPlayJunShan.value = !isPlayJunShan.value;

    if (isPlayJunShan.value) {
      timerJunShan = setInterval(() => {
        sliderValueJunShan.value++;
        if (sliderValueJunShan.value >= timeJunShan.length) {
            sliderValueJunShan.value = 0;
        }
        handleWMSTimeChange(layer, timeJunShan[sliderValueJunShan.value], source);
      }, intervalTime);
    } else {
      clearInterval(timerJunShan);
    }
  }
  //不丹Gelephu部分
  const gelephuSwitch1 = ref(false);
  const sliderValueGelephu = ref(0);
  const isPlayGelephu = ref(false);
  let timerGelephu = null;
  const timeGelephu = [
    '2019-04-01',
    '2019-05-01',
    '2019-06-01',
    '2019-10-01',
    '2019-11-01',
    '2020-01-01',
    '2020-02-01',
    '2020-04-01',
    '2020-05-01',
    '2020-07-01',
    '2020-08-01',
    '2020-10-01',
    '2020-12-01',
    '2021-01-01',
    '2021-02-01',
    '2021-03-01',
    '2021-09-01',
    '2021-12-01',
    '2022-01-01',
    '2022-02-01',
    '2022-05-01',
    '2022-08-01',
    '2022-09-01',
    '2022-10-01',
    '2022-11-01',
    '2022-12-01',
    '2023-01-01'
  ]
  const sliderMaxGelephu = timeGelephu.length - 1; // 时序slider的间隔数量，和地图文件数量有关
  const handleVideoPlayGelephu = (source, layer, intervalTime = 1500) => {
    isPlayGelephu.value = !isPlayGelephu.value;

    if (isPlayGelephu.value) {
      timerGelephu = setInterval(() => {
        sliderValueGelephu.value++;
        if (sliderValueGelephu.value >= timeGelephu.length) {
            sliderValueGelephu.value = 0;
        }
        handleWMSTimeChange(layer, timeGelephu[sliderValueGelephu.value], source);
      }, intervalTime);
    } else {
      clearInterval(timerGelephu);
    }
  }

  //环境部分
  //不丹部分火灾
  const wildfireSwitch = ref(false);
  const sliderValueWildfire = ref(0);
  const isPlayWildfire = ref(false);
  let timerWildfire = null;
  const timeWildfire = [
    '2020-01-01',
    '2021-01-01',
    '2022-01-01',
  ]
  const sliderMaxWildfire = timeWildfire.length - 1; // 时序slider的间隔数量，和地图文件数量有关
  const handleVideoPlayWildfire = (source, layer, intervalTime = 1500) => {
    isPlayWildfire.value = !isPlayWildfire.value;

    if (isPlayWildfire.value) {
      timerWildfire = setInterval(() => {
        sliderValueWildfire.value++;
        if (sliderValueWildfire.value >= timeWildfire.length) {
            sliderValueWildfire.value = 0;
        }
        handleWMSTimeChange(layer, timeWildfire[sliderValueWildfire.value], source);
      }, intervalTime);
    } else {
      clearInterval(timerWildfire);
    }
  }

//wms
const handleVisibilitySwitchChange = (status, layerName, sourceName, selectedTime, timer, lng, lat, zoom) => {
    const map = mapInstance.value;
    if (status) {
        //定位到位置
        map.flyTo({
            center: [lng,lat],
            zoom: zoom
        });
        const layerPrefix = layerName.split('-')[0];
        const layer = urlLayers[layerPrefix];
        const tilesUrl = setUrl(selectedTime, layer);
        map.addSource(sourceName, {
            type: 'raster',
            tiles: [
                tilesUrl
            ],
            'tileSize': 512,
        });
        map.addLayer({
            "id": layerName,
            "type": "raster",
            "source": sourceName,
            "minzoom": 0,
            "maxzoom": 15,
            'layout': {
                'visibility': 'visible'
            },
            "paint": {
                'raster-opacity': 0.8,
            }
        })
    } else {
        if (mapInstance.value.getLayer(layerName)) mapInstance.value.removeLayer(layerName);
        if (mapInstance.value.getSource(sourceName)) mapInstance.value.removeSource(sourceName);
        if (timer) { clearInterval(timer)}
    }  
  }

  //海洋部分
  //悬浮物SS
  const oceanSwitch1 = ref(false);
  const sliderValueSPHK = ref(0);
  const isPlaySPHK = ref(false);
  let timerSPHK = null;
  const step = 1;
  const timeSPHK = [
    '2018-12-26',
    '2019-01-25',
    '2019-04-25',
    '2019-08-08',
    '2019-09-07',
    '2019-10-02',
    '2019-11-11',
    '2019-12-11',
    '2020-01-30',
    '2020-04-09',
    '2020-08-22',
    '2020-10-11',
    '2020-11-05',
    '2020-12-05',
    '2021-01-14',
    '2021-02-18',
    '2021-03-20',
    '2021-09-06',
    '2021-10-11',
    '2021-11-10',
    '2021-12-10',
    '2022-01-04',
    '2022-04-09',
    '2022-09-06',
    '2022-10-06',
    '2022-12-10'
  ];
  const sliderMaxSPHK = timeSPHK.length - 1; // 和地图文件数量有关
  const handleVideoPlaySPHK = (source, layer, intervalTime = 2000) => {
    isPlaySPHK.value = !isPlaySPHK.value;

    if (isPlaySPHK.value) {
      timerSPHK = setInterval(() => {
        sliderValueSPHK.value++;
        if (sliderValueSPHK.value >= timeSPHK.length) {
            sliderValueSPHK.value = 0;
        }
        handleWMSTimeChange(layer, timeSPHK[sliderValueSPHK.value], source);
      }, intervalTime);
    } else {
      clearInterval(timerSPHK);
    }
  }

  //Chla
  const chlaSwitch = ref(false);
  const sliderValueChla = ref(0);
  const isPlayChla = ref(false);
  let timerChla = null;
  const timeChla = [
    '2018-12-26',
    '2019-01-25',
    '2019-04-25',
    '2019-08-08',
    '2019-09-07',
    '2019-10-02',
    '2019-11-11',
    '2019-12-11',
    '2020-01-30',
    '2020-04-09',
    '2020-08-22',
    '2020-10-11',
    '2020-11-05',
    '2020-12-05',
    '2021-01-14',
    '2021-02-18',
    '2021-03-20',
    '2021-09-06',
    '2021-10-11',
    '2021-11-10',
    '2021-12-10',
    '2022-01-04',
    '2022-04-09',
    '2022-09-06',
    '2022-10-06',
    '2022-12-10'
  ];
  const sliderMaxChla = timeChla.length - 1; // 和地图文件数量有关
  const handleVideoPlayChla = (source, layer, intervalTime = 2000) => {
    isPlayChla.value = !isPlayChla.value;

    if (isPlayChla.value) {
      timerChla = setInterval(() => {
        sliderValueChla.value++;
        if (sliderValueChla.value >= timeChla.length) {
            sliderValueChla.value = 0;
        }
        handleWMSTimeChange(layer, timeChla[sliderValueChla.value], source);
      }, intervalTime);
    } else {
      clearInterval(timerChla);
    }
  }


//   const handleVisibilitySwitchChange = async (value, sliderModel, layer, timeSource, zoom=10) => {
//     const status = value === true ? 'visible' : 'none';
//     let timeStamps = timeSource;
//     if (value) {
//         if(mapInstance.value.getSource(source)) {
//             mapInstance.value.setLayoutProperty(layer, 'visibility', 'visible');
//         } else {
//             setSourceAndJump(setUrl(files[sliderModel]), layer, zoom);
//         }
//     } else {
//         const layerName = `layer-${layer}`;
//         clearInterval(timerWind.value); // 清除定时器
//         if (mapInstance.value && mapInstance.value.getLayer(layerName)) mapInstance.value.removeLayer(layerName);
//         if (mapInstance.value && mapInstance.value.getSource(layer)) mapInstance.value.removeSource(layer);
//     }
//   }

  const handleSliderChange = async (sliderModel, source, layer, sliderValues) => {
    handleWMSTimeChange(layer, sliderValues[sliderModel], source);
  }
    
  const handleRadioChange = async (value) => {
    radio.value = value;
  }

  //气象部分
  const modelOptions = ref([]);
  const modelList = ref([]);
  const lngLat = ref([0,0]);
  const radio = ref('t2m@C');
  const showChart = ref(false);
  const chartData = ref({data: []});
  const chart =ref(null);
  const date = ref(new Date().toLocaleDateString('en-CA'));
  const windSwitch1 = ref(false);
  const sliderValueWind = ref(0);
  const isPlayWind = ref(false);
  let timerWind = null;
  const timeWind = [
    '2023-09-01 00:00:00',
    '2023-09-01 06:00:00',
    '2023-09-01 12:00:00',
    '2023-09-01 18:00:00',
    '2023-09-02 00:00:00',
    '2023-09-02 06:00:00',
    '2023-09-02 12:00:00',
    '2023-09-02 18:00:00',
    ];
  const sliderMaxWind = timeWind.length - 1;
  
  //获取大模型分类
    const getModels = async () => {
        const res = await get('/api/models', {})
        modelOptions.value = res.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        })
    }
    getModels();

    //获取达模型数据
    const query = async () => {
        const [xPosition, yPosition ] = lngLat.value;
        if(xPosition === 0 || yPosition === 0) {
            ElMessage.error('缺少坐标信息.');
            return 
        }
        if(modelList.value.length === 0) {
            ElMessage.error('请选择气象模型.');
            return 
        }

        showChart.value = true;

        let requestArray = [];
        // if(chart)chart.value.showLoading();
        //获取各模型运算结果数据
        for(const model of modelList.value) { 
            // https://stellerus-te-ktmmanmwnm.cn-hongkong.fcapp.run/
            // `/api/${model}/point`
            requestArray.push(await post(`/api/${model}/point`, {
                lon: xPosition,
                lat: yPosition,
                setting: { utc: 8 },
                time: `${date.value} 00:00:00`,
                mete_vars: [radio.value]
            }))
        }
        const res = await Promise.all(requestArray);
        // if(chart) chart.value.hideLoading();
        if(res.length === 0) return;
        let chart = {
            data: []
        };
        //处理数据，以便在chart中显示
        for(const index in res) {
            const timestamp = res[index].timestamp;
            const values = res[index].data[0].values;
            const data = []
            for(const key in timestamp) {
                data.push([timestamp[key], values[key][0]])
            }
            let series = {
                name: res[index].data[0].name,
                type: 'line',
                symbol: 'circle',
                connectNulls: true,
                showAllSymbol: true,
                lineStyle: {
                    width: 1
                },
                data: data
            }
            
            chart.data.push(series)
        }
        chartData.value = chart;
        console.log(chart)
    }

    const handleVideoPlayWind = (source, layer, intervalTime = 2000) => {
    isPlayWind.value = !isPlayWind.value;

    if (isPlayWind.value) {
      timerWind = setInterval(() => {
        sliderValueWind.value++;
        if (sliderValueWind.value >= timeWind.length) {
            sliderValueWind.value = 0;
        }
        handleWMSTimeChange(layer, timeWind[sliderValueWind.value], source);
      }, intervalTime);
    } else {
      clearInterval(timerWind);
    }
  }

    // vector tile
    const vectorTile = (map) => {
        map.on('load', () => {
            map.addSource('vector-tiles', {
                'type': 'vector',
                'tiles': ['../../wind/20230923/{z}/{x}/{y}.png'],
                'minzoom': 4,
                'maxzoom': 10
            });

            map.addLayer({
                'id': 'osm-tiles',
                'type': 'raster',
                'source': 'vector-tiles',
                'source-layer': 'osm',
                'paint': {"fill-color": '#51bbd6', "fill-opacity": 0.3, "fill-outline-color": '#0000ff'}
            })
        })
    }           
    
    onBeforeUnmount(() => {
        if(timer.value) clearInterval(timer.value);
    })
</script>
  
<style lang="less" scoped>
  footer {
    display: none;
  }
  .common-main {
    padding: 0px !important;
  }
  .map-container {
    position: relative;
    height: 100%;
    width: 100%;
  }
  #map {
    height: 100%;
    width: 100%;
    :deep(.mapboxgl-canvas) {
        cursor: initial;
    }
    :deep(.mapboxgl-ctrl .mapboxgl-ctrl-logo) {
        display: none !important;
        
    }
  }
  .left-tabs {
    position: absolute;
    // height: calc(100% - 160px);
    background: #f2f2f2;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 0px;
    .bottom-buttons {
        width: 114px;
        .bottom-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            cursor: pointer;
            span {
                margin-top: 8px;
                font-size: 12px;
            }
        }
    }
  }
  :deep(.el-tabs__item) {
    background: #f2f2f2;
    margin: 18px 0px;
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
        font-size: 12px;
        vertical-align: middle;
        margin-left: 4px;
    }
    .tab-content {
        padding: 32px 48px;
        overflow-y: auto;
        .content-section {
            margin: 24px 0px;;
        }
        .description {
            font-size: 12px;
            letter-spacing: -.3px;
            color: #9e9e9e;
        }
    }
    .position-row {
        display: flex;
        #deep .el-input-group__prepend {
            padding: 0px;
        }
        button {
            margin-left: 16px;
        }
    }
    .query-button {
        width: 120px;
    }
    .wt-320 {
        width: 320px;
    }
    .wt-640 {
        width: 640px;
    }
    .wt-600 {
        width: 600px;
    }
    .wt-120 {
        width: 120px;
    }
}
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
  .el-slider__marks-text {
    font-size: 12px;
  }
}
</style>