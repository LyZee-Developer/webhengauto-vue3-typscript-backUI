import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
const app = createApp(App);
app.directive('tooltip', Tooltip);
const pinia = createPinia();
app.use(pinia);
app.use(ToastService);
app.use(PrimeVue,{
     theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});
app.use(router).mount('#app')
