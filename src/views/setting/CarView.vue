<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-4 flex gap-x-3">
                <RiCarLine size="20px"/>
                <h1>{{ tr.car }}</h1>
            </div>
            <div><LSBtn :label="tr.create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
        </div>
        <div class="grid grid-rows-[1fr_130px]">
           <div class="w-full h-full">
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
                        :is-disabled="selectedCard.length==0 || selectedCard.length>1"
                        :isHasIcon="true"/>
                        <LSBtn :label="tr.delete"
                        type="delete" class="disabled"
                        :is-disabled="selectedCard.length==0"
                        @click-on-button="onClickButtonDelete"
                        :isHasIcon="true"/> -->
                    </div>
                </div>
                 <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" ></Menu>
                <div class="grid pt-4  grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                    <div @click="()=>onSelectService(value)" :class="`w-full relative rounded-2xl p-3 cursor-pointer bd-card-1 `"
                        v-if="data_card.length>0 && !isLoading" 
                        v-for="value in data_card">
                        <div class="absolute right-3 top-2 flex justify-center items-center h-[20px] w-[20px] " @click="toggle">
                                <RiMoreFill size="18px" class="color-3" aria-haspopup="true" />
                        </div>
                        <div class="flex gap-x-3">
                            <div @click="()=>{onClickImage(value)}" class="p-[4px] rounded-full bd-card w-[45px] h-[45px]">
                                <img  :src="`http://localhost:4433/${value.pathImage}`" @error="onErrorImage" class="w-full h-full rounded-full object-cover" alt="">
                            </div>
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
                    <div v-else class="w-full rounded-lg text-[13px]  color-2 p-3 h-[100px] flex justify-center items-center bg-card">
                        {{ tr.no_data_available }}
                    </div>
                </div>
           </div>
            <LSPagination :row-btn="5" :total-record="totalRecord" class="mt-4 flex justify-end max-[430px]:justify-center" @onSelectPage="onSelectPage"/>
        </div>
        <LSDrawer v-model="isShowDrawer">
            <template #header>
                {{ isCreate? tr.create:"Update" }}
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
                <LSUpload @onChangeFile="onChangeFile" v-model="drawerData" v-model:is-drawer-data="isDrawerData" ref="ref_upload"/>
            </div>
            <template #footer>
                <div class="flex gap-x-3 justify-end">
                    <LSBtn :is-has-icon="true" label="Cancel" type="cancel" @click-on-button="isShowDrawer=false"/>
                    <LSBtn :is-has-icon="true" label="reset" type="reset" @click-on-button="onClickButtonReset"/>
                    <LSBtn :is-has-icon="true" label="save" :isLoading="isLoadingSave" type="save" @click-on-button="onClickButtonSave"/>
                </div>
            </template>
        </LSDrawer>
    </div>
</template>

<script setup lang="ts">
import {  RiCarLine, RiMoreFill, RiRefreshLine } from '@remixicon/vue';
import { onMounted, ref, watch } from 'vue';
import {  RadioButton , type PageState} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import Menu from 'primevue/menu';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import moment from 'moment';
import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData, onErrorImage } from '../../utils/global_helper';
import LSPagination from '../../components/system/LSPagination.vue';
import LSUpload, { type ChildPublicAPI } from '../../components/system/LSUpload.vue';
import axios from 'axios';
import type { CarType } from '../../interface/car_type';
import { useUploadFileStore } from '../../store/upload_file_store';
import type { FilterType } from '../../interface/filter_type';
const uploadStore  = useUploadFileStore();
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const filter=ref<FilterType>({page:1,record:10,search:""});
const isShowDrawer=ref<boolean>(false);
const isLoadingSave=ref<boolean>(false);
const isDrawerData=ref<boolean>();
const data_card=ref<CarType[]>([]);
const selectedCard=ref<CarType[]>([]);
const drawerData=ref<CarType | {}>();
const isCreate=ref<boolean>(false);
const selectedId=ref<number>(0);
const totalRecord=ref<number>(0);
const fileSource=ref<any>(0);
const ref_upload=ref<ChildPublicAPI  | null>(null);
const isReset=ref<boolean>(false);
const isLoading=ref<boolean>(false);
const onClickButtonRefresh=()=>{
    isLoading.value = true;
    selectedCard.value = [];
    getListCar();
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
const verify=ref<boolean>(false);
const searchtxt=ref<string>("");
const onClickImage=(value:CarType)=>{
    if(!isEmptyData(value.pathImage)){
        system.setPathImage(`http://localhost:4433/${value.pathImage}`)
        system.setIsShowImage(true)
    }
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
        filter.value);
        isLoading.value = false;
        
        data_card.value = response.data;
        totalRecord.value = data_card.value[0]?.recordCount || 0;
    } catch (err) {
        console.log(err)
    } 
}
onMounted(()=>{
    getListCar();
    if(ref_upload.value) {
        ref_upload.value.clearFile();
    }
})
const onSelectService=(data:CarType)=>{
    selectedCard.value = [data];
}
watch(searchtxt,()=>{
   filter.value = {...filter.value,search:searchtxt.value};
    getListCar();
})
const onChangeFile=(file:any)=>{
    console.log(file)
    fileSource.value  = file;
}
const onClickButtonUpdate=()=>{
    isCreate.value = false;
    isDrawerData.value = true;
    isShowDrawer.value =true;
    if(selectedCard.value.length>0){
        drawerData.value = selectedCard.value.length==1 ? selectedCard.value[0]:[];
        data.value.EnglishName = selectedCard.value[0]?.englishName || "";
        data.value.Name = selectedCard.value[0]?.name || "";
        selectedId.value = selectedCard.value[0]?.id || 0;
        status.value = selectedCard.value[0]?.status?"active":"disabled";
        console.log("->",selectedCard.value[0]?.pathImage)
        uploadStore.setPathImage(selectedCard.value[0]?.pathImage||"")
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
        isLoadingSave.value = true;
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
            isLoadingSave.value = false;
            setTimeout(()=>{
                 getListCar();
            },800)
            isShowDrawer.value = false;
        } catch (err) {
            console.log(err)
        } 
    }

}

const onSelectPage=(page:PageState)=>{
    filter.value = {...filter.value,page:page.page+1,record:page.rows};
    getListCar();
}
const onClickButtonReset=()=>{
    isReset.value = !isReset.value;
    setEmptyValue();
    if(ref_upload.value) {
        ref_upload.value.clearFile();
    }
}
const onclickCreate=()=>{
    setEmptyValue();
    isCreate.value = true;
    isShowDrawer.value = true;
    selectedCard.value = []
}
const setEmptyValue=()=>{
    data.value.EnglishName = "";
    data.value.Name = "";
    status.value = "active";
    fileSource.value  = {};
    drawerData.value  = {};
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