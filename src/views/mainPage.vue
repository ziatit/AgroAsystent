<template>
    <div>
        <h1>Witaj w Agro-asystencie!</h1>
            <button class="login" @click="showSignInForm">Zaloguj się</button>
            <button class="register" @click="showRegisterForm" >Stwórz konto</button>
            <LogIn v-if="showLogin" />
            <ReGister v-if="showRegister" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import LogIn from '../components/konto/login.vue';
import ReGister from '../components/konto/ReGister.vue';

const showLogin = ref(false)
const showRegister = ref(false)

function showSignInForm() {
   showLogin.value = !showLogin.value;
   console.log(showLogin.value);
}

function showRegisterForm() {
        showRegister.value = !showRegister.value;
        console.log(showRegister.value);
}
</script>

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
