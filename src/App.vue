<!-- src/App.vue -->
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/users';
import FooterComponent from './components/headers/FooterComponent.vue';
import HeaderComponent from './components/headers/HeaderComponent.vue';


const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.getLoggedInUser);

</script>

<template>
    <HeaderComponent/>
    <router-view />
    <FooterComponent />
</template>

<style scoped></style>