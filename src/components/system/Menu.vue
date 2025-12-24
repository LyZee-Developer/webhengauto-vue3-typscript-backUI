<template>
    <div class="w-full flex justify-center items-center h-full flex-col">
        <div class="max-w-[850px] flex flex-wrap justify-center items-center gap-6 p-4">
        
            <LSToolTip v-for="item in menu_data" :title="system.language[item.title]">
                <RouterLink :to="`/${item.code}`">
                        <div  :class="`w-[120px] h-[120px]  hover:opacity-100 opacity-80 bg-card-2 cursor-pointer ${style.tr200} rounded-3xl ${style.wrapCenter}`">
                        <RiSettings4Fill size="40px" v-if="item.code=='setting'" class="color-3 hover-color-system"/>
                        <RiUserSettingsFill size="40px" v-if="item.code=='user'"  class="color-3 hover-color-system"/>
                        <RiContactsBookFill size="40px" v-if="item.code=='content'"  class="color-3 hover-color-system"/>
                        <RiBookAiFill size="40px" v-if="item.code=='booking'"  class="color-3 hover-color-system"/>
                </div></RouterLink>
            </LSToolTip>
        </div>
        <div class="text-[30px]">Welcome to github action233</div>
    </div>
</template>

<script setup lang="ts">
import { RiBookAiFill, RiContactsBookFill, RiSettings4Fill, RiUserSettingsFill } from '@remixicon/vue';
import { style } from '../../css/css';
import LSToolTip from './LSToolTip.vue';
import { menu_data } from '../../utils/system_data';
import { RouterLink } from 'vue-router';
import { useSystem } from '../../store/system';
const system = useSystem();
</script>

<style lang="scss" scoped>

</style>