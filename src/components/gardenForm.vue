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
            <button  type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed} from 'vue';
import { GET_USERNAME } from "../store/storeconstants";
import { useStore } from 'vuex';

const username = computed(() => store.getters[`auth/${GET_USERNAME}`]);
const store = useStore();
const title = 'Stwórz nowy ogródek';
const name = ref('');
const location = ref('');
const isUnderRoof = ref(false);
const emit = defineEmits(['formSubmitted']);

const submitForm = () => {
    console.log(`Name: ${name.value}, Location: ${location.value}, Is Under Roof: ${isUnderRoof.value}`);
    const gardenData = {
        gardenName: name.value,
        plants: [],
        isUnderRoof: isUnderRoof.value,
        location: location.value
    };
    fetch(`http://localhost:3000/users/${username.value}id`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(user => {
        user.gardens.push(gardenData);
        return fetch(`http://localhost:3000/users/${username.value}id`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    })
    .then(response => response.json())
    .then(data => {
        console.log('Garden created:', data);
        // Handle success
    })
    .catch(error => {
        console.error('Error creating garden:', error);
        // Handle error
    })
    .then(() => {
        // Emit the formSubmitted event
        emit('formSubmitted');
});
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
    margin-bottom: 15px;
}
</style>