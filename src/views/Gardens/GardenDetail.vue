<template>
    <div>
        <h1>{{ gardenDets.name }}</h1>
        <h2>Lokalizacja: {{ gardenDets.location }}</h2>
        <button @click="showAddPlant = !showAddPlant">
            {{ showAddPlant ? 'Zamknij formularz' : 'Dodaj roślinę' }}
        </button>
        <AddPlant v-if="showAddPlant" @add-plant="addPlant" :gardenId="gardenDets.name" @submitted="fetchPlants" />
        <p>Podpowiedź: Rośliny z czerwonym tłem mogą potrzebować podlewania.</p>
        <ul class="plant-list">
            <li v-for="plant in plants" :key="plant.name"
                :class="{ 'needs-watering': needsWatering(plant.lastWatered) }" class="plant-item">
                Nazwa: {{ plant.name }} <br>
                Typ: {{ plant.type }} <br>
                Ostatnie podlewanie: {{ new Date(plant.lastWatered).toLocaleDateString() }}
                <button @click="waterPlant(plant.name)">Podlej</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '../../store/useAuthStore.js';
import AddPlant from '../../components/AddPlant.vue';
import { supabase } from '../../supabase.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useAuthStore();
const username = ref(userStore.data);
const plants = ref([]);
const gardenDets = ref({ name: route.params.id, location: route.params.location });
const showAddPlant = ref(false)

async function fetchPlants() {
    try {
        const { data: gardens, error } = await supabase
            .from('plants')
            .select('plant_name, plant_type, last_watering_date')
            .eq('garden', gardenDets.value.name);

        if (error) throw error;

        if (gardens && gardens.length > 0) {
            plants.value = gardens.map(garden => ({
                name: garden.plant_name,
                type: garden.plant_type,
                lastWatered: garden.last_watering_date
            }));
            console.log('Plants:', plants.value);
        } else {
            console.log('Garden not found');
        }
    } catch (error) {
        console.error('Failed to fetch plants:', error);
    }
}

onMounted(() => {
    fetchPlants();
    console.log(gardenDets.value.name, gardenDets.value.location);
});

function needsWatering(lastWatered) {
    const lastWateredDate = new Date(lastWatered);
    const now = new Date();
    const differenceInDays = Math.floor((now - lastWateredDate) / (1000 * 60 * 60 * 24));
    return differenceInDays > 3;
}

async function waterPlant(plantName) {
    const today = new Date();
    try {
        const { error } = await supabase
            .from('plants')
            .update({ last_watering_date: today })
            .eq('plant_name', plantName)
            .eq('garden', gardenDets.value.name);

        if (error) throw error;

        // Update the local state
        const plant = plants.value.find(p => p.name === plantName);
        if (plant) {
            plant.lastWatered = today;
        }
    } catch (error) {
        console.error('Failed to update plant:', error);
    }
}


</script>
<style scoped>
.plant-list {
    list-style-type: none;
    /* Remove the default list bullets */
    padding: 0;
    /* Remove the default padding */
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* Add some space between the items */
}

.plant-item {
    background-color: #f0f0f0;
    /* Set a background color */
    padding: 20px;
    /* Add some padding */
    border-radius: 10px;
    /* Add rounded corners */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /* Add some shadow */
    transition: transform .2s;
    /* Animation */
}

.plant-item:hover {
    transform: scale(1.02);
    /* Slightly enlarge the item when hovered */
}

.plant-item h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
}

.plant-item p {
    margin: 10px 0 0;
    color: #666;
}

.needs-watering {
    background-color: #ffcccc;
}
</style>