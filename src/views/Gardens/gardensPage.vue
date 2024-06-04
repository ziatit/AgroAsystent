<template>
    <div class="container">
        <h1>Hej {{ username }}. Tu są twoje ogrody:</h1>
        <ul class="garden-list">
            <li v-for="garden in gardens" :key="garden.name" class="garden-item">
                <router-link :to="{ name: 'GardenDetail', params: { id: garden.name, location: garden.location } }"
                    class="garden-link">
                    <h2 class="garden-name">{{ garden.name }}</h2>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../../store/useAuthStore.js';
import { supabase } from '../../supabase.js';

const gardens = ref([]);
const userStore = useAuthStore();
const username = ref(userStore.getLoggedInUser);
onMounted(fetchGardens)

async function fetchGardens() {
    try {
        console.log(username.value)
        const { data, error } = await supabase
            .from('gardens')
            .select('garden_name, location')
            .eq('user_name', username.value);

        if (error) {
            throw error;
        }

        if (data && data.length > 0) {
            gardens.value = data.map(garden => {
                console.log('Garden:', garden); // log each garden
                return { name: garden.garden_name, location: garden.location };
            });
            console.log('Gardens:', gardens.value);
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