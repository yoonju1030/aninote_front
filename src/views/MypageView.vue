<template>
    <v-container fluid>
        <v-card
        variant="text"
        :title="id"
        subtitle="작성 댓글 모음">
        </v-card>
        <v-card
        title="reviews">
        <div class="ma-2" 
        v-for="review in reviews.slice((page-1)*5, page*5)"
        :key="review">
            <v-card
            variant="text"
            :title="review.name"
            :subtitle="review.time"
            @click="move(review.id)"
            >
                <v-card-text class="bg-surface-light pt-4">{{review.content}}</v-card-text>
            </v-card>                            
        </div>
        <br/>
            <div class="ma-2">
                <v-pagination
                    v-model="page"
                    :length="lengthOfPage">
                </v-pagination>
            </div>
        
        </v-card>
    </v-container>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCommentsByUser } from "@/api/anime"

export default defineComponent({
    setup() {
        const router = useRouter()
        const store = useStore()
        const id = store.getters["userStore/getUserId"]
        const reviews = ref([])
        const page = ref(1)
        const lengthOfPage = ref(0)
        onMounted(async () => {
            const tokenInfo = store.getters['userStore/getToken']
            const result = await getCommentsByUser({"userId": id}, tokenInfo)
            reviews.value = result
            lengthOfPage.value = (reviews.value.length / (1+5)) + 1
        })

        const move = (id) => {
            router.push(`/anime/${id}`)
        }
       return {
        id,
        reviews, lengthOfPage,
        page,
        move
       } 
    },
})
</script>
