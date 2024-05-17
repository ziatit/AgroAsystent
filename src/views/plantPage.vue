<template>
    <div class="plant">
      <h2>Plant: {{ plant.name }}</h2>
      <div>
        <p><strong>Type:</strong> {{ plant.type }}</p>
        <p><strong>Watering Needs:</strong> {{ plant.watering }}</p>
        <p><strong>Fertilizer Needs:</strong> {{ plant.fertilizer }}</p>
        <p><strong>Planting Date:</strong> {{ plant.plantingDate }}</p>
        <p><strong>Current Weather:</strong> {{ weather.description }}</p>
        <p><strong>Temperature:</strong> {{ weather.temperature }} °C</p>
        <p><strong>Humidity:</strong> {{ weather.humidity }} %</p>
        <button @click="waterPlant">Water Plant</button>
      </div>
      <div>
        <h3>Watering Log</h3>
        <ul>
          <li v-for="log in wateringLog" :key="log.date">
            {{ log.date }} - {{ log.action }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        plant: {},
        weather: {
          description: '',
          temperature: '',
          humidity: ''
        },
        wateringLog: []
      };
    },
    created() {
      const plantId = this.$route.params.id;
      this.fetchPlant(plantId);
      this.fetchWeather();
      this.fetchWateringLog(plantId);
    },
    methods: {
      fetchPlant(plantId) {
        axios.get(`/api/plants/${plantId}`)
          .then(response => {
            this.plant = response.data;
          })
          .catch(error => {
            console.error('Error fetching plant:', error);
          });
      },
      fetchWeather() {
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
          .then(response => {
            const weatherData = response.data;
            this.weather.description = weatherData.weather[0].description;
            this.weather.temperature = weatherData.main.temp;
            this.weather.humidity = weatherData.main.humidity;
          })
          .catch(error => {
            console.error('Error fetching weather:', error);
          });
      },
      fetchWateringLog(plantId) {
        axios.get(`/api/plants/${plantId}/watering-log`)
          .then(response => {
            this.wateringLog = response.data;
          })
          .catch(error => {
            console.error('Error fetching watering log:', error);
          });
      },
      waterPlant() {
        const plantId = this.$route.params.id;
        axios.post(`/api/plants/${plantId}/water`, { date: new Date().toISOString() })
          .then(() => {
            this.fetchWateringLog(plantId);
          })
          .catch(error => {
            console.error('Error watering plant:', error);
          });
      }
    }
  };
  </script>
  