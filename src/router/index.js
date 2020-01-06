import Vue from "vue";
import VueRouter from "vue-router";
import PagesRoute from './PagesRoute'
import ArticleRoute from './articleRoute'
Vue.use(VueRouter);
const routes = [{
        path: "/",
        redirect: "/home"
    },
    ...PagesRoute,
    ...ArticleRoute
];
console.log(routes)

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;