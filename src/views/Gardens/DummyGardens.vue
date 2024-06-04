<template>
    <div>
      <h2>Dummy Gardens</h2>
      <button @click="addGarden">Add Garden</button>
      <ul class="garden-list">
        <li v-for="garden in dummyGardens" :key="garden.name" class="garden-item">
          <h2 class="garden-name">{{ garden.name }}</h2>
          <p class="garden-location">{{ garden.location }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import gardens from './dummyGardens.json';
  
  const dummyGardens = ref(gardens);
  
  const addGarden = () => {
    dummyGardens.value.push({
      name: `Garden ${dummyGardens.value.length + 1}`,
      location: `Location ${dummyGardens.value.length + 1}`
    });
  };
  </script>
  
  <style scoped>
  .garden-list {
    list-style-type: none;
    padding: 0;
  }
  
  .garden-item {
    margin-bottom: 1em;
  }
  
  .garden-name {
    font-weight: bold;
  }
  
  .garden-location {
    color: #888;
  }
  </style>