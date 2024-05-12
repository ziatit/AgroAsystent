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

const submitForm = async (event) => {
    console.log('Username:', username.value);
    console.log('Password:', password.value);

    try {
        const response = await fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        if (response.ok) {
            console.log('Registration successful');
        } else {
            console.log('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>