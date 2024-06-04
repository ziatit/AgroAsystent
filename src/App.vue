<!-- src/App.vue -->
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './store/useAuthStore';
import FooterComponent from './components/headers/FooterComponent.vue';
import HeaderComponent from './components/headers/HeaderComponent.vue';


const router = useRouter();
const userStore = useAuthStore();
const username = computed(() => userStore.getLoggedInUser);

</script>

<template>
    <HeaderComponent/>
    <router-view />
    <FooterComponent />
</template>

<style scoped></style>