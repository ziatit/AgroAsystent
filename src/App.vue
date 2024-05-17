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
</script>

<style scoped>
</style>