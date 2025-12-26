<template>
  <div class="w-screen h-screen  flex  gap-y-4 justify-center items-center ">
    <div class="bg-[#1231323] flex w-full max-w-[380px] max-[430px]:w-[340px] max-[430px]:gap-y-6 px-4 gap-y-7 flex-col">
      <div class="flex flex-col gap-2">
        <div class="text-[30px] text-center font-bold color-3">{{ !isLogin?"Heng Auto Service":"Sign up" }}</div>
        <p class="text-center color-2 text-[13px] font-normal" v-if="isLogin">Create new account</p>
        <p class="text-center color-2 text-[13px] font-normal" v-else>Please login your account for access our service</p>
      </div>
       <div class="flex flex-col w-full gap-y-5 max-[430px]:gap-y-6">
          <LSInput 
          v-model="username" 
          placeholder="Enter username"  
          :required="true" 
           v-model:is-clear-error="isClearError"
          v-model:verify="verify"
          :invalid="isEmptyData(username)"
          @onKeyDown="onKeyDown"
          label="Username"/>
          <LSInput 
          v-model="password" 
          placeholder="Enter password"
          :required="true"
          @onKeyDown="onKeyDown"
          type="password"
           v-model:is-clear-error="isClearError"
          v-model:verify="verify"
          :invalid="isEmptyData(password)"
          label="Password"/>
          <LSInput v-if="isLogin"
          v-model="confirm_password" 
           v-model:verify="verify"
          v-model:is-clear-error="isClearError"
          :invalid="isEmptyData(confirm_password)"
          placeholder="Enter cornfirm password"
          :required="true"
             type="password"
          label="Confirm password"/>
          <div :class="`${aniLogin?'scale-75':''} ${style.tr300}`">
            <l-s-btn :label="!isLogin?'Login':'Sign up'" class="w-full cursor-pointer" :is-have-icon="true" type="save" @click-on-button="onClickButtonLogin"/>
          </div>
       </div>
       <div class="color-2 font-normal text-[13px] text-center">Already have an account ? <span class="cursor-pointer color-system" @click="onSwitchLogin">{{ isLogin?"Login":"Create New" }}</span></div>
       <div class="w-full flex-col gap-3">
          <div v-for="value in [1,2]" class="flex gap-x-4 items-center w-full bd-card p-4 mb-4 rounded-sm">
              <img :src="value==1?google:apple" class="w-[22px] h-[22px]" alt=""> 
              <p class="color-3 text-[14px]">Continues with {{ value==1?'Google':'Apple' }}</p>
          </div>
          <div class="text-[11px] color-2 text-center">
            The website was developed by <span class="color-system">@Ly Leangseng</span>
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
import { style } from '../../css/css';
const username = ref("")
const password = ref("")
const confirm_password = ref("")
const route = useRouter()
const isLogin = ref<boolean>(false)
const aniLogin = ref<boolean>(false)
const isClearError = ref<boolean>(false)
const verify = ref<boolean>(false)
const OnClickBtnLogin=()=>{
    verify.value = !verify.value;
    if(isEmptyData(username.value) || isEmptyData(password.value)){
      ToastMessage({type:"error",detail: "Username or Password is required!"})
      return;
    }
    if(isLogin.value && isEmptyData(confirm_password.value)){
      ToastMessage({type:"error",detail: "Confirm is required!"})
      return;
    }
    if(username.value =="admin" && password.value=="Work@123"){
        if(isLogin.value && password.value != confirm_password.value){
          ToastMessage({type:"error",detail: "Password and Confirm are differenc value!"})
          return;
        }
        route.push('/')
        ToastMessage({type:"success",detail: "Username or Password is required!"})
        localStorage.setItem("isHasLogin","Yes")
    }else{
      ToastMessage({type:"error",detail: "Your account is incorrect"})
    }
}

const onSwitchLogin=()=>{
  isLogin.value=!isLogin.value;
  isClearError.value  = true;
}
const onClickButtonLogin=()=>{
  OnClickBtnLogin()
    aniLogin.value = true;
    setTimeout(() => {
      aniLogin.value = false;
    }, 90);
}
const onKeyDown=(e:KeyboardEvent)=>{
  if(e.key=="Enter") {
    OnClickBtnLogin()
    aniLogin.value = true;
    setTimeout(() => {
      aniLogin.value = false;
    }, 90);
  }
}
</script>

<style lang="scss" scoped></style>