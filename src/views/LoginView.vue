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
          :rules="[required]"
          class="mb-2"
          label="Id"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          type="password"
          label="Password"
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
          @click="logIn"
        >
          Sign In
        </v-btn>
      </v-form>
      <br/>
      <v-btn
          color="grey-lighten-2"
          size="large"
          type="submit"
          variant="elevated"
          block
          @click="move"
        >
          Sign Up
        </v-btn>
    </v-card>
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
  </v-sheet>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";
import { logInUser } from '@/api/users';
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const router = useRouter()
        const form = ref(false)
        const id = ref(null)
        const password = ref(null)
        const loading = ref(false)
        const store = useStore()
        const overlay = ref(false)
        const onSubmit = () => {
            if (!this.form) {return}
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
        const required = (v) => {
            return !!v || 'Field is required'
        }
        
        const move = () => {
          router.push('/signup')
        }

        const logIn = async () => {
          overlay.value = true
          const result = await logInUser({id: id.value, password: password.value})
          if (result.token) {
            store.commit("userStore/setStatus", {login: true, id: id.value})
            store.commit("userStore/setToken", result.token)
          }
          overlay.value = false
          router.go(0)
        } 
        return {
            form,
            id,
            password, 
            loading,
            onSubmit,
            required,
            move,
            logIn,
            overlay
        }
    },
})
</script>
