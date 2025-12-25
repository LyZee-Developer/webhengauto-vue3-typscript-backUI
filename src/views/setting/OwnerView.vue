<template>
    <div class="w-full h-full min-[430px]:bg-white  rounded-2xl">
        <div v-if="!isHasInfo" class="w-full h-full flex justify-center items-center">
            <LSBtn type="info" label="ADD YOUR INFO WEBSITE" class="bg-system cursor-pointer" @clickOnButton="clickOnButton"/>
        </div>
        <div v-else class="p-5 flex flex-col gap-y-3 max-[430px]:p-0">
            <div class="flex gap-5 items-center max-[430px]:flex-col ">
                <div class="max-[430px]:w-[100px] relative max-[430px]:h-[100px] w-[80px] h-[80px] rounded-full max-[430px]:p-2 p-1 bd-card">
                    <img :src="!isEmptyData(preview)?preview:'https://i.sstatic.net/y9DpT.jpg'" class="w-full h-full rounded-full" alt="">
                    <div @click="onClickUploadImage" class="absolute bottom-[-10px] right-0 flex justify-center items-center w-[35px] h-[35px] rounded-full" :class="`${system.isDark?'bg-[#292929]':'bg-[#e7e7e7]'}`">
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
            <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                    <LSInput :label="tr.enter_name" :required="true" @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model:verify="isCheck" :invalid="isEmptyData(values.name)" v-model="values.name"/>
                    <LSInput :label="tr.enter_english_name"  v-model:isReset="isReset" v-model="values.englishName"/>
                    <LSInput :label="tr.phone" :required="true" @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model:verify="isCheck" v-model="values.phone" :invalid="isEmptyData(values.phone)"/>
                    <LSInput :label="tr.phone"  v-model="values.phone1"  v-model:isReset="isReset"/>
                    <LSInput :label="tr.email" v-model="values.email"  v-model:isReset="isReset"/>
                    <LSInput :label="tr.enter_sub_description" :required="true" @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model:verify="isCheck" v-model="values.subDescription" :invalid="isEmptyData(values.subDescription)"/>
                    <LSInput :label="tr.enter_sub_en_description" v-model:verify="isCheck"   v-model:isReset="isReset" v-model="values.subEnglishDescription"/>
                    <LSInput :label="tr.enter_facebook" v-model:verify="isCheck" :required="true" @onTrackHasChange="onTrackHasChange"  v-model:isReset="isReset" v-model="values.facebook" :invalid="isEmptyData(values.facebook)"/>
                    <LSInput :label="tr.enter_telegram"  v-model:isReset="isReset" v-model="values.instagram"/>
                    <LSInput :label="tr.enter_telegram" v-model:verify="isCheck" :required="true"  @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model="values.telegram" :invalid="isEmptyData(values.telegram)"/>
                    <LSInput :label="tr.enter_working_info" v-model:verify="isCheck" :required="true"  @onTrackHasChange="onTrackHasChange" v-model:isReset="isReset" v-model="values.workingInfo" :invalid="isEmptyData(values.workingInfo)"/>
            </div>
            <div class="flex flex-col gap-y-5 mt-3">
                <LSInputArea :label="tr.enter_description" v-model:isReset="isReset"  v-model:verify="isCheck" :required="true" @onTrackHasChange="onTrackHasChange" v-model="values.description"  :invalid="isEmptyData(values.description)"/>
                <LSInputArea :label="tr.enter_en_description" v-model:isReset="isReset"  v-model="values.englishDescription"/>
            </div>
            <div class="flex w-full justify-end flex-wrap  gap-3 items-center max-[430px]:flex-col">
                <LSBtn :label="tr.cancel" type="cancel" @clickOnButton="clickOnButton"/>
                <LSBtn label="Reset" type="reset" @clickOnButton="clickOnBtnReset"/>
                <LSBtn :label="tr.save_info" type="save" @clickOnButton="onClickSave"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import LSBtn from '../../components/system/LSBtn.vue';
import { RiCamera4Fill, RiPassportFill } from '@remixicon/vue';
import LSToolTip from '../../components/system/LSToolTip.vue';
import LSInput from '../../components/system/LSInput.vue';
import LSInputArea from '../../components/system/LSInputArea.vue';
import { isEmptyData } from '../../utils/global_helper';
import { useSystem } from '../../store/system';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const {language} = system;
const isHasInfo = ref<boolean>(true)
const uploadImage = ref<HTMLInputElement | null>(null)
const trackIsReset = ref<boolean>(false)
const preview = ref<string>("")
const isCheck = ref<boolean>(false)
const isReset = ref<boolean>(false)
const file = ref<File | null>(null)
const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return

  file.value = input.files[0]
  preview.value = URL.createObjectURL(file.value)
}
    const onClickUploadImage=(e:any)=>{
        uploadImage.value?.click()
    }
    const values = ref({
        name:"",
        englishName:"",
        phone:"",
        phone1:"",
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
const clickOnButton=()=>{
    isHasInfo.value =!isHasInfo.value;
}
const clickOnBtnReset=()=>{
    isReset.value = !isReset.value;
    isCheck.value = !isCheck.value;
}
const onTrackHasChange=(value:any)=>{
    console.log("tracking ",value)
    trackIsReset.value = value;
}
watch(system,()=>{
    tr.value = system.language;
},{deep:true,immediate:true})
const onClickSave=()=>{
    console.log("trackIsReset",trackIsReset.value)
    if(!trackIsReset.value) isCheck.value=!trackIsReset.value;
    else isCheck.value = !isCheck.value;
}

</script>

<style scoped>

</style>