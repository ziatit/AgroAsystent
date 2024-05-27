<template>
    <div>
        <h1>{{ props.id }}</h1>
        <AddPlant @add-plant="addPlant" :gardenId="id" />
        <p v-if="garden">Lokalizacja: {{ garden.location }}</p>
        <ul class="plant-list">
            <li v-for="plant in plants" :key="plant.name" class="plant-item">{{ plant.name }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '../../store/users.js';
import AddPlant from '../../components/AddPlant.vue';

const userStore = useUserStore();
const username = ref(userStore.getLoggedInUser);
const garden = ref(null);
const plants = ref({
    name: [],
    lastWatered: []
});


const props = defineProps({
    id: {
        type: String,
        default: ''
    }
}
)

async function fetchPlants() {
    try {
        const response = await fetch('/data/userData.json');
        const data = await response.json();
        const garden = data.gardens.find(g => g.gardenName === props.id);

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
<style scoped>
.plant-list {
    list-style-type: none; /* Remove the default list bullets */
    padding: 0; /* Remove the default padding */
}

.plant-item {
    background-color: #f0f0f0; /* Set a background color */
    margin-bottom: 10px; /* Add some space between the items */
    padding: 10px; /* Add some padding */
    border-radius: 5px; /* Add rounded corners */
}
</style>