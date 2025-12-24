<template>
    <div>
        <fwb-button @click="onClickButton" color="green" size="xl" :class="prop.class" >{{ prop.label||"" }}</fwb-button>
    </div>
</template>

<script lang="ts" setup>
    import { FwbButton } from 'flowbite-vue'
    const prop = defineProps(["label","color","class"])
    const emit = defineEmits(["clickOnButton"])
    const onClickButton=()=>{
        emit("clickOnButton")
    }
</script>

<style lang="scss" scoped>

</style>