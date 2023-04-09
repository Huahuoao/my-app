import {createRouter, createWebHashHistory} from "vue-router";

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
                    },
                    {
                        path: "/plan/today",
                        component:()=>import('../views/plan/today.vue')
                    },
                    {
                        path:  "/plan/history",
                        component:()=>import('../views/plan/history.vue')
                    },
                    {
                        path: "/plan/book",
                        component:()=>import('../views/plan/planbook.vue')
                    },
                ]
            },


        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes

})
export default router