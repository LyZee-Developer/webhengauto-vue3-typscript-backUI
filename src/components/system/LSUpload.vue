<template>
    <div class="flex flex-col gap-y-3">
        <div @click="onSelectFileUpload" class="w-full h-[30px] bd-card-1 h-[100px] cursor-pointer hover:bg-[#3d3d3d11] flex gap-y-3 justify-center flex-col items-center rounded-xl">
                <RiUploadCloudLine size="28px" class="color-2"/>
                <div class="text-[12px] color-2">Please Drag and drop you file here to upload </div>
                <input class="hidden" ref="ref_file" @change="changeFile" type="file"/>
        </div>
        <div class="w-full h-[80px] rounded-xl pr-4 pl-3 justify-between py-1 items-center bg-card flex gap-x-3" v-if="!isMulti && !isEmptyData(previewImage) && files!=undefined">
            <div class="flex gap-x-3 items-center">
                <div @click="OnPreviewImage" class="w-[60px] h-[60px] bd-card-1 rounded-xl overflow-hidden">
                    <img :src="previewImage" class="w-full h-full object-cover" alt="">
                </div>
                <div class="text-[14px] color-3 truncate">{{ files[0]?.name }}</div>
            </div>
            <div @click="removeImage" class="w-[40px] flex justify-center cursor-pointer items-center h-[40px] rounded-full hover:bg-[#42424217]">
                <RiCloseLine size="20px" class="text-red-500 "/>
            </div>
        </div>
        <div v-else class="flex w-full flex-col gap-y-3">
            <div>
                <!-- h1ere -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RiCloseLine, RiUploadCloudLine } from '@remixicon/vue';
import { computed, ref } from 'vue';
import { isEmptyData } from '../../utils/global_helper';
import { useSystem } from '../../store/system';
const emit = defineEmits(["onChangeFile"])
const prop = defineProps(["isMulti"])
const isMulti = computed(()=>prop.isMulti || false)
const ref_file=ref<HTMLInputElement | null>();
const files = ref< File[] | FileList>();
const previewImage = ref<string>("");
const system = useSystem();
const onSelectFileUpload=()=>{
    ref_file.value?.click();
}
const OnPreviewImage=()=>{
    if(!isEmptyData(previewImage.value)){
        system.setPathImage(previewImage.value)
        system.setIsShowImage(true);
    }
}
const changeFile=(e:Event)=>{
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return
    files.value = target.files;
    const blob = target.files[0] as Blob;
    const objectURL = URL.createObjectURL(blob);
    previewImage.value = objectURL;
}
const removeImage=()=>{
    if (ref_file.value) {
        ref_file.value.value = '';
        previewImage.value = "";
    }
}
</script>

<style scoped>

</style>