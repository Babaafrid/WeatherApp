import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import HourCard from "../components/HourCard.vue";
import WeekCard from "../components/WeekCard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/hourcard",
    name: "hourcard",
    component: HourCard,
  },
  {
    path: "/weekcard",
    name: "weekcard",
    component: WeekCard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
