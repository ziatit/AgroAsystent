<template>
    <div class="container">
        <h1>Hej {{ username }}. Tu są twoje ogrody:</h1>
        <ul class="garden-list">
            <li v-for="garden in gardens" :key="garden" class="garden-item">
                <router-link :to="{ name: 'GardenDetail', params: { id: garden }}" class="garden-link">
                    <h2 class="garden-name">{{ garden }}</h2>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/users.js';

const gardens = ref('');
const userStore = useUserStore();
const username = ref(userStore.getLoggedInUser);
onMounted(fetchGardens)

async function fetchGardens() {
    try {
        console.log(username.value)
        const response = await fetch(`http://localhost:3000/users/` + username.value+'id' );
        const data = await response.json();

        if (data.gardens) {
            gardens.value = data.gardens.map(garden => garden.gardenName);
        } else {
            console.log('No gardens found for this user');
        }
    } catch (error) {
        console.error('Failed to fetch gardens:', error);
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 15px;
}

.garden-list {
    list-style-type: none;
    padding: 0;
}

.garden-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
</style>