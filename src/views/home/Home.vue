<script setup>
import { ref, onBeforeMount } from 'vue';
import { get, post } from '@/apis/index.js';
import { ElMessage } from 'element-plus';
import {ElAmap, useGeolocation ,lazyAMapApiLoaderInstance} from "@vuemap/vue-amap";
import MultiLineChart from '@/components/MultiLineChart.vue';
import WeatherImg from '@/assets/image/weather.png';

const center = ref(null);
const radio = ref('t2m@C');
const xPosition = ref('');
const yPosition = ref('');
const date = ref(new Date().toLocaleDateString('en-CA'))
const modelList = ref([]);
const modelOptions = ref([]);
const showChart = ref(false);
const chartData = ref({data: []});
const chart =ref(null);
const unitMapping = {
    't2m@C': '℃',
    't2m@F': '℉',
    'rh2m@%': '%',
    'ws10m': 'km/h',
    'windspd10m@mph': 'mph',
    'winddir10m@°': '°',
    'vis@km': 'km',
    'vis@mi': 'mi',
    'precip1h@mm': 'mm',
    'precip1h@in': 'in',
    'cloud@%': '%'
};

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useGeolocation({
      enableHighAccuracy: true,
      needAddress: true
    }).then(res => {
      const {getCurrentPosition, getCityInfo} = res;
      getCurrentPosition().then(currentPosition => {
        center.value = currentPosition.position.toArray();
        console.log('currentPosition: ', currentPosition)
        const { lng, lat} = currentPosition.position;
        xPosition.value = lng;
        yPosition.value = lat;
      });
      getCityInfo().then(cityResult => {
        console.log('cityResult: ', cityResult)
      })
    })
  })
  getModels();
})

const showSatellite = ref(false);
const switchShowSatellite = () => {
    showSatellite.value = !showSatellite.value;
}

const clickMap = (e) => {
  const { lng, lat } = e.lnglat;
  xPosition.value = lng;
  yPosition.value = lat;
}

const query = async () => {
    if(!xPosition.value || !yPosition.value) {
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
            lon: xPosition.value,
            lat: yPosition.value,
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

const getModels = async () => {
    const res = await get('/api/models', {})
    modelOptions.value = res.map((item) => {
        return {
            value: item.id,
            label: item.name
        }
    })
}
</script>

<template>
  <div>
    <div class="description">
        <div class="detail-wrapper">
            <!-- <div class="detail">
                <div>Collect meteorological information</div>
                <div>Scientific analysis and forecast</div>
                <div>Serve multiple industries</div>
            </div>
            <div class="weather-img"></div> -->
            <div class="weather-img">
                <div class="detail">
                    <div>Collect meteorological information</div>
                    <div>Scientific analysis and forecast</div>
                    <div>Serve multiple industries</div>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="map-page-container">
            <el-amap
                :center="center"
                :zoom="18"
                @click="clickMap"
            >
                <el-amap-layer-satellite :visible="showSatellite" />
            </el-amap>
        </div>
        <div class="map-toolbar">
            <el-button class="switch-button" @click="switchShowSatellite()">
            {{ showSatellite? 'Map' : 'Satellite' }}
            </el-button>
        </div>
        <el-space direction="vertical" alignment="start" :size="16">
            <div class="position-row">
                <el-input
                    v-model="xPosition"
                    type="number"
                    style="max-width: 200px; border-top-left-radius: 0px;"
                    >
                </el-input>
                <el-input
                    v-model="yPosition"
                    type="number"
                    style="max-width: 200px"
                />
                <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="Choose Date"
                    value-format="YYYY-MM-DD"
                    style="margin-left: 16px"
                />
                <el-button type="primary" @click="query" class="query-button">Search</el-button>
            </div>
            <h2>Meteorological Elements</h2>
            <el-radio-group v-model="radio">
                <el-radio-button label="Temperature" value="t2m@C" />
                <el-radio-button label="Wind Speed" value="ws10m" />
                <el-radio-button label="Irradiation" value="dswrf" />
                <el-radio-button label="Rainfall" value="tp" />
                <el-radio-button label="Air Humidity" value="rh@%" />
            </el-radio-group>

            <h2>Meteorological Models</h2>
            <el-checkbox-group v-model="modelList">
                <el-checkbox
                    v-for="item in modelOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                />
            </el-checkbox-group>
        </el-space>
        <el-empty v-if="!showChart" description="Please select position and models" />
        <MultiLineChart v-else :data="chartData" ref="chart" :unit="unitMapping[radio.value]" />      
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
    padding: 24px 120px;
}
.map-page-container {
    height: 500px;
    width: 100%;
}

.map-toolbar {
    background: lightgray;
    width: 100%;
    height: 48px;
    margin-bottom: 16px;
    padding: 8px 16px;
    .switch-button {
        width: 80px;
    }
}

.description {
    padding: 0px 120px;
    .detail-wrapper {
        background: #f3f6f8;
        background-image: none;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .detail {
            color: white;
            padding-top: 240px;
            div {
                margin-bottom: 40px;
            }
        }
        .weather-img {
            width: 100%;
            height: 664px;
            background-image: url("@/assets/image/weather.png");
            background-size: cover;
        }
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
//隐藏高德地图文字和logo
::v-deep .amap-logo {
  display: none;
  opacity: 0 !important;
}
::v-deep .amap-copyright {
  opacity: 0;
}
</style>
