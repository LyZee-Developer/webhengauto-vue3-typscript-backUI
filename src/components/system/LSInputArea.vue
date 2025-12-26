<template>
 <FloatLabel :variant="variant" >
    <Textarea id="over_label"  :invalid="prop.invalid && hasChange" @input="onEnterValue" v-model="data" class=" !text-[15px] w-full" rows="2" cols="30" style="resize: none" />
    <label for="over_label" class="text-[12px]">{{ prop.label }}</label>
    <p class="text-[12px] text-red-500" v-if="prop.required && prop.invalid && hasChange">This feild is required!</p>
</FloatLabel>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { FloatLabel,Textarea } from 'primevue';
  const prop = defineProps(["placeholder","label","ui","size","type","variant","invalid","required"])
  const variant=computed(()=>prop.variant||'on')
  const data = defineModel<any>()
  const verify = defineModel<boolean>("verify")
    const isReset = defineModel<boolean>("isReset")
  const hasChange = ref<boolean>(false);
  const onEnterValue=()=>{
      hasChange.value=true;
  }
  watch(verify,()=>{
    if(verify.value) hasChange.value = true;
  },{deep:true,immediate:true})
   watch(isReset,()=>{
        if(hasChange.value) {
            hasChange.value =false;
        }
        data.value="";
    })
</script>

<style lang="scss" >
    
</style>