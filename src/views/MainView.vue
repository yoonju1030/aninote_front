<template>
    <v-container fluid>
        <h1>アニメ</h1>
        <br/>
        <v-card>
            <v-row>
                <v-col
                v-for="n in list.filter(l => (l.idx < page * totalCount) & (l.idx >= (page-1) * totalCount))"
                :key="n"
                cols="12" 
                md="2">
                    <v-card @click="clickAnime(n.id)">
                        <v-img
                        :src="n.Image"
                        height="400"
                        cover
                        ></v-img>
                        <p>{{ n.Name }}</p>
                    </v-card>   
                </v-col>
            </v-row>
            <v-pagination
            v-model="page"
            :length="lengthOfPage">
            </v-pagination>


        </v-card>
    </v-container>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { getAnimes } from "../api/anime";

export default defineComponent({
    setup() {
        const router = useRouter()
        const list = ref([])
        const page = ref(1)
        const lengthOfPage = ref(0)
        const totalCount = 18

        onMounted(async () => {
            list.value = await getAnimes()
            lengthOfPage.value = (list.value.length / totalCount) + 1
        })

        const clickAnime = (id) => {
            router.push({path: `/anime/${id}`})
        }

        return {
            list, page, 
            lengthOfPage,
            clickAnime,
            totalCount
        }
    }
})

</script>