

<script setup>
import { ref } from 'vue';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

const showRegister = ref(false)

function toggleForm() {
    showRegister.value = !showRegister.value;
}
</script>

<template>
    <div>
        <h1>Welcome!</h1>
        <LoginForm v-if="!showRegister" />
        <RegisterForm v-if="showRegister" />
        <button @click="toggleForm">
            {{ showRegister ? 'Got account? >Login<' : 'No account? >Register<' }}
        </button>
    </div>
</template>

<style scoped>
.login {
    background-color: rgb(33, 168, 33);
    margin: 0 auto;
    display: block;
    width: 200px;
    height: 50px;
}

.register {
    background-color: gray;
    display: block;
    margin: 10px auto;
    width: 200px;
    height: 50px;
}
</style>
