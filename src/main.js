import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { store } from '@/state/index.js'

import { router } from './routes/index.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(ToastPlugin)
app.use(store)
app.mount('#app')