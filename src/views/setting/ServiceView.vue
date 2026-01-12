<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-4 flex gap-x-3">
                <RiToolsLine size="20px"/>
                <h1>Service Type</h1>
                <!-- <h1>{{ tr.service }}</h1> -->
            </div>
            <div><LSBtn :label="tr.create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
        </div>
        <div class="grid grid-rows-[1fr_120px]">
            <div class="w-ful h-full">
                <div class="flex justify-between flex-wrap items-center gap-y-2">
                    <div class="flex gap-x-3">
                        <div class="w-[45px] h-[45px] bg-card cursor-pointer rounded-lg flex justify-center items-center">
                            <RiRefreshLine size="18px" class="color-3" @click="onClickButtonRefresh"/>
                        </div>
                        <div class="max-[430px]:w-[180px]"><LSInput :placeholder="tr.search_here" v-model="searchtxt"/></div>
                    </div>
                    <div class="flex gap-x-3">
                        <!-- <LSBtn label="update" type="update" class="disabled"
                        @click-on-button="onClickButtonUpdate"
                        :is-disabled="selectedService.length==0 || selectedService.length>1"
                        :isHasIcon="true"/>
                        <LSBtn :label="tr.delete" type="delete" class="disabled"
                        @click-on-button="onClickButtonDelete"
                        :is-disabled="selectedService.length==0"
                        :isHasIcon="true"/> -->
                    </div>
                </div>
                <div class="grid pt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                    <div @click="()=>onSelectService(value)" 
                    :class="`w-full relative rounded-2xl p-3 cursor-pointer bd-card-1 `" 
                    v-if="data_card.length>0 && !isLoading" 
                    v-for="value in data_card">
                         <div class="absolute right-3 top-2 flex justify-center items-center h-[20px] w-[20px] " @click="toggle">
                                <RiMoreFill size="18px" class="color-3" aria-haspopup="true" />
                        </div>
                        <div class="flex gap-x-3">
                            <div class="flex flex-col gap-y-1">
                                    <div class="flex gap-x-2 items-center">
                                    <div class="text-[15px] color-4">{{ value.name }}</div>
                                    <div v-if="value.status" class="w-[8px] h-[8px] rounded-full bg-green-400"></div>
                                    <div v-else class="w-[8px] h-[8px] rounded-full bg-red-400"></div>
                                </div>
                                <div class="text-[13px] color-2">{{ value.englishName }}</div>
                            </div>
                                
                        </div>
                        <div class="w-full flex justify-end color-3 text-[12px]">
                                <span>@lyzee</span><span>{{ moment().format('LL') }}</span>
                        </div>
                    </div>
                    <div 
                    :class="`w-full rounded-2xl p-3 cursor-pointer bd-card-1 `" 
                    v-else-if="isLoading" 
                    v-for="value in [1,2,3,4,5,6,7]">
                        <div class="flex gap-x-3" :key="value">
                            <div class="flex flex-col gap-y-1">
                                <div class="text-[15px] color-4 w-[40px] h-[15px] rounded-md bg-card animate-pulse"></div>
                                <div class="text-[15px] color-4 w-[48px] h-[15px] rounded-md bg-card animate-pulse"></div>
                            </div>
                        </div>
                        <div class="w-full flex justify-end color-3 text-[12px]">
                            <div class="text-[15px] color-4 w-[48px] h-[15px] rounded-md bg-card animate-pulse"></div>
                        </div>
                    </div>
                    <div v-else class="w-full rounded-lg color-2 p-3 text-[13px] h-[100px] flex justify-center items-center bg-card">
                        {{ tr.no_data_available }}
                    </div>
                </div>
            </div>
            <LSPagination :row-btn="5" :total-record="totalRecord" class="mt-4 flex justify-end max-[430px]:justify-center" @onSelectPage="onSelectPage"/>
        </div>
         <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" ></Menu>
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
                    <RadioButton v-model="status" inputId="true"  name="active" value="active" />
                    <label for="true" class="text-[13px] color-3">{{ tr.active }}</label>
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
                    <LSBtn :is-has-icon="true" :is-loading="isLoadingSave" label="save" type="save" @click-on-button="onClickButtonSave"/>
                </div>
            </template>
        </LSDrawer>
    </div>
</template>

