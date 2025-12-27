<template>
    <Paginator :rows="rows" :totalRecords="totalRecords" @update:first="onFirstChange" :class="prop.class" @page="onSelectPage" :rowsPerPageOptions="[10, 20,50,100]"></Paginator>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Paginator, { type PageState } from 'primevue/paginator';
const prop = defineProps(["class","row-btn","totalRecord",])
const rows = computed(()=>prop['row-btn']||10)
const emit = defineEmits(["onSelectPage"])
const totalRecords = computed(()=>prop['totalRecord']||0)
const onSelectPage=(page:PageState)=>{
    emit("onSelectPage",page)
}
const onFirstChange=(page:number)=>{
    console.log("first1",page)
}
</script>

<style scoped>

</style>