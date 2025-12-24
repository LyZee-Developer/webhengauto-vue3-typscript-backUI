<template>
    <div class="grid grid-rows-[60px_1fr] h-screen">
        <TopHeader></TopHeader>
        <div :class="`w-full h-full ${style.tr500} grid ${system.isCollapseLeft?'min-[430px]:grid-cols-[70px_1fr]':'min-[430px]:grid-cols-[270px_1fr]'}`">
            <div :class="`h-full w-full  rounded-2xl max-[430px]:hidden gap-x-1 px-4 py-3 `">
                <div :class="`h-full bg-card rounded-xl`">
                    <div :class="`flex ${system.isCollapseLeft?'justify-center':'justify-between'} px-3 py-4 items-center`">
                        <div class="color-3 font-bold text-[16px]" v-if="!system.isCollapseLeft">{{  system.language[`${title}`] }}</div>
                        <div @click="onCollapse" 
                        class="w-7.5 flex justify-center items-center h-7.5 rounded-sm cursor-pointer color-3 hover:bg-card"
                        >
                            <RiSkipLeftFill v-if="isShowTitle" size="20px" class="color-system"/>
                            <RiSkipRightFill v-else size="20px" class="color-system"/>
                        </div>
                    </div>
                    <div class="w-full flex flex-col ">
                        <RouterLink to="/">
                            <div class="color-3 flex gap-x-3 w-full items-center hover-bg-card pl-3 py-3 cursor-pointer rounded-sm">
                                <RiLayoutGridFill size="18px" class="w-4 h-4 text-gray-500 mr-2"/>
                                <div v-if="isShowTitle" class="color-2">{{ system.language.home }}</div>
                            </div>
                        </RouterLink>
                        <div v-if="menu_data.filter(s=>s.code==title).length>0" v-for="item in menu_data.filter(s=>s.code==title)[0]?.subMenu">
                            <RouterLink :to="`/${title}/${item.code}`" @click="()=>onSelectSubMenu(item.code)">
                                <div class="color-3 flex gap-x-3 w-full hover-bg-card items-center pl-3 py-3 cursor-pointer rounded-sm">
                                    <component :is="item.icon"  :class="`w-4 h-4 ${item.code == system.viewType?' color-system font-bold ':'color-3 '} mr-2`"/>
                                    <div v-if="isShowTitle" :class="`${item.code == system.viewType?' color-system font-bold ':'color-3 '}`">{{ system.language[`${item.code}`] }}</div>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full h-full  py-3 pr-4">
                <div class="w-full rounded-2xl p-6 h-full bg-card">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TopHeader from './TopHeader.vue';
import { onMounted, ref, watch } from 'vue';
import { RiLayoutGridFill, RiSkipLeftFill, RiSkipRightFill } from '@remixicon/vue';
import { useSystem } from '../../store/system';
import { style } from '../../css/css';
import { menu_data } from '../../utils/system_data';
const system = useSystem();
const route = useRoute();
const isShowTitle = ref(false);
const title = ref(route.fullPath.split("/")[1])
const onCollapse=()=>{
    system.setIsCollapseLeft(!system.isCollapseLeft)
}
const onSelectSubMenu=(menuCode:string)=>{
    system.setViewType(menuCode);
}
watch(system,()=>{
    if(!system.isCollapseLeft){
        setTimeout(() => {
            isShowTitle.value=true;
        }, 100);
    }else isShowTitle.value=false;
},{deep:true,immediate:true})
onMounted(()=>{
    console.log(route.fullPath)
})

</script>

<style scoped>

</style>