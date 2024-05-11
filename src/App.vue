<template>
<naglowek title="Agroasystent" />
<router-view />
<st00pka />
</template>

<script setup>
import { useRouter } from 'vue-router';
import st00pka from './components/St00pka.vue';
import naglowek from './components/Nagłówek.vue';
const router = useRouter();
const goToTest = () => {
    router.push({ name: 'Test' });
}
</script>

<style scoped>
</style>