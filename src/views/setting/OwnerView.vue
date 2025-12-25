<template>
    <div class="w-full h-full bg-white rounded-2xl">
        <div v-if="!isHasInfo" class="w-full h-full flex justify-center items-center">
            <LSBtn label="ADD YOUR INFO WEBSITE" class="bg-system cursor-pointer" @clickOnButton="clickOnButton"/>
        </div>
        <div v-else class="p-5 flex flex-col gap-y-3">
            <div class="flex gap-x-5 items-center">
                <div class="w-[80px] h-[80px] rounded-full overflow-hidden p-1 bd-card">
                    <img src="https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/482056442_1739626130231638_8854825285290920402_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHPDQoGdToeDHcvXY6ga16adHJpf4VW6HF0cml_hVbocSoW41VlrhzxSHkoyAu7kOU0DXknUFCMnQvsEzcIZrah&_nc_ohc=5vFuBLU-rhMQ7kNvwGaYeSD&_nc_oc=AdmnXhDxHhEneSb3sJ0jSvrH7tEz-JAb69XIzARYy-0E41RCymrt7KHl1Nacw5VsEIU&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=FQjxsxs1KHNWCzORI3QgBQ&oh=00_Aflij1pjLF6vMaqcWww6poBVDLF5bksCvmGqBEpHZ1ir_g&oe=6950B0E5" class="w-full h-full rounded-full object-cover " alt="">
                </div>
                <div class="flex gap-y-2 flex-col">
                    <div class="text-[24px] font-bold"> HENG AUTO SERVICE </div>
                    <p class="px-2 py-1 rounded-sm">#12123123</p>
                </div>
            </div>
            <div class="flex gap-x-2">
                <RiMegaphoneLine size="20px"/>
                <div>Social Media</div>
            </div>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                    <LSInput label="Name" placeholder="Enter name"/>
                    <LSInput label="English Name" placeholder="Enter name"/>
                    <LSInput label="Phone" placeholder="Enter name"/>
                    <LSInput label="Phone 2" placeholder="Enter name"/>
                    <LSInput label="Email" placeholder="Enter name"/>
                    <LSInput label="SubDescription" placeholder="Enter name"/>
                    <LSInput label="Sub Description English" placeholder="Enter name"/>
                    <LSInput label="Facebook URL" placeholder="Enter name"/>
                    <LSInput label="IN URL" placeholder="Enter name"/>
                    <LSInput label="Youtube URL" placeholder="Enter name"/>
                    <LSInput label="Telegram URL" placeholder="Enter name"/>
                    <LSInput label="Working Info" placeholder="Enter name"/>
            </div>
            <div class="flex flex-wrap gap-5 w-full">
                 <fwb-textarea
                    v-model="message"
                    :rows="4"
                    wrapperClasses="bg-red-300"
                    labelClasses="text-red-400 w-[300px]"
                    textareaClasses="bg-red-400 bg-white"
                    custom
                    label="Your message"
                    placeholder="Write your message..."
                />
            </div>
            <div class="flex w-full justify-end  gap-x-4">
                <LSBtn label="Cancel" class="bg-cancel"/>
                <LSBtn label="Save" class="bg-system"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LSBtn from '../../components/system/LSBtn.vue';
import { RiMegaphoneLine } from '@remixicon/vue';
import { FwbTextarea } from 'flowbite-vue'
import LSInput from '../../components/system/LSInput.vue';
    const isHasInfo = ref<boolean>(true)
    const clickOnButton=()=>{
        isHasInfo.value =!isHasInfo.value;
    }
    const message = ref('')
</script>

<style scoped>

</style>