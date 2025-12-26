<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-3 flex gap-x-3">
                <RiUserCommunityFill size="20px"/>
                <h1>Partner</h1>
            </div>
            <div><LSBtn label="Create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
        </div>
        <div class="w-full h-full">
            <div class="flex justify-between">
                <Select size="small" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-[90px] h-[36px]" />
                <div class="flex gap-x-3">
                    <div class="w-[45px] h-[45px] bg-card cursor-pointer rounded-lg flex justify-center items-center">
                        <RiRefreshLine size="18px" class="color-3"/>
                    </div>
                    <LSInput placeholder="Search here..."/>
                </div>
            </div>
        </div>
        <LSDrawer v-model="isShowDrawer">
            <template #header>
                Create new partner
            </template>
            <div class="mt-3 flex flex-col gap-y-6">
                <LSInput
                 label="Name" 
                 placeholder="Enter name"
                :invalid="isEmptyData(data.Name)" 
                :required="true" 
                v-model="data.Name" />
                <LSInput 
                label="English Name" 
                placeholder="Enter english name"
                :invalid="isEmptyData(data.EnglishName)" 
                :required="true" v-model="data.EnglishName"
                 />
                <div class="flex gap-x-6">
                    <div class="flex items-center gap-2">
                    <RadioButton v-model="status" inputId="Active"  name="active" value="active" />
                    <label for="Active" class="text-[13px]">{{ tr.active }}</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="status" inputId="Disabled" name="disabled" value="disabled" />
                        <label for="Disabled" class="text-[13px]">{{ tr.disabled }}</label>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex gap-x-3 justify-end">
                    <LSBtn :is-has-icon="true" label="Cancel" type="cancel" @click-on-button="isShowDrawer=false"/>
                    <LSBtn :is-has-icon="true" label="reset" type="reset" @click-on-button="isShowDrawer=false"/>
                    <LSBtn :is-has-icon="true" label="save" type="save" @click-on-button="isShowDrawer=false"/>
                </div>
            </template>
        </LSDrawer>
    </div>
</template>

<script setup lang="ts">
import {  RiRefreshLine, RiUserCommunityFill } from '@remixicon/vue';
import { ref, watch } from 'vue';
import { Select ,RadioButton} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData } from '../../utils/global_helper';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const isShowDrawer=ref(false);
const isCreate=ref(false);
const status=ref("active");
const data =ref({
    Name:"",
    EnglishName:"",
    IsDisabled:false,
})
const selectedCity = ref({ name: '10', code: '10' });
const cities = ref([
    { name: '10', code: '10' },
    { name: '20', code: '20' },
    { name: '50', code: '50' },
    { name: '100', code: '100' },
]);

const onclickCreate=()=>{
    isCreate.value = true;
    isShowDrawer.value = true;
}
watch(system,()=>{
    tr.value = system.language;
},{deep:true,immediate:true})

watch(isShowDrawer,()=>{
    if(isCreate.value) status.value = "active"
},{deep:true,immediate:true})
</script>

<style scoped>

</style>