import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from "axios";
const app = createApp(App);
app.use(Antd).provide('$axios',axios).mount('#app');

