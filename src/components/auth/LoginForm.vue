<!-- src/components/auth/LoginForm.vue -->
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/useAuthStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
    try {
        await authStore.signIn(email.value, password.value);
        router.push('/userScreen');
    } catch (error) {
        alert(error.error_description || error.message);
    }
}
</script>

<template>
    <h1>Sign in via e-mail:</h1>
    <div class="inputContainer">
        <label for="email"> Email: </label>
        <input type="email" id="email" v-model="email">
    </div>

    <div class="inputContainer">
        <label for="email"> Password: </label>
        <input type="password" id="password" v-model="password">
    </div>

    <div class="buttonContainer">
        <button @click="login"> Login </button>
    </div>
</template>

<style scoped>
.inputContainer {
    display: flex;
    flex-direction: column;
}

input {
    font-size: 1.5em;
}

.buttonContainer {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
}

button {
    margin-bottom: 1em;
    padding: 1em 2em 1em 2em;
}
</style>