<template>
    <div>
        <h1>Welcome to the Gardening App!</h1>
        <div v-if="!isLoggedIn">
            <button @click="showSignInForm">Sign In</button>
            <button @click="showCreateAccountForm">Create Account</button>
        </div>
        <div v-else>
            <p>Welcome, {{ username }}!</p>
            <!-- Your main content goes here -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const username = ref('');

function showSignInForm() {
    // Logic to show the sign in form
}

function showCreateAccountForm() {
    // Logic to show the create account form
}
</script>

<style scoped>
</style>