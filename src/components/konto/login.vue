<template>
    <div class="login-container" @click="handleBackgroundClick">
        <h1>Login</h1>
        <form @submit.prevent="login" class="log">
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required>
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/users.js';
import { supabase } from '../../supabase.js';


const router = useRouter();
const username = ref('');
const password = ref('');
const userExists = ref(null);
const userStore = useUserStore();


const login = async () => {
    try {
        const { data: userData, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            throw error;
        }

        console.log('Users:', userData);
        const userFound = userData.some(user => user.username === username.value && user.password === password.value);
        if (userExists) {
            console.log(username.value, 'exists!');
            router.push({ name: 'UserScreen' });
            userStore.setLoggedInUser(username.value)
        } else {
            // User does not exist, display error message
            userExists.value = false;
        }
    } catch (error) {
        console.error('Error:', error);
        userExists.value = false;
    }
}

</script>

<style scoped>
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Półprzezroczyste tło */
    display: flex;
    justify-content: center;
    align-items: center;
}

.log {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}
</style>