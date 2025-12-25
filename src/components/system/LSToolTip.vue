<template>
    <div  v-if="placement=='top'" v-tooltip.top="prop.title" :theme="system.isDark?'light':'dark'">
            <slot></slot>
    </div>
    <div  v-else-if="placement=='right'" v-tooltip.right="prop.title" :theme="system.isDark?'light':'dark'">
            <slot></slot>
    </div>
    <div  v-else-if="placement=='bottom'" v-tooltip.bottom="prop.title" :theme="system.isDark?'light':'dark'">
            <slot></slot>
    </div>
    <div  v-else-if="placement=='left'" v-tooltip.left="prop.title" :theme="system.isDark?'light':'dark'">
            <slot></slot>
    </div>
   
</template>

<script setup lang="ts">
    import { computed } from 'vue';
import { useSystem } from '../../store/system';
    const  system  = useSystem()
    const prop = defineProps(["title","label","place"])
    const placement = computed(()=>prop.place || 'top')
</script>

<style scoped>

</style>