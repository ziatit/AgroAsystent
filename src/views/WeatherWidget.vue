<template>
    <div>
        <h2>Pogoda</h2>
        <div v-if="weather">
            <p>{{ weather.name }}: {{ weather.weather[0].description }}</p>
            <p>Temperatura: {{ weather.main.temp }}°C</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            weather: null
        };
    },
    mounted() {
        this.fetchWeather();
    },
    methods: {
        async fetchWeather() {
            try {
                const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
                const city = 'Warsaw';
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                this.weather = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>