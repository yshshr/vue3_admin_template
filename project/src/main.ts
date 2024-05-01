import { createApp } from 'vue'
import App from '@/AppRouter.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App);
app.use(ElementPlus, {locale: zhCn,})

import 'virtual:svg-icons-register'
import gloablComponent from './components/index';
import '@/styles/index.scss'
import router from './router'
import pinia from './store'


app.use(gloablComponent);
app.use(router);
app.use(pinia);

app.mount('#app')


