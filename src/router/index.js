import {createRouter, createWebHistory} from 'vue-router';
import test from "./test"
import auth from "./auth"
import anime from "./anime"
import store from "@/store";

const routes=[
    ...test,
    ...auth,
    ...anime
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    let loginStatus = store.getters["userStore/getLoginStatus"];
    if (loginStatus) { 
        if (to.path === '/login'){
            next({path: '/'})
        } else {
            next()
        }
    } else {
        if (to.path === "/mypage") {
            next({path: "/"})
        }
        next()
    }
})

export default router;