<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="name">Nazwa rośliny:</label>
      <input id="name" v-model="name" placeholder="Wprowadź nazwę rośliny" required />

      <label for="type">Gatunek rośliny:</label>
      <input id="type" v-model="type" placeholder="Wprowadź gatunek rośliny" required />

      <label for="last_watering_date">Data ostatniego podlania:</label>
      <input id="last_watering_date" v-model="last_watering_date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" required />

      <button type="submit">Dodaj</button>
    </form>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { supabase } from '../supabase.js';

const props = defineProps({
    gardenId: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['submitted']);

const name = ref('');
const type = ref('');
const last_watering_date = ref('');

const submitForm = async () => {
    const plantData = {
        plant_name: name.value,
        plant_type: type.value,
        last_watering_date: last_watering_date.value,
        garden: props.gardenId
    };

    try {
        const { data, error } = await supabase
            .from('plants')
            .insert([plantData]);

        if (error) {
            throw error;
        }

        console.log('Plant created:', data);

        name.value = '';
        type.value = '';
        last_watering_date.value = '';

        emits('submitted'); // Emit the event here
    } catch (error) {
        console.error('Error creating plant:', error);
    }
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: auto;
}

label {
    font-size: 18px;
    color: #333;
}

input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background-color: #4CAF50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}
</style>