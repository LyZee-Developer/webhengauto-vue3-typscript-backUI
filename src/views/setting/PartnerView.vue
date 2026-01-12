<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-4 flex gap-x-3" >
                <RiUserCommunityFill size="20px"/>
                <h1>{{ tr.partner }}</h1>
            </div>
            <div><LSBtn :label="tr.create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
                
        </div>
        <div>

            <div class="grid h-full grid-rows-[1fr_120px]">
                <div class="w-full h-full">
                    <div class="flex justify-between flex-wrap items-center gap-y-2">
                        <div class="flex gap-x-3">
                            <div class="w-[45px] h-[45px] bg-card cursor-pointer rounded-lg flex justify-center items-center">
                                <RiRefreshLine size="18px" class="color-3" @click="onClickButtonRefresh"/>
                            </div>
                            <div class="max-[430px]:w-[180px]"><LSInput placeholder="Search here..." v-model="searchtxt"  /></div>
                        </div>
                        <!-- <div>
                            <LSBtn :label="tr.delete" type="delete" class="disabled" 
                            :is-disabled="selectedCard.length==0" 
                            @click-on-button="onClickButtonDelete" 
                            :isHasIcon="true"/>
                        </div> -->
                    </div>
                     <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" ></Menu>
                    <div class="grid pt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                        <div v-if="data_card.length>0"
                            @click="()=>{SetValueTodata(value)}"
                            :class="`w-full relative cursor-pointer  rounded-2xl p-3 bd-card-1 ${selectedCard.map(va=>va.id).includes(value.id)?'bd-system':''}`" 
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
                        <div v-else class="w-full rounded-lg  text-[13px]  color-2 p-3 h-[100px] flex justify-center items-center bg-card">
                            {{ tr.no_data_available }}
                        </div>
                    </div>
                </div>
                <LSPagination :row-btn="5" :total-record="totalRecord" class="mt-4 flex justify-end max-[430px]:justify-center" @onSelectPage="onSelectPage"/>
            </div>
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
                <LSUpload @onChangeFile="onChangeFile" v-model="drawerData" v-model:is-drawer-data="isDrawerData" ref="ref_upload"/>
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
import {  RiMoreFill, RiRefreshLine, RiUserCommunityFill } from '@remixicon/vue';
import { onMounted, ref, watch } from 'vue';
import {  RadioButton , type PageState} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import moment from 'moment';
import Menu from 'primevue/menu';
import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData, onErrorImage } from '../../utils/global_helper';
import LSPagination from '../../components/system/LSPagination.vue';
// import { partner_data } from '../../data_fix/partner_fix';
import type { PartnerType } from '../../interface/partner_type';
import LSUpload from '../../components/system/LSUpload.vue';
import axios from 'axios';
import { UrlAPI } from '../../utils/Api/url';
import type { FilterType } from '../../interface/filter_type';
import { useUploadFileStore } from '../../store/upload_file_store';
const isDrawerData=ref<boolean>();
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const isShowDrawer=ref<boolean>(false);
const isLoadingSave=ref<boolean>(false);
const isCreate=ref<boolean>(false);
const isLoading=ref<boolean>(false);
const drawerData=ref<PartnerType | {}>();
const selected=ref<PartnerType | null> ();
const fileSource=ref<any>(0);
const searchtxt=ref<string>("");
const isReset=ref<boolean>(false);
const filter=ref<FilterType>({page:1,record:10,search:""});
const totalRecord=ref<number>(0);
const selectedId=ref<number>(0);
const uploadStore = useUploadFileStore();
// const ref_upload=ref<ChildPublicAPI  | null>(null);
const verify=ref<boolean>(false);
const onClickImage=(value:PartnerType)=>{
    if(!isEmptyData(value.pathImage)){
        system.setPathImage(`http://localhost:4433/${value.pathImage}`)
        system.setIsShowImage(true)
    }
}
const onClickButtonRefresh=()=>{
    isLoading.value = true;
    selectedCard.value = [];
    getListPartner();
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

const onClickButtonUpdate=()=>{
    isCreate.value = false;
    isDrawerData.value = true;
    isShowDrawer.value =true;
    if(!isEmptyData(selected.value) ){
        drawerData.value = selected.value || {};
        data.value.EnglishName = selected.value?.englishName || "";
        data.value.Name = selected.value?.name || "";
        selectedId.value = selected.value?.id || 0;
        status.value = selected.value?.status?"active":"disabled";
        uploadStore.setPathImage(selected.value?.pathImage||"")
    }
    
    
}
const onClickButtonDelete=()=>{
    system.setConfirm({
        message:"Do you want to delete partner?",
        type:"delete",
        onCancel :()=> {
            console.log("cancel")
        },
        onSave:async()=>{
            const api = `${UrlAPI.partner.delete}?id=${selected.value?.id}`; 
                await axios.get(api);
                getListPartner();
                selected.value = null
        }
    })
    system.setIsShowConfirm(true)
}
const toggle = (event:PointerEvent) => {
    menu.value.toggle(event);
};

const getListPartner =async()=>{
    isLoading.value = true;
    try {
        const api = UrlAPI.partner.list; 
        const response = await axios.post(api,filter.value);
        isLoading.value = false;
        data_card.value = response.data;
        console.log("List partner",data_card.value)
        totalRecord.value = data_card.value[0]?.recordCount || 0;
    } catch (err) {
        console.log(err)
    } 
}
onMounted(()=>{
    getListPartner();
})

const onChangeFile=(file:any)=>{
    console.log(file)
    fileSource.value  = file;
}

const onClickButtonSave= async()=>{
    verify.value = !verify.value;
    console.log("fileSource.value",fileSource.value)
    console.log(data.value)
    if(!isEmptyData(data.value.EnglishName) && !isEmptyData(data.value.Name)){
        isLoadingSave.value = true;
        try {
            const api = `${isCreate.value?UrlAPI.partner.create:`${UrlAPI.partner.update}`}`; 
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
                getListPartner();
            },500)
            isShowDrawer.value = false;
        } catch (err) {
            console.log(err)
        } 
    }

}
const data_card = ref<PartnerType[]>([])
const selectedCard = ref<PartnerType[]>([])
const status=ref<string>("active");
const data =ref({
    Name:"",
    EnglishName:"",
    IsDisabled:false,
})

