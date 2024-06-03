<!-- src/components/auth/LoginForm.vue -->
<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { supabase } from '../../supabase.js';
import { useUserStore } from '../../store/users.js';

const email = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();

async function login() {
    console.log("run login()")
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    if (error) {
        console.log("Failed to login:");
        console.log(error);
    }
    else {
        console.log("Data object returned by Supabase Auth:");
        console.log(data);
        const session = await supabase.auth.getSession();
        console.log("Session object:");
        console.log(session);
        userStore.setSession(session);
        router.push('/UserScreen');
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
        <!-- <button @click="seeUser"> See user </button> -->
        <!-- <button @click="logout"> Logout </button> -->
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