<template>
    <div>
        Hello, {{ username }}
        <ul>
            <li v-for="garden in gardens" :key="garden">{{ garden }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {  GET_USERNAME } from "../store/storeconstants";
import { useStore } from 'vuex';

const store = useStore();
const gardens = ref('');
const username = computed(() => store.getters[`auth/${GET_USERNAME}`]);
onMounted(fetchGardens);

async function fetchGardens() {
    try {
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
/* Your component's styles go here */
</style>
