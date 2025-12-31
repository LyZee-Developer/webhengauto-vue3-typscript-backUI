<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-4 flex gap-x-3">
                <RiCarLine size="20px"/>
                <h1>{{ tr.car }} server</h1>
            </div>
            <div><LSBtn :label="tr.create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
        </div>
        <div class="w-full h-full">
            <div class="flex justify-between flex-wrap items-center gap-y-2">
                <div class="flex gap-x-3">
                    <div class="w-[45px] h-[45px] bg-card cursor-pointer rounded-lg flex justify-center items-center">
                        <RiRefreshLine size="18px" class="color-3" @click="onClickButtonRefresh"/>
                    </div>
                    <div class="max-[430px]:w-[180px]"><LSInput :placeholder="tr.search_here" v-model="searchtxt"/></div>
                </div>
                <div class="flex gap-x-3">
                    <LSBtn label="update" type="update" class="disabled"
                    @click-on-button="onClickButtonUpdate"
                    :is-disabled="selectedCard.length==0 || selectedCard.length>1"
                     :isHasIcon="true"/>
                    <LSBtn :label="tr.delete" 
                    type="delete" class="disabled"
                     :is-disabled="!data_card.some(s=>s.isSelect==true)"
                      @click-on-button="onClickButtonDelete" 
                      :isHasIcon="true"/>
                </div>
            </div>
            <div class="grid pt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                <div @click="()=>onSelectService(value)" :class="`w-full rounded-2xl p-3 cursor-pointer bd-card-1 ${value.isSelect?'bd-system':''}`"
                     v-if="data_card.length>0 && !isLoading" 
                     v-for="value in data_card">
                    <div class="flex gap-x-3">
                        <div @click="()=>{onClickImage(value)}" class="p-[4px] rounded-full bd-card w-[45px] h-[45px]">
                            <img  :src="`http://localhost:4433/${value.pathImage}`" class="w-full h-full rounded-full object-cover" alt="">
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <div class="text-[15px] color-4">{{ value.name }}</div>
                            <div class="text-[13px] color-2">{{ value.englishName }}</div>
                        </div>
                    </div>
                    <div class="w-full flex justify-end color-3 text-[12px]">
                            <span>@{{ value.createdBy }}</span><span>{{ moment(value.createdDate).format('LL') }}</span>
                    </div>
                </div>
                 <div 
                    :class="`w-full rounded-2xl p-3 cursor-pointer bd-card-1 `"
                     v-else-if="isLoading" v-for="value in [1,2,3,4,5,6]">
                    <div class="flex gap-x-3 " :key="value">
                        <div class="p-[4px] rounded-full bd-card w-[45px] h-[45px]">
                               <div class="text-[15px] color-4 w-full h-full rounded-md bg-card animate-pulse"></div>
                        </div>
                        <div class="flex flex-col gap-y-1">
                               <div class="text-[15px] color-4 w-[40px] h-[15px] rounded-md bg-card animate-pulse"></div>
                               <div class="text-[15px] color-4 w-[40px] h-[15px] rounded-md bg-card animate-pulse"></div>
                        </div>
                    </div>
                    <div class="w-full flex justify-end color-3 text-[12px]">
                              <div class="text-[15px] color-4 w-[40px] h-[15px] rounded-md bg-card animate-pulse"></div>
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
                <LSUpload @onChangeFile="onChangeFile"/>
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
import {  RiCarLine, RiRefreshLine } from '@remixicon/vue';
import { onMounted, ref, watch } from 'vue';
import {  RadioButton , type PageState} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import moment from 'moment';

import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData } from '../../utils/global_helper';
import LSPagination from '../../components/system/LSPagination.vue';
import { partner_data } from '../../data_fix/partner_fix';
import LSUpload from '../../components/system/LSUpload.vue';
import axios from 'axios';
import type { CarType } from '../../interface/car_type';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const isShowDrawer=ref<boolean>(false);
const data_card=ref<CarType[]>([]);
const selectedCard=ref<CarType[]>([]);
const isCreate=ref<boolean>(false);
const selectedId=ref<number>(0);
const fileSource=ref<any>(0);
const isReset=ref<boolean>(false);
const isLoading=ref<boolean>(false);
const onClickButtonRefresh=()=>{
    console.log("click requireed")
    isLoading.value = true;
    getListCar();
}
const verify=ref<boolean>(false);
const searchtxt=ref<string>("");
const onClickImage=(value:CarType)=>{
    system.setPathImage(`http://localhost:4433/${value.pathImage}`)
    system.setIsShowImage(true)
}

const status=ref<string>("active");
const data =ref({
    Name:"",
    EnglishName:"",
    IsDisabled:false,
})
const getListCar =async()=>{
    isLoading.value = true;
    try {
        const api = "/api/car/list"; 
        const response = await axios.post(api,
        {
        });
        isLoading.value = false;
        data_card.value = response.data;
    } catch (err) {
        console.log(err)
    } 
}
onMounted(()=>{
    getListCar();
})
const onSelectService=(data:CarType)=>{
    data.isSelect = !data.isSelect;
    if(data.isSelect) selectedCard.value.push(data);
    else selectedCard.value=selectedCard.value.filter(s=>s.id!=data.id)
    console.log(selectedCard.value)
}
watch(searchtxt,()=>{
    if(!isEmptyData(searchtxt.value)){
        data_card.value = data_card.value.filter((val)=>val.name.includes(searchtxt.value) || val.englishName.toLowerCase().includes(searchtxt.value) );
    }else getListCar();
})
const onChangeFile=(file:any)=>{
    console.log(file)
    fileSource.value  =file;
}
const onClickButtonUpdate=()=>{
    isCreate.value = false;
    isShowDrawer.value =true;
    if(selectedCard.value.length>0){
        data.value.EnglishName = selectedCard.value[0]?.englishName || "";
        data.value.Name = selectedCard.value[0]?.name || "";
        selectedId.value = selectedCard.value[0]?.id || 0;
        status.value = selectedCard.value[0]?.status?"active":"disabled";
    }
    
}
const onClickButtonDelete=()=>{
    system.setConfirm({
        message:"Do you want to delete car?",
        type:"delete",
        onCancel :()=> {
            console.log("cancel")
        },
        onSave:()=>{
            var Ids = selectedCard.value.map(val=>val.id);
            Ids.map(async(val)=>{
                const api = `/api/car/delete?id=${val}`; 
                await axios.get(api);
                getListCar();
                selectedCard.value = []
            })
        }
    })
    system.setIsShowConfirm(true)
}


const onClickButtonSave= async()=>{
    verify.value = !verify.value;
    console.log("fileSource.value",fileSource.value)
    if(!isEmptyData(data.value.EnglishName) && !isEmptyData(data.value.Name)){
        try {
            const api = `/api/car/${isCreate.value?"create":"update"}`; 
            var send = {
                id:isCreate.value?0:selectedId.value,
                englishName:data.value.EnglishName,
                name:data.value.Name,
                status:status.value=="active",
                upload :{}
            }
            if(!isEmptyData(fileSource.value)){
                send.upload = {
                    type:fileSource.value.file.type,
                    typeImage:"png",
                    size:fileSource.value.file.size,
                    name:fileSource.value.file.name,
                    base64Text:fileSource.value.base64
                }
            }
            await axios.post(api,send);
            getListCar();
            isShowDrawer.value = false;
        } catch (err) {
            console.log(err)
        } 
    }

}
const onSelectPage=(page:PageState)=>{
    data_card.value = data_card.value.slice(page.page,page.rows)
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