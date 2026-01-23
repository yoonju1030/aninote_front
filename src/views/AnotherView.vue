<template>
    <h1>{{ message }}</h1>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const message = process.env.VUE_APP_MESSAGE
        return {
            message
        }
    },
})
</script>

