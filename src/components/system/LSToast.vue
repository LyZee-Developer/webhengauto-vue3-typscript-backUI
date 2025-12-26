<template>
    <div>
        <Toast v-if="system.toastData.position=='bottom-right'" class="max-[430px]:!w-[350px]" position="bottom-right"></Toast>
        <Toast v-else-if="system.toastData.position=='bottom-center'" position="bottom-center"/>
        <Toast v-else-if="system.toastData.position=='bottom-left'" position="bottom-left"/>
        <Toast v-else-if="system.toastData.position=='top-right'" position="top-right"/>
        <Toast v-else-if="system.toastData.position=='top-center'" position="top-center"/>
    </div>
</template>

<script setup lang="ts">
import { Toast, useToast } from 'primevue';
import { watch } from 'vue';
import { useSystem } from '../../store/system';
const system = useSystem();
const toast = useToast();
watch(system,()=>{
    if(system.IsShowToast){
        toast.add({ severity: system.toastData.type, summary: system.toastData.label, detail: system.toastData.detail, life: system.toastData.delay });
        system.setIsShowToast(false);
    }
})
</script>

<style scoped>

</style>