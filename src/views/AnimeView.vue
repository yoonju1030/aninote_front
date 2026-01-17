<template>
    <v-container fluid>
        <h1>{{ animeInfo.name }}</h1>
        <br/>
        <v-row>
            <v-col cols="3">
                <v-img :src="animeInfo.image">
                </v-img>
            </v-col>
            <v-col cols="9">
                <v-card variant="text">
                        <v-chip 
                        v-for="tag in animeInfo.tags"
                        :key="tag"
                        class="ma-2"
                        variant="outlined">
                            {{tag}}
                        </v-chip>
                        <br/>
                        <div class="ma-2">
                            <v-list lines="three">
                                <v-list-item
                                    v-for="n in infoView"
                                    :key="n"
                                    :title="n.key"
                                    :subtitle="n.value"
                                ></v-list-item>
                            </v-list>
                        </div>
                </v-card>
            </v-col>    
        </v-row>
        <br/>
        <v-dialog
        v-model="logoutDialog"
        width="auto"
        >
            <v-card
                max-width="400"
                text="로그인이 필요합니다"
            >
                <template v-slot:actions>
                <v-btn
                    class="ms-auto"
                    text="Login"
                    @click="moveLogin"
                ></v-btn>
                </template>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="loginDialog"
        width="auto"
        >
            <v-card
                max-width="400"
                text="댓글이 작성되었습니다."
            >
                <template v-slot:actions>
                <v-btn
                    class="ms-auto"
                    text="Ok"
                    @click="successComment"
                ></v-btn>
                </template>
            </v-card>
        </v-dialog>
        <v-card variant="outlined">
            <div class="ma-2" align="center" justify="center"><h2>Review</h2></div>
                    <v-row align="center" justify="center">
                        <v-col cols="10">
                            <v-textarea
                            v-model="comment"
                            label="comment"
                            row-height="20"
                            rows="2"
                            variant="filled"
                            no-resize
                            ></v-textarea>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn 
                            icon="mdi-plus" 
                            size="small"
                            @click="checkLoginStatus"></v-btn>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <div class="ma-2" 
                            v-for="review in reviews.slice((page-1)*5, page*5)"
                            :key="review">
                                <v-card
                                :title="review.id"
                                :subtitle="review.time"
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
                        </v-col>
                    </v-row>
        </v-card>
    </v-container>
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
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { postAnime, createCommentAPI, getComments } from "../api/anime"; 
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const id = ref('te')
        const tags = ref([])
        const animeInfo = ref({})
        const infoView = ref([])
        const reviews = ref([])
        const page = ref(1)
        const lengthOfPage = ref(0)
        const loginDialog = ref(false)
        const logoutDialog = ref(false)
        const overlay = ref(false)
        const comment = ref("")
        onMounted(async () => {
            id.value = route.path.split("/")[2]
            let result = await postAnime({"id": id.value})
            let reviewArray = await getComments({"animeId": id.value})
            console.log(result)
            animeInfo.value = result
            tags.value = animeInfo.value.tags
            Object.keys(animeInfo.value).forEach((k) => {
                if (k !== "image" & k!== "tags" & k!=="name") {
                    let value = animeInfo.value[k].toString()
                    infoView.value.push({key: k, value: value})
                }
            })

            reviews.value = reviewArray
            lengthOfPage.value = (reviews.value.length / 5) + 1
        })

        const createComment = async () => {
            const tokenInfo = store.getters['userStore/getToken']
            const userId = store.getters["userStore/getUserId"]
            await createCommentAPI({animeId: id.value, userId: userId, content: comment.value}, tokenInfo)
            overlay.value = false
        }

        const checkLoginStatus = async () => {
            const userStatus = store.getters["userStore/getLoginStatus"]
            if (userStatus === true) {
                overlay.value = true
                await createComment()
                loginDialog.value = true
            } else {
                logoutDialog.value = true
            }
        }

        const moveLogin = () => {
            router.push('/login')
        }
        
        const successComment = () => {
            loginDialog.value = false
            router.go(0)
        }

        return {
            id,
            tags,
            animeInfo,
            infoView,
            reviews,
            page,
            lengthOfPage,
            checkLoginStatus,
            loginDialog,
            logoutDialog,
            moveLogin,
            createComment,
            successComment,
            overlay,
            comment
        }
    },
})
</script>
