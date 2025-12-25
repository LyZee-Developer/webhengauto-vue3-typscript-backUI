<template>
    <div class="w-full h-full bg-content rounded-2xl">
        <div v-if="!isHasInfo" class="w-full h-full flex justify-center items-center">
            <LSBtn type="info" label="ADD YOUR INFO WEBSITE" class="bg-system cursor-pointer" @clickOnButton="clickOnButton"/>
        </div>
        <div v-else class="p-5 flex flex-col gap-y-3">
            <div class="flex gap-x-5 items-center">
                <div class="w-[80px] h-[80px] rounded-full overflow-hidden p-1 bd-card">
                    <img src="https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/482056442_1739626130231638_8854825285290920402_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHPDQoGdToeDHcvXY6ga16adHJpf4VW6HF0cml_hVbocSoW41VlrhzxSHkoyAu7kOU0DXknUFCMnQvsEzcIZrah&_nc_ohc=5vFuBLU-rhMQ7kNvwGaYeSD&_nc_oc=AdmnXhDxHhEneSb3sJ0jSvrH7tEz-JAb69XIzARYy-0E41RCymrt7KHl1Nacw5VsEIU&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=FQjxsxs1KHNWCzORI3QgBQ&oh=00_Aflij1pjLF6vMaqcWww6poBVDLF5bksCvmGqBEpHZ1ir_g&oe=6950B0E5" class="w-full h-full rounded-full object-cover " alt="">
                </div>
                <div class="flex gap-y-2 flex-col">
                    <LSToolTip :title="values.name">
                        <div class="text-[24px] font-bold color-1" v-if="isEmptyData(values.name)">Your Company Name</div>
                        <div class="text-[24px] font-bold color-3" v-else>{{ values.name }} </div>
                    </LSToolTip>
                    <LSToolTip :title="values.englishName">
                        <div class="text-[15px] font-bold color-1" v-if="isEmptyData(values.englishName)">Your Company English Name</div>
                        <div class="text-[15px] font-bold color-3" v-else>{{ values.englishName }} </div>
                    </LSToolTip>
                   
                </div>
            </div>
            <div class="flex gap-x-2 items-center mt-5 mb-2">
                <Ri24HoursFill size="15px"/>
                <div class="color-3 font-bold">Social Media</div>
            </div>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                    <LSInput label="Input name" :invalid="isEmptyData(values.name)" v-model="values.name"/>
                    <LSInput label="Input english name" :invalid="isEmptyData(values.englishName)" v-model="values.englishName"/>
                    <LSInput label="Phone"/>
                    <LSInput label="Phone1"/>
                    <LSInput label="Email"/>
                    <LSInput label="Sub description"/>
                    <LSInput label="Sub english description"/>
                    <LSInput label="Facebook URL"/>
                    <LSInput label="In Url"/>
                    <LSInput label="Telegram Url"/>
                    <LSInput label="Working Info"/>
            </div>
            <div class="flex flex-col gap-y-5 mt-3">
                <LSInputArea label="Enter description"/>
                <LSInputArea label="Enter description"/>
            </div>
            <div class="flex justify-end  gap-x-3 items-center">
                <LSBtn label="Cancel" type="cancel" @clickOnButton="clickOnButton"/>
                <LSBtn label="Save Info" type="save" @clickOnButton="onClickSave"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LSBtn from '../../components/system/LSBtn.vue';
import { Ri24HoursFill } from '@remixicon/vue';
import LSToolTip from '../../components/system/LSToolTip.vue';
import LSInput from '../../components/system/LSInput.vue';
import LSInputArea from '../../components/system/LSInputArea.vue';
import { isEmptyData } from '../../utils/global_helper';
const isHasInfo = ref<boolean>(true)
    const values = ref({
        name:"",
        englishName:""
    })
const clickOnButton=()=>{
    isHasInfo.value =!isHasInfo.value;
}
const onClickSave=()=>{
    isHasInfo.value =!isHasInfo.value;
}

</script>

<style scoped>

</style>