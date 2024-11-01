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
                        <h4>Carbon Source</h4>
                        <div class="content-section">
                            <el-switch v-model="junShanSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, sliderValueJunShan, 'junshan', 'tiff-junshan', filesJunShan)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Junshan AGB biomass</span>
                            <p class="description">Monitoring data of wild terrestrial animals on Junshan Island, Yueyang, Hunan。</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!junShanSwitch1" :icon="isPlayJunShan ? VideoPause : VideoPlay" @click="(e) => handleVideoPlay('sliderValueJunShan', 'junshan', 'tiff-junshan', filesJunShan, 'isPlayJunShan', 'timerJunShan', 2000)" />
                                </el-button-group>
                                <el-slider :disabled="!junShanSwitch1" v-model="sliderValueJunShan" :max="sliderMaxJunShan" @change="(e) => handleSliderChange(sliderValueJunShan, 'junshan', 'tiff-junshan', filesJunShan)"/>
                            </div>
                        </div>
                        <el-space />
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
                            <el-switch v-model="wildfireSwitch" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleWildfireSwitchChange(e)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Global wildfire risk forecast</span>      
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
                            <el-switch v-model="oceanSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, 'wind', 'tiff-wind')" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Suspended particles in water</span>
                            <p class="description">One of the indicators to measure water pollution.</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!oceanSwitch1" :icon="isPlay ? VideoPause : VideoPlay" @click="(e) => handleVideoPlay('wind', 'tiff-wind')" />
                                </el-button-group>
                                <el-slider :disabled="!oceanSwitch1" v-model="sliderValueSPHK" :max="sliderMax" @change="(e) => handleSliderChange('wind', 'tiff-wind')"/>
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
                            <el-switch v-model="windSwitch1" size="small" active-color="#13ce66" inactive-color="#ff4949" @change="(e) => handleVisibilitySwitchChange(e, sliderValueWind, 'wind', 'tiff-wind', filesWind, 5)" />
                            <span style="font-size: 12px; margin-left: 8px; color: #555">Wind Speed</span>
                            <p class="description">Show the wind speed with time series data.</p>
                            <div class="slider-demo-block">
                                <el-button-group class="ml-4" size="small">
                                    <el-button :disabled="!windSwitch1" :icon="isWindPlay ? VideoPause : VideoPlay" @click="(e) => handleVideoPlay('sliderValueWind', 'wind', 'tiff-wind', firstWind, 'isWindPlay', 'timerWind')" />
                                </el-button-group>
                                <el-slider :disabled="!windSwitch1" v-model="sliderValueWind" :max="sliderMax" @change="(e) => handleSliderChange(sliderValueWind, 'wind', 'tiff-wind')"/>
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
  import { contours } from 'd3-contour';
  import proj4 from 'proj4';
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
    //   style: {
    //         version: 8,
    //         imports: [
    //         {
    //             id: "basemap",
    //             url: '../../public/standard.json',
    //         }
    //         ],
    //         sources: {
    //             'chongqing': {
    //                 type: 'geojson',
    //                 data: '../../public/cq.geojson',
    //             }
    //         },
    //         layers: [
    //         {
    //             id: 'polygon-layer',
    //             type: 'fill',
    //             source: 'chongqing',
    //             slot: 'bottom',
    //             paint: {
    //             'fill-color': '#FFD273',
    //             'fill-opacity': 0.8,
    //             },
    //         }
    //         ]
    //     },// 底图Url
    // style: {
    //     "version": 8,
    //     "sources": {},
    //     "layers": []
    // },
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
    // vectorTile(map);
    map.on('load', () => {
        // addRasterTileLayer(map,vecwUrl,'vecw','vecw')
        // addRasterTileLayer(map,cvawUrl,'cvaw','cvaw')
        // map.transform.setProjectionMatrix(mapboxgl.MercatorCoordinate.PROJECTION_MATRIX);
        // setTiff(url, 'test-wind');
    })
    // map.on("load", function () {
    //     const tile = 'https://geogenius.cn-north-4.myhuaweicloud.com/v1/0ba999a55580256b2fdac013c7e7f624/image/collection/wmts/CQ/hw_hk_01/5RF4L3XPYNEKSEB5IBUH/ISReySOtQ6Tc715percent2FzMzn1pOTilMpercent3D/1761379192752';
    //     map.addSource('sourceId', {
    //         type: "raster",
    //         tiles: [tile],
    //         tileSize: 256,
    //     });
 
    //     const wmtsLayer = {
    //         id: 'layerId',
    //         type: "raster",
    //         source: 'sourceId',
    //         minZoom: 1,
    //         maxZoom: 18,
    //         paint: {
    //             "raster-opacity": 1,
    //         },
    //     };
    //     map.addLayer(wmtsLayer);
    // })

    mapInstance.value = map;
    map.on('click', (e) => {
        //获取点击处坐标
        const { lng, lat } = e.lngLat;
        lngLat.value = [lng, lat];
        //获取点击处图层
        const features = map.queryRenderedFeatures(e.point, {
            layers: ["tiff-layer"],
        });
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

  const setTiffAndJump = async (url, layer, zoom) => {
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
        junShanSwitch1.value = false;
        sliderValueJunShan.value = 0;
        isPlayJunShan.value = false;
        clearInterval(timerJunShan.value); // 清除定时器
        const layer = 'tiff-junshan';
        const layerName = `layer-${layer}`;
        if (mapInstance.value && mapInstance.value.getLayer(layerName)) mapInstance.value.removeLayer(layerName);
        if (mapInstance.value && mapInstance.value.getSource(layer)) mapInstance.value.removeSource(layer);
    }
    if(lastActiveName === 'fourth') {
        windSwitch1.value = false;
        sliderValueWind.value = 0;
        isWindPlay.value = false;
        clearInterval(timerWind.value); // 清除定时器
        const layer = 'tiff-wind';
        const layerName = `layer-${layer}`;
        if (mapInstance.value && mapInstance.value.getLayer(layerName)) mapInstance.value.removeLayer(layerName);
        if (mapInstance.value && mapInstance.value.getSource(layer)) mapInstance.value.removeSource(layer);
    }
  };

  const forestSwitch1=ref(false);
  const handleForestSwitchChange = (value) => {
    const status = value === true ? 'visible' : 'none';
    mapInstance.value.setLayoutProperty('polygon-layer', 'visibility', status);
  }
  const forestSwitch2=ref(false);

  const setUrl = (sourceName ,fileName) => {
      const sources = {
        'junshan': 'Junshan_AGBD',
        'ocean': 'ssprocess',
        'wind': 'wind',
      }
      const oceanFiles = {
        '2020/04/09': '20200409',
        '2021/03/20': '20210320',
        '2022/04/09': '20220409',
      }
      const windPreif = 'CCMP_Wind_Analysis_'
      let url = '';
      if(sourceName === 'wind') {
        url = `../../${sources[sourceName]}/${windPreif}${fileName}.tif`;
      } else {
        url = `../../${sources[sourceName]}/${fileName}.tif`;
      }
      console.log(url)
      return url;
  }

  //碳汇部分
  const junShanSwitch1 = ref(false);
  const sliderValueJunShan = ref(0);
  const isPlayJunShan = ref(false);
  const timerJunShan = ref(null);
  const sliderMaxJunShan = 2; // 和地图文件数量有关
  const filesJunShan = [
    'Junshan_AGBD_2020_pro',
    'Junshan_AGBD_2021_pro',
    'Junshan_AGBD_2022_pro',
  ]

  //环境部分
  const wildfireSwitch = ref(false);
//   const handleWildfireSwitchChange = (status) => {
//     const map = mapInstance.value;
//     const layerName = 'wildfire-layer';
//     const sourceName = 'wildfire-source';
//     const tilePath = '/wmts/epsg4326/best/' +
//     'VIIRS_NOAA20_Thermal_Anomalies_375m_All/default/2024-10-01/500m/' +
//     '{z}/{y}/{x}.mvt';
//     // https://gibs.earthdata.nasa.gov/
//     // MODIS_Terra_Thermal_Anomalies_All
//     // https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/VIIRS_NOAA20_Thermal_Anomalies_375m_All/default/2020-10-01/500m/4/3/4.mvt
//     if (status) {
//         map.addSource(sourceName, {
//             type: 'raster',
//             tiles: [
//                  'https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2021-07-17T00:00:00Z&layer=VIIRS_SNPP_Thermal_Anomalies_375m_Night&tilematrixset=500m&Service=WMTS&Request=GetTile&Version=1.0.0&FORMAT=application%2Fvnd.mapbox-vector-tile&TileMatrix={z}&TileCol={x}&TileRow={y}'
//                 // 'https://gibs.earthdata.nasa.gov/' + tilePath,
//                 // `https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?Service=WMTS&Request=GetTile&Version=1.0.0&layer=MODIS_Terra_Thermal_Anomalies_All&TileMatrix={z}&tilematrixset=500m&TileCol={x}&TileRow={y}&style=default&TIME=2012-07-09&Format=image%2Fpng`
//                 // 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?Service=WMTS&Request=GetTile&Version=1.0.0& TIME=2020-10-01&layer=VIIRS_NOAA20_Thermal_Anomalies_375m_All&tilematrixset=500m&TileMatrix=4&TileCol=4&TileRow=3&FORMAT=application/vnd.mapbox-vector-tile'
//             ]
//         });
//         //vector
//         // map.addLayer({
//         //     "id": layerName,
//         //     "type": "fill",
//         //     "source": "wildfire-source",
//         //     "source-layer": layerName,
//         //     "minzoom": 1,
//         //     "maxzoom": 12,
//         //     'layout': {
//         //         'visibility': 'visible'
//         //     },
//         //     "paint": {
//         //         "fill-color": 'red'
//         //     }
//         // });
//         //raster
//         map.addLayer({
//             "id": layerName,
//             "type": "raster",
//             "source": sourceName,
//             "minzoom": 1,
//             "maxzoom": 12,
//             "paint": {
//                 'raster-opacity': 1,
//             }
//         })
//     } else {
//         if (mapInstance.value.getLayer(layerName)) mapInstance.value.removeLayer(layerName);
//         if (mapInstance.value.getSource(sourceName)) mapInstance.value.removeSource(sourceName);
//     }  
//   }

//wms
const handleWildfireSwitchChange = (status) => {
    const map = mapInstance.value;
    const layerName = 'wildfire-layer';
    const sourceName = 'wildfire-source';
    if (status) {
        map.addSource(sourceName, {
            type: 'raster',
            // tiles: [
            //     tilePath + '-180, 0, -90, 90',
            //     tilePath + '-180, -90, -90, 0',
            //     tilePath + '-90, 0, 0, 90',
            //     tilePath + '-90, -90, 0, 0',
            //     tilePath + '0, 0, 90, 90',
            //     tilePath + '0, -90, 90, 0'
            // ],
            tiles: [
                'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?Service=WMTS&Request=GetTile&Version=1.0.0 &layer=MODIS_Terra_CorrectedReflectance_TrueColor&tilematrixset=250m&TileMatrix=6&TileCol=36&TileRow=13&style=default&TIME=2012-07-09&Format=image%2Fjpeg'
            ],
            // 'matrixSet': 'EPSG:4326',
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
    }  
  }

  //海洋部分
  const oceanSwitch1 = ref(false);
  const sliderValueSPHK = ref(0);
  const isPlay = ref(false);
  const step = 1; 
  const sliderMax = 7; // 和地图文件数量有关
  const filesWind = [
    '2023-09-01 00:00:00',
    '2023-09-01 06:00:00',
    '2023-09-01 12:00:00',
    '2023-09-01 18:00:00',
    '2023-09-02 00:00:00',
    '2023-09-02 06:00:00',
    '2023-09-02 12:00:00',
    '2023-09-02 18:00:00',
    ];
  const handleVisibilitySwitchChange = async (value, sliderModel, source, layer, fileSource=filesWind, zoom=10) => {
    const status = value === true ? 'visible' : 'none';
    // mapInstance.value.setLayoutProperty(layer, 'visibility', status);
    let files = fileSource;
    if (value) {
        if(mapInstance.value.getSource(source)) {
            mapInstance.value.setLayoutProperty(layer, 'visibility', 'visible');
        } else {
            setTiffAndJump(setUrl(source, files[sliderModel]), layer, zoom);
        }
    } else {
        const layerName = `layer-${layer}`;
        clearInterval(timerWind.value); // 清除定时器
        if (mapInstance.value && mapInstance.value.getLayer(layerName)) mapInstance.value.removeLayer(layerName);
        if (mapInstance.value && mapInstance.value.getSource(layer)) mapInstance.value.removeSource(layer);
    }
  }

  const handleSliderChange = async (sliderModel, source, layer, fileSource=filesWind) => {
    let files = fileSource;
    setTiff(setUrl(source, files[sliderModel]), layer);
  }

  const isWindPlay = ref(false);
  const timerWind = ref(null);
    
  const handleVideoPlay = (sliderStatusName, source, layer, fileSource=filesWind, playStatusName, intervalName, interval = 1000) => {
    const sliderModels = {
        'sliderValueJunShan': sliderValueJunShan,
        'sliderValueWind': sliderValueWind
    }
    const playStatusModels = {
        'isPlayJunShan': isPlayJunShan,
        'isWindPlay': isWindPlay
    }
    const timers = {
        'timerJunShan': timerJunShan,
        'timerWind': timerWind
    }
    let files = fileSource;
    let playStatusModel = playStatusModels[playStatusName];
    let intervalModel = timers[intervalName];
    let sliderModel = sliderModels[sliderStatusName];
    playStatusModel.value = !playStatusModel.value;
    if (playStatusModel.value) {
      intervalModel.value = setInterval(() => {
        sliderModel.value++;
        if (sliderModel.value >= files.length) {
          sliderModel.value = 0;
        }
        setTiff(setUrl(source, files[sliderModel.value]), layer);
      }, interval);
    } else {
      clearInterval(intervalModel.value);
    }
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

    const sliderValue = ref(0)

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