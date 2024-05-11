<template>
    <div>
        Hello, {{ username }}
        <ul>
            <li v-for="garden in gardens" :key="garden">{{ garden }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const gardens = ref('');

onMounted(fetchGardens);

async function fetchGardens() {
    try {
        const response = await fetch(`http://localhost:3000/users/`);
        const data = await response.json();

        gardens.value = data.map(user => user.gardens);
    } catch (error) {
        console.error('Failed to fetch gardens:', error);
    }
}
</script>

<style scoped>
/* Your component's styles go here */
</style>
