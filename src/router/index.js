import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import('../views/App.vue'),
        children: [
            {
                path: "",
                component: () => import('../views/Login.vue')
            },
            {
                path: "/home",
                component: () => import('../views/Home.vue'),
                children:[
                    {
                        path: "",
                        component: () => import('../views/index/index.vue')
                    },
                    {
                        path: "/focus/begin",
                        component:()=>import('../views/focus/begin.vue')
                    },
                    {
                        path: "/focus/record",
                        component:()=>import('../views/focus/record.vue')
                    }
                ]
            },


        ]
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes

})
export default router