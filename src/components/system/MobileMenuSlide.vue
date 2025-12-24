<template>
    <div class=" top-0 bg-[#00000089]  min-[430px]:hidden h-full w-full fixed" 
    :class="`${!system.isShowMobileMenuSlide?'left-[-400px]':'left-0'}`"
    >
        <div 
            class="w-[300px] max-[360px]:w-full bg-black h-full fixed  top-0" 
            :class="`${!system.isShowMobileMenuSlide?'left-[-400px]':'left-0'} ${style.tr300}`"
        >
            <div class="flex constrast justify-between items-center pr-5 pt-2">
                <div class="w-[100px]">
                    <img src="../../assets/logo/logor.png" alt="">
                </div>
                <div @click="system.setIsShowMobileMenuSlide(!system.isShowMobileMenuSlide)" class="flex justify-center items-center color-3 cursor-pointer bg-card-1 w-[35px] h-[35px] rounded-full">
                    <RiArrowLeftSFill size="20px"/>
                </div>
            </div>
            <div class="w-full flex constrast flex-col  px-2">
                        <RouterLink to="/" @click="system.setIsShowMobileMenuSlide(!system.isShowMobileMenuSlide)">
                            <div class="color-3 flex gap-x-3 w-full items-center hover-bg-card pl-3 py-3 cursor-pointer rounded-sm">
                                <RiLayoutGridFill size="18px" class="w-4 h-4 mr-2"/>
                                <div v-if="isShowTitle" class="color-3">Home</div>
                            </div>
                        </RouterLink>
                        <div v-if="menu_data.filter(s=>s.code==title).length>0" v-for="item in menu_data.filter(s=>s.code==title)[0]?.subMenu">
                            <RouterLink :to="`/${title}/${item.code}`" @click="()=>onSelectSubMenu(item.code)">
                                <div :class="`  flex gap-x-3 w-full   hover-bg-card items-center pl-3 py-3 cursor-pointer rounded-sm`">
                                    <component :is="item.icon"  :class="`w-4 h-4 ${item.code == system.viewType?' color-system font-bold ':'color-3 '}`"/>
                                    <div v-if="isShowTitle" :class="`${item.code == system.viewType?' color-system font-bold ':'color-3 '}`" >{{ item.title }}</div>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { RiArrowLeftSFill, RiLayoutGridFill } from '@remixicon/vue';
import { useSystem } from '../../store/system';
import { style } from '../../css/css';
import { ref, watch } from 'vue';
import { menu_data } from '../../utils/system_data';
const isShowTitle=ref<boolean>(false);
const system = useSystem();
const title = ref<string>("");
const route = useRoute();
const onSelectSubMenu=(menuCode:string)=>{
        system.setIsShowMobileMenuSlide(!system.isShowMobileMenuSlide)
        console.log(menuCode)
        system.setViewType(menuCode);
}
watch(system,()=>{
    title.value = route.fullPath.split("/")[1]||"";
    if(!system.isShowMobileMenuSlide){
       setTimeout(()=>{isShowTitle.value=false;},100)
    }else isShowTitle.value=true;
},{deep:true,immediate:true})

</script>

<style scoped>

</style>