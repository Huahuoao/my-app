import { createApp } from 'vue'
import './style.css'
import App from './views/App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from "axios";
import store from './store'
// @ts-ignore
import router from './router'
const app = createApp(App);
app.use(Antd).use(router).use(store).provide('$axios',axios).mount('#app');

