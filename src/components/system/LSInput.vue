<template>
    <div class="ls-btn">
        <LSToolTip :title="prop.invalid?tr.this_field_is_required :''">
            <FloatLabel :variant="variant" class=""
            >
                <InputText v-model="dataModel" :invalid="prop.invalid && prop.required && hasChange" @input="onEnterValue" class=" w-full" :id="prop.label" />
                <label :for="prop.label" :class="`${prop.invalid && prop.required && hasChange ?'text-red-500':'color-2'} text-[12px]`   ">{{ prop.label }} <span v-if="prop.required" class="text-red-500 text-[14px]">*</span> </label>
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
    const prop = defineProps(["placeholder","label","ui","size","type","required","variant","invalid"])
    const variant=computed(()=>prop.variant||'on')
    const system = useSystem();
    const emit = defineEmits(["onTrackHasChange"])
    const verify = defineModel<boolean>("verify")
    const isReset = defineModel<boolean>("isReset")
    const hasChange = ref<boolean>(false);
    const tr = ref<Record<string,string>>({});
    const dataModel = defineModel<string>();
    watch(verify,()=>{
        if(verify.value) hasChange.value = true;
        emit("onTrackHasChange",hasChange.value)
        tr.value = system.language;
    },{deep:true,immediate:true})
    const onEnterValue=()=>{
        hasChange.value=true;
    }
    watch(isReset,()=>{
        if(hasChange.value) {
            hasChange.value =true;
        }
        dataModel.value="";
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