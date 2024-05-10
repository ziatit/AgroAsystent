<template>
    <div>
        <h1>Register</h1>
        <form @submit="submitForm">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const submitForm = (event) => {
    event.preventDefault();
    // Perform registration logic here
};
</script>