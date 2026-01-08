<template>
    <Dialog v-model:visible="system.IsShowImage" :dismissableMask="true" :showHeader="false"  v-if="!isEmptyData(system.PathImage)" :closable="true" modal
     class="!max-w-[800px] !bg-[#12312300] !border-none relative"
    >
        <img :src="image" class="max-w-[600px] max-h-[700px] w-full h-full select-none object-contain"/>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { useSystem } from '../../store/system';
import { isEmptyData } from '../../utils/global_helper';
import { ref, watch } from 'vue';
const system = useSystem();

const image=ref<string>("");
watch(system,()=>{
    if(system.IsShowImage) image.value = system.PathImage;
},{deep:true,immediate:true})
</script>

<style scoped>

</style>