<script setup lang="ts">
import {  RiMoreFill, RiRefreshLine, RiToolsLine } from '@remixicon/vue';
import { onMounted, ref, watch } from 'vue';
import {  RadioButton , type PageState} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import moment from 'moment';
import Menu from 'primevue/menu';
import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData,  } from '../../utils/global_helper';
import LSPagination from '../../components/system/LSPagination.vue';
import type { ServiceType } from '../../interface/service_type';
import axios from 'axios'
// import { m } from 'vue-router/dist/router-CWoNjPRp.mjs';
import type { FilterType } from '../../interface/filter_type';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const filter=ref<FilterType>({page:1,record:10,search:""});
const isShowDrawer=ref<boolean>(false);
const isLoadingSave=ref<boolean>(false);
const isLoading=ref<boolean>(false);
const data_card=ref<ServiceType[]>([]);
const selectedService=ref<ServiceType[]>([]);
const isCreate=ref<boolean>(false);
const isReset=ref<boolean>(false);
const verify=ref<boolean>(false);
const searchtxt=ref<string>("");
const status=ref<string>("active");
const selectedId=ref<number>(0);
const totalRecord=ref<number>(0);
const data =ref({
    Name:"",
    EnglishName:"",
    IsDisabled:false,
})

const getListServiceType =async()=>{
    isLoading.value = true;
    try {
        const api = "/api/service_type/list"; 
        const response = await axios.post(api,filter);
        isLoading.value = false;
        data_card.value = response.data;
        if(data_card.value.length > 0 ) {
            totalRecord.value = data_card.value[0]?.recordCount || 0;
        }
        
    } catch (err) {
        console.log(err)
    } 
}

const menu = ref();
const items = ref([
    {
        label: "Action",
        items: [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                command:()=>{
                    onClickButtonUpdate()
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command:()=>{
                    onClickButtonDelete()
                }
            }
        ]
    }
]);
const toggle = (event:PointerEvent) => {
    menu.value.toggle(event);
};
const onClickButtonRefresh=()=>{
    isLoading.value = true;
    getListServiceType();
}
onMounted(()=>{
    // data_card.value = service_data.slice(0,10)
    getListServiceType();
})
watch(searchtxt,()=>{
    if(!isEmptyData(searchtxt.value)){
        data_card.value = data_card.value.filter((val)=>val.name.includes(searchtxt.value) || val.englishName.toLowerCase().includes(searchtxt.value) );
    }else getListServiceType();
})
const onClickButtonDelete=()=>{
    system.setConfirm({
        message:"Do you want to delete service?",
        type:"delete",
        onCancel :()=> {
            console.log("cancel")
        },
        onSave:()=>{
            var Ids = selectedService.value.map(val=>val.id);
            Ids.map(async(val)=>{
                const api = `/api/service_type/delete?id=${val}`; 
                await axios.get(api);
                getListServiceType();
                selectedService.value = []
            })
        }
    })
    system.setIsShowConfirm(true)
}
const onClickButtonUpdate=()=>{
    isCreate.value = false;
    isShowDrawer.value =true;
    if(selectedService.value.length>0){
        data.value.EnglishName = selectedService.value[0]?.englishName || "";
        data.value.Name = selectedService.value[0]?.name || "";
        selectedId.value = selectedService.value[0]?.id || 0;
        status.value = selectedService.value[0]?.status?"active":"disabled";
    }
    
}
const onClickButtonSave=async()=>{
    verify.value = !verify.value;
    isLoadingSave.value =true;
    if(!isEmptyData(data.value.EnglishName) && !isEmptyData(data.value.Name)){
        try {
            const api = `/api/service_type/${isCreate.value?"create":"update"}`; 
            await axios.post(api,
            {
                id:isCreate.value?0:selectedId.value,
                englishName:data.value.EnglishName,
                name:data.value.Name,
                status:status.value=="active"
            });
            isLoadingSave.value =false;
            setTimeout(()=>{
                getListServiceType();
            },500)
            isShowDrawer.value = false;
        } catch (err) {
            console.log(err)
        } 
    }
    console.log(data.value)
    console.log(status.value)
}
const onSelectService=(data:ServiceType)=>{
    selectedService.value = [data];
}
const onSelectPage=(page:PageState)=>{
    filter.value = {...filter.value,page:page.page+1,record:page.rows};
    getListServiceType();
}
const onClickButtonReset=()=>{
    isReset.value = !isReset.value;
}

const onclickCreate=()=>{
    isCreate.value = true;
    isShowDrawer.value = true;
    data.value.EnglishName = ""
    data.value.Name = ""
    status.value = "active"
    selectedService.value =[];
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