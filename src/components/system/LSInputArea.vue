<template>
 <FloatLabel :variant="variant">
    <Textarea id="over_label" v-model="value" class="w-full" rows="2" cols="30" style="resize: none" />
    <label for="over_label" class="text-[12px]">{{ prop.label }}</label>
</FloatLabel>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
  const prop = defineProps(["placeholder","label","ui","size","type","variant"])
  const variant=computed(()=>prop.variant||'on')
const value = ref('')
import { FloatLabel,Textarea } from 'primevue';
</script>

<style lang="scss" >
    
</style>