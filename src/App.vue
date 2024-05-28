<template>
    <naglowek v-if="username" title="Agroasystent" />
    <naglowek2 v-else />
    <router-view />
    <st00pka />
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/users';
import st00pka from './components/St00pka.vue';
import naglowek from './components/headers/NagłówekZalogowany.vue';
import naglowek2 from './components/headers/NagłówekNiez.vue';


const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.getLoggedInUser);

</script>

<style scoped>
</style>