import Vue from "vue";
import VueRouter from "vue-router";
import { articleRoutes, pageRoutes } from "./dynamicRoutes";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  ...articleRoutes,
  ...pageRoutes
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
