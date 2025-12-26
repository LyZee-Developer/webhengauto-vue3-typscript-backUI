<template>
    <div :class="`grid w-full h-full grid-rows-[80px_1fr] rounded-2xl max-[430px]:p-0 px-5 py-2 ${system.isDark?'min-[430px]:bg-black':'min-[430px]:bg-white'}`">
        <div class="font-bold flex gap-x-3 items-center w-full justify-between">
            <div class="color-4 flex gap-x-3">
                <RiToolsLine size="20px"/>
                <h1>Service</h1>
            </div>
            <div><LSBtn label="Create" type="add"  @click-on-button="onclickCreate" :isHasIcon="true"/></div>
        </div>
        <div class="w-full h-full">
            <div class="flex justify-between">
                <Select size="small" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-[90px] h-[45px]" />
                <div class="flex gap-x-3">
                    <div class="w-[45px] h-[45px] bg-card cursor-pointer rounded-lg flex justify-center items-center">
                        <RiRefreshLine size="18px" class="color-3"/>
                    </div>
                    <div class="max-[430px]:w-[180px]"><LSInput placeholder="Search here..." /></div>
                </div>
            </div>
            <div class="grid pt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                <div class="w-full rounded-lg p-3 bg-card" v-for="value in [1,2,3,4,5,1,2,3,4]">
                    <div class="flex gap-x-3">
                        <div class="p-[4px] rounded-full bd-card w-[45px] h-[45px]">
                            <img src="../../assets/flag/Flag_of_Cambodia.svg.webp" class="w-full h-full rounded-full object-cover" alt="">
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <div class="text-[15px] color-4">Sabay</div>
                            <div class="text-[13px] color-2">Sabay</div>
                        </div>
                       
                    </div>
                    <div class="w-full flex justify-end color-3 text-[12px]">
                            <span>@lyzee</span><span>{{ moment().format('LL') }}</span>
                    </div>
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
                :invalid="isEmptyData(data.Name)" 
                :required="true" 
                v-model:verify="verify"
                v-model:is-reset="isReset"
                v-model="data.Name" />
                <LSInput 
                label="English Name" 
                v-model:verify="verify"
                v-model:is-reset="isReset"
                :invalid="isEmptyData(data.EnglishName)" 
                :required="true"
                 v-model="data.EnglishName"
                 />
                <div class="flex gap-x-6">
                    <div class="flex items-center gap-2">
                    <RadioButton v-model="status" inputId="Active"  name="active" value="active" />
                    <label for="Active" class="text-[13px] color-3">{{ tr.active }}</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <RadioButton v-model="status" inputId="Disabled" name="disabled" value="disabled" />
                        <label for="Disabled" class="text-[13px] color-3">{{ tr.disabled }}</label>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex gap-x-3 justify-end">
                    <LSBtn :is-has-icon="true" label="Cancel" type="cancel" @click-on-button="isShowDrawer=false"/>
                    <LSBtn :is-has-icon="true" label="reset" type="reset" @click-on-button="onClickButtonReset"/>
                    <LSBtn :is-has-icon="true" label="save" type="save" @click-on-button="onClickButtonSave"/>
                </div>
            </template>
        </LSDrawer>
    </div>
</template>

<script setup lang="ts">
import {  RiRefreshLine, RiToolsLine, RiUserCommunityFill } from '@remixicon/vue';
import { ref, watch } from 'vue';
import { Select ,RadioButton ,DataTable,Column} from 'primevue';
import LSInput from '../../components/system/LSInput.vue';
import { useSystem } from '../../store/system';
import LSBtn from '../../components/system/LSBtn.vue';
import moment from 'moment';
import LSDrawer from '../../components/system/LSDrawer.vue';
import { isEmptyData } from '../../utils/global_helper';
const system = useSystem();
const tr  = ref<Record<string,string>>({});
const isShowDrawer=ref<boolean>(false);
const isCreate=ref<boolean>(false);
const isReset=ref<boolean>(false);
const verify=ref<boolean>(false);
const customers=ref([
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
    {
        country:"Hong",
        name:"Hong2",
    },
]);
const status=ref<string>("active");
const data =ref({
    Name:"",
    EnglishName:"",
    IsDisabled:false,
})
const onClickButtonSave=()=>{
    verify.value = !verify.value;
}
const onClickButtonReset=()=>{
    isReset.value = !isReset.value;
}
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