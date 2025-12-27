<template>
    <div class="ls-btn">
        <LSToolTip :title="prop.invalid?tr.this_field_is_required :''">
            <label for="username" class="text-[14px] color-3" v-if="isShowLabel">{{ prop.label }}</label>
            <FloatLabel :variant="variant" class="relative"
                >
                    <div v-if="inputType=='password'" @click="onPreviewPassowrd" class="absolute top-1/2 color-3 right-2 -translate-y-1/2 -translate-x-1/2">
                        <RiEyeCloseFill size="20px" v-if="!isShowPassword" class="color-1"/>
                        <RiEyeFill size="20px" v-else class="color-1"/>
                    </div>
                    <InputText @keydown="onKeyDown"  v-if="inputType=='password'" :placeholder="placeholder" :type="isShowPassword?'text':'password'" v-model="dataModel" :invalid="prop.invalid && prop.required && hasChange" @input="onEnterValue" class="!h-[45px]  !text-[14px] w-full" :id="prop.label" />
                    <InputText @keydown="onKeyDown" v-else-if="inputType !=='password' && isEmptyData(placeholder)" :type="inputType"  v-model="dataModel" :invalid="prop.invalid && prop.required && hasChange" @input="onEnterValue" class="!h-[45px] !text-[14px] w-full" :id="prop.label" />
                    <InputText @keydown="onKeyDown" v-else :type="inputType" :placeholder="placeholder" v-model="dataModel" :invalid="prop.invalid && prop.required && hasChange" @input="onEnterValue" class="!h-[45px] w-full !text-[14px]" :id="prop.label" />
                    <label :for="prop.label" :class="`${prop.invalid && prop.required && hasChange ?'text-red-500':'color-2'} text-[13px]`   ">{{ prop.label }} <span v-if="prop.required" class="text-red-500 text-[14px]">*</span> </label>
                </FloatLabel>
                <p class="text-[12px] text-red-500" v-if="prop.required && prop.invalid && hasChange">{{ tr.this_field_is_required }}</p>
        </LSToolTip>
    </div>
</template>

<script lang="ts" setup>
    import { FloatLabel,InputText } from 'primevue';
    import LSToolTip from './LSToolTip.vue';
    import { computed, ref, watch } from 'vue';
import { useSystem } from '../../store/system';
import {  RiEyeCloseFill, RiEyeFill } from '@remixicon/vue';
import { isEmptyData } from '../../utils/global_helper';
    const prop = defineProps(["placeholder","label","ui","size","type","required","variant","invalid","isShowLabel"])
    const variant=computed(()=>prop.variant||'on')
    const placeholder=computed(()=>prop.placeholder||'')
    const isShowLabel =computed(()=>prop.isShowLabel||false)
    const inputType=computed(()=>prop.type||'text')
    const system = useSystem();
    const emit = defineEmits(["onTrackHasChange","onKeyDown"])
    const verify = defineModel<boolean>("verify")
    const isClearError = defineModel<boolean>("isClearError")
    const isReset = defineModel<boolean>("isReset")
    const hasChange = ref<boolean>(false);
    const isShowPassword = ref<boolean>(false);
    const tr = ref<Record<string,string>>({});
    const dataModel = defineModel<string>();
    
    watch(verify,()=>{
        if(verify.value){
             hasChange.value = true;
             verify.value = false;
        }
        emit("onTrackHasChange",hasChange.value)
        tr.value = system.language;
    },{deep:true,immediate:true})
    const onEnterValue=()=>{
        hasChange.value=true;
    }
    const onKeyDown=(e:KeyboardEvent)=>{
        emit("onKeyDown",e)
    }
  
    const onPreviewPassowrd=()=>{
        isShowPassword.value=!isShowPassword.value;
    }

    watch(isReset,()=>{
        if(hasChange.value) {
            hasChange.value = false;
        }
        dataModel.value="";
    })
    watch(isClearError,()=>{
        if(isClearError.value) {
            hasChange.value = false;
            isClearError.value = false;
        }
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