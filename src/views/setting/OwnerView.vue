<template>
    <div :class="`w-full h-full ${!system.isDark?'min-[430px]:bg-white':'min-[430px]:bg-black'}  rounded-2xl`">
        <div v-if="!isHasInfo" class="w-full h-full flex justify-center items-center">
            <LSBtn type="info" label="ADD YOUR INFO WEBSITE" class="bg-system cursor-pointer" @clickOnButton="clickOnButton"/>
        </div>
        <div v-else class="p-5 flex flex-col gap-y-3 max-[430px]:p-0">
            <div class="flex gap-5 items-center max-[430px]:flex-col ">
                <div class="max-[430px]:w-[100px] relative max-[430px]:h-[100px] w-[80px] h-[80px] rounded-full max-[430px]:p-2 p-1 bd-card">
                    <img :src="!isEmptyData(preview)?preview:noImage" class="w-full h-full object-cover rounded-full" alt="">
                    <div @click="onClickUploadImage" :class="`absolute ${isScale?'scale-75':''} cursor-pointer ${style.tr200} bottom-[-10px] ${system.isDark?'bg-[#292929]':'bg-[#e7e7e7]'} right-0 flex justify-center items-center w-[35px] h-[35px] rounded-full`">
                        <RiCamera4Fill size="20px" class="color-system"/>
                    </div>
                    <input type="file" class="hidden" ref="uploadImage" @change="onFileSelected"/>
                </div>
                <div class="flex gap-y-2 flex-col">
                    <LSToolTip :title="values.name">
                        <div class="text-[24px] font-bold color-1 " v-if="isEmptyData(values.name)">{{ tr.your_company_name }}</div>
                        <div class="text-[24px] font-bold color-3 " v-else>{{ values.name }} </div>
                    </LSToolTip>
                    <LSToolTip :title="values.englishName">
                        <div class="text-[15px] font-bold color-1 max-[430px]:text-center" v-if="isEmptyData(values.englishName)">{{ tr.your_company_en_name }}</div>
                        <div class="text-[15px] font-bold color-3 max-[430px]:text-center" v-else>{{ values.englishName }} </div>
                    </LSToolTip>
                </div>
            </div>
            <div class="flex gap-x-2 items-center mt-5 mb-2">
                <RiPassportFill size="15px" class="color-system"/>
                <div class="color-3 font-bold">{{ tr.your_info }}</div>
            </div>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    <LSInput :label="tr.enter_name" :required="true" @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model:verify="isCheck" :invalid="isEmptyData(values.name)" v-model="values.name"/>
                    <LSInput :label="tr.enter_english_name"  v-model:isReset="isReset" v-model="values.englishName"/>
                    <LSInput :label="tr.phone" :required="true" @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model:verify="isCheck" v-model="values.phone" :invalid="isEmptyData(values.phone)"/>
                    <LSInput :label="tr.phone"  v-model="values.phone1"  v-model:isReset="isReset"/>
                    <LSInput :label="tr.email" v-model="values.email"  v-model:isReset="isReset"/>
                    <LSInput :label="tr.enter_sub_description" :required="true" @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model:verify="isCheck" v-model="values.subDescription" :invalid="isEmptyData(values.subDescription)"/>
                    <LSInput :label="tr.enter_sub_en_description" v-model:verify="isCheck"   v-model:isReset="isReset" v-model="values.subEnglishDescription"/>
                    <LSInput :label="tr.enter_facebook" v-model:verify="isCheck" :required="true" @onTrackHasChange="onTrackHasChange"  v-model:isReset="isReset" v-model="values.facebook" :invalid="isEmptyData(values.facebook)"/>
                    <LSInput :label="tr.enter_telegram"  v-model:isReset="isReset" v-model="values.telegram"/>
                    <LSInput label="In Link" v-model:verify="isCheck"   @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model="values.inlink" :invalid="isEmptyData(values.telegram)"/>
                    <LSInput label="Youtube Link" v-model:verify="isCheck"   @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model="values.youtube" :invalid="isEmptyData(values.telegram)"/>
                    <LSInput :label="tr.enter_working_info" v-model:verify="isCheck" :required="true"  @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model="values.workingInfo" :invalid="isEmptyData(values.workingInfo)"/>
            </div>
            <div class="flex flex-col gap-y-3 mt-3">
                <LSInputArea :label="tr.enter_description" v-model:isReset="isReset"  v-model:verify="isCheck" :required="true" @onTrackHasChange="onTrackHasChange" v-model="values.description"  :invalid="isEmptyData(values.description)"/>
                <LSInputArea :label="tr.enter_en_description" v-model:isReset="isReset"  v-model="values.englishDescription"/>
            </div>
            <div class="flex w-full justify-end flex-wrap  gap-3 items-center">
                    <LSBtn :label="tr.cancel" type="cancel" @clickOnButton="clickOnButton"/>
                    <LSBtn label="Reset" type="reset" @clickOnButton="clickOnBtnReset"/>
                    <LSBtn :label="tr.save_info" type="save" @clickOnButton="onClickSave"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import LSBtn from '../../components/system/LSBtn.vue';
