import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router).mount('#app')
