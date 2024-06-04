<template>
    <div>
        <h2>Pogoda</h2>
        <div v-if="weather">
            <p>{{ weather.name }}: {{ weather.weather[0].description }}</p>
            <p>Temperatura: {{ weather.main.temp }}°C</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const weather = ref(null);

onMounted(fetchWeather);

async function fetchWeather() {
    try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const city = 'Warsaw';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        weather.value = response.data;
    } catch (error) {
        console.error(error);
    }
}
</script>