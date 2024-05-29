<!-- src/App.vue -->
<template>
    <HeaderLoggedIn v-if="username" title="Agroasystent" />
    <HeaderLoggedOut v-else />
    <router-view />
    <FooterComponent />
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/users';
import FooterComponent from './components/headers/FooterComponent.vue';
import HeaderLoggedIn from './components/headers/HeaderLoggedIn.vue';
import HeaderLoggedOut from './components/headers/HeaderLoggedOut.vue';


const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.getLoggedInUser);

</script>
<style scoped></style>