const onSelectPage=(page:PageState)=>{
    filter.value = {...filter.value,page:page.page+1,record:page.rows};
    getListPartner();
}
const SetValueTodata=(data:PartnerType)=>{
    console.log(data)
    selected.value = data;
    // data_card.value = partner_data.slice(page.page,page.rows)
}

watch(searchtxt,()=>{
    filter.value = {...filter.value,search:searchtxt.value};
    getListPartner();
})
const onClickButtonReset=()=>{
    isReset.value = !isReset.value;
}


// const onSelectPartner=(e:PointerEvent,data:PartnerType)=>{
//     var html = e.target as HTMLElement;
//     console.log(html.tagName)
//     if(html.tagName !="svg"){
//         if(!selectedCard.value.some(s=>s.id==data.id)) selectedCard.value.push(data);
//         else selectedCard.value=selectedCard.value.filter(s=>s.id!=data.id)
//     }
// }
const onclickCreate=()=>{
    isCreate.value = true;
    isShowDrawer.value = true;
    drawerData.value = {};
    selected.value = null
    isDrawerData.value = true;
    data.value = {
        EnglishName:"",
        Name:"",
        IsDisabled:true
    }
    
}

// const onClickButtonDelete=()=>{
//     system.setConfirm({
//         message:"Do you want to delete car?",
//         type:"delete",
//         onCancel :()=> {
//             console.log("cancel")
//         },
//         onSave:()=>{
//             var Ids = selectedCard.value.map(val=>val.id);
//             Ids.map(async(val)=>{
//                 const api = `${UrlAPI.partner.delete}?id=${val}`; 
//                 await axios.get(api);
//                 getListPartner();
//                 selectedCard.value = []
//             })
//         }
//     })
//     system.setIsShowConfirm(true)
// }

watch(system,()=>{
    tr.value = system.language;
},{deep:true,immediate:true})

watch(isShowDrawer,()=>{
    if(isCreate.value) status.value = "active"
},{deep:true,immediate:true})
</script>

<style scoped>

</style>