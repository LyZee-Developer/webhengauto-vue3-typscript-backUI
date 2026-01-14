<template>
    <div :class="`w-full flex justify-between items-center h-full ${isShowIconMobile?`max-[430px]:fixed max-[430px]:left-0 max-[430px]:top-[-2px] max-[430px]:h-[60px] max-[430px]:z-10`:``}   bg-system px-3 `">   
            <div class="h-full">
                <img src="../../assets/logo/logor.png" class="w-full h-full" alt="">
            </div>
            <div :class="`flex gap-x-4  contrast relative items-center ${style.tr500}`">
                <div v-for="item in [3,2,4,1]" :key="item" @click="()=>{onClickIcon(item)}" :class="`w-[36px] h-[36px] ${item==3?`min-[430px]:hidden ${isShowIconMobile?'':'hidden'}`:''} cursor-pointer bg-[#e0e0e021] flex justify-center items-center rounded-full `">
                    <LSToolTip v-if="item==3 && isShowIconMobile" :title="tr.menu">
                        <RiMenu2Fill  size="20px"  class="text-white"/>
                    </LSToolTip> 
                    <LSToolTip v-if="item==1" :title="tr.language">
                         <RiGlobalLine size="20px" class="text-white"/>
                     </LSToolTip>
                      <LSToolTip v-if="item==4" :title="tr.logout">
                            <RiLockLine size="20px" class="text-white"/>
                          <!-- <RouterLink to="/login" ><RiLockLine size="20px" class="text-white"/></RouterLink> -->
                      </LSToolTip>
                       <LSToolTip v-if="item==2" :title="tr.theme">
                           <div>
                               <RiSunFill size="20px" v-if="system.isDark " class="text-white" />
                               <RiMoonFill  size="20px" v-else class="text-white"/>
                            </div>
                    </LSToolTip>
                    
                </div>
              
                <!-- ${isShowModalLG?"right-0":"right-[-200px]"} -->
                <div :class="`fixed flex flex-col top-[65px] ${isShowCountry?'right-5':'right-[-170px]'} px-2 py-3 z-50  gap-y-2 ${system.isDark?'bg-[#121212]':'bg-[#ededed]'}  rounded-2xl ${style.tr300}`">
                     <div @click="()=>onSelectLanguage(val)" v-for="val in countrys" :class="`flex gap-x-3 cursor-pointer ${val.code==system.country.code? system.isDark?'bg-black':'bg-[#00000017]':''} items-end ${system.isDark?'hover:bg-black':'hover:bg-[#ededed]'}  rounded-xl py-2 px-6 pl-3 ${style.tr200}`" >
                        <div class='w-[30px] p-1 h-[30px]  rounded-full flex justify-center items-center bd-card '>
                            <img :src="val.image" class='w-full h-full object-cover rounded-full' alt="" />
                        </div>
                        <div class='color-3'>{{ translate(val.name,val.englishName) }}</div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup lang="ts">
import {  RiGlobalLine, RiLockLine, RiMenu2Fill, RiMoonFill, RiSunFill } from '@remixicon/vue';
import { ref, watch } from 'vue';
import { useSystem } from '../../store/system';
import { style } from '../../css/css';
import LSToolTip from './LSToolTip.vue';
import { useRoute, useRouter } from 'vue-router';
import { countrys } from '../../utils/system_data';
import type { Country } from '../../interface/country_type';
import { translate } from '../../utils/global_helper';
const route = useRoute();
const path = route.fullPath.split("/")[1];
const isShowCountry = ref<boolean>(false)
const router = useRouter();
const isShowIconMobile = ref<boolean>(path!="");
    const system = useSystem();
    const tr= ref();
    const isShowModalLanguage = ref<boolean>(false);
    const onClickIcon=(index:number)=>{
        if(index==2) {
            system.setIsDark(!system.isDark)
           localStorage.setItem("theme",system.isDark?'dark':'white')
        }
        else if(index==4) {
            system.setConfirm({
                message:"Are you sure! Do you want to exit?",
                type:"exit",
                onCancel :()=> {
                    console.log("cancel")
                },
                onSave:()=>{
                    router.push("/login");
                    sessionStorage.removeItem("user");
                    system.setIsDark(false)
                    localStorage.setItem("theme",'white')
                    localStorage.removeItem("isHasLogin")
                }
            })
            system.setIsShowConfirm(true)
            
        }
        else if(index==1) {
            isShowCountry.value=!isShowCountry.value;
        }
        else if(index==3) system.setIsShowMobileMenuSlide(!system.isShowMobileMenuSlide)
        else isShowModalLanguage.value=!isShowModalLanguage.value;
    }
const onSelectLanguage=(language:Country )=>{
    isShowCountry.value = !isShowCountry.value;
    system.setLanguage(language.code)
    system.setCountry(language)
    localStorage.setItem("lang",JSON.stringify(language))
}
watch(system,()=>{
    console.log("country",system.country)
    tr.value = system.language;
},{deep:true,immediate:true})
</script>

<style lang="scss" scoped>

</style>