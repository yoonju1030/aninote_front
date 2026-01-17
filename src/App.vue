<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <!-- prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" -->
          <v-list-item
            :title="userId"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-account"></v-icon>
            </template>
          </v-list-item>
          <!--subtitle="sandra_a88@gmailcom"-->
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item 
          prepend-icon="mdi-folder" 
          title="Animes" 
          value="anime" 
          @click="move('/')"
          ></v-list-item>
          <v-list-item 
          prepend-icon="mdi-star" 
          title="My Page" 
          value="mypage" 
          @click="moveMyPage('/mypage')"
          ></v-list-item>
          <v-list-item 
          prepend-icon="mdi-account-multiple" 
          title="Sign In" 
          value="signin" 
          @click="move('/login')" 
          v-if="userStatus === false"
          ></v-list-item>
          <v-list-item 
          prepend-icon="mdi-account-multiple" 
          title="Sign Out" 
          value="signout"
          @click="signOut"
          v-else
          ></v-list-item>
        </v-list>
        
      </v-navigation-drawer>
      <v-main>
        <router-view/>
      </v-main>
    </v-layout>
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
  </v-app>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { logOutUser } from './api/users';

export default defineComponent({
    setup() {
      const router = useRouter()
      const store = useStore()
      const userStatus = ref(false)
      const userId = ref("")
      const overlay = ref(false)
      onMounted(() => {
        userStatus.value = store.getters["userStore/getLoginStatus"]
        if (userStatus.value === true) {
          userId.value = store.getters["userStore/getUserId"]
        } else {
          userId.value = "Welcome!"
        }
      })
      const move = (path) => {
        router.push({path: path})
      }

      const moveMyPage = (path) => {
        if (userStatus.value === false) {
          router.push('/login')
        } else {
          move(path)
        }
      }

      const signOut = async () => {
        overlay.value = !overlay.value
        const tokenInfo = store.getters['userStore/getToken']
        await logOutUser({}, tokenInfo)
        store.commit("userStore/setLogout")
        overlay.value = !overlay.value
        router.go(0)
      }
      return {
        move,
        userStatus,
        moveMyPage,
        userId,
        signOut,
        overlay
      }
    },
})
</script>
