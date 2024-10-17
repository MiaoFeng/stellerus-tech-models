<script setup lang="ts">
import { ref, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';

use([CanvasRenderer, GridComponent, LegendComponent, TooltipComponent, LineChart]);

const props = defineProps({
    data: {
        type: Object,
        default: () => {
          return {
            date: [],
            data: []
          }
        }
    },
    unit: {
        type: String,
        default: ''
    },
    colors: {
        type: Array,
        default: () => {
          return ['#FF4A6F', '#04BD9A']
        }
    }
})

const chartInstance = ref(null)
const chartOptions = ref({
tooltip:{
    show: true
  },
  grid: {
    top: 20,
    left: 40,
    right: 16,
  },
  legend: {
    right: 0,
    bottom: 10,
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: '#fff',
      fontSize: 12,
    }    
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#7EA8AE'
      }
    },
    axisLabel: {
      color: "#E4EBF9",
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'OPPOSans, OPPOSans'
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: '',
    axisLine: {
      show: true
    },
    splitArea: {
        show: true,
        areaStyle: {
            color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
        }
    }
  },
  series: [
    {
      data: [],
      type: 'line',
      color: '#3DE4FC',
    }
  ]
});

//数据变化时更新图表
watch(() => props.data, (newVal) => {
    if(chartInstance.value) {
        chartOptions.value.yAxis.unit = props.unit;
        const data = [...newVal?.data]
        // chartOptions.value.series = setSeries(data)
        chartOptions.value.series = data;
        console.log(chartOptions.value)
        // chartInstance.value.setOption(chartOptions)
    }
}, {deep: true})

</script>

<template>
    <div>
        <v-chart 
            :option="chartOptions"
            ref="chartInstance" 
            class="chart"
            autoresize
        />
    </div>
</template>
<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 400px;
}
</style>