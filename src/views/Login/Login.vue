<template>
  <div class="w-screen h-screen flex  gap-y-4 justify-center items-center ">
    <div class="bg-[#1231323] flex max-w-[330px] px-4 gap-y-3 flex-col">
      <div class="text-[30px] text-center font-bold">{{ !isLogin?"Login Account":"Create your account" }}</div>
      <p class="text-center" v-if="isLogin">Note that phone verification may be required for signup. Your number will only be used to verify you identity for security purposes.</p>
      <p class="text-center" v-else>Enter name and password to get started</p>
       <div class="flex flex-col gap-y-3">
          <LSInput 
          v-model="username" 
          v-model:trigger="dynamic" 
          size="size-2" 
          type="txt" 
          placeholder="Enter username"  
          :required="true" 
          label="Username"/>
          <LSInput 
          v-model="password" 
          v-model:trigger="dynamic"
          size="size-2" 
          type="pw" 
          placeholder="Enter password"
          :required="true"
          label="Password"/>
          <LSInput v-if="isLogin"
          v-model="confirm_password" 
          v-model:trigger="dynamic"
          size="size-2" 
          type="pw" 
          placeholder="Enter cornfirm password"
          :required="true"
          label="Confirm password"/>
          <l-s-btn label="Login" class="w-full  cursor-pointer" @click-on-button="OnClickBtnLogin"/>
       </div>
       <div >Already have an account ? <span class="cursor-pointer" @click="isLogin=!isLogin">{{ isLogin?"Login":"Create New" }}</span></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import  LSInput from '../../components/system/LSInput.vue';
import LSBtn from '../../components/system/LSBtn.vue';
import { useRouter } from 'vue-router';
const username = ref("")
const password = ref("")
const confirm_password = ref("")
const route = useRouter()
const dynamic = ref(false)
const isLogin = ref<boolean>(false)
const OnClickBtnLogin=()=>{
  dynamic.value = !dynamic.value;
  console.log("clicking the button",{dynamic:dynamic.value,username:username.value,password:password.value})
  route.push('/')
}

</script>

<style lang="scss" scoped></style>