<script setup lang="ts">
import axios from 'axios'

// declare global {
//   interface Window {
//     grecaptcha: any
//   }
// }

const submitForm = async () => {
    console.log("to get capchar")
  // await window.grecaptcha.ready()

  const token = await window.grecaptcha.execute(
    '6Lff8UUsAAAAAJCB9MMwCA_5MpZKA4nKSuPuW-4i',
    { action: 'login' }
  )
    console.log("token",token)
  // send token to backend
  await axios.post('/api/verify-recaptcha', { token })
}
</script>

<template>
  <button @click="submitForm">Login</button>
</template>
