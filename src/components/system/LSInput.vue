<template>
    <div class="ls-btn">
        <LSToolTip :title="prop.invalid?'This field are required':''">
            <FloatLabel :variant="variant" class=""
            >
                <InputText v-model="dataModel" :invalid="prop.invalid" class=" w-full" :id="prop.label" />
                <label :for="prop.label" class="color-3  text-[12px] ">{{ prop.label }}</label>
            </FloatLabel>
        </LSToolTip>
    </div>
</template>

<script lang="ts" setup>
    import { FloatLabel,InputText } from 'primevue';
    import LSToolTip from './LSToolTip.vue';
import { computed } from 'vue';
   const prop = defineProps(["placeholder","label","ui","size","type","required","variant","invalid"])
     const variant=computed(()=>prop.variant||'on')
   const dataModel = defineModel<string>();
  
</script>

<style lang="scss" >
.ls-btn{
    .size-1{
        height: 40px !important;
    }
    .size-2{
        height: 45px !important;
    }
    .size-3{
        height: 50px !important;
    }
    .size-4{
        height: 56px !important;
    }
}
    
</style>