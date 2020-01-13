import Vue from "vue";
import VueRouter from "vue-router";
import { articleRoutes, pageRoutes } from './dynamicRoutes.js'
Vue.use(VueRouter);
const routes = [{
        path: "/",
        redirect: "/home"
    },
    ...articleRoutes, ...pageRoutes
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;