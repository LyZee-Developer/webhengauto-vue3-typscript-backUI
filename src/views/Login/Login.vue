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
          :invalid="isEmptyData(password) || differentPassword"
          label="Password"/>
          <LSInput v-if="isLogin"
          v-model="confirm_password" 
           v-model:verify="verify"
          v-model:is-clear-error="isClearError"
          :invalid="isEmptyData(confirm_password) || differentPassword"
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
      
           <GoogleLogin :callback="callback" class="w-full">
            <div class="flex gap-x-4 items-center w-full bd-card p-4 mb-4 rounded-sm">
                <img :src="google" class="w-[22px] h-[22px]" alt=""> 
                <p class="color-3 text-[14px]">Continues with Google</p>
            </div>
          </GoogleLogin>
          <div class="flex gap-x-4 items-center w-full bd-card p-4 mb-4 rounded-sm">
              <img :src="apple" class="w-[22px] h-[22px]" alt=""> 
              <p class="color-3 text-[14px]">Continues with Apple</p>
          </div>
          <div class="text-[11px] color-2 text-center">
            The website was developed by <span class="color-system">@Ly Leangseng</span>
          </div>
       </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import  LSInput from '../../components/system/LSInput.vue';
import LSBtn from '../../components/system/LSBtn.vue';
import google from '../../assets/logo/google.svg'
import apple from '../../assets/logo/apple.svg'
import { useRouter } from 'vue-router';
import { isEmptyData, ToastMessage } from '../../utils/global_helper';
import { style } from '../../css/css';
import { GoogleLogin } from 'vue3-google-login';
import { useHttp } from '../../utils/useHttpRequestion';
const username = ref("")
const password = ref("")
const confirm_password = ref("")
const route = useRouter()
const isLogin = ref<boolean>(false)
const differentPassword = ref<boolean>(false)
const aniLogin = ref<boolean>(false)
const isClearError = ref<boolean>(false)
const verify = ref<boolean>(false)
const OnClickBtnLogin=async()=>{
    verify.value = !verify.value;
    if(isEmptyData(username.value) || isEmptyData(password.value)){
      ToastMessage({type:"error",detail: "Username or Password is required!"})
      return;
    }
    if(isLogin.value && isEmptyData(confirm_password.value)){
      ToastMessage({type:"error",detail: "Confirm is required!"})
      return;
    }
    if(password.value != confirm_password.value && isLogin.value){
      ToastMessage({type:"error",detail: "Make sure your password and confirm password are the same!"})
      return;
    }
    if(isLogin.value){
      //here got create user
       await useHttp({
                url:`/api/auth_access/create`,
                data:{ 
                    // "UserId":83,
                    "type":"A", //A(Admin) || O(Other
                    "userName":username.value,
                    "password": password.value,
                    "status":true
                },
                method:"PoST",
                responseResult:()=>{
                    ToastMessage({type:"success",detail: "Create account successfully"})
                },
            })
    }else{
      await useHttp({
              url:`api/auth_access/login?username=${username.value}&password=${password.value}`,
              responseResult:(result)=>{
                  if(result.data) {
                    sessionStorage.setItem('user', JSON.stringify({ name: username.value , attempted:true }));
                    route.push('/')
                  }
                  ToastMessage({type:result.data?"success":"error",detail: result.data?"Login successfully":"Your account is not correct!"})
              },
          })
    }
}
const callback = (response:any) => {
  // This callback is triggered upon successful sign-in
  console.log("Handle the response", response)
  // getUserAccountFromGoogle(response.code)
  route.push('/')
  setTimeout(() => {
    ToastMessage({type:"success",detail: "Login successfully!"})
  }, 300);
  // Decode the JWT credential to get user data
  // const userData = decodeCredential(response.credential)
  // console.log("User Data", userData)
  
  // Send the JWT to your backend for validation and session management
}
// const getUserAccountFromGoogle=async(code:string)=>{
//   console.log("access to api google")
//   var result = await axios.post('/api/auth/google', {code})
//   console.log(result.data)
// }
const onSwitchLogin=()=>{
  isLogin.value=!isLogin.value;
  isClearError.value  = true;
}
watch(isClearError,()=>{
  username.value="";
  password.value="";
  confirm_password.value="";
},{deep:true,immediate:true})
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

<style lang="scss" scoped>
  .full-screen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 100% of the viewport width */
  height: 100vh; /* 100% of the viewport height */
  background-color: rgba(0, 0, 0, 0.8); /* Dark background with opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
}

.login-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  /* Add more styling for the login box itself */
}
</style>