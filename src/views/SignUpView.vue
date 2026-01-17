<template>
    <v-sheet 
    class="bg-deep-purple" 
    height="100%"
    rounded>
    <br/>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="id"
            :readonly="loading"
            :rules="[required, checkIdValidation]"
            class="mb-2"
            label="Id"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required, checkValidPassword]"
            class="mb-2"
            type="password"
            label="Password"
            placeholder="Enter your password"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :readonly="loading"
            :rules="[required, checkSamePassword]"
            class="mb-2"
            type="password"
            label="Password check"
            placeholder="Enter your password"
            clearable
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
            @click="signup"
          >
            Sign Up
          </v-btn>
        </v-form>
        <br/>
        <v-overlay
          :model-value="overlay"
          class="align-center justify-center"
          :persistent="true"
        >
          <v-progress-circular
            color="primary"
            size="64"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
        <v-alert
          v-model="alert"
          border="start"
          close-label="Close Alert"
          :color="alertColor"
          :title="title"
          variant="tonal"
          closable
        >
          {{resultMessage}}
        </v-alert>
      </v-card>
    </v-sheet>
  </template>
  <script>
  import { defineComponent, ref } from 'vue'
  import { checkDuplicatedId, signUpUser } from "../api/users";
  import commonObj from "../utils/common"
  
  export default defineComponent({
      setup() {
          const form = ref(false)
          const id = ref(null)
          const password = ref(null)
          const password2 = ref(null)
          const loading = ref(false)
          const overlay = ref(false)
          const alert = ref(false)
          const resultMessage = ref(null)
          const title = ref(null)
          const alertColor = ref(null)
          const onSubmit = () => {
              if (!this.form) {return}
              this.loading = true
              setTimeout(() => (this.loading = false), 2000)
          }
          const required = (v) => {
              return !!v || 'Field is required'
          }

          const checkValidPassword = (v) => {
            const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
            if (!reg.test(v)) {
                return "영문, 숫자 조합 8자리 이상 입력해주세요"
            }
          }

          const checkSamePassword = (v) => {
            if (password.value !== v) {
                return "비밀번호가 일치해야 합니다."
            }
          }

          const checkIdValidation = async (v) => {
            if (v.length < 8) {
                return "id는 8자 이상 필요합니다."
            } else {
                const unique = await checkDuplicatedId({id: v})
                if (unique === false){
                    return "중복된 Id 입니다."
                }
            }
          }

          const signup = async () => {
            overlay.value = !overlay.value
            const encryptedPassword = await commonObj.encryptData(password.value)
            console.log(encryptedPassword)
            const requestParams = {id: id.value, password: password.value}
            const insertedId = await signUpUser(requestParams)
            overlay.value = !overlay.value
            alert.value = true
            password.value = null
            password2.value = null
            if (insertedId === false) {
              title.value = "Fail"
              alertColor.value = "orange-accent-4"
              resultMessage.value = `${id.value} 회원가입 실패`
            } else {
              title.value = "Success"
              alertColor.value = "deep-purple-accent-4"
              resultMessage.value = `${id.value} 회원가입 완료`
            }
            id.value = null           
          }
  
          return {
              form,
              id,
              password, 
              password2,
              loading,
              onSubmit,
              required,
              checkSamePassword,
              checkIdValidation,
              checkValidPassword,
              overlay,
              signup,
              alert,
              resultMessage,
              title,
              alertColor
          }
      },
  })
  </script>
  