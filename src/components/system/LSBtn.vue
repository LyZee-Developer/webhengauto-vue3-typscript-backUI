<template>
            <div>
                <Button  :disabled="isDisabled" :label="prop.label" :class="prop.class" :severity="color" 
                    class="w-full"
                :pt="{
                        label: { class: 'text-[15px] font-medium' }
                    }"
                :loading="prop.isLoading" icon="pi pi-search" @click="onClickButton" >
                    <template #icon v-if="isHasIcon">
                        <RiSaveLine size="15px" class="font-medium" v-if="type.toLowerCase()=='save'"/>
                        <RiCloseLine size="15px" v-else-if="type.toLowerCase()=='cancel'"/>
                        <RiRefreshLine size="15px" v-else-if="type.toLowerCase()=='reset'"/>
                        <RiAddLine size="20px"  v-else-if="type.toLowerCase()=='add'"/>
                        <RiDeleteBinLine size="20px"  v-else-if="type.toLowerCase()=='delete'"/>
                    </template>
                </Button>
            </div>
</template>

<script lang="ts" setup>
    import { RiAddLine, RiCloseLine, RiDeleteBinLine, RiRefreshLine, RiSaveLine } from '@remixicon/vue'
import { Button } from 'primevue'
import { computed } from 'vue'
    const prop = defineProps(["label","color","isDisabled","class","type","color","isLoading","isHasIcon"])
    const emit = defineEmits(["clickOnButton"])
    const isHasIcon = computed(()=>prop.isHasIcon|| false)
    const isDisabled = computed(()=>prop.isDisabled|| false)
    const type = computed(()=>prop.type || "")
    const onClickButton=()=>{
        emit("clickOnButton")
    }
    const color = computed(()=>{
        var cl = "secondary";
        if(prop.type=="cancel") cl ="secondary";
        if(prop.type=="save" || prop.type=='add') cl ="success";
        if(prop.type=="info") cl ="info";
        if(prop.type=="danger" || prop.type=="delete") cl ="danger";
        if(prop.type=="warn" || prop.type=="reset" ) cl ="warn";
        if(prop.type=="contrast") cl ="contrast";
        return cl;
    })
</script>

<style lang="scss" scoped>

</style>