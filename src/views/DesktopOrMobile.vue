<template>
        <WrapContentBody>
            
            <!-- //Setting -->
            <OwnerView v-if="content=='owner'"></OwnerView>
            <PartnerView v-else-if="content=='partner'"></PartnerView>
            <ServiceView v-else-if="content=='service'"></ServiceView>
            <CarView v-else-if="content=='car'"></CarView>
            <!-- //user -->
            <UserView v-else-if="content=='user'"></UserView>
            <SecurityPasswordView v-else-if="content=='security_password'"></SecurityPasswordView>
            <!-- //content -->
            <ContentView v-else-if="content=='content'"></ContentView>
            <!-- //booking_appointment -->
            <BookingAppointmentView v-else-if="content=='booking_appointment'"></BookingAppointmentView>
            <!-- //Chart -->
            <ChartView v-else-if="content=='chart'"></ChartView>
        </WrapContentBody>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import WrapContentBody from '../components/system/WrapContentBody.vue';
import { menu_data } from '../utils/system_data';
import OwnerView from './setting/OwnerView.vue';
import PartnerView from './setting/PartnerView.vue';
import ServiceView from './setting/ServiceView.vue';
import CarView from './setting/CarView.vue';
import { useSystem } from '../store/system';
import UserView from './user/UserView.vue';
import SecurityPasswordView from './user/SecurityPasswordView.vue';
import ContentView from './content/ContentView.vue';
import BookingAppointmentView from './book_appointment/BookingAppointmentView.vue';
import ChartView from './chart/ChartView.vue';

const route = useRoute();
var path = route.fullPath.split("/");
console.log(path)
const code = ref(path[path.length-1])  
const parent = ref(path[path.length-2]) 
const system = useSystem();
const content = ref<string | undefined>(system.viewType);
watch(system,()=>{
    console.log("get",system.viewType)
   content.value = system.viewType
},{deep:true,immediate:true})
onMounted(()=>{
     var menus = path.length==3?menu_data.filter(val=>val.code==parent.value):menu_data.filter(val=>val.code==code.value);
    if(menus.length>0 ){
        menus.map((val)=>{
            if(val.subMenu.length>0 && path.length==3){
                var getCode = val.subMenu.find(s=>s.code==code.value)
                content.value = getCode?.code;
                system.setViewType(content.value || "");
            }else{
                content.value = menus[0]?.subMenu[0]?.code;
                system.setViewType(content.value || "");
            }
        })
    }
})
</script>

<style scoped>

</style>