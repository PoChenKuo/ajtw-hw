import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/collect",
    name: "Collect",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Collect.vue")
  },
  {
    path: "/video/:vid?",
    name: "Video",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Video.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  routes
});

export default router;
