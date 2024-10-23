import router from './router/index'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Echarts from "vue-echarts"
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//高德地图
initAMapApiLoader({
    key: 'aead2f5addb285e7cdf97d07e4599cf3',
    securityJsCode: '5e666e91dc497f7417fa4217cf0520a5',
  })

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('v-chart', Echarts).use(VueAMap).use(ElementPlus).use(router).mount('#app')
