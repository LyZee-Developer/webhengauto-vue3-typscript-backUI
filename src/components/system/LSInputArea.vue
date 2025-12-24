<template>
  <fwb-textarea
    v-model="message"
    :rows="4"
    label="Your message"
    class="w-full"
    placeholder="Write your message..."
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FwbTextarea } from 'flowbite-vue'
const message = ref('')
</script>

<style lang="scss" >
    
</style>