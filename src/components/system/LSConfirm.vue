<template>
   <ConfirmDialog class="!w-[400px]">
   </ConfirmDialog>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue';
import ConfirmDialog from 'primevue/confirmdialog';
import { isEmptyData } from '../../utils/global_helper';
import { useSystem } from '../../store/system';
import { watch } from 'vue';
const confirm = useConfirm();
const system = useSystem();
watch(system,()=>{
   if(system.IsShowConfirm){
     var icon = "pi pi-question-circle";
     if(system.confirm.type?.toLowerCase()=="edit" || system.confirm.type?.toLowerCase()=="update" ){
        icon = "pi pi-exclamation-circle";
     }
     if(system.confirm.type?.toLowerCase()=="delete"){
        icon = "pi pi-trash";
     }
     if(system.confirm.type?.toLowerCase()=="leave" || system.confirm.type?.toLowerCase()=="exit" ){
        icon = "pi pi-sign-out";
     }
      confirm.require({
        message: isEmptyData(system.confirm.message)?'Do you want to save? ':system.confirm.message,
        header: isEmptyData(system.confirm.title)? 'Confirm':system.confirm.title,
        icon: icon,
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: system.confirm.type?.toLowerCase() == "delete"?'Delete':'Save',
            severity: system.confirm.type?.toLowerCase() == "delete"?'danger':'',
        },
        accept: () => {
            console.log("save")
            system.confirm.onSave()
        },
        reject: () => {
             console.log("cancel")
             system.confirm.onCancel()
        }
    });
      system.IsShowConfirm=false;

   }
},{deep:true,immediate:true})
</script>

<style scoped>

</style>