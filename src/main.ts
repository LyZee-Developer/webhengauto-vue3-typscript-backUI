import { createApp } from 'vue'
import './style.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router/router'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import vue3GoogleLogin from 'vue3-google-login'
import {VueReCaptcha} from 'vue-recaptcha-v3'
import { GlobalText } from './utils/global_helper'
const app = createApp(App);
app.config.globalProperties.Host = 'Global fix data'
app.directive('tooltip', Tooltip);
app.use(vue3GoogleLogin,{
    clientId:GlobalText.google.clientId
});
app.use(VueReCaptcha,{
    siteKey:"6Lff8UUsAAAAAHd5hAuU-qJB4taD26k8CHLBX_0A",
    loaderOptions:{
        autoHideBadge:true
    }
})
const pinia = createPinia();
app.use(pinia);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue,{
     theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});
app.use(router).mount('#app')
