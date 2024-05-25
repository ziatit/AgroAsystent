import { createRouter, createWebHistory } from "vue-router";
import mainPage from "./views/mainPage.vue";
import UserScreen from "./views/userScreen.vue";
import ogrody from "./views/gardensPage.vue";
import AddPlant from './views/AddPlant.vue';
import Garden from './views/Garden.vue';


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
    { path: '/garden/:name', component: Garden, props: true }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
