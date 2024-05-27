<template>
  <div>
    <h2>Ogród: {{ name }}</h2>
    <AddPlant @add-plant="addPlant" />
    <ul>
      <li v-for="plant in plants" :key="plant.name">{{ plant.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddPlant from './AddPlant.vue';

const route = useRoute();
const name = route.params.name;
const plants = ref([]);

async function fetchPlants() {
    try {
        const response = await fetch('/data/userData.json');
        const data = await response.json();
        const garden = data.gardens.find(g => g.gardenName === name);

        if (garden) {
            plants.value = garden.plants;
        } else {
            console.log('Garden not found');
        }
    } catch (error) {
        console.error('Failed to fetch plants:', error);
    }
}

function addPlant(plant) {
    plants.value.push(plant);
    savePlants();
}

async function savePlants() {
    try {
        const response = await fetch('/data/userData.json');
        const data = await response.json();
        const garden = data.gardens.find(g => g.gardenName === name);

        if (garden) {
            garden.plants = plants.value;
        } else {
            data.gardens.push({ gardenName: name, plants: plants.value });
        }

        await fetch('/data/userData.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Failed to save plants:', error);
    }
}

onMounted(fetchPlants);
</script>

  