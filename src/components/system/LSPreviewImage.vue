<template>
    <!-- <Dialog v-model:visible="system.IsShowImage" :dismissableMask="true" :showHeader="false"  v-if="!isEmptyData(system.PathImage)" :closable="true" modal
     class="!max-w-[800px] !bg-[#12312300] !border-none relative"
    >
        <img :src="image" class="max-w-[600px] max-h-[700px] w-full h-full select-none object-cover"/>
    </Dialog> -->
    <div v-if="system.IsShowImage" class="w-full h-full fixed left-0 flex justify-center items-center top-0 bg-[#00000091]" @click="()=>closeModal()">
        <div :class="`fix w-[40px] h-[40px] flex justify-center items-center fixed top-[20px] hover:bg-[#00000096] cursor-pointer rounded-full right-[25px] ${style.tr300}`">
            <RiCloseFill color="white"/>
        </div>
        <img :src="image" class="w-full max-w-[700px] h-full object-contain" alt="">
    </div>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { useSystem } from '../../store/system';
import { isEmptyData } from '../../utils/global_helper';
import { ref, watch } from 'vue';
import { RiCandleLine, RiCloseFill } from '@remixicon/vue';
import { style } from '../../css/css';
const system = useSystem();

const image=ref<string>("");
watch(system,()=>{
    if(system.IsShowImage) image.value = system.PathImage;
},{deep:true,immediate:true})
const closeModal=()=>{
    system.setIsShowImage(false);
}
</script>

<style scoped>

</style>