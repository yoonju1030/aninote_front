<template>
    <h1>{{ message }}</h1>
    <v-btn @click="console.log('no api (method name: apiTest)')">API</v-btn>
</template>
<script>
import { defineComponent } from 'vue'
import { requestGet } from "../api/test";

export default defineComponent({
    setup() {
        const message = "Hello"
        const apiTest = async () => {
            const response = await requestGet()
            console.log(response)
        }
        return {
            message,
            apiTest
        }
    },
})
</script>

