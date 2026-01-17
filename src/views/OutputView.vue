<template>
    <v-container>
        <div>{{ message }}</div>
        <v-btn @click="goHome">Home</v-btn>
    </v-container>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const message = ref('')
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        onMounted(() => {
            message.value = store.getters["testStore/getMessage"]
        })

        const goHome = () => {
            console.log(route.path)
            router.push({name: "Temp"})
        }

        return {
            message,
            goHome
        }
    },
})
</script>
