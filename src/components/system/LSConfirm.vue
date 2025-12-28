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
      confirm.require({
        message: isEmptyData(system.confirm.message)?'Do you want to save? ':system.confirm.message,
        header: isEmptyData(system.confirm.title)? 'Confirm':system.confirm.title,
        icon: isEmptyData(system.confirm.icon)? 'pi pi-exclamation-triangle':system.confirm.icon,
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