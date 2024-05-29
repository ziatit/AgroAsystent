<template>
    <div class="form-container">
        <h1>{{ title }}</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nazwa:</label>
                <input type="text" v-model="name" id="name" required>
            </div>
            <div class="form-group">
                <label for="location">Lokalizacja:</label>
                <input type="text" v-model="location" id="location" required>
            </div>
            <div class="form-group">
                <label for="binary">Czy ogródek jest pod dachem?</label>
                <input type="checkbox" v-model="isUnderRoof" id="binary" name="is_under_roof">
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../store/users.js';
import { supabase } from '../supabase.js';

const userStore = useUserStore();
const username = ref(userStore.getLoggedInUser);
const title = 'Stwórz nowy ogródek';
const name = ref('');
const location = ref('');
const isUnderRoof = ref(false);
const gardenID = ref('id')
const emit = defineEmits(['formSubmitted']);

const submitForm = async () => {
    console.log(`Name: ${name.value}, Location: ${location.value}, Is Under Roof: ${isUnderRoof.value}`);
    const gardenData = {
        garden_name: name.value,
        is_under_roof: isUnderRoof.value,
        location: location.value,
        user_name: username.value
    };

    try {
        const { data, error } = await supabase
            .from('gardens')
            .upsert(gardenData);

        if (error) {
            throw error;
        }

        console.log('Garden created:', data);
        // Emit the formSubmitted event
        emit('formSubmitted');
    } catch (error) {
        console.error('Error creating garden:', error);
    }
};
</script>

<style scoped>
.form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 15px;
}

.form-group {
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
    transition: all 0.3s ease;
}

.form-group:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px #007BFF;
}
</style>