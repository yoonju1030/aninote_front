<template>
        <v-container>
            <v-row>
                <v-col cols="9">
                    <v-text-field
                    v-model="message"/>
                </v-col>
                <v-col cols="3">
                    <v-btn @click="setStore">Save</v-btn>
                    </v-col>
            </v-row>
        </v-container>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const message = ref('')
        const store = useStore()
        const setStore = () => {
            store.commit("testStore/setMessage", { message: message.value })
        }
        return {
            message,
            setStore
        }
    },
})
</script>