import { RiCamera4Fill, RiPassportFill } from '@remixicon/vue';
import LSToolTip from '../../components/system/LSToolTip.vue';
import LSInput from '../../components/system/LSInput.vue';
import LSInputArea from '../../components/system/LSInputArea.vue';
import { isEmptyData, ToastMessage } from '../../utils/global_helper';
import { useSystem } from '../../store/system';
import { style } from '../../css/css';
import noImage from '../../assets/system/no-image.jpg'
import { useHttp } from '../../utils/useHttpRequestion';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const isHasInfo = ref<boolean>(false)
const isUpdate = ref<boolean>(false)
const uploadImage = ref<HTMLInputElement | null>(null)
const trackIsReset = ref<boolean>(false)
const isScale = ref<boolean>(false)
const preview = ref<string>("")
const isCheck = ref<boolean>(false)
const onwerId = ref<number>(0)
const isReset = ref<boolean>(false)
const file = ref<File | null>(null)
const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return

  file.value = input.files[0]
  preview.value = URL.createObjectURL(file.value)
}
onMounted(async()=>{
    await getOnwerInfo();
})
    const onClickUploadImage=()=>{
        isScale.value = true;
        setTimeout(()=>{
            isScale.value=false;
        },90)
        uploadImage.value?.click()
    }
    const values = ref({
        name:"",
        englishName:"",
        phone:"",
        phone1:"",
        inlink:"",
        telegram:"",
        email:"",
        subDescription:"",
        subEnglishDescription:"",
        facebook:"",
        youtube:"",
        instagram:"",
        description:"",
        englishDescription:"",
        workingInfo:""
    })

const clickOnBtnReset=()=>{
    isReset.value = !isReset.value;
    isCheck.value = !isCheck.value;
}
const onTrackHasChange=(value:any)=>{
    trackIsReset.value = value;
}
const clickOnButton=()=>{
    isHasInfo.value =true;
}
watch(system,()=>{
    tr.value = system.language;
},{deep:true,immediate:true})
const onClickSave=()=>{
    console.log("trackIsReset",values.value)
    if(!trackIsReset.value) isCheck.value=!trackIsReset.value;
    else isCheck.value = !isCheck.value;
    // saveData();
    if(!isInvalidForm()){
        saveData()
    }else{
        ToastMessage({type:"error",detail: "Kindly you information is incorrect!"})
    }
}
const isInvalidForm=():boolean =>  {
    console.log("check value",values.value)
    return isEmptyData(values.value.name) || 
    isEmptyData(values.value.phone) ||
    isEmptyData(values.value.description) ||
    isEmptyData(values.value.facebook) ||
    isEmptyData(values.value.telegram) ||
    isEmptyData(values.value.workingInfo)
    ;
}

const saveData=async()=>{
   await useHttp({
        url:`api/owner_info/${isUpdate.value?"update":"create"}`,
        data:{
            "id":isUpdate.value?onwerId.value:0,
            "name":values.value.name,
            "englishName":values.value.englishName,
            "phone":values.value.phone,
            "phone1":values.value.phone1,
            "email":values.value.email,
            "description":values.value.description,
            "descriptionEnglish":values.value.englishDescription,
            "subDescription":values.value.subDescription,
            "subDescriptionEnglish":values.value.subEnglishDescription,
            "facebookUrl":values.value.facebook,
            "inURL":values.value.instagram,
            "instagramUrl":values.value.instagram,
            "youtubeUrl":values.value.youtube,
            "inUrl":values.value.inlink,
            "telegramUrl":values.value.telegram,
            "workingInfo":values.value.workingInfo,
        },
        method:"post",
        responseResult:()=>{
             ToastMessage({type:"success",detail: `You information have ${isUpdate.value?'update':"create"} already`})
          
        }
    })
}
const getOnwerInfo=async()=>{
   await useHttp({
        url:"api/owner_info/list",
        data:{},
        method:"post",
        responseResult:(data)=>{
            isHasInfo.value =data.data.length !==0;
            isUpdate.value =data.data.length !==0;
            if(isHasInfo.value){
                var info = data.data[0];
                onwerId.value = info.id;
                values.value = {
                    ...values.value,
                    ...info,
                    telegram: info.telegramUrl,
                    subEnglishDescription: info.subDescriptionEnglish,
                    subDescription: info.subDescription,
                    facebook:info.faceboolUrl,
                    youtube:info.youtubeUrl,
                    inlink:info.inUrl,
                    descriptionEnglish:info.inUrl,
                    englishDescription:info.descriptionEnglish,
                }
            }
        }
    })
}
</script>

<style scoped>

</style>