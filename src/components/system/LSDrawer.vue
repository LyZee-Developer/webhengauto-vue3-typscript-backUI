<template>
            <Drawer v-model:visible="isShowDrawer" class="max-[430px]:!w-[340px] !w-[400px]" position="right">
                <template #header>
                    <div class="text-[17px] font-bold">
                        <slot name="header"></slot>
                    </div>
                </template>
                <slot></slot>
                <template #footer>
                    <slot name="footer"></slot>
                </template>
            </Drawer>
        
</template>

<script setup lang="ts">
import { Drawer } from 'primevue';
const isShowDrawer = defineModel<boolean>();
</script>

<style scoped>

</style>