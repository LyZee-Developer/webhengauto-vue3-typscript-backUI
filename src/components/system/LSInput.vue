<template>
    <div class="ls-btn">
         <fwb-input
            v-model="dataModel"
            :placeholder="prop.placeholder"
            :label="prop.label"
            :type="type"
            :required="prop.required"
            :input-class="`!bg-white !rounded-md !text-black ${size} `"
            label-class="!text-black"
            class="bg-red-600 "
            :validation-status="isRequired?dataModel=='' && hasChange?'error':undefined:undefined"
            @input="onChange"
        >
        <template #validationMessage>
            <div v-if="dataModel=='' && isRequired && hasChange">{{ prop.label }} is required!</div>
        </template>
       
    </fwb-input>
    </div>
</template>

<script lang="ts" setup>
   import { FwbInput } from 'flowbite-vue';
import { computed, ref, watch } from 'vue';
   const prop = defineProps(["placeholder","label","ui","size","type","required"])
   const isRequired = computed(()=>prop.required || false)
   const type = computed<'text' | 'password'>(() => {
    return prop.type === 'pw' ? 'password' : 'text'
    })
    const size = computed(()=>prop.size||"size-1")
    const hasChange = ref<boolean>(false);
    const onChange=()=>{
        hasChange.value = true;
    }
   
   const dataModel = defineModel<string>();
   const trigger = defineModel<boolean>("trigger");
    watch(trigger,()=>{
        if(dataModel.value=="") hasChange.value=true;
        console.log("change")
    })
  
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