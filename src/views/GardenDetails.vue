<template>
    <div class="container">
        <h1>Ogród: {{ garden.name }}</h1>
        <AddPlant @add-plant="addPlant" :garden-id="garden.id" />
        <ul class="plant-list">
            <li v-for="plant in garden.plants" :key="plant.name" class="plant-item">{{ plant.name }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import AddPlant from './AddPlant.vue';

const store = useStore();
const route = useRoute();
const gardenId = route.params.id;
const garden = computed(() => store.getters.getGardens.find(g => g.id === gardenId));

const addPlant = (plant) => {
    store.commit('addPlant', { gardenId, plant });
};
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 15px;
}

.plant-list {
    list-style-type: none;
    padding: 0;
}

.plant-item {
    background-color: #f9f9f9;
    color: black;
    font-family: Arial, sans-serif;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
</style>