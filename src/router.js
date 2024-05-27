import { createRouter, createWebHistory } from "vue-router";
import mainPage from "./views/mainPage.vue";
import UserScreen from "./views/userScreen.vue";
import ogrody from "./views/Gardens/gardensPage.vue";
import AddPlant from './components/AddPlant.vue';
import Garden from './views/Garden.vue';

import gardenDetail from "./views/Gardens/gardenDetail.vue";
import NotFound from "./views/NotFound.vue";
import AboutUs from "./views/ONas.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: mainPage
    },
    {
        path: '/UserScreen',
        name: 'UserScreen',
        component: UserScreen
    },
    {
        path: '/ogrody',
        name: 'Ogrody',
        component: ogrody
    },
    {

        path: '/AddPlant',
        name: 'AddPlant',
        component: AddPlant
    },
     {
        path: '/garden/:id',
        name: 'GardenDetail',
        component: gardenDetail,
        props: true

    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },
    {
        path:'/aboutUs',
        name: 'AboutUs',
        component: AboutUs
    }

];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
