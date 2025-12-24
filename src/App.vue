<template>
  <div class="relative" :class="`${system.isDark?'dark':''}`">
    <router-view></router-view>
    <mobile-menu-slide/>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { useSystem } from './store/system';
import MobileMenuSlide from './components/system/MobileMenuSlide.vue';
import { isEmptyData } from './utils/global_helper';
  const system = useSystem();
  watch(system,()=>{
    var theme = localStorage.getItem("theme")
    var lang = localStorage.getItem("lang")
    if(!isEmptyData(theme)){
      if(theme!="dark") document.body.classList.remove('dark');
      else document.body.classList.add('dark');
      system.setIsDark(theme=='dark')
    }
    if(isEmptyData(lang)) system.setLanguage("kh")
    else {
      if(lang!=null)
        system.setLanguage(JSON.parse(lang).code)
    }
  },{deep:true,immediate:true})

</script>
<style scoped>

</style>
