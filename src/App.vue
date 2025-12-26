<template>
  <div class="relative" :class="`${system.isDark?'dark':''}`">
    <router-view></router-view>
    <mobile-menu-slide/>
    <LSToast/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useSystem } from './store/system';
import MobileMenuSlide from './components/system/MobileMenuSlide.vue';
import { isEmptyData } from './utils/global_helper';
import LSToast from './components/system/LSToast.vue';
import { useRouter } from 'vue-router';

  const system = useSystem();
  const route = useRouter();
  onMounted(()=>{
      var lang = localStorage.getItem("lang")
      route.push('/login')
      if(lang!=null){
        system.setCountry(JSON.parse(lang))
      }
  })
  watch(system,()=>{
    var theme = localStorage.getItem("theme")
    var lang = localStorage.getItem("lang")
    if(!isEmptyData(theme)){
      if(theme!="dark") document.body.classList.remove('dark');
      else document.body.classList.add('dark');
      system.setIsDark(theme=='dark')
    }
    if(isEmptyData(lang)) {
      system.setLanguage("kh")
      document.body.classList.add('kh');
    }
    else {
      if(lang!=null){
        system.setLanguage(JSON.parse(lang).code)
        if(JSON.parse(lang).code=='kh'){
          document.body.classList.add('kh');
        }else document.body.classList.remove('kh');
      }
        
    }
  },{deep:true,immediate:true})

</script>
<style scoped>

</style>
