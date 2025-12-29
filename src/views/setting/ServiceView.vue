<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-4 flex gap-x-3">
                <RiToolsLine size="20px"/>
                <h1>{{ tr.service }}</h1>
            </div>
            <div><LSBtn :label="tr.create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
        </div>
        <div class="w-full h-full">
            <div class="flex justify-between flex-wrap items-center gap-y-2">
                <div class="flex gap-x-3">
                    <div class="w-[45px] h-[45px] bg-card cursor-pointer rounded-lg flex justify-center items-center">
                        <RiRefreshLine size="18px" class="color-3"/>
                    </div>
                    <div class="max-[430px]:w-[180px]"><LSInput :placeholder="tr.search_here" v-model="searchtxt"/></div>
                </div>
                <div><LSBtn :label="tr.delete" type="delete" class="disabled" :is-disabled="!data_card.some(s=>s.isSelect==true)" @click-on-button="onClickButtonDelete" :isHasIcon="true"/></div>
            </div>
            <div class="grid pt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                <div @click="()=>onSelectService(value)" 
                :class="`w-full rounded-2xl p-3 cursor-pointer bd-card-1 ${value.isSelect?'bd-system':''}`" 
                v-if="data_card.length>0" 
                v-for="value in data_card">
                    <div class="flex gap-x-3">
                        <div class="flex flex-col gap-y-1">
                            <div class="text-[15px] color-4">{{ value.Name }}</div>
                            <div class="text-[13px] color-2">{{ value.EnglishName }}</div>
                        </div>
                    </div>
                    <div class="w-full flex justify-end color-3 text-[12px]">
                            <span>@lyzee</span><span>{{ moment().format('LL') }}</span>
                    </div>
                </div>
                <div v-else class="w-full rounded-lg color-2 p-3 h-[100px] flex justify-center items-center bg-card">
                    {{ tr.no_data_available }}
                </div>
            </div>
            <LSPagination :row-btn="5" :total-record="partner_data.length" class="mt-4 flex justify-end max-[430px]:justify-center" @onSelectPage="onSelectPage"/>
        </div>
        <LSDrawer v-model="isShowDrawer">
            <template #header>
                {{ tr.create }}
            </template>
            <div class="mt-3 flex flex-col gap-y-6">
                <LSInput
                 :label="tr.enter_name" 
                :invalid="isEmptyData(data.Name)" 
                :required="true" 
                v-model:verify="verify"
                v-model:is-reset="isReset"
                v-model="data.Name" />
                <LSInput 
                :label="tr.enter_english_name" 
                v-model:verify="verify"
                v-model:is-reset="isReset"
                :invalid="isEmptyData(data.EnglishName)" 
                :required="true"
                 v-model="data.EnglishName"
                 />
                <div class="flex gap-x-6">
                    <div class="flex items-center gap-2">
                    <RadioButton v-model="status" inputId="Active"  name="active" value="active" />
                    <label for="Active" class="text-[13px] color-3">{{ tr.active }}</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="status" inputId="Disabled" name="disabled" value="disabled" />
                        <label for="Disabled" class="text-[13px] color-3">{{ tr.disabled }}</label>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex gap-x-3 justify-end">
                    <LSBtn :is-has-icon="true" label="Cancel" type="cancel" @click-on-button="isShowDrawer=false"/>
                    <LSBtn :is-has-icon="true" label="reset" type="reset" @click-on-button="onClickButtonReset"/>
                    <LSBtn :is-has-icon="true" label="save" type="save" @click-on-button="onClickButtonSave"/>
                </div>
            </template>
        </LSDrawer>
    </div>
</template>

<script setup lang="ts">
import {  RiRefreshLine, RiToolsLine } from '@remixicon/vue';
import { onMounted, ref, watch } from 'vue';
import {  RadioButton , type PageState} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import moment from 'moment';

import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData,  } from '../../utils/global_helper';
import LSPagination from '../../components/system/LSPagination.vue';
import { partner_data } from '../../data_fix/partner_fix';
import { car_fix } from '../../data_fix/car_fix';
import { service_data } from '../../data_fix/service_fix';
import type { ServiceType } from '../../interface/service_type';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const isShowDrawer=ref<boolean>(false);
const data_card=ref<ServiceType[]>([]);
const selectedService=ref<ServiceType[]>([]);
const isCreate=ref<boolean>(false);
const isReset=ref<boolean>(false);
const verify=ref<boolean>(false);
const searchtxt=ref<string>("");
const status=ref<string>("active");
const data =ref({
    Name:"",
    EnglishName:"",
    IsDisabled:false,
})
onMounted(()=>{
    data_card.value = service_data.slice(0,10)
})
watch(searchtxt,()=>{
    if(!isEmptyData(searchtxt.value)){
        data_card.value = service_data.filter((val)=>val.Name.includes(searchtxt.value) || val.EnglishName.includes(searchtxt.value) );
    }else data_card.value = service_data.splice(0,10);
})
const onClickButtonDelete=()=>{
    system.setConfirm({
        message:"Do you want to delete service?",
        type:"delete",
        onCancel :()=> {
            console.log("cancel")
        },
        onSave:()=>{
            data_card.value =  data_card.value.filter(s=>!selectedService.value.map(val=>val.EnglishName).includes(s.EnglishName)) 
            console.log("save")
        }
    })
    system.setIsShowConfirm(true)
}
const onClickButtonSave=()=>{
    verify.value = !verify.value;
}
const onSelectService=(data:ServiceType)=>{
    data.isSelect = !data.isSelect;
    if(data.isSelect) selectedService.value.push(data);
    else selectedService.value=selectedService.value.filter(s=>s.EnglishName!=data.EnglishName)
    console.log(selectedService.value)
}
const onSelectPage=(page:PageState)=>{
    data_card.value = car_fix.slice(page.page,page.rows)
}
const onClickButtonReset=()=>{
    isReset.value = !isReset.value;
}

const onclickCreate=()=>{
    isCreate.value = true;
    isShowDrawer.value = true;
}
watch(system,()=>{
    tr.value = system.language;
},{deep:true,immediate:true})

watch(isShowDrawer,()=>{
    if(isCreate.value) status.value = "active"
},{deep:true,immediate:true})
</script>

<style scoped>

</style>