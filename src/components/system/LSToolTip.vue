<template>
    <fwb-tooltip  trigger="hover" :theme="system.isDark?'light':'dark'" placement="top">
         <template #trigger>
            <div>
                <slot></slot>
            </div>
        </template>
        <template #content>
            {{ prop.title }}
        </template>
    </fwb-tooltip>
</template>

<script setup lang="ts">
    import { FwbTooltip } from 'flowbite-vue'
    import { useSystem } from '../../store/system';
    const  system  = useSystem()
    const prop = defineProps(["title","label"])
</script>

<style scoped>

</style>