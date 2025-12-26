<template>
  <div class="w-screen h-screen flex  gap-y-4 justify-center items-center ">
    <div class="bg-[#1231323] flex w-full max-w-[380px] max-[430px]:w-[340px] max-[430px]:gap-y-6 px-4 gap-y-3 flex-col">
      <div class="flex flex-col gap-2">
        <div class="text-[30px] text-center font-bold">{{ !isLogin?"Login":"Sign up" }}</div>
        <p class="text-center color-2 text-[13px] font-normal" v-if="isLogin">Create new account</p>
        <p class="text-center color-2 text-[13px] font-normal" v-else>Please login your account for access our service</p>
      </div>
       <div class="flex flex-col w-full gap-y-4 max-[430px]:gap-y-6">
          <LSInput 
          v-model="username" 
          placeholder="Enter username"  
          :required="true" 
           v-model:is-clear-error="isClearError"
          v-model:verify="verify"
          :invalid="isEmptyData(username)"
          label="Username"/>
          <LSInput 
          v-model="password" 
          placeholder="Enter password"
          :required="true"
          type="password"
           v-model:is-clear-error="isClearError"
          v-model:verify="verify"
          :invalid="isEmptyData(password)"
          label="Password"/>
          <LSInput v-if="isLogin"
          v-model="confirm_password" 
           v-model:verify="verify"
          v-model:is-clear-error="isClearError"
          :invalid="isEmptyData(password)"
          placeholder="Enter cornfirm password"
          :required="true"
             type="password"
          label="Confirm password"/>
          <l-s-btn :label="!isLogin?'Login':'Sign up'" class="w-full  cursor-pointer" :is-have-icon="true" type="save" @click-on-button="OnClickBtnLogin"/>
       </div>
       <div class="color-2 font-normal text-[13px] text-center">Already have an account ? <span class="cursor-pointer color-system" @click="onSwitchLogin">{{ isLogin?"Login":"Create New" }}</span></div>
       <div class="w-full flex-col gap-3">
          <div v-for="value in [1,2]" class="flex gap-x-4 items-center w-full bd-card p-4 mb-4 rounded-sm">
              <img :src="value==1?google:apple" class="w-[22px] h-[22px]" alt=""> 
              <p class="color-3 text-[14px]">Continues with {{ value==1?'Google':'Apple' }}</p>
          </div>
       </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import  LSInput from '../../components/system/LSInput.vue';
import LSBtn from '../../components/system/LSBtn.vue';
import google from '../../assets/logo/google.svg'
import apple from '../../assets/logo/apple.svg'
import { useRouter } from 'vue-router';
import { isEmptyData, ToastMessage } from '../../utils/global_helper';
const username = ref("")
const password = ref("")
const confirm_password = ref("")
const route = useRouter()
const isLogin = ref<boolean>(false)
const isClearError = ref<boolean>(false)
const verify = ref<boolean>(false)
const OnClickBtnLogin=()=>{
  // dynamic.value = !dynamic.value;
  // console.log("clicking the button",{dynamic:dynamic.value,username:username.value,password:password.value})
  // 
  verify.value = !verify.value;
  // system.setIsShowToast(!system.IsShowToast);
    if(isEmptyData(username.value) || isEmptyData(password.value)){
      ToastMessage({type:"error",detail: "Username or Password is required!"})
      return;
    }
    if(isLogin.value && isEmptyData(confirm_password.value)){
      ToastMessage({type:"error",detail: "Username or Password is required!"})
      return;
    }
    if(username.value =="admin" && password.value=="Work@123"){
        route.push('/')
        ToastMessage({type:"success",detail: "Username or Password is required!"})
    }else{
      ToastMessage({type:"error",detail: "Your account is incorrect"})
    }
  console.log("show")
}
const onSwitchLogin=()=>{
  isLogin.value=!isLogin.value;
  isClearError.value  = true;
}
</script>

<style lang="scss" scoped></style>