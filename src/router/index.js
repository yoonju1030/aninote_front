import {createRouter, createWebHistory} from 'vue-router';
import test from "./test"

const routes=[
    ...test
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;