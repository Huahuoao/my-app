import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import('../views/App.vue')
    },
    {
        path: "/home",
        component: () => import('../views/Index.vue')
    },
    {
        path: "/test",
        component: () => import('../views/test.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes

})
export default router