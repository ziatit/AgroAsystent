import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./views/MainPage.vue";
import UserScreen from "./views/UserScreen.vue";
import GardensPage from "./views/Gardens/GardensPage.vue";
import AddPlant from "./components/AddPlant.vue";
import Garden from "./views/Garden.vue";

import gardenDetail from "./views/Gardens/GardenDetail.vue";
import NotFound from "./views/NotFound.vue";
import AboutUs from "./views/AboutUs.vue";

import { useAuthStore } from './store/useAuthStore.js';

const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage,
    },
    {
        path: "/UserScreen",
        name: "UserScreen",
        component: UserScreen,
    },
    {
        path: "/GardensPage",
        name: "GardensPage",
        component: GardensPage,
    },
    {
        path: "/AddPlant",
        name: "AddPlant",
        component: AddPlant,
    },
    {
        path: "/garden/:id/:location",
        name: "GardenDetail",
        component: gardenDetail,
        props: true,
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: "/aboutUs",
        name: "AboutUs",
        component: AboutUs,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.name !== "MainPage" && !authStore.session) {
        next({ name: "MainPage" });
    } else {
        next();
    }
});

export default router;
