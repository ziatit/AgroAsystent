<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required>
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
    // Perform login logic here
    console.log('Logging in...');
};
</script>