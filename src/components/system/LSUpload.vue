<template>
    <div class="flex flex-col gap-y-3">
        <div @click="onSelectFileUpload" class="w-full h-[30px] bd-card-1 h-[100px] cursor-pointer hover:bg-[#3d3d3d11] flex gap-y-3 justify-center flex-col items-center rounded-xl">
                <RiUploadCloudLine size="28px" class="color-2"/>
                <div class="text-[12px] color-2">Please Drag and drop you file here to upload </div>
                <input class="hidden" ref="ref_file" @change="changeFile" type="file"/>
        </div>
        <div class="w-full h-[80px] rounded-xl pr-4 pl-3 justify-between py-1 items-center bg-card flex gap-x-3"
         v-if="!isMulti && !isDrawerData &&!isEmptyData(previewImage) 
         && files!=undefined
         "
         >
            <div class="flex gap-x-3 items-center">
                <div @click="OnPreviewImage" class="w-[60px] h-[60px] bd-card-1 rounded-xl overflow-hidden">
                    <img :src="previewImage" @error="onErrorImage" class="w-full h-full object-cover" alt="">
                </div>
                <div class="text-[14px] color-3 truncate">{{ files[0]?.name }}</div>
            </div>
            <div @click="removeImage"  class="w-[40px] flex justify-center cursor-pointer items-center h-[40px] rounded-full hover:bg-[#42424217]">
                <RiCloseLine size="20px" class="text-red-500 "/>
            </div>
        </div>
        <div class="w-full h-[80px] rounded-xl pr-4 pl-3 justify-between py-1 items-center bg-card flex gap-x-3"
         v-else-if="!isMulti && isDrawer && !isEmptyData(dataModel) 
         "
         >
            <div class="flex gap-x-3 items-center">
                <div @click="OnPreviewImage" class="w-[60px] h-[60px] bd-card-1 rounded-xl overflow-hidden">
                    <img :src="`${GlobalText.url.hostUrl+uploadStore.pathImage}`" @error="onErrorImage" class="w-full h-full object-cover" alt="">
                </div>
                <div class="text-[14px] color-3 truncate">{{ dataModel?.pathImage.split("/")[dataModel?.pathImage.split("/").length-1] }}</div>
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
import { GlobalText, isEmptyData, onErrorImage } from '../../utils/global_helper';
import { useSystem } from '../../store/system';
import type { CarType } from '../../interface/car_type';
import { useUploadFileStore } from '../../store/upload_file_store';
const emit = defineEmits(["onChangeFile"])
const prop = defineProps(["isMulti"])
const isMulti = computed(()=>prop.isMulti || false)
const uploadStore  = useUploadFileStore();
const ref_file=ref<HTMLInputElement | null>();
const files = ref< File[] | FileList>();
const previewImage = ref<string>("");
const base64Image = ref<string>("");
const dataModel = defineModel<CarType>();
const isDrawer = defineModel<boolean>("isDrawerData");
const system = useSystem();
const onSelectFileUpload=()=>{
    if (ref_file.value) {
        ref_file.value.value = '';
        previewImage.value = "";
    }
    ref_file.value?.click();
}
export interface ChildPublicAPI {
  clearFile: () => void;
  setPathImage: (pathImage:string) => void;
}
const clearFile =()=>{
    previewImage.value = "";
    files.value = [];
    if(ref_file.value){
        ref_file.value.value = '';
    }
    previewImage.value = "";
}
const setPathImage =(pathImage:string)=>{
    // previewImage.value = pathImage;
    console.log("we got the path: ",pathImage)
}


defineExpose<ChildPublicAPI>({
    clearFile,
    setPathImage,
})
// watch(isDrawer,()=>{
//     if(isDrawer){
//         previewImage.value = GlobalText.url.hostUrl + dataModel.value?.pathImage;
//     }
// },{deep:true,immediate:true})

const OnPreviewImage=()=>{
    if(!isEmptyData(previewImage.value))system.setPathImage(previewImage.value)
    else system.setPathImage(isDrawer.value?GlobalText.url.hostUrl+uploadStore.pathImage: previewImage.value)
    system.setIsShowImage(true);
}
const changeFile=(e:Event)=>{
    const target = e.target as HTMLInputElement;
    isDrawer.value = false;
    if (!target.files || target.files.length === 0) return
    files.value = target.files;
    const blob = target.files[0] as Blob;
    const objectURL = URL.createObjectURL(blob);
    previewImage.value = objectURL;
    convertToBase64(blob);
}


const convertToBase64 = (file:Blob) => {
if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
        // This event handler is called when the read operation is successfully completed
        reader.onload = (e) => {
            // The result attribute contains the data as a data: URL (base64 encoded string)
            base64Image.value = e.target?.result as string;
            emit("onChangeFile",{
                base64:base64Image.value,
                file:file
            })
        };
        // This event handler is called if an error occurs
        reader.onerror = (error) => {
            console.error("FileReader error: ", error);
        };
        // Read the file content as a Data URL (which is a Base64 string)
        reader.readAsDataURL(file);
        console.log(111)
  } else {
    alert('Please select a valid image file.');
    base64Image.value = '';
    console.log(222)
  }
  
};
const removeImage=()=>{
    system.setConfirm({
        type:"delete",
        message:"Do you want to delete image?",
        onSave:()=>{
            if (ref_file.value) {
                ref_file.value.value = '';
                previewImage.value = "";
            }
            if(isDrawer){
                previewImage.value = "";
                dataModel.value = undefined;
            }
        },
        onCancel:()=>{

        }
    })
    system.setIsShowConfirm(true)
    
}
</script>

<style scoped>

</